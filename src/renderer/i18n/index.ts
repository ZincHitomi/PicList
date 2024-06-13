import { ipcRenderer } from 'electron'
import { ObjectAdapter, I18n } from '@picgo/i18n'

import bus from '@/utils/bus'
import { sendRPC } from '@/utils/common'

import { GET_CURRENT_LANGUAGE, SET_CURRENT_LANGUAGE, FORCE_UPDATE, GET_LANGUAGE_LIST } from '#/events/constants'
import { builtinI18nList } from '#/i18n'
import { IRPCActionType } from '#/types/enum'

export class I18nManager {
  #i18n: I18n | null = null
  #i18nFileList: II18nItem[] = builtinI18nList

  constructor () {
    this.#getCurrentLanguage()
    this.#getLanguageList()
    ipcRenderer.on(SET_CURRENT_LANGUAGE, (_, lang: string, locales: ILocales) => {
      this.#setLocales(lang, locales)
      bus.emit(FORCE_UPDATE)
    })
  }

  #getLanguageList () {
    sendRPC(IRPCActionType.GET_LANGUAGE_LIST)
    ipcRenderer.once(GET_LANGUAGE_LIST, (_, list: II18nItem[]) => {
      this.#i18nFileList = list
    })
  }

  #getCurrentLanguage () {
    sendRPC(IRPCActionType.GET_CURRENT_LANGUAGE)
    ipcRenderer.once(GET_CURRENT_LANGUAGE, (_, lang: string, locales: ILocales) => {
      this.#setLocales(lang, locales)
      bus.emit(FORCE_UPDATE)
    })
  }

  #setLocales (lang: string, locales: ILocales) {
    const objectAdapter = new ObjectAdapter({
      [lang]: locales
    })
    this.#i18n = new I18n({
      adapter: objectAdapter,
      defaultLanguage: lang
    })
  }

  T (key: ILocalesKey, args: IStringKeyMap = {}): string {
    return this.#i18n?.translate(key, args) || key
  }

  setCurrentLanguage (lang: string) {
    sendRPC(IRPCActionType.SET_CURRENT_LANGUAGE, lang)
  }

  get languageList () {
    return this.#i18nFileList
  }
}

const i18nManager = new I18nManager()

const T = (key: ILocalesKey, args: IStringKeyMap = {}): string => {
  return i18nManager.T(key, args)
}

export {
  i18nManager,
  T
}
