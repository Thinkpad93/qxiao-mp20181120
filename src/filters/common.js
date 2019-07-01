//去掉换行符
export function brReplace(value) {
  if (!value) return "";
  return value.replace(/<br\/>/g, "");
}
