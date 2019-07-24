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
                placeholder="请输入您要反馈的内容..."
                rows="6"
                v-model="form.textContent"
              ></textarea>
            </div>
          </div>
        </div>
      </van-dialog>
      <!-- 新增 -->
      <template v-if="roleType == 3 && experience == 0">
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
            <div class="feed-hd flex a-i-c j-c-s-b">
              <div class="avatar flex a-i-c">
                <img :src="item.photo" width="40" height="40" radius="50" v-if="item.photo" />
                <img src="@/assets/child-default@2x.png" width="40" height="40" radius="50" v-else />
                <p class="ml-20">{{ item.studentName }}</p>
              </div>
              <div class>
                <time v-if="roleType == 2">{{ item.feedDate }}</time>
                <span style="color:#999" v-else>接收老师：{{ item.teacherName }}</span>
              </div>
            </div>
            <div class="feed-bd">
              <p v-html="item.feedTextContent"></p>
              <div class="time" v-if="roleType == 3">
                <time>{{ item.feedDate }}</time>
              </div>
              <div
                class="meta flex a-i-c j-c-f-e"
                v-if="roleType == 2 && !item.status"
                @click="handleReply(item)"
              >
                <van-icon name="comment" size="18px" color="#336d92"></van-icon>
                <span style="color:#336d92">回复</span>
              </div>
            </div>
            <div class="feed-ft" v-if="item.status">
              <div class="reply">
                <span style="color:#336d92">老师回复:</span>
                <span>{{ item.replyTextContent }}</span>
              </div>
              <div class>
                <time>{{ item.replyDate }}</time>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/kong.png" alt />
        <p>{{ roleType == 2 ? "当前还没有反馈消息呢": "在这可提出您的建议哦" }}</p>
      </div>
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
      id: state => state.info.id,
      experience: state => state.info.experience //0不是体验用户 1是
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
        if (this.form.textContent == "") {
          this.$toast("请输入反馈内容");
          done(false);
        } else {
          let res = await service.teacherBack(this.form);
          if (res.errorCode === 0) {
            this.form.textContent = "";
            this.form.feedId = null; //重置
            this.getListData(); //重新请求数据
            done();
          }
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
  margin-bottom: 80px;
  position: relative;
  background-color: #fff;
  time {
    color: #999;
  }
  &-curr {
    //background-color: rgba(132, 206, 9, 0.1);
  }
  &-hd {
    padding: 30px 30px 0 30px;
  }
  &-bd {
    p {
      padding: 20px 30px;
      line-height: 1.4;
    }
    .time {
      padding: 0 30px;
      padding-bottom: 20px;
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
    padding: 0 30px 20px 30px;
    .reply {
      margin-bottom: 10px;
      padding: 20px;
      border-radius: 8px;
      line-height: 1.4;
      background-color: rgba(51, 109, 146, 0.1);
    }
  }
}
</style>
