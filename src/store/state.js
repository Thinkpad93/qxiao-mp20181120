export default {
  id: state => state.users.id,
  roleType: state => state.users.roleType,
  type: state => state.users.type,
  isOpen: state => state.users.isOpen,
  openId: state => state.wx.openId,
  photo: state => state.wx.photo,
}
