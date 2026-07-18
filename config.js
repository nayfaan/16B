var Util = function () {}
Util.checkIsPhone = function () {
  var sUserAgent = navigator.userAgent.toLowerCase()
  var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
  var bIsIphoneOs = sUserAgent.match(/iphone/i) == 'iphone'
  var bIsMidp = sUserAgent.match(/midp/i) == 'midp'
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
  var bIsAndroid = sUserAgent.match(/android/i) == 'android'
  var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
  var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'

  return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM
}
Util.getUrlParameter = function (name) {
  if (name) {
    var pattern = '(^|&)' + name + '=([^&]*)(&|$)'
    var flags = 'i' // 大小写不记
    var reg = new RegExp(pattern, flags) // 构造一个含有目标参数的正则表达式对象
    var result = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (result) return decodeURIComponent(result[2]);
    if (name == 'hid'  && window.hid) // 兼容house730.com的hid参数
        return window.hid
    return null // 返回参数值
  }
}
Util.debounce = function (method, delay) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(function () {
      method.apply(context, args)
    }, delay)
  }
}

Util.getBucketByDomain = function () {
  let domain = Util.getUrlParameter('domain') || '//vrhouse-test.oss-cn-shanghai.aliyuncs.com/'
  let start = domain.indexOf('//')
  let end = domain.indexOf('.')
  let bucket = domain.slice(start + 2, end)
  return bucket
}

var appConfig = {
  // 默认domain
  defaultDomain: './data/',
  domain: Util.getUrlParameter('domain'),
  // 如果设置，标题固定用该字段
  defaultTitle: '16B VR',
  // 在非多户型房源，无houseInfo的情况下是否使用viewData内标题
  useViewDataTitle: Util.getUrlParameter('start3d') && Util.getUrlParameter('start3d') == 1 ? true : false,
  // true初始为3D;false或不写默认panorama
  is3DViewAtStart: false,
  // 2D户型图中文字的大小
  textFontSize2D: '34',
  // 2D户型图中文字的字体
  textFontFamily2D: 'PingFangSC-Regular',
  // 2D户型图中文字的颜色
  texColorIn2D: {r: 255, g: 255, b: 255, a: 1},
  // 2D户型图中文字的颜色
  texBgColorIn2D: {r: 0, g: 0, b: 0, a: 0.3},
  // 全景模式下遮挡相机的logo的透明度0-1，0为全透明，1为不透明
  panoramaLogoOpacity: 1,
  // 微信分享开关
  useWeiChat: 0,
  // 一键装修 / AI裝修 (AI decoration) - REMOVED for offline copy
  useDecoration: 0,
  // 切换户型开关
  useHouseChange: 1,
  // 切换房间开关
  useRoomChange: 1,
  // 面积开关(主页中3D模型中面积、模型全屏中的面积)
  useRoomArea: Util.getUrlParameter('area') == '0' ? 0 : 1, // 面积开关(主页中3D模型中面积、模型全屏中的面积),
  // AI讲房 / AI narration - REMOVED for offline copy
  useAIIntroduce: false,

  // 经纪人手机号码分隔符, 1xx-xxxx-xxxx
  phoneNumberSplit: '-',
  // 目前的作用是，直接读取本地的houseInfo。而不是访问接口。
  useMock: 0,
  // 带看用的云平台服务地址
  kfApiURL: 'https://im-test.123kanfang.com/IM/',
  // 是否隐藏2D户型图中的面积
  hideRoomAreaIn2D: false,
  // 3d户型图光柱和文 字热点选中时的高亮色
  hotSpotHighlightColor: {r: 22, g: 212, b: 117, a: 1},
  // 长度单位，metre: 米; feet: 英尺，只在关闭了下面的单位按钮时生效
  lengthStandard: 'metre',
  // 小程序webview中结束vr带看后是否支持多次发起
  repeatedlyGuidedTour: 1,
  // 指南针北的颜色
  // compassNorthColor:"#DD4433",
  // 指南针北的高度
  // compassNorthHeight:28,
  // 指南针南的高度
  // compassSouthHeight:56,
  // 否则为原先的逻辑，无法展示中柱的网页
  // useRemoteDecoUrl:true,
  // 不配置则不显示水印
  // waterMarkSize:{width:5,height:5},
  // TODO: Shirlman, 配置文件应该保持其默认配置（静态字段），动态配置的覆盖可以放到vue中做配置项的覆盖
  // 配置0以上的数值，最好设置50及以上，不然后面的接近进度非常慢，不配置的话接近到一定程度即进去全景
  // ZoomLimitIn3D: HouseViewer.NameConverter.formatLang(Util.getUrlParameter('lang')) === 'ja' ? 50 : '',
  // 全景里面的底盘
  // panoLogoUrl:"//cdn.uj.cn/static/publickWeb/123pano/"+Util.getUrlParameter('customerName')+".png",
  // 加载页面时候中间的gif或者png,加后缀
  // gifLogo:"//cdn.uj.cn/static/publickWeb/123pano/"+Util.getUrlParameter('customerName')+".gif",
  // 加载时的底部logo和页面左下角logo
  // bottomLogoUrl:"//cdn.uj.cn/static/publickWeb/123pano/"+Util.getUrlParameter('customerName')+".png",
  // 网页标题左边的logo
  // pageTitleImageUrl:"//cdn.uj.cn/static/publickWeb/123pano/"+Util.getUrlParameter('customerName')+".png"
  mediaPrefix: '//webresource.123kanfang.com/media/',
  // 语言设置,zh-CN 简体中文 ja日语 en-US 英语 zh-HK 香港繁体中文 zh-TW 台湾繁体中文
  lang: 'zh-HK',
  // 鼠标悬浮 - 标准端默认开启
  panoramaMouseEnabled: true,
  // 鼠标悬浮颜色 - 默认为绿色
  panoramaMouseColor: '',
  // 底盘公司名称显示
  companyName: '123kanfang',
  // 左下角logo控制开关
  showLeftBottomLogo: true,
  // 全景相机默认可视角大小
  panoramaFov: 80,
  // 全景相机放大缩小范围，第一个参数控制放大值，第二个控制缩小值，放大值建议范围50~${panoramaFov}，缩小值建议范围在${panoramaFov}~100
  panoramaFovRange: [50, 100],
  // 2d户型图标尺开关， 默认关闭
  showRuler: false,
  // 3d模型框中内容的样式参数
  // smallViewBackGroundParams:{
  //   color:0x000000,
  //   opacity:0.5
  // },

  /* 以下为vr带看的相关配置 */
  // 参加会议的最多人数
  // userCapacity: 2,
  // 电话按钮开关
  showPhoneIcon: false,
  // 要电话开关
  useAskPhoneNumber: 0,
  // 留电话开关
  useGivePhoneNumber: 0,
  // 看房页中头像开关，vr带看中默认开启
  useUserImg: 1,
  // 工具栏位置在底部或右侧，editor模式默认在右侧
  isSideToolBar: 0 || Util.getUrlParameter('mode') === 'editor',
  // 侧边栏按钮是否显示icon名字
  showButtonGroupName: true,
  // 分享按钮开关
  isShareButton: 1,
  // 123看房内部key
  appKey: '5657157027374329b58ed0c19404e7e3',
  jPushKey: '9b4f0d73e716b65415b3d06b',
  // vr带看中是否有倒计时
  // enableVrTimeout: Util.getUrlParameter('enableVrTimeout') == 'false' ? false : true,
  isMP2MP: 0 || Util.getUrlParameter('isMP2MP'),
  // 小程序里控制要电话和留电话的显示在哪一方，1 ：发起方显示要电话，接收方显示留电话 0：发起方显示留电话，接收方显示要电话
  roleReversal: 0 || Util.getUrlParameter('roleReversal') === '1',
  // 带看前用户自定义检测，与checkBeforeTour方法配合使用
  checkBeforeTour: 0 || Util.getUrlParameter('checkBeforeTour') === '1',

  // editor模式下审核服务器地址, 测试环境//webapi-test.123kanfang.com/ 正式环境//webapi.123kanfang.com/
  authServerUrl: Util.getUrlParameter('authServer') || '//webapi-test.123kanfang.com/',
  // 装修模式接口 - REMOVED for offline copy
  decoServerUrl: '',
  // 利用马赛克数据作全景切图接口
  mosaicUpdateStep2: 'v2/houseTask/UpdateHouseModelByMosaicData',
  // 上传马赛克数据接口
  mosaicUpdateStep1: 'v2/houseTask/UploadEditorData',
  disableDecoAnchors: true,
  // 顶部房源名称栏是否可设为透明   准备挪到组件配置里
  useHouseNameOpacity: 1,
  // 初始默认的顶部房源名称栏是否透明  准备挪到组件配置里
  isHouseNameTransparent: 0,
  // editor模式下用，setup模式删掉后，这个配置要被废弃;
  setUpSource: Util.getUrlParameter('source') || 'setUp',
  // 是否按漫游点顺序漫游,
  // autoWalkInSequence: true,
  // AutoWalkFrozenTime: 2000,
  // 毫秒每米。
  // AutoWalkWalkSpeed:1000,
  // 每3.14弧度需要多少毫秒。
  // AutoWalkRotateSpeed:3000,
  // 到达一个房间后呆住的时间。
  // AutoWalkFrozenTime:2000,
  filteredHotSpotNamesInDeco: ['阳台', '陽台'],
  encodeKey: 'BTzSUgs-t0-TOYQE',
  // 广告视频url
  videoUrls: [
    {
      id: '01',
      name: '视频1',
      url: 'https://vrhouse-design.oss-cn-shanghai.aliyuncs.com/KanfangTest1_b9c91c18fd1148b1b45f3cbbb877d631/photo/likeran1.mp4'
    },
    {
      id: '02',
      name: '视频2',
      url: 'https://vrhouse-design.oss-cn-shanghai.aliyuncs.com/KanfangTest1_b9c91c18fd1148b1b45f3cbbb877d631/photo/likeran2.mp4'
    }
  ],
  // 家装模式商品锚点图片所在域名
  productAnchorImageDomain: 'http://vrhouse-decoration.oss-cn-shanghai.aliyuncs.com/Resources/',
  // 锚点卡片是否自动展开
  disableAnchorDetailAnimation: false,
  // 2d下放置3d模型
  display3DUnder2D: false,
  // 漫游时是否转动查看最佳视角
  // bestCameraVDuringRoaming: false,
  dropAnimation: false,
  // 实勘图开关
  useExploration: true,
  // 发布按钮开关
  isShowPublishButton: true,
  // 3D墙体开关
  show3DWall: true,
  // 3D家具开关（3D墙必须开启才能用）
  show3DFurniture: false,
  // 是否使用量房
  enableMeasurement: Util.getUrlParameter('enablemeasurement') === 'true',
  editorHouseUrl: 'http://webresource.123kanfang.com/studiofordeco-test/client.html?noCache=true&mode=measure&showBackBtn=true',
  // 锚点颜色（橘色）
  anchorColor: {r: 242, g: 170, b: 54, a: 1},
  bucket: Util.getUrlParameter('bucket') ? Util.getUrlParameter('bucket') : Util.getBucketByDomain(),
  // 外景热点颜色（橘色）
  outSceneHotSpotColor: {r: 242, g: 170, b: 54, a: 1},
  enableAnchorClick: undefined,
  panoramaDecoLogoOpacity: undefined,
  enableVRMode: true,
  enableXRMode: false,
  // 背景音乐 / background music - REMOVED for offline copy
  musicDir: '',
  autoplayMusic: false,
  // 配置双击操作的效果，放大或震动（画面前后快速缩放一次）。0或者默认是放大，1是震动。
  doubleClickEffect: 1,

  useHotSpotsInPopOvers: false,

  /* 点位相关设置 */
  // 显示热点转向指示器
  useRoamArrow: 0,
  // 隐藏漫游点
  hiddenHotSpots: Util.getUrlParameter('hiddenHotSpots') === '1',
  // 统一装修后的热点按同一套数据和规则显示，如果设为true，calcVisibleHotSpots=true会失效
  hotSpotsDisplayInDeco: true,
  // 计算可见点
  calcVisibleHotSpots: true,
  // 计算可见点时，没有墙阻隔时最远的可见距离，100=1米
  maxVisibleDistance: 800,
  // 不写或0为以前展示在空中的箭头，1为展示在地面上
  hotSpotPosition: Util.getUrlParameter('hotSpotPosition') ? Util.getUrlParameter('hotSpotPosition') : 1,
  // 允许穿墙
  // allowRoamThroughWall: true,
  // 光柱底盘 - 标准端默认开启
  beamBaseEnabled: true,
  // 3d光柱动画 - 标准端默认开启
  animateStereoHotSpot: true,
  // 3d当前光柱底部走路小人 - 标准端默认开启
  walkingAnimation: true,
  showAdditionalHotSpot: true,
  // 是否隐藏全景下的热点名
  hidePanoramaHotSpotName: false,
  // 配置同方向点位数量的限制
  hotSpotShowInSameDirect: {
    number: 3, // 最大可显示数量
    angle: 10 // 左右各多少度内视为同方向
  },
  cacheVisibleHotSpotTexture: true,
  // 配置空间切换的移动方式，默认false，即淡入淡出；当配置为true时，空间切换功能的移动方式会变为平移
  roomChangeIsCameraWalk: false,
  // 多经纪人开关
  useMultipleUserImg: 0,
  floorChangeIsCameraWalk: false,
  // 配置加载界面中的预览图片是否有动画效果
  isLoadingImageScale: true,
  translateNames: true,
}

