const is_dev = process.env.NODE_ENV !== "production";
export const API_ROOT = is_dev ? "http://yolo1993.natapp1.cc/" : "http://ax.qxiao.net/";
