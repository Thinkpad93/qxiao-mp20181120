export default {
    data() {
        return {
            roleType: this.$store.state.user.info.roleType,
            className: this.$store.state.user.info.className,
            classId: this.$store.state.user.info.classId,
        }
    }
}