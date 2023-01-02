<template>
  <div class="screen-wrapper">
    <div class="screen" id="screen">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 初始化自适应  ----在刚显示的时候就开始适配一次
    this.handleScreenAuto();
    // 绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = this.handleScreenAuto;
  },
  deleted() {
    window.onresize = null;
  },
  methods: {
    // 数据大屏自适应函数
    handleScreenAuto() {
      const designDraftWidth = 1920; //设计稿的宽度
      const designDraftHeight = 960; //设计稿的高度
      // 根据屏幕的变化适配的比例
      const scaleX = document.documentElement.clientWidth / designDraftWidth;
      const scaleY = document.documentElement.clientHeight / designDraftHeight;
      // 缩放比例
      document.querySelector(
        "#screen"
      ).style.transform = `scale(${scaleX},${scaleY}) translate(-50%, -50%)`;
    }
  }
};
</script>
<style scoped lang="scss">
.screen-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .screen {
    width: 192px; //设计稿的宽度
    height: 96px; //设计稿的高度
    transform-origin: 0 0;
    position: absolute;
    left: 50%;
    top: -50%;
  }
}
</style>
