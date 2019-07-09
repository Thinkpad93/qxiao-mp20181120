<template>
  <div class="page">
    <div class="page-bd">
      <!-- dialog -->
      <van-dialog
        v-model="dialogVisible"
        title="反馈意见"
        show-cancel-button
        @cancel="dialogVisible = false"
        :before-close="handleSubmit"
      >
        <div class="cells" style="padding:15px 0 15px 0;">
          <div class="cell">
            <div class="cell-bd">
              <textarea
                class="textarea"
                placeholder="请填写反馈意见内容..."
                rows="6"
                v-model="form.textContent"
              ></textarea>
            </div>
          </div>
        </div>
      </van-dialog>
      <!-- 新增 -->
      <template v-if="roleType == 3">
        <qxRelease url="/feed/add" />
      </template>
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="100"
        @load="onLoad"
      >
        <div class="feed-mod">
          <div
            class="feed"
            :class="{'feed-curr': item.status}"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="feed-hd flex j-c-s-b">
              <div class="avatar flex a-i-c">
                <img :src="item.photo" width="50" height="50" radius="50" />
                <p class="ml-20">{{ item.studentName }}</p>
              </div>
              <div style="color:#336d92" @click="handleReply(item)" v-if="!item.status">回复</div>
            </div>
            <div class="feed-bd">
              <p>{{ item.feedTextContent }}</p>
              <div class="meta flex j-c-s-b a-i-c">
                <time>发送日期：{{ item.feedDate }}</time>
                <div>接收老师：{{ item.teacherName }}</div>
              </div>
            </div>
            <div class="feed-ft" v-if="item.status">
              <div class="reply">
                <span style="color:#336d92">老师回复:</span>
                <span>{{ item.replyTextContent }}</span>
              </div>
              <div class>
                <time>回复时间：{{ item.replyDate }}</time>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxRelease from "@/components/Release";
import { mapState } from "vuex";
export default {
  name: "feed",
  components: {
    qxRelease
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      finished: true,
      totalPage: 1, //总页数
      query: {
        page: 1,
        pageSize: 50
      },
      form: {
        textContent: "",
        feedId: null,
        teacherId: this.$store.state.user.info.id
      },
      list: []
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType,
      studentId: state => state.info.studentId,
      id: state => state.info.id
    })
  },
  methods: {
    onLoad() {
      if (this.query.page < this.totalPage) {
        //加载数据
        this.query.page += 1;
        service.queryStudentFeedList(this.query).then(res => {
          if (res.errorCode === 0) {
            let list = res.data.data;
            this.totalPage = res.data.totalPage;
            this.query.page = res.data.page;
            // 加载状态结束
            this.loading = false;
            for (let i = 0; i < list.length; i++) {
              this.list.push(list[i]);
            }
          }
        });
      } else {
        // 数据全部加载完成
        console.log("数据全部加载完成");
        this.loading = false;
        this.finished = true;
      }
    },
    handleReply(params) {
      this.dialogVisible = true;
      this.form.feedId = params.feedId;
    },
    async handleSubmit(action, done) {
      if (action === "confirm") {
        let res = await service.teacherBack(this.form);
        if (res.errorCode === 0) {
          this.form.feedId = null; //重置
          done();
        }
      } else {
        done();
      }
    },
    //老师回复意见反馈
    async teacherBack(params = {}) {
      let res = await service.teacherBack(params);
      if (res.errorCode === 0) {
      }
    },
    async getListData() {
      let res;
      if (this.roleType == 2) {
        let obj = Object.assign({}, this.query, { teacherId: this.id });
        //反馈意见列表（老师）
        res = await service.queryTeacherFeedList(obj);
      } else {
        let obj = Object.assign({}, this.query, { studentId: this.studentId });
        //反馈意见列表（家长）
        res = await service.queryStudentFeedList(obj);
      }
      if (res.errorCode === 0) {
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    this.getListData();
  }
};
</script>
<style lang="less" scoped>
.feed {
  margin-bottom: 20px;
  position: relative;
  background-color: #fff;
  &-curr {
    //background-color: rgba(132, 206, 9, 0.1);
  }
  &-hd {
    padding: 20px 20px 0 20px;
  }
  &-bd {
    p {
      padding: 30px;
    }
    .meta {
      height: 85px;
      color: #999;
      padding: 0 20px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 1px;
        border-top: 1px solid #ededed;
        color: #e5e5e5;
        transform-origin: 0 0;
        transform: scaleY(0.5);
        z-index: 2;
      }
    }
  }
  &-ft {
    padding: 0 20px 20px 20px;
    .reply {
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 8px;
      background-color: rgba(51, 109, 146, 0.3);
    }
  }
}
</style>