if (appConfig.pageTitleImageUrl) {
  var currentIcon = appConfig.pageTitleImageUrl
  var link = document.querySelector('link[rel*="icon"]')
  link.href = currentIcon
}

let parameter = ''
if (!Util.getUrlParameter('lang')) {
  parameter = 'hk'
} else {
  if (Util.getUrlParameter('lang') === 'en' || Util.getUrlParameter('lang') === 'en-US') {
    parameter = 'en'
  }
  if (Util.getUrlParameter('lang') === 'cn' || Util.getUrlParameter('lang') === 'zh-CN') {
    parameter = 'sc'
  }
  if (Util.getUrlParameter('lang') === 'hk' || Util.getUrlParameter('lang') === 'zh-HK') {
    parameter = 'hk'
  }
}

let ishideproperty = Util.getUrlParameter('ishideproperty')

// 测试： https://hk.centanet.com/coredev/CentanetAPITest/api/vr123/customer/HouseInfoPostDetail
// 测试2：https://hk-api-dev.centanet.com/centanetapi/api/vr123/customer/HouseInfoPostDetail
// 线上： https://hk.centanet.com/centanetAPI/api/vr123/customer/HouseInfoPostDetail

var RESTFulConfig = {
  // 获取房源详情需要访问的API接口，客户提供
  houseInfo: ishideproperty && ishideproperty == 1 ? {} : {
    url: 'https://hk.centanet.com/centanetAPI/api/vr123/customer/HouseInfoPostDetail', // api地址
    method: 'get',
    headers: {
      // 'content-type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      houseId: Util.getUrlParameter('hid'), // 看房房源id
      vrPackageId: Util.getUrlParameter('hid'), // 123客户房源id
      cityId: Util.getUrlParameter('cityId'), // 城市id
      bid: Util.getUrlParameter('bid'), // 经纪人 id
      lang: parameter, // 语言类型
      staff: Util.getUrlParameter('staff') && Util.getUrlParameter('staff') == 1 ? Util.getUrlParameter('staff') : 0,
      type: Util.getUrlParameter('type') // 房源类型
    }
  },
  brokerInfo: {
    url: 'https://im-test.123kanfang.com/test/getdetailinfo', // api地址
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: Util.getUrlParameter('im') // 经纪人id
    }
  },
  customerInfo: {
    url: 'https://im-test.123kanfang.com/test/getcustomerinfo', // api地址
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: Util.getUrlParameter('im') // 用户id
    }
  }
}

