function getHideFloorPlanNames () {
  // 部分Android机型的自带浏览器不支持“？”语法，需分开写
  const lang = Util.getUrlParameter('lang')
  if (lang) return lang.toLowerCase().indexOf('en') > -1
  return false
}
var AIIntroducingConfig = {
  autoWalkInSequence: true, // 是否按漫游点顺序漫游,
  AutoWalkFrozenTime: 1000,
  allowRoamThroughWall: true, // 允许穿墙
  // AutoWalkWalkSpeed:1000,        // 毫秒每米。
  // AutoWalkRotateSpeed:3000,      // 每3.14弧度需要多少毫秒。
  // AutoWalkFrozenTime:2000,       // 到达一个房间后呆住的时间。
  hotspotSwitchMinimumTime: 1000, // 点位切换最短持续时间
  hotspotSwitchMaximumTime: 2000, // 点位切换最长持续时间
  bestCameraVDuringRoaming: false, // 漫游时是否转动查看最佳视角
  useAIIntroduce: 0, // AI narration - REMOVED for offline copy

  mapRoute: { // AI讲房地图路线样式配置
    color: '#3777FF', // 路线颜色
    borderColor: '#FFF', // 路线边缘颜色
    width: 5, // 路线宽度
    isSolid: false // 是否为实线
  },
  roamPerspective: 90, // 漫游的视角-默认为90°
  roamViewingHeight: 0, // 漫游视角高度，默认为0°（水平方向）
  isOperable: true, // 用户是否可操作
  noActionTime: 3000, // 用户无操作的时间限制，默认为3  s
  lastRotate: 1, // 最低旋转次数可配置-默认为1即最少旋转一次，0的时候则不强制
  roamVersion: 2, // 1为旧版，2为新版
  browsingSpeed: 0.005, // 浏览房间时的旋转速度,值为弧度值
  maxRoamNumber: 4, // 漫游切换模式下过渡漫游点位最大个数
  overMaxRoamMode: 'flyIn', // 超过最大漫游点数后的漫游切换模式（direct为直接切换，flyIn为使用3D图切换）
  MultiFloorSwitchMode: 'flyIn', // 多楼层之间切换模式（direct为直接切换，flyIn为使用3D图切换）
  flyInAfterInterval: 0, // 进入全景后到开始讲房之间的时间
  minRoamTime: 1000, // 最小漫游速度
  maxRoamTime: 2000, // 最大漫游速度
  // 讲房背景音乐 / AI narration background music - REMOVED for offline copy
  AIBackMusicUrl: '',
  AIBackMusicVolume: '0',
  roamIntroduce: Util.getUrlParameter('roam') || '1', // 是否使用漫游切换, 1: 漫游切换方式（默认） 2：淡入淡出 3：直接穿墙漫游
  roomTypes: ['Bedroom', 'Master Bedroom', 'Living Room', 'Dining Room', 'Merged Living Room', 'Bathroom', 'Kitchen', 'Balcony', 'Coat Room', 'Study Room', 'Service Room', 'Entrance Garden', 'Entrance', 'Rooftop', 'MaidRoom', 'Space'],
  AITourSequence: [11, 12, 2, 4, 3, 1, 0, 6, 5, 7, 9, 10, 8, 13, 14, 15], // 按照房间类型讲房的顺序，与roomTypes对应
  translateNames: true, // 是否翻译房间名
  hideFloorPlanNames: getHideFloorPlanNames() // 是否显示户型图名称，包含2D, 3D
}
