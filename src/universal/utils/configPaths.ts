
import { II18nLanguage, IPasteStyle, ISartMode, IShortUrlServer } from '../types/enum'
import { IBuildInCompressOptions, IBuildInWaterMarkOptions } from 'piclist'

export type ISartModeValues = typeof ISartMode[keyof typeof ISartMode]
export type IPasteStyleValues = typeof IPasteStyle[keyof typeof IPasteStyle]
export type II18nLanguageValues = typeof II18nLanguage[keyof typeof II18nLanguage]
export type IShortUrlServerValues = typeof IShortUrlServer[keyof typeof IShortUrlServer]
export type manualPageOpenType = 'window' | 'browser'

interface IPicGoPlugins {
  [key: `picgo-plugin-${string}`]: boolean
}

export interface IConfigStruct {
  picBed: {
    uploader: string,
    current?: string,
    smms?: ISMMSConfig,
    qiniu?: IQiniuConfig,
    upyun?: IUpYunConfig
    tcyun?: ITcYunConfig
    github?: IGitHubConfig
    aliyun?: IAliYunConfig
    imgur?: IImgurConfig
    webdavplist?: IWebdavPlistConfig
    local?: ILocalConfig
    sftpplist?: ISftpPlistConfig
    telegraphplist?: ITelegraphConfig
    lskyplist?: ILskyConfig
    'aws-s3-plist': IAwsS3PListUserConfig
    proxy?: string
    transformer?: string
    list: IPicBedType[]
    [others: string]: any
  },
  settings: {
    shortKey: {
      [key: string]: IShortKeyConfig
    }
    logLevel: string[]
    logPath: string
    logFileSizeLimit: number
    isAutoListenClipboard: boolean
    isListeningClipboard: boolean
    showUpdateTip: boolean
    miniWindowPosition: [number, number]
    miniWindowOntop: boolean
    mainWindowWidth: number
    mainWindowHeight: number
    isHideDock: boolean
    autoCloseMiniWindow: boolean
    autoCloseMainWindow: boolean
    isCustomMiniIcon: boolean
    customMiniIcon: string
    startMode: ISartModeValues
    autoRename: boolean
    deleteCloudFile: boolean
    server: IServerConfig
    serverKey: string
    pasteStyle: IPasteStyleValues
    aesPassword: string
    rename: boolean
    sync: ISyncConfig
    tempDirPath: string
    language: II18nLanguageValues
    customLink: string
    manualPageOpen: manualPageOpenType
    encodeOutputURL: boolean
    useShortUrl: boolean
    shortUrlServer: IShortUrlServerValues
    c1nToken: string
    cfWorkerHost: string
    yourlsDomain: string
    yourlsSignature: string
    isSilentNotice: boolean
    proxy: string
    registry: string
    autoCopy: boolean
    enableWebServer: boolean
    webServerHost: string
    webServerPort: number
    webServerPath: string
    deleteLocalFile: boolean
    uploadResultNotification: boolean
    uploadNotification: boolean
    useBuiltinClipboard: boolean
    autoStart: boolean
    autoImport: boolean
    autoImportPicBed: string[]
  }
  needReload: boolean
  picgoPlugins: IPicGoPlugins
  uploader: IUploaderConfig
  buildIn: {
    compress: IBuildInCompressOptions
    waterMark: IBuildInWaterMarkOptions
    rename: {
      enable: boolean
      format: string
    }
  }
  debug: boolean
  PICGO_ENV: string
}