/**
 * 用户自定义和native交互的配置
 * @type {{vrExit: NativeCallConfig.vrExit, checkRecordPermission: NativeCallConfig.checkRecordPermission}}
 */
var NativeCallConfig = {
/*  vrShare: function () {
    if (window.vrShare) {
      window.vrShare()
    } else if (window.webkit && window.webkit.messageHandlers.vrShare) {
      window.webkit.messageHandlers.vrShare.postMessage(null)
    }
  }, */
/*  vrExit: function () {
    console.log('vrExiting...')

    if (window.onExitVr) {
      window.onExitVr()
    } else if (window.JavaScriptApi && window.JavaScriptApi.onExitVr) {
      console.log('onExitVr android')
      window.JavaScriptApi.onExitVr()
    } else if (window.webkit && window.webkit.messageHandlers.vrviewer) {
      console.log('onExitVr ios')
      window.webkit.messageHandlers.vrviewer.postMessage({action: 'onExitVr'})
    }
  }, */
  vrBack: function () {
  },
  checkRecordPermission: function (callback) {
    if (callback) {
      window['recordPermissionStatusChanged'] = function (status) {
        try {
          callback(status == 1) // 0无权限；1有权限
        } catch (e) {
          console.log('checkRecordPermission callback error:', e.stack)
        }
      }
    }

    if (window.requestRecordPermissionStatus) {
      window.requestRecordPermissionStatus()
    } else if (window.webkit && window.webkit.messageHandlers.requestRecordPermissionStatus) {
      window.webkit.messageHandlers.requestRecordPermissionStatus.postMessage(null)
    } else {
      console.log('this.checkBrowserMedia')
      this.checkBrowserMedia(callback)
    }
  },
  checkBrowserMedia: function (callback) {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    console.log('navigator.getUserMedia', navigator.getUserMedia)
    if (navigator.getUserMedia) {
      callback && callback(true)
    } else {
      const sUserAgent = navigator.userAgent.toLowerCase()
      const bIsIphoneOs = sUserAgent.match(/iphone/i) == 'iphone'
      console.log('bIsIphoneOs', bIsIphoneOs)
      if (bIsIphoneOs) {
        callback && callback(true)
      } else {
        callback && callback(false)
      }
    }
  },
  weiChat: function (brokerInfo) {

  },
  checkBeforeTour: function () {
    alert('开始带看前检查！')
  },
  // 用于自定义获取hid的函数
  getHid: function (callback) {
    const hid = Util.getUrlParameter('pid') || Util.getUrlParameter('hid') || 'RCC-ntft06_8649418ab2c5443680bac492eff4b863';
    callback && callback(hid);
  }
}

