export default {
  classList: state => state.queryClass.classList,
  className: state => state.queryClass.className,
  classId: state => state.queryClass.classId,
  id: state => state.users.id,
  tel: state => state.users.tel,
  roleType: state => state.users.roleType,
  type: state => state.users.type,
  isOpen: state => state.users.isOpen,
  openId: state => state.wx.openId,
  photo: state => state.wx.photo,
}
