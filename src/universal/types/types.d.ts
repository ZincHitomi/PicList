// global
interface IObj {
  [propName: string]: any
}

interface IObjT<T> {
  [propName: string]: T
}

declare interface ErrnoException extends Error {
  errno?: number | string;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

declare let __static: string

declare type ILogType = 'success' | 'info' | 'warn' | 'error'

// Server
type routeHandler = (ctx: IServerCTX) => Promise<void>

type IHttpResponse = import('http').ServerResponse

interface IServerCTX {
  response: IHttpResponse
  [propName: string]: any
}

interface IServerConfig {
  port: number | string
  host: string
  enable: boolean
}

// Sync

interface ISyncConfig {
  type: string
  file?: string
  username: string
  repo: string
  branch: string
  token: string
  endpoint?: string
  proxy?: string
  interval?: number
}

// Image && PicBed
interface ImgInfo {
  buffer?: Buffer
  base64Image?: string
  fileName?: string
  width?: number
  height?: number
  extname?: string
  imgUrl?: string
  id?: string
  type?: string
  [propName: string]: any
}

interface IGalleryItem extends ImgInfo {
  src: string
  key: string
  intro: string
}

interface IPicBedType {
  type: string
  name: string
  visible: boolean
}

// Config Settings
interface IShortKeyConfig {
  enable: boolean
  key: string // 按键
  name: string
  label: string
  from?: string
}

interface IPluginShortKeyConfig {
  key: string
  name: string
  label: string
  handle: IShortKeyHandler
}

interface IShortKeyConfigs {
  [propName: string]: IShortKeyConfig
}

interface IOldShortKeyConfigs {
  upload: string
}

interface IKeyCommandType {
  key: string
  command: string
}

// Main process
interface IBrowserWindowOptions {
  height: number
  width: number
  show: boolean
  fullscreenable: boolean
  resizable: boolean
  webPreferences: {
    nodeIntegration: boolean
    nodeIntegrationInWorker: boolean
    contextIsolation: boolean
    backgroundThrottling: boolean
    webSecurity?: boolean
  }
  vibrancy?: string | any
  frame?: boolean
  center?: boolean
  title?: string
  titleBarStyle?: string | any
  backgroundColor?: string
  autoHideMenuBar?: boolean
  transparent?: boolean
  icon?: string
  skipTaskbar?: boolean
  alwaysOnTop?: boolean
  [propName: string]: any
}

interface IFileWithPath {
  path: string
  name?: string
}

interface IBounds {
  x: number
  y: number
}

interface ITalkingDataOptions {
  EventId: string
  Label?: string
  MapKv?: IStringKeyMap
}

// PicGo Types
type ICtx = import('piclist').PicGo
interface IPicGoPlugin {
  name: string
  fullName: string
  author: string
  description: string
  logo: string
  version: string | number
  gui: boolean
  config: {
    plugin: IPluginMenuConfig
    uploader: IPluginMenuConfig
    transformer: IPluginMenuConfig
    [index: string]: IPluginMenuConfig
  } | {
    [propName: string]: any
  }
  enabled?: boolean
  homepage: string
  guiMenu?: any[]
  ing: boolean
  hasInstall?: boolean
  [propName: string]: any
}

interface IPicGoPluginConfig {
  name: string
  type: string
  required: boolean
  default?: any
  alias?: string
  choices?: {
    name?: string
    value?: any
  }[]
  /** support markdown */
  tips?: string
  [propName: string]: any
}

interface IPicGoPluginOriginConfig {
  name: string
  type: string
  required: boolean
  default?: any
  alias?: string
  choices?: {
    name?: string
    value?: any
  }[] | (() => {
    name?: string
    value?: any
  }[])
  [propName: string]: any
}

interface IPluginMenuConfig {
  name: string
  fullName?: string
  config: any[]
}

interface INPMSearchResult {
  data: {
    objects: INPMSearchResultObject[]
  }
}

interface INPMSearchResultObject {
  package: {
    name: string
    scope: string
    version: string
    description: string
    keywords: string[]
    author: {
      name: string
    }
    links: {
      npm: string
      homepage: string
    }
  }
}

type IDispose = () => void

// GuiApi
interface IGuiApi {
  showInputBox: (options: IShowInputBoxOption) => Promise<string>
  showFileExplorer: (options: IShowFileExplorerOption) => Promise<string[]>
  upload: (input: IUploadOption) => Promise<ImgInfo[]>
  showNotification: (options?: IShowNotificationOption) => void
  showMessageBox: (options?: IShowMessageBoxOption) => Promise<IShowMessageBoxResult>
}
interface IShowInputBoxOption {
  value?: string
  title: string
  placeholder: string
}

type IShowFileExplorerOption = IObj

type IUploadOption = string[]

interface IShowNotificationOption {
  title: string
  body: string
  // icon?: string | import('electron').NativeImage
}

interface IPrivateShowNotificationOption extends IShowNotificationOption{
  /**
   * click notification to copy the body
   */
  clickToCopy?: boolean
  copyContent?: string // something to copy
  clickFn?: () => void
}

interface IShowMessageBoxOption {
  title: string
  message: string
  type: string
  buttons: string[]
}

interface IShowMessageBoxResult {
  result: number
  checkboxChecked: boolean
}

interface IShortKeyHandlerObj {
  handle: IShortKeyHandler
  key: string
  label: string
}

type IShortKeyHandler = (ctx: ICtx, guiApi?: IGuiApi) => Promise<void | ICtx>

type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface shortKeyHandlerMap {
  from: string
  handle: IShortKeyHandler
}

// PicBeds
interface ITelegraphConfig {
  proxy?: string
}

interface ILocalConfig {
  path: string
  customUrl?: string
  webPath?: string
}

interface IAliYunConfig {
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  area: string
  path: string
  customUrl: string
  options: string
}

interface IGitHubConfig {
  repo: string
  token: string
  path: string
  customUrl: string
  branch: string
}

interface IImgurConfig {
  clientId: string
  proxy: string
  username: string
  accessToken: string
  album: string
}

interface IQiniuConfig {
  accessKey: string
  secretKey: string
  bucket: string
  url: string
  area: 'z0' | 'z1' | 'z2' | 'na0' | 'as0' | string
  options: string
  path: string
}

interface ISMMSConfig {
  token: string
  backupDomain?: string
}

interface ITcYunConfig {
  secretId: string
  secretKey: string
  bucket: string
  appId: string
  endpoint: string
  area: string
  path: string
  customUrl: string
  version: 'v4' | 'v5'
  options: string
  slim: boolean
}

interface IUpYunConfig {
  bucket: string
  operator: string
  password: string
  options: string
  path: string
  url: string
  antiLeechToken: string
  expireTime: number
  endpoint: string
}

interface IWebdavPlistConfig {
  host: string
  sslEnabled: boolean
  username: string
  password: string
  path: string
  webpath: string
  customUrl: string
  authType: string
  options: string
}

interface ISftpPlistConfig {
  host: string
  port?: number
  username: string
  password?: string
  privateKey?: string
  passphrase?: string
  uploadPath?: string
  customUrl?: string
  webPath?: string
  fileUser?: string
  fileMode?: string
  dirMode?: string
}

interface IPicListConfig {
  host: string
  port?: number
  picbed?: string
  configName?: string
  serverKey?: string
}

interface ILskyConfig {
  version: string
  host: string
  token: string
  strategyId: string
  albumId: string
  permission: IStringKeyMap
}

interface IAwsS3PListUserConfig {
  accessKeyID: string
  secretAccessKey: string
  bucketName: string
  uploadPath: string
  region?: string
  endpoint?: string
  proxy?: string
  urlPrefix?: string
  pathStyleAccess?: boolean
  rejectUnauthorized?: boolean
  acl?: string
  disableBucketPrefixToURL?: boolean | string
}

type ILoggerType = string | Error | boolean | number | undefined

interface IAppNotification {
  title: string
  body: string
  icon?: string
}

interface IAnalyticsData {
  fromClipboard: boolean
  type: string
  count: number
  duration?: number // 耗时
}

interface IStringKeyMap {
  [propName: string]: any
}

type ILogArgvType = string | number

type ILogArgvTypeWithError = ILogArgvType | Error

interface IMiniWindowPos {
  x: number
  y: number
  height: number
  width: number
}

type PromiseResType<T> = T extends Promise<infer R> ? R : T

// type ILocalesKey = import('#/i18n/zh-CN').ILocalesKey

interface II18nItem {
  label: string
  value: string
}

interface IRemoteNotice {
  version: number
  list: Array<{
    versions: string[] // matched picgo version
    actions: IRemoteNoticeAction[]
    versionMatch?: 'exact' | 'gte' | 'lte'
  }>
}

interface IRemoteNoticeAction {
  type: import('#/types/enum').IRemoteNoticeActionType
  // trigger time
  hooks: import('#/types/enum').IRemoteNoticeTriggerHook[]
  id: string
  // trigger count: always or once; default: once
  triggerCount: import('#/types/enum').IRemoteNoticeTriggerCount

  data?: {
    title?: string
    content?: string
    desc?: string // action desc
    buttons?: IRemoteNoticeButton[]
    url?: string
    copyToClipboard?: string
    options: any // for other case
  }
}

interface IRemoteNoticeButton {
  label: string
  labelEN?: string
  type: 'confirm' | 'cancel' | 'other'
  action: IRemoteNoticeAction
}

interface IRemoteNoticeLocalCountStorage {
  [id: string]: true | number
}

interface IUploaderListItemMetaInfo {
  _id: string
  _configName: string
  _updatedAt: number
  _createdAt: number
}

interface IUploaderConfig { 
  [picBedType: string]: IUploaderConfigItem
}

interface IUploaderConfigItem {
  configList: IUploaderConfigListItem[]
  defaultId: string
}

type IUploaderConfigListItem = IStringKeyMap & IUploaderListItemMetaInfo

type ICheckBoxValueType = boolean | string | number

interface IHTTPProxy {
  host: string
  port: number
  protocol: string
}