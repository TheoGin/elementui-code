<template>
    <!-- <div class="el-col el-col-12"> -->
    <div :class="['el-col', `el-col-${span}`]">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'ElCol',
  props: {
    span: {
      type: Number,
      default: 24,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
    float: left;
}

@for $i from 0 through 24 {
    // scss在类名的语法需要加上#{变量}。类似于模板中`el-col-${span}`
    .el-col-#{$i} {
        width: $i / 24 * 100%;
    }
}

// .el-col-24 {
//   width: 100%;
// }
// .el-col-23 {
//   width: 23 / 24 * 100%;
// }
// .el-col-22 {
//   width: 22 / 24 * 100%;
// }
// .el-col-12 {
//   width: 50%;
// }
</style>
