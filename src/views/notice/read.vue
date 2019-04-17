<template>
  <div class="page">
    <div class="page-bd">
      <div class="tab-warp">
        <div class="tab">
          <div class="tab-head">
            <a
              href="javascript:void(0);"
              :class="[ query.readFlag == 0 ? 'curr': '' ]"
              @click="handleTabClick(0)"
            >已读({{ readCount }})</a>
            <a
              href="javascript:void(0);"
              :class="[ query.readFlag == 1 ? 'curr': '' ]"
              @click="handleTabClick(1)"
            >未读({{ unReadCount }})</a>
          </div>
          <div class="tab-content">
            <div class="item" :class="[ query.readFlag == 0 ? 'currs': '' ]">
              <div class="cell" v-for="(read, index) in readList" :key="index">
                <div class="cell-hd">
                  <img :src="read.photo" :alt="read.studentName">
                </div>
                <div class="cell-bd">
                  <p class>{{ read.studentName }}</p>
                </div>
                <div class="cell-ft">
                  <template v-if="needConfirm">
                    <span v-if="read.confirmFlag === 0" style="color:#ff87b7">未确认通知</span>
                    <span v-else style="color:#92cd36">已确认通知</span>
                  </template>
                </div>
              </div>
            </div>
            <div class="item" :class="[ query.readFlag == 1 ? 'currs': '' ]">
              <div class="cell" v-for="(unread, index) in unreadList" :key="index">
                <div class="cell-hd">
                  <img v-if="unread.photo" :src="unread.photo" :alt="unread.studentName">
                  <div class="icon-d" v-else></div>
                </div>
                <div class="cell-bd">
                  <p class>{{ unread.studentName }}</p>
                </div>
                <div class="cell-ft">
                  <template v-if="needConfirm">
                    <span v-if="unread.confirmFlag === 0" style="color:#ff87b7">未确认通知</span>
                    <span v-else style="color:#92cd36">已确认通知</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "noticeRead",
  data() {
    return {
      needConfirm: parseInt(this.$route.query.needConfirm), //0 不用确认
      query: {
        openId: this.$store.state.wx.openId || this.$route.query.openId, //用户openid
        noticeId: this.$route.query.noticeId,
        classId: this.$route.query.classId,
        readFlag: 0 //0-已读 1-未读
      },
      readList: [],
      unreadList: []
    };
  },
  computed: {
    readCount() {
      return this.readList.length;
    },
    unReadCount() {
      return this.unreadList.length;
    }
  },
  methods: {
    handleTabClick(index) {
      this.query.readFlag = index;
      this.noticeReaders(index);
    },
    //公告阅读人员查询
    async noticeReaders(readFlag) {
      let obj = Object.assign({}, this.query, { readFlag });
      let res = await service.noticeReaders(obj);
      if (res.errorCode === 0) {
        if (readFlag) {
          this.unreadList = res.data.readers || []; //后端有可能返回null
        } else {
          this.readList = res.data.readers || []; //后端有可能返回null
        }
      }
    }
  },
  mounted() {
    this.noticeReaders(0);
    this.noticeReaders(1);
  }
};
</script>
<style lang="less" scoped>
</style>
