/******************* 时间日期（24小时制） ********************/
//设置本地时间日期
//参数: yy MM dd hh mm ss ww
//校验(57) XX = 0x23^0+0x09^1+0x01^2+0x02^3+0x19^4+0x09^5+0x19^6+0x18^7+0x20^8+0x00^9+0x04^10;
//57的16进制为39
//base64转码后为: IwkBAhkJBQotJAM5 
//设置示例时间 15时30分 IwkBAhkJBQ8eJAMt 
//[0x23, 0x09, 0x01, 0x02, 0x19, 0x09, 0x05, 0xf, 0x1e, 0x24, 0x03, 0x39]
export const setLocalTime = [0x23, 0x09, 0x01, 0x02, 0x19, 0x09, 0x19, 0x18, 0x20, 0x00, 0x04, 0x15];


//获取本地时间日期
//无参数
//校验(37) XX = 0x23^0+0x02^1+0x02^2+0x02^3;
//37的16进制为25
//base64转码后为: IwICAiU=
export const getLocalTime = [0x23, 0x02, 0x02, 0x02, 0x25];
/******************* 时间日期（24小时制） ********************/


/******************* 电量信息 ********************/
//获取设备剩余电量
//无参数
//校验(36) XX = 0x23^0+0x02^1+0x02^2+0x03^3;
//36的16进制为24
//base64转码后为: IwICAyQ=
export const getDeviceSoc = [0x23, 0x02, 0x02, 0x03, 0x24];
/******************* 电量信息 ********************/


/******************* Q星值 ********************/
//获取Q星值
//无参数
//校验(39) XX = 0x23^0+0x02^1+0x02^2+0x04^3;
//39的16进制为27
//base64转码后为: IwICBCc=
export const getStartValue = [0x23, 0x02, 0x02, 0x04, 0x27];

//设置Q星值
//校验(49) XX = 0x23^0+0x04^1+0x01^2+0x04^3+0x00^4+0x10^5;
//49的16进制为31
//[0x23,0x04,0x01,0x04,0x00,0x10,0x31]
//base64转码后为: IwQBBAAQMQ==
//示例
export const setStartVlue = [0x23, 0x04, 0x01, 0x04, 0x00, 0x50, 0x31]; //设置Q星值为16
/******************* Q星值 ********************/


/******************* 计步 ********************/
//获取当前步数
//无参数
//校验(38) XX = 0x23^0+0x02^1+0x02^2+0x05^3;
//38的16进制为26
//base64转码后为: IwICBSY=
export const getCurrentNumberOfSteps = [0x23, 0x02, 0x02, 0x05, 0x26];
/******************* 计步 ********************/



/******************* 运动目标 ********************/
//设置运动目标
//参数: aa aa
//校验(63) XX = 0x23^0+0x04^1+0x01^2+0x06^3+0x00^4+0x10^5;
//63的16进制为3f
//base64转码后为: IwQBBgAQPw==
export const setMovingGoals = [0x23, 0x04, 0x01, 0x06, 0x00, 0x10, 0x3f];

//获取当前步数目标
//无参数
//校验(41) XX = 0x23^0+0x02^1+0x02^2+0x06^3;
//41的16进制为29
//base64转码后为: IwICBik=
export const getMovingGoals = [0x23, 0x02, 0x02, 0x06, 0x29];
/******************* 运动目标 ********************/





/******************* 闹钟 ********************/
//设置闹钟
//参数: id hh mm aa bb
//校验(38) XX = 0x23^0+0x07^1+0x01^2+0x07^3+0x02^4+0x16^5+0x42^6+0x3e^7+0x01^8;
//38的16进制为26
//base64转码后为: IwcBBwEIAQEBJg==
export const setAlarmClock = [0x23, 0x07, 0x01, 0x07, 0x02, 0x16, 0x42, 0x3e, 0x01, 0x33];

//获取闹钟
//参数: id
//校验(42) XX = 0x23^0+0x03^1+0x02^2+0x07^3+0x01^4;
//42的16进制为2a
//base64转码后为: IwMCBwEq
export const getAlarmClock = [0x23, 0x03, 0x02, 0x07, 0x01, 0x2a];

/******************* 闹钟 ********************/



//获取活跃度分包目录数
//参数: 01 aa aa
//校验(216) XX = 0x23^0+0x05^1+0x02^2+0xf1^3+0x01^4+0x00^5+0x03^6;
//216的16进制为d8
//base64转码后为: IwUC8QEAA9g=
export const getAcquisitionActivity = [0x23, 0x05, 0x02, 0xf1, 0x01, 0x00, 0x03, 0xd8];

//获取目录内容
//参数: 02 aa aa bb bb
//校验(212) XX = 0x23^0+0x07^1+0x02^2+0xF1^3+0x02^4+0x00^5+0x03^6+0x00^7+0x00^8
//212的16进制为d4
//base64转码后为: 1.IwcC8QIAAwAA1A== 2.IwcC8QIAAwAB2w== 3.IwcC8QIAAwAC2g== 4.IwcC8QIAAwAD2Q== 5.IwcC8QIAAwAE2A==
export const getDirectoryContent = [0x23, 0x07, 0x02, 0xF1, 0x02, 0x00, 0x03, 0x00, 0x00, 0xd4];


//请求数据包
//参数: 03 aa aa bb bb bb bb cc cc
//校验(153) XX = 0x23^0+0x0b^1+0x02^2+0xF1^3+0x03^4+0x00^5+0x03^6+0x5c^7+0x2a^8+0xae^9+0xb7^10+0x00^11+0x00^12;
//153的16进制为99
//base64转码后为: IwsC8QMAA1wqrrcAAPo=
export const requestPacket = [0x23, 0x0b, 0x02, 0xF1, 0x03, 0x00, 0x03, 0x5c, 0x2a, 0xae, 0xb7, 0x00, 0x00, 0xfa]


//获取最近睡眠记录条目
//参数: 01
//校验(209) XX = 0x23^0+0x03^1+0x02^2+0xf0^3+0x01^4;
//209的16进制为d1
//base64转码后为: IwMC8AHR
export const getMostRecentSleepEntry = [0x23, 0x03, 0x02, 0xF0, 0x01, 0xd1];


//获取目录的睡眠信息记录
//参数: 02 aa
//校验(210) XX = 0x23^0+0x04^1+0x02^2+0xf0^3+0x02^4+0x00^5; [0x23, 0x04, 0x02, 0xF0, 0x02, 0x00, 0xd2]
// 0x23^0+0x04^1+0x02^2+0xf0^3+0x02^4+0x01^5; [0x23, 0x04, 0x02, 0xF0, 0x02, 0x01, 0xd3]
// 0x23^0+0x04^1+0x02^2+0xf0^3+0x02^4+0x02^5; [0x23, 0x04, 0x02, 0xF0, 0x02, 0x02, 0xd0]
// 0x23^0+0x04^1+0x02^2+0xf0^3+0x02^4+0x03^5; [0x23, 0x04, 0x02, 0xF0, 0x02, 0x03, 0xd1]
// 0x23^0+0x04^1+0x02^2+0xf0^3+0x02^4+0x04^5; [0x23, 0x04, 0x02, 0xF0, 0x02, 0x04, 0xde]

//210的16进制为d2
//base64转码后为: IwQC8AIA0g== IwQC8AIB0w== IwQC8AIC0A== IwQC8AID0Q== IwQC8AIE3g==
export const getASleepLogForTheDirectory = [0x23, 0x04, 0x02, 0xF0, 0x02, 0x00, 0xd2];