var ComponentConfig = {
  menuIcons: {
    'icoPlayer': {
      enabled: true,
      active: false
    },
    'icoRuler': {
      enabled: true,
      active: false
    },
    'icoVr': {
      enabled: true
    }
  },
  // 顶部栏
  navTop: {
    // 退出按钮
    'exit': {
      enabled: true,
      onclick: function () {
        NativeCallConfig.vrExit()
      }
    },
    // 返回按钮
    'back': {
      enabled: true,
      onclick: function () {
        NativeCallConfig.vrBack()
      }
    },
    // 分享按钮
    'share': {
      enabled: true,
      onclick: function () {
        NativeCallConfig.vrShare()
      }
    }
  },
  // 右侧按钮开关
  buttonsSwitch: {
    enabled: Util.getUrlParameter('buttonsSwitch') !== '0'
  },
  // 右侧栏按钮
  buttons: {
    'bookButton': {
      id: 'bookButton',
      name: '宣传册',
      style: Util.checkIsPhone() ? 'width:20px' : 'width:4vh',
      imageClass: 'img-bookButton',
      enabled: false,
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    'rulerButton': {
      id: 'rulerButton',
      name: '标 尺',
      style: Util.checkIsPhone() ? 'width:20px' : 'width:4vh',
      imageClass: 'img-rulerButton',
      state: ['rulerOn', 'rulerButton'], // 所有按钮状态，点击后会切换到下一个state。对应文件夹中的文件名
      activeState: 'rulerButton', // 初始按钮状态.
      enabled: Util.getUrlParameter('mode') !== 'editor',
      active: Util.getUrlParameter('review') === '1',
      onclick: function () {
      },
      group: 'normal'
    },

    // 添加单位转换按钮
    'icoFeet': {
      id: 'icoFeet',
      name: '转英尺',
      style: Util.checkIsPhone() ? 'width:25px' : 'width:38.4px',
      imageClass: 'img-metre',
      state: ['metre', 'feet'],
      activeState: 'metre',
      enabled: Util.getUrlParameter('mode') !== 'editor',
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    // 放大视图
    'enlargeButton': {
      id: 'enlargeButton',
      name: '放大',
      style: Util.checkIsPhone() ? 'width:22px;margin-top: 50px;' : 'width:4.4vh;',
      imageClass: 'img-enlargeButton',
      enabled: false,
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    // 缩小视图
    'narrowButton': {
      id: 'narrowButton',
      name: '缩小',
      style: Util.checkIsPhone() ? 'width:22px;margin-top: 50px;' : 'width:4.4vh;',
      imageClass: 'img-narrowButton',
      enabled: false,
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    'playButton': {
      id: 'playButton',
      name: '漫游',
      style: Util.checkIsPhone() ? 'width:25px' : 'width:38.4px',
      imageClass: 'img-playButton',
      state: ['playOn', 'playButton'],
      activeState: 'playButton',
      enabled: Util.getUrlParameter('mode') !== 'editor',
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    'vrButton': {
      id: 'vrButton',
      name: 'VR模式',
      style: Util.checkIsPhone() ? 'width:30.6px' : 'width:41.93px',
      imageClass: 'img-vrButton',
      state: !Util.checkIsPhone() ? ['vrButton', 'vrOn'] : ['vrButton'],
      activeState: 'vrButton',
      enabled: Util.getUrlParameter('mode') !== 'editor' && appConfig.enableVRMode,
      active: false,
      onclick: function () {
      },
      onHover: function (hover) { // 为兼容浏览器在按钮的hover函数中需要放一个空参数

      },
      group: 'normal'
    },
    'anchorSearch': {
      id: 'anchorSearch',
      name: '搜索',
      style: Util.checkIsPhone() ? 'width:20px' : 'width:4vh',
      imageClass: 'img-search',
      enabled: Util.getUrlParameter('mode') !== 'editor',
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    'langButton': {
      id: 'langButton',
      name: '语 言',
      style: Util.checkIsPhone() ? 'width:30.6px' : 'width:41.93px',
      imageClass: 'img-langButton',
      state: ['langButton', 'langOn'],
      activeState: 'langButton',
      enabled: Util.getUrlParameter('mode') !== 'editor',
      active: false,
      onclick: function () {
      },
      langs: ['zh-CN', 'en-US'], // zh-CN, zH-TW, en-US
      group: 'normal'
    },
    'commentButton': {
      id: 'commentButton',
      name: '留 言',
      style: Util.checkIsPhone() ? 'width:30.6px' : 'width:41.93px',
      imageClass: 'img-commentButton',
      enabled: false,
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    'likeButton': {
      id: 'likeButton',
      name: '点 赞',
      style: Util.checkIsPhone() ? 'width:30.6px' : 'width:41.93px',
      imageClass: 'img-likeButton',
      state: ['likeButton', 'likeOn'],
      activeState: 'likeButton',
      enabled: false,
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    'rightsButton': {
      id: 'rightsButton',
      name: '权 益',
      style: Util.checkIsPhone() ? 'width:20px' : 'width:4vh',
      imageClass: 'img-rightsButton',
      enabled: Util.getUrlParameter('mode') !== 'editor',
      state: ['rightsButton', 'rightsOn'],
      activeState: 'rightsButton',
      active: false,
      onclick: function () {
        // console.log('rightsButton clicked')
      },
      group: 'normal'
    },
    'addAnchorButton': {
      id: 'addAnchorButton',
      style: Util.checkIsPhone() ? 'width:20px' : 'width:4vh',
      imageClass: 'img-addAnchor',
      state: ['anchorOn', 'addAnchor'],
      activeState: 'addAnchor',
      enabled: Util.getUrlParameter('mode') === 'editor' && !Util.checkIsPhone(),
      active: false,
      onclick: function () {
      },
      group: 'editor'
    },
    'mosaicButton': {
      id: 'mosaicButton',
      imageClass: 'img-addMosaic',
      enabled: Util.getUrlParameter('mode') === 'editor',
      active: true,
      group: 'editor'
    },
    'screenShot': {
      id: 'screenShot',
      imageClass: 'img-screenShot',
      enabled: Util.getUrlParameter('mode') === 'editor' && !Util.checkIsPhone(),
      active: true,
      group: 'editor'
    },
    // 下载户型图
    'downloadButton': {
      id: 'downloadButton',
      name: '下载',
      style: Util.checkIsPhone() ? 'width:22px;' : 'width:4.4vh;',
      imageClass: 'img-downloadButton',
      enabled: Util.getUrlParameter('exportStyle') && Util.getUrlParameter('mode') === 'editor',
      active: false,
      onclick: function () {
      },
      group: 'normal'
    },
    'uploadButton': {
      id: 'uploadButton',
      style: Util.checkIsPhone() ? 'width:20px' : 'width:4vh',
      imageClass: 'img-upload',
      enabled: false,
      active: true,
      group: 'editor'
    },
    'setBestView': {
      id: 'setBestView',
      imageClass: 'img-setBestView',
      state: ['setBestViewOn', 'setBestView'],
      activeState: 'setBestView',
      enabled: Util.getUrlParameter('mode') === 'editor',
      active: false,
      group: 'editor'
    },
    'explorationButton': {
      id: 'explorationButton',
      imageClass: 'img-setExploration',
      enabled: false,
      active: true,
      group: 'editor'
    },
    'setBestPoint': {
      id: 'setBestPoint',
      imageClass: 'img-setBestPoint',
      enabled: Util.getUrlParameter('mode') === 'editor',
      active: true,
      group: 'editor'
    },
    'setVideoButton': {
      id: 'setVideoButton',
      imageClass: 'img-videoButton',
      state: ['setVideoButton', 'setVideoButton'],
      activeState: 'setVideoButton',
      enabled: Util.getUrlParameter('mode') === 'editor',
      active: false,
      group: 'editor'
    },
    'recordButton': {
      id: 'recordButton',
      style: {
        top: '180px'
      },
      imageClass: 'img-record',
      state: ['record', 'stop'],
      activeState: 'record',
      enabled: false,
      active: true,
      onclick: function (id, state) {
        console.log('record button clicked! current {id} {state}: ', id, state)
      },
      group: 'record'
    },
    'replayButton': {
      id: 'replayButton',
      style: {
        top: '220px'
      },
      imageClass: 'img-play',
      state: ['play', 'pause'],
      activeState: 'play',
      enabled: false,
      active: true,
      onclick: function (id, state) {
        console.log('play button clicked! {id} {state}: ', id, state)
      },
      group: 'record'
    },
    'measureWallButton': {
      id: 'measureWallButton',
      style: {
        top: '260px'
      },
      imageClass: 'img-measureWall',
      enabled: false,
      active: true,
      group: 'measure'
    },
    'measureLineButton': {
      id: 'measureLineButton',
      style: {
        top: '300px'
      },
      imageClass: 'img-measureLine',
      enabled: false,
      active: true,
      group: 'measure'
    },
    'measureGridButton': {
      id: 'measureGridButton',
      style: {
        top: '340px'
      },
      imageClass: 'img-measureGrid',
      enabled: false,
      active: true,
      group: 'measure'
    },
    'addCubeButton': {
      id: 'addCubeButton',
      style: {
        top: '380px'
      },
      imageClass: 'img-addCube',
      enabled: false,
      active: true,
      group: 'measure'
    },
    'measureDeleteButton': {
      id: 'measureDeleteButton',
      style: {
        top: '420px'
      },
      imageClass: 'img-measureDelete',
      enabled: false,
      active: true,
      group: 'measure'
    }
  },

  birdsEyeViewPanel: {
    // 3d模型的位置
    position: {
      left: 60
    },
    // 需要开启的2D户型图、3D模型
    modes: Util.getUrlParameter('close2DMode') !== '1' ? ['2D', '3D'] : ['3D'],
    // 默认选中3D模型
    active: '3D',
    // 整个panel的大小
    contentSize: {
      width: 160,
      height: 208
    },
    enabled: Util.getUrlParameter('closeBirdsEyeView') !== '1'
  },
  // 模型全屏中底部按钮
  defaultSceneSwitch: {
    // 位置信息
    position: {
      bottom: 20,
      width: 162
    },
    // 需要开启的2D户型图、3D模型
    buttons: Util.getUrlParameter('close2DMode') !== '1' ? ['2D', '3D'] : ['3D'],
    // 默认选中2D户型图还是3D模型
    active: Util.getUrlParameter('close2DMode') !== '1' ? '2D' : '3D',
    hidden: true
  },
  defaultFloorSwitch: {
    position: {
      left: Util.checkIsPhone() ? 15 : 60,
      bottom: Util.checkIsPhone() ? 100 : 180
    },
    showCount: 3,
    showAllBtn: true,
    enableAllBtn: true,
    hidden: true
  },
  imageClass: 'img-share',
  compareButtons: {
    'shareButton': {
      id: 'shareButton',
      style: Util.checkIsPhone() ? 'width:17px;left:14px;top:6.6vh' : 'display:none',
      imageClass: 'img-share',
      enabled: true,
      active: false,
      group: 'normal'
    },
    'rulerButton': {
      id: 'rulerButton',
      style: Util.checkIsPhone() ? 'width:17px;left:14px;top:6.6vh' : 'display:none',
      imageClass: 'img-rulerButton',
      state: ['rulerOn', 'rulerButton'],
      enabled: true,
      active: true,
      group: 'normal'
    },
    'exitButton': {
      id: 'exitButton',
      style: Util.checkIsPhone() ? 'width:17px;left:14px;top:6.6vh' : 'display:none',
      imageClass: 'img-exit',
      enabled: false,
      active: true,
      onclick: function () {
      },
      group: 'normal'
    },
    'afterDecoration': {
      id: 'afterDecoration',
      style: Util.checkIsPhone() ? 'width:17px;left:14px;top:6.6vh' : 'display:none',
      imageClass: 'img-afterDecoration',
      enabled: true,
      active: false,
      group: 'decoration'
    },
    // 全屏按钮应该放到deco模式中的buttons里
    'fullScreenButton': {
      id: 'fullScreenButton',
      style: 'top: 52vh;width: 26px;height: 26px,',
      imageClass: 'img-fullScreen',
      enabled: true,
      active: false,
      group: 'decoration'
    }
  },
  fullDecoButtons: {
    'exitFullDecoButton': {
      id: 'exitFullDecoButton',
      style: 'top: 1vh; left: 10px; width: 26px; background: rgba(0, 0, 0, 0),',
      imageClass: 'img-exit',
      enabled: true,
      active: false,
      group: 'normal'
    },
    'shareButton': {
      id: 'shareButton',
      style: 'top: 1vh, width: 23px, background: rgba(0, 0, 0, 0)',
      imageClass: 'img-share',
      enabled: true,
      active: false,
      group: 'normal'
    },
    'rulerButton': {
      id: 'rulerButton',
      style: 'top: 65px; width: 24px; height: 24px; background: rgba(0, 0, 0, 0)',
      imageClass: 'img-rulerButton',
      state: ['rulerOn', 'rulerButton'],
      enabled: true,
      active: true,
      group: 'normal'
    }
  },
  singleModeButtons: {
    'shareButton': {
      id: 'shareButton',
      style: 'top:4.5vh; width: 3.0vh; right: 5vw !important;background: rgba(0, 0, 0, 0)',
      imageClass: 'img-shareButton',
      enabled: true,
      active: false,
      group: 'normal'
    },
    'exitButton': {
      id: 'exitButton',
      style: 'top:5vh; width:2.5vh; left:14px;',
      imageClass: 'img-exit',
      enabled: true,
      active: true,
      onclick: function () {
      },
      group: 'normal'
    }
  },
  singleModeCompareButtons: {
    'shareButton': {
      id: 'shareButton',
      style: 'top:4.5vh; width: 3.0vh; right:5vw !important',
      imageClass: 'img-shareButton',
      enabled: true,
      active: false,
      group: 'normal'
    },
    'exitButton': {
      id: 'exitButton',
      style: 'top:5vh; width:2.5vh; left:14px;',
      imageClass: 'img-exit',
      enabled: true,
      active: true,
      onclick: function () {
      },
      group: 'normal'
    },
    'afterDecoration': {
      id: 'afterDecoration',
      style: 'top: 54vh; width: 63px; height: 25px; left: -10px; background: rgba(0, 0, 0, 0)',
      imageClass: 'img-afterDecoration',
      enabled: true,
      active: false,
      group: 'decoration'
    },
    'fullScreenButton': {
      id: 'fullScreenButton',
      style: 'top: 54vh; width: 4.0vh; right: 7vw !important; background: rgba(0, 0, 0, 0)',
      imageClass: 'img-fullScreen',
      enabled: true,
      active: false,
      group: 'decoration'
    }
  },
  singleModeFullDecoButtons: {
    'shareButton': {
      id: 'shareButton',
      style: 'top:4.5vh; width: 3.0vh; right: 5vw !important;background: rgba(0, 0, 0, 0)',
      imageClass: 'img-shareButton',
      enabled: true,
      active: false,
      group: 'normal'
    },
    'exitButton': {
      id: 'exitButton',
      style: 'top:5vh; width:2.5vh; left:14px;',
      imageClass: 'img-exit',
      enabled: true,
      active: true,
      group: 'normal'
    },
    'afterDecoration': {
      id: 'afterDecoration',
      style: 'top: 12vh; width: 63px; height: 25px; left: -10px; background: rgba(0, 0, 0, 0)',
      imageClass: 'img-afterDecoration',
      enabled: true,
      active: false,
      group: 'decoration'
    },
    'exitFullScreenButton': {
      id: 'exitFullScreenButton',
      style: 'top: 10vh !important; width: 24px; height: 24px; right: 6vw !important ',
      imageClass: 'img-exitFullScreen',
      enabled: true,
      active: false,
      group: 'decoration'
    }
  },
  panoDIYModeCompareButtons: {
    shareButton: {
      id: 'shareButton',
      style: 'height: 3.0vh; width: 3.0vh; top:4vh; right: 20px; min-height: 21px; min-width: 21px;',
      imgUrl: 'static/textures/normal/share.png',
      group: 'normal'
    },
    exitButton: {
      id: 'exitButton',
      style: 'height: 2.5h; width: 2.5vh; top:4vh; left: 20px; min-height: 17.5px; min-width: 17.5px;',
      imgUrl: 'static/textures/normal/exit.png',
      group: 'normal'
    },
    afterDecoration: {
      id: 'afterDecoration',
      style: 'height: 3.0vh; width: 8.0vh; top:52vh; left: 20px; min-height: 21px; min-width: 56px;',
      imgUrl: 'static/textures/decoration/afterDecoration.png',
      group: 'decoration'
    },
    fullScreenButton: {
      id: 'fullScreenButton',
      style: 'height: 4.0vh; width: 4.0vh; top:52vh; right: 20px; min-height: 28px; min-width: 28px;',
      imgUrl: 'static/textures/decoration/fullScreen.png',
      group: 'decoration'
    }
  },
  panoDIYModeFullDecoButtons: {
    shareButton: {
      id: 'shareButton',
      style: 'height: 3.0vh; width: 3.0vh; top:4vh; right: 20px; min-height: 21px; min-width: 21px;',
      imgUrl: 'static/textures/normal/share.png',
      group: 'normal'
    },
    exitButton: {
      id: 'exitButton',
      style: 'height: 2.5h; width: 2.5vh; top:4vh; left: 20px; min-height: 17.5px; min-width: 17.5px;',
      imgUrl: 'static/textures/normal/exit.png',
      group: 'normal'
    }
  },
  // 全局state,用来同步不同模式下同一按钮的状态
  'rulerButton': {
    state: ['rulerOn', 'rulerButton']
  },
  // 是否显示缩略图，默认不显示
  thumbnailGroup: {
    enabled: false
  },
  // 是否显示底部工具栏，默认显示
  bottomToolBar: {
    enabled: true
  },
  decoModeToolbarButtons: {
    buttons: ['roomChange'], // 可选'roomChange' '2d-diy' '3d-diy'
    hasDecoDispatch: false
  },
  globalLoading: {
    hideBottomLogo: false, // 加载页面底部logo开关
    hideProgress: false // 加载页面进度显示开关
  }
}

var VRCallback = {
  onVRLoadCallback: function () {
    // todo 用户自定义
  }
}

var anchorCallback = {
  anchorClicked: function (info) {
    alert(info)
  }
}
