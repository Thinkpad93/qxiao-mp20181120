<template>
  <transition name="dialog-fade">
    <div class="dialog-wrapper" v-if="visible">
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
      required: true,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">
.dialog-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 600px;
  z-index: 1000;
  overflow: auto;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translate3d(-50%, -50%, 0);
}

.dialog-fade-enter-active {
  animation: dialog-fade-in 0.3s;
}
.dialog-fade-leave-active {
  animation: dialog-fadde-out 0.3s;
}

@keyframes dialog-fade-in {
  0% {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
}
@keyframes dialog-fadde-out {
  0% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
}
</style>
