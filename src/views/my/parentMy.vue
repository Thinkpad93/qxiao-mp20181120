<template>
  <div class="page">
    <div class="page-hd">
      <img src="@/assets/image/baby_header_bg.png" alt>
      <div class="media-box media-box_appmsg flex">
        <div class="media-box__hd">
          <img class="media-box__thumb" src="http://iph.href.lu/60x60" alt>
        </div>
        <div class="media-box__bd">
          <h4 size-17 class="media-box__title">李明敏</h4>
        </div>
      </div>
      <a class="switch-children">
        <i></i>
        切换孩子
      </a>
    </div>
    <div class="page-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-ft">
            <img src="http://iph.href.lu/32x32" alt>
          </div>
          <div class="cell-hd">
            <label for class="label">宝宝姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" value="李明敏" placeholder="请输入老师姓名" maxlength="4">
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-ft">
            <img src="http://iph.href.lu/32x32" alt>
          </div>
          <div class="cell-hd">
            <label for class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl">
              <option selected>男</option>
              <option>女</option>
            </select>
          </div>
        </div>
        <div class="cell">
          <div class="cell-ft">
            <img src="http://iph.href.lu/32x32" alt>
          </div>
          <div class="cell-hd">
            <label for class="label">手机号码</label>
          </div>
          <div class="cell-bd">
            <input class="input" value="15011977647" placeholder="请输入老师姓名" maxlength="4">
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-ft">
            <img src="http://iph.href.lu/32x32" alt>
          </div>
          <div class="cell-hd">
            <label for class="label">和宝宝关系</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl">
              <option selected>男</option>
              <option>女</option>
            </select>
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-ft">
            <img src="http://iph.href.lu/32x32" alt>
          </div>
          <div class="cell-hd">
            <label for class="label">宝宝所在班级</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl">
              <option selected>男</option>
              <option>女</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <qxfooter></qxfooter>
  </div>
</template>
<script>
import qxfooter from "@/components/footer";
export default {
  name: "parentMy",
  components: {
    qxfooter
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.media-box {
  color: #fff;
  font-size: 20px;
  position: absolute;
  z-index: auto;
  top: 60px;
  left: 40px;
  border: none;
  padding: 30px;
}
.media-box_appmsg {
  align-items: center;
}
.media-box__thumb {
  border-radius: 50%;
}
.cells {
  font-size: 32px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 0 30px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
}
.cell-hd {
  line-height: 90px;
  padding-left: 20px;
}
.cell-bd {
  flex: 1;
}
.label {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
}
.cell-select {
  padding: 0;
  .select {
    padding: 0 60px;
  }
  .cell-bd {
    &::after {
      content: "";
      display: inline-block;
      height: 20px;
      width: 20px;
      border-width: 4px 4px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      transform: rotate(45deg) translateY(-50%);
      position: absolute;
      top: 50%;
      right: 30px;
    }
  }
}
.cell-select-after {
  padding-left: 30px;
}
</style>
