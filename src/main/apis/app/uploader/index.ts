import dayjs from 'dayjs'
import {
  BrowserWindow,
  clipboard,
  ipcMain,
  Notification,
  WebContents
} from 'electron'
import fse from 'fs-extra'
import util from 'util'
import path from 'path'
import { IPicGo } from 'piclist'
import writeFile from 'write-file-atomic'

import windowManager from 'apis/app/window/windowManager'

import db from '@core/datastore'
import picgo from '@core/picgo'
import logger from '@core/picgo/logger'

import { T } from '~/i18n'
import { showNotification, getClipboardFilePath, calcDurationRange } from '~/utils/common'

import {
  GET_RENAME_FILE_NAME,
  RENAME_FILE_NAME,
  TALKING_DATA_EVENT
} from '#/events/constants'
import { IWindowList } from '#/types/enum'
import { configPaths } from '#/utils/configPaths'
import { CLIPBOARD_IMAGE_FOLDER } from '#/utils/static'

const waitForRename = (window: BrowserWindow, id: number): Promise<string|null> => {
  return new Promise((resolve) => {
    const windowId = window.id
    ipcMain.once(`${RENAME_FILE_NAME}${id}`, (_: Event, newName: string) => {
      resolve(newName)
      window.close()
    })
    window.on('close', () => {
      resolve(null)
      ipcMain.removeAllListeners(`${RENAME_FILE_NAME}${id}`)
      windowManager.deleteById(windowId)
    })
  })
}

const handleTalkingData = (webContents: WebContents, options: IAnalyticsData) => {
  const data: ITalkingDataOptions = {
    EventId: 'upload',
    Label: options.type,
    MapKv: {
      by: options.fromClipboard ? 'clipboard' : 'files',
      count: options.count,
      duration: calcDurationRange(options.duration || 0),
      type: options.type
    }
  }
  webContents.send(TALKING_DATA_EVENT, data)
}

class Uploader {
  private webContents: WebContents | null = null
  // private uploading: boolean = false
  constructor () {
    this.init()
  }

  init () {
    picgo.on('notification', (message: Electron.NotificationConstructorOptions | undefined) => {
      const notification = new Notification(message)
      notification.show()
    })

    picgo.on('uploadProgress', (progress: any) => {
      this.webContents?.send('uploadProgress', progress)
    })
    picgo.on('beforeTransform', () => {
      if (db.get(configPaths.settings.uploadNotification)) {
        const notification = new Notification({
          title: T('UPLOAD_PROGRESS'),
          body: T('UPLOADING')
        })
        notification.show()
      }
    })
    picgo.helper.beforeUploadPlugins.register('renameFn', {
      handle: async (ctx: IPicGo) => {
        const rename = db.get(configPaths.settings.rename)
        const autoRename = db.get(configPaths.settings.autoRename)
        if (autoRename || rename) {
          await Promise.all(ctx.output.map(async (item, index) => {
            let name: undefined | string | null
            let fileName: string | undefined
            if (autoRename) {
              fileName = dayjs().add(index, 'ms').format('YYYYMMDDHHmmSSS') + item.extname
            } else {
              fileName = item.fileName
            }
            if (rename) {
              const window = windowManager.create(IWindowList.RENAME_WINDOW)!
              logger.info('create rename window')
              ipcMain.on(GET_RENAME_FILE_NAME, (evt) => {
                try {
                  if (evt.sender.id === window.webContents.id) {
                    logger.info('rename window ready, wait for rename...')
                    window.webContents.send(RENAME_FILE_NAME, fileName, item.fileName, window.webContents.id)
                  }
                } catch (e: any) {
                  logger.error(e)
                }
              })
              name = await waitForRename(window, window.webContents.id)
            }
            item.fileName = name || fileName
          }))
        }
      }
    })
  }

  setWebContents (webContents: WebContents) {
    this.webContents = webContents
    return this
  }

  /**
   * use electron's clipboard image to upload
   */
  async uploadWithBuildInClipboard (): Promise<ImgInfo[]|false> {
    let filePath = ''
    try {
      const imgPath = getClipboardFilePath()
      if (!imgPath) {
        const nativeImage = clipboard.readImage()
        if (nativeImage.isEmpty()) {
          return false
        }
        const buffer = nativeImage.toPNG()
        const baseDir = picgo.baseDir
        const fileName = `${dayjs().format('YYYYMMDDHHmmSSS')}.png`
        filePath = path.join(baseDir, CLIPBOARD_IMAGE_FOLDER, fileName)
        await writeFile(filePath, buffer)
        return await this.upload([filePath])
      } else {
        return await this.upload([imgPath])
      }
    } catch (e: any) {
      logger.error(e)
      return false
    } finally {
      if (filePath) {
        fse.remove(filePath)
      }
    }
  }

  async upload (img?: IUploadOption): Promise<ImgInfo[]|false> {
    try {
      const startTime = Date.now()
      const output = await picgo.upload(img)
      if (Array.isArray(output) && output.some((item: ImgInfo) => item.imgUrl)) {
        if (this.webContents) {
          handleTalkingData(this.webContents, {
            fromClipboard: !img,
            type: db.get(configPaths.picBed.uploader) || db.get(configPaths.picBed.current) || 'smms',
            count: img ? img.length : 1,
            duration: Date.now() - startTime
          } as IAnalyticsData)
        }
        output.forEach((item: ImgInfo) => {
          item.config = JSON.parse(JSON.stringify(db.get(`picBed.${item.type}`)))
        })
        return output.filter(item => item.imgUrl)
      } else {
        return false
      }
    } catch (e: any) {
      logger.error(e)
      setTimeout(() => {
        showNotification({
          title: T('UPLOAD_FAILED'),
          body: util.format(e.stack),
          clickToCopy: true
        })
      }, 500)
      return false
    } finally {
      ipcMain.removeAllListeners(GET_RENAME_FILE_NAME)
    }
  }
}

export default new Uploader()
