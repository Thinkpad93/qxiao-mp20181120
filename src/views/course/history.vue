<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells mb-20">
        <div class="cell min-h120">
          <div class="cell-bd">
            <p>
              {{ name }}已经坚持记录
              <time style="color:#f44;">{{ days }}</time>天
            </p>
          </div>
        </div>
      </div>
      <!-- -->
      <van-collapse v-model="activeNames">
        <van-collapse-item :name="item.day" v-for="item in list" :key="item.day">
          <div class="flex" size-16 slot="title">
            <time>{{ item.day }}</time>
            <div class="ml-20 mr-20 flex">
              <span>获得</span>
              <span style="color:#f44;">{{ item.sumStar }}</span>颗Q星
            </div>
            <span v-show="item.comment === 0" style="color:#f44">补评价</span>
          </div>
          <div class="action-cells">
            <div
              class="action-cell flex a-i-c j-c-s-b"
              v-for="(lesson, index) in item.lessones"
              :key="index"
            >
              <div class="action-cell-bd flex a-i-c j-c-s-b">
                <div class="action-cell-label">
                  <div>{{ lesson.title }}</div>
                  <!-- 课堂时间 -->
                  <span v-show="lesson.startTime">{{ lesson.startTime }}-{{ lesson.endTime }}</span>
                </div>
                <van-rate
                  v-model="lesson.starCount"
                  :count="5"
                  :size="22"
                  color="#febf56"
                  void-color="#e5eee0"
                  disabled-color="#febf56"
                  :readonly="true"
                ></van-rate>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/kong.png" alt />
        <p class="mt-30">还没有数据展示哦</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "courseHistory",
  data() {
    return {
      activeNames: [],
      query: {
        studentId: this.$store.state.user.info.studentId,
        page: 1,
        pageSize: 10
      },
      totalPage: 1, //总页数
      list: []
    };
  },
  computed: {
    ...mapState("user", {
      name: state => state.info.name
    }),
    days() {
      if (this.list.length) {
        return this.list[0].days;
      }
    }
  },
  methods: {
    //学生在校表现历史查询
    async queryLessonHistory(params = {}) {
      let res = await service.queryLessonHistory(params);
      if (res.errorCode === 0) {
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    this.queryLessonHistory(this.query);
  }
};
</script>
<style lang="less" scoped>
.action-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px 0;
  i {
    vertical-align: top;
  }
  &-bd {
    flex: 1;
  }
}
.van-collapse-item {
  margin-bottom: 10px;
}
</style>
