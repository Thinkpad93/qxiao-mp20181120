<template>
  <transition name="dialog-fade" mode="out-in">
    <div class="dialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <h5 class="dialog-title">
            <slot name="title">{{ title }}</slot>
          </h5>
        </div>
        <div class="dialog-body">
          <slot></slot>
        </div>
        <div class="dialog-foter">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
    <!-- <div class="dialog" style="z-index: 2000" v-show="visible">
      <div class="dialog-hd">
        <slot name="title">
          <strong>{{ title }}</strong>
        </slot>
      </div>
      <div class="dialog-bd">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </div>-->
  </transition>
</template>
<script>
export default {
  name: "dialog",
  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">
.dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 85%;
  z-index: 100;
  border-radius: 8px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  &-hd {
    font-size: 36px;
    padding: 30px;
    text-align: center;
    position: relative;
  }
  &-ft {
    display: flex;
    position: relative;
    &::before {
      content: "";
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
      left: 0;
      z-index: 2;
    }
    a {
      flex: 1;
      font-size: 34px;
      font-weight: bold;
      display: flex;
      height: 100px;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }
}

.dialog-btn-default {
  color: #8d8d8d;
}
.dialog-btn-primary {
  color: #9acb4d;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    border-left: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleX(0.5);
    z-index: 2;
  }
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: all 0.4s ease;
}

.dialog-fade-enter {
  opacity: 0.8;
}

.dialog-fade-leave-to {
  opacity: 0;
}

// .dialog-fade-leave-active {
//   animation: dialogout 0.5s;
// }
// .dialog-fade-enter-active {
//   animation: dialogin 0.5s;
// }

// @keyframes dialogin {
//   0% {
//     transform: scale(1.185) translate(-50%, -50%);
//     opacity: 0;
//   }
//   100% {
//     transform: scale(1) translate(-50%, -50%);
//     opacity: 1;
//   }
// }
// @keyframes dialogout {
//   0% {
//     transform: scale(1) translate(-50%, -50%);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(0.85) ;
//     opacity: 0;
//   }
// }
</style>
