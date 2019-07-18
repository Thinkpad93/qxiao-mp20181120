<template>
  <div class="page">
    <div class="page-bd">
      <!-- 查询开放版是否有录入学生 -->
      <van-popup v-model="popupShow" position="bottom">
        <div class="popup-page">
          <div class="popup-bd">
            <div class="cells">
              <div class="cell student-box" v-for="(item, index) in studentList" :key="index">
                <div class="cell-bd">
                  <p>{{ item.name }}</p>
                </div>
                <div class="cell-ft">
                  <van-radio-group v-model="studentId">
                    <van-radio :name="item.studentId" checked-color="#92cd36"></van-radio>
                  </van-radio-group>
                </div>
              </div>
            </div>
          </div>
          <div class="popup-ft">
            <div class="flex">
              <van-button type="default" class="no-radius" @click="popupShow = false">取消</van-button>
              <van-button type="info" class="no-radius" @click="handleSaveStudent">确定</van-button>
            </div>
          </div>
        </div>
      </van-popup>
      <form action ref="form">
        <div class="cells-title">基础信息</div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">学生姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学生姓名" maxlength="5" v-model="form.studentName" />
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">性别</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="form.sex">
                <option
                  :value="option.id"
                  v-for="(option,index) in sexList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">学生所在班级</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="form.classId">
                <!-- 兼容性问题修改 -->
                <optgroup disabled hidden></optgroup>
                <option
                  :value="option.classId"
                  v-for="(option,index) in classList"
                  :key="index"
                >{{ option.className }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="cells-title">
          <span></span>
          <van-button type="info" size="small" native-type="button" @click="handleAddLinkMan">新增家长</van-button>
        </div>
        <div class="cells" v-for="(link,index) in form.linkMan" :key="index">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">家长手机号</label>
            </div>
            <div class="cell-bd">
              <input
                type="number"
                class="input"
                pattern="[0-9]*"
                placeholder="请输入手机号"
                v-model="link.tel"
                @input="changeTel(link)"
              />
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">学生和家长关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="link.relation">
                <!-- 兼容性问题修改 -->
                <optgroup disabled hidden></optgroup>
                <option
                  :value="option.id"
                  v-for="(option,index) in relationList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cells-footer" v-if="form.linkMan.length > 1">
            <div class="cell">
              <van-button
                native-type="button"
                type="danger"
                size="small"
                @click="handleDelLinkMan(index)"
              >删除</van-button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button size="large" type="info" class="no-radius" @click="handleSubmit">保存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
//import classList from "@/mixins/classList";
export default {
  name: "studentAdd",
  mixins: [sex, relation],
  data() {
    return {
      popupShow: false,
      studentId: null,
      openDirection: this.$route.query.openDirection,
      query: {
        teacherId: this.$store.state.user.info.id
      },
      form: {
        openId: this.$store.state.user.info.openId,
        studentName: "",
        sex: 1,
        linkMan: [{ relation: 1, tel: "" }],
        classId: null
      },
      classList: [],
      studentList: []
    };
  },
  methods: {
    changeTel(item) {
      let tel = item.tel;
      if (isPhone(tel)) {
        this.queryStudentOpen({ tel });
      } else {
        console.log("手机号格式不对");
      }
    },
    handleAddLinkMan() {
      this.form.linkMan.push({ relation: 1, tel: "" });
    },
    handleDelLinkMan(index) {
      return this.form.linkMan.splice(index, 1);
    },
    handleSubmit() {
      let { studentName, classId, linkMan } = this.form;
      if (studentName == "" || !studentName.length) {
        this.$toast("请输入学生姓名");
        return false;
      }
      if (!classId) {
        this.$toast("请选择学生所在班级");
        return false;
      }
      //for
      for (let i = 0; i < linkMan.length; i++) {
        let tel = linkMan[i].tel;
        if (!isPhone(tel)) {
          this.$toast("请正确填写手机号");
          return;
        }
      }
      let obj = Object.assign({}, this.form);
      this.studentAdd(obj);
    },
    //开放版添加学生
    handleSaveStudent() {
      if (!this.studentId) {
        this.$toast("请选择要添加的学生");
        return;
      }
      let { classId } = this.form;
      let studentId = this.studentId;
      this.addStudentWithStudentId({ classId, studentId });
    },
    //学生新增
    async studentAdd(params = {}) {
      let res = await service.studentAdd(params);
      if (res.errorCode === 0) {
        this.$refs.form.reset();
        this.$router.go(-1);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      } else if (res.errorCode === 2) {
        this.$dialog
          .alert({
            message: `${res.errorMsg}`
          })
          .then(() => {
            this.$refs.form.reset();
            this.$router.go(-1);
          });
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //查询存在的学生
    async queryStudentOpen(params = {}) {
      let res = await service.queryStudentOpen(params);
      if (res.errorCode === 0 && res.data.length) {
        this.popupShow = true;
        this.studentList = res.data;
      }
    },
    //老师录入学生（开放版存在的学生）
    async addStudentWithStudentId(params = {}) {
      let res = await service.addStudentWithStudentId(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //查询老师能预录入学生的班级
    async queryTeacherClass(params = {}) {
      let res = await service.queryTeacherClass(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    }
  },
  mounted() {
    this.queryTeacherClass(this.query);
  }
};
</script>
<style lang="less" scoped>
.cells-footer {
  .cell {
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
  }
  a {
    font-size: 28px;
    border-radius: 0;
  }
}
.student-box {
  height: 120px;
}
.popup-page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.popup-bd {
  flex-grow: 1;
  overflow-y: scroll;
}
.popup-ft {
  button {
    flex: 1;
  }
}
</style>
