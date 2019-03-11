export default {
  id: state => state.users.id,
  roleType: state => state.users.roleType,
  type: state => state.users.type,
  isOpen: state => state.users.isOpen,
  openId: state => state.wx.openId,
  photo: state => state.wx.photo,
  classList: state => state.queryClass.classList,
  className: state => state.queryClass.className,
  classId: state => state.queryClass.classId,
}
