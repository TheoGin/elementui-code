<template>
    <div class="el-row">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'ElRow',
};
</script>

<style lang="scss" scoped>
.el-row {
  // 通过父级元素清除浮动
  &::after,
  &::before {
      display: block;
      content: '';
  }
  &::after {
      clear: both;
  }
}
</style>
