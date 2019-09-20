//http://qxiao.natapp1.cc/qxiao-mp/
//http://ax.qxiao.net/qxiao-mp/
//http://zc.qxiao.net/qxiao-mp/
//http://zc.qiaox.net/qxiao-mp/
const is_dev = process.env.NODE_ENV !== "production";
export const API_ROOT = is_dev ? "http://yolo1993.natapp1.cc/" : "http://qxiao.natapp1.cc/qxiao-mp/";
