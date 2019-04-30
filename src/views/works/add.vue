<template>
  <div class="flex-page">
    <div class="flex-bd">
      <form id="form" action ref="form" method="post">
        <div class="cells">
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">作品类别</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="select" dir="rtl" v-model="selected">
                <!-- 兼容性问题修改 -->
                <optgroup disabled hidden></optgroup>
                <option
                  :value="option.id"
                  v-for="(option,index) in worksTypeList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">作品标题</label>
            </div>
            <div class="cell-bd" style="padding-left:0">
              <input class="input" placeholder="请输入作品标题" v-model="form.title" maxlength="30">
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea
                class="textarea"
                rows="6"
                placeholder="将您优秀作品上传到平台，将有机会在全市科普电子屏上展示，还将有机会获得神秘大奖。行动起来吧！(最多可上传10作品，格式：jpg/png)..."
                v-model="form.textContent"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius">确定</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "worksAdd",
  data() {
    return {
      worksTypeList: [
        {
          id: 1,
          name: "学生作品"
        },
        {
          id: 2,
          name: "班级风采"
        },
        {
          id: 3,
          name: "精选优品"
        }
      ],
      form: {}
    };
  }
};
</script>
<style lang="less" scoped>
</style>
