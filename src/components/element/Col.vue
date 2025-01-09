<template>
    <!-- <div class="el-col el-col-12"> -->
    <!-- <div
      :class="['el-col', `el-col-${span}`, `el-col-offset-${offset}`,
      `el-col-push-${push}`, `el-col-pull-${pull}`]"
      :style="style"
    > -->
    <div
      :class="['el-col', classList]"
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
    offset: {
      type: Number,
      default: 0,
    },
    push: {
      type: Number,
      default: 0,
    },
    pull: {
      type: Number,
      default: 0,
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
    classList() {
      const classList = [];
      ['span', 'offset', 'push', 'pull'].forEach((prop) => {
        if (this[prop]) {
          // if (prop === 'span') {
          //   classList.push(`el-col-${this[prop]}`);
          // }
          // // ${this.prop}错误写法
          // classList.push(`el-col-${prop}-${this[prop]}`);

          classList.push(prop === 'span' ? `el-col-${this[prop]}` : `el-col-${prop}-${this[prop]}`);
        }
      });
      console.log('classList', classList);
      return classList;
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
    .el-col-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }
    .el-col-push-#{$i} {
      // 相对于自身栅格向右移动格数
      position: relative;
      left: $i / 24 * 100%;
    }
    // el-col-push-0 el-col-pull-6，既有left，又有right的时候，left优先级大于right，所以left: 0会覆盖right: 25%
    // =》所以要写判断为0的时候不展示el-col-push-0（left: 0）
    .el-col-pull-#{$i} {
      // 相对于自身栅格向左移动格数
      position: relative;
      right: $i / 24 * 100%;
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