interface IConfigPaths {
  picBed: {
    current: string
    uploader: string
    proxy: string
    transformer: string
    list: string
  },
  settings: {
    shortKey: {
      _path: string
      'picgo:upload': string
    }
    logLevel: string
    logPath: string
    logFileSizeLimit: string
    isAutoListenClipboard: string
    isListeningClipboard: string
    showUpdateTip: string
    miniWindowPosition: string
    miniWindowOntop: string
    isHideDock: string
    mainWindowWidth: string
    mainWindowHeight: string
    autoCloseMiniWindow: string
    autoCloseMainWindow: string
    isCustomMiniIcon: string
    customMiniIcon: string
    startMode: string
    autoRename: string
    deleteCloudFile: string
    server: string
    serverKey: string
    pasteStyle: string
    aesPassword: string
    rename: string
    sync: string
    tempDirPath: string
    language: string
    customLink: string
    manualPageOpen: string
    encodeOutputURL: string
    useShortUrl: string
    shortUrlServer: string
    c1nToken: string
    cfWorkerHost: string
    yourlsDomain: string
    yourlsSignature: string
    isSilentNotice: string
    proxy: string
    registry: string
    autoCopy: string
    enableWebServer: string
    webServerHost: string
    webServerPort: string
    webServerPath: string
    deleteLocalFile: string
    uploadResultNotification: string
    uploadNotification: string
    useBuiltinClipboard: string
    autoStart: string
    autoImport: string
    autoImportPicBed: string
  }
  needReload: string
  picgoPlugins: string
  uploader: string
  buildIn: {
    compress: string
    watermark: string
    rename: string
  }
  debug: string
  PICGO_ENV: string
}

export const configPaths: IConfigPaths = {
  picBed: {
    current: 'picBed.current',
    uploader: 'picBed.uploader',
    proxy: 'picBed.proxy',
    transformer: 'picBed.transformer',
    list: 'picBed.list'
  },
  settings: {
    shortKey: {
      _path: 'settings.shortKey',
      'picgo:upload': 'settings.shortKey[picgo:upload]'
    },
    logLevel: 'settings.logLevel',
    logPath: 'settings.logPath',
    logFileSizeLimit: 'settings.logFileSizeLimit',
    isAutoListenClipboard: 'settings.isAutoListenClipboard',
    isListeningClipboard: 'settings.isListeningClipboard',
    showUpdateTip: 'settings.showUpdateTip',
    miniWindowPosition: 'settings.miniWindowPosition',
    miniWindowOntop: 'settings.miniWindowOntop',
    isHideDock: 'settings.isHideDock',
    mainWindowWidth: 'settings.mainWindowWidth',
    mainWindowHeight: 'settings.mainWindowHeight',
    autoCloseMiniWindow: 'settings.autoCloseMiniWindow',
    autoCloseMainWindow: 'settings.autoCloseMainWindow',
    isCustomMiniIcon: 'settings.isCustomMiniIcon',
    customMiniIcon: 'settings.customMiniIcon',
    startMode: 'settings.startMode',
    autoRename: 'settings.autoRename',
    deleteCloudFile: 'settings.deleteCloudFile',
    server: 'settings.server',
    serverKey: 'settings.serverKey',
    pasteStyle: 'settings.pasteStyle',
    aesPassword: 'settings.aesPassword',
    rename: 'settings.rename',
    sync: 'settings.sync',
    tempDirPath: 'settings.tempDirPath',
    language: 'settings.language',
    customLink: 'settings.customLink',
    manualPageOpen: 'settings.manualPageOpen',
    encodeOutputURL: 'settings.encodeOutputURL',
    useShortUrl: 'settings.useShortUrl',
    shortUrlServer: 'settings.shortUrlServer',
    c1nToken: 'settings.c1nToken',
    cfWorkerHost: 'settings.cfWorkerHost',
    yourlsDomain: 'settings.yourlsDomain',
    yourlsSignature: 'settings.yourlsSignature',
    isSilentNotice: 'settings.isSilentNotice',
    proxy: 'settings.proxy',
    registry: 'settings.registry',
    autoCopy: 'settings.autoCopy',
    enableWebServer: 'settings.enableWebServer',
    webServerHost: 'settings.webServerHost',
    webServerPort: 'settings.webServerPort',
    webServerPath: 'settings.webServerPath',
    deleteLocalFile: 'settings.deleteLocalFile',
    uploadResultNotification: 'settings.uploadResultNotification',
    uploadNotification: 'settings.uploadNotification',
    useBuiltinClipboard: 'settings.useBuiltinClipboard',
    autoStart: 'settings.autoStart',
    autoImport: 'settings.autoImport',
    autoImportPicBed: 'settings.autoImportPicBed'
  },
  needReload: 'needReload',
  picgoPlugins: 'picgoPlugins',
  uploader: 'uploader',
  buildIn: {
    compress: 'buildIn.compress',
    watermark: 'buildIn.waterMark',
    rename: 'buildIn.rename'
  },
  debug: 'debug',
  PICGO_ENV: 'PICGO_ENV'
}
