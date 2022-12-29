<template>
  <div class="wrap">
    <slot name="header">
      <div class="title">{{ title }}</div>
    </slot>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "示例："
    }
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$slots, "this.$slots");
  }
};
</script>

<style lang="scss" scoped>
@import "../public/scss/loading.scss";
@import "../public/scss/demo.scss";
.wrap {
  border: 1px solid #f0f0f0;
  border-top: none;
  box-sizing: border-box;
  margin: 10px 0px;
}
.title {
  color: #fff;
  position: relative;
  background: #3eaf7c;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  &::after {
    position: absolute;
    content: "";
    left: 10px;
    top: 22px;
    width: 6px;
    background: #fff;
    height: 30%;
  }
}
.content {
  min-height: 100px;
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>
