<template>
    <!-- <div class="el-col el-col-12"> -->
    <div
      :class="['el-col', `el-col-${span}`]"
      :style="style"
    >
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
  computed: {
    gutter() {
      let parent = this.$parent;
      //   console.log('parent: ', parent);
      // 可能父元素不是ElRow，所以要一直找，直到找到ElRow位置
      while (parent && parent.$options.name !== 'ElRow') {
        parent = parent.$parent;
      }

      return parent ? parent.gutter : 0;
    },
    style() {
      const style = {};
      // 如果this.gutter不为0才进行操作
      if (this.gutter) {
        style.paddingLeft = `${this.gutter / 2}px`;
        style.paddingRight = style.paddingLeft;
      }
      //   console.log('style: ', style);
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
    float: left;
    box-sizing: border-box;
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
