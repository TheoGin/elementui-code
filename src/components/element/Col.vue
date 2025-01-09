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
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
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

      ['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
        if (typeof this[size] === 'number') {
          classList.push(`el-col-${size}-${this[size]}`);
        } else if (typeof this[size] === 'object') {
          /** 如果传的是一个对象{span: 4, offset: 5, push: 6, pull: 7}
           * el-col-xs-4
           * el-col-xs-offset-5
           * el-col-xs-push-6
           * el-col-xs-pull-7
           */
          // 拿到该尺寸下的对象props
          const props = this[size];
          // 遍历props对象的每一个属性
          Object.keys(props).forEach((prop) => {
            classList.push(
              prop === 'span'
                ? `el-col-${size}-${props[prop]}`
                : `el-col-${size}-${prop}-${props[prop]}`,
            );
          });
        }
      });
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
// xs	<768px
@media only screen and (max-width: 767px) {
  @for $i from 0 through 24 {
    .el-col-xs-0 {
      display: none;
    }
    .el-col-xs-#{$i} {
        width: $i / 24 * 100%;
    }
    .el-col-xs-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }
    .el-col-xs-push-#{$i} {
      position: relative;
      left: $i / 24 * 100%;
    }
    .el-col-xs-pull-#{$i} {
      position: relative;
      right: $i / 24 * 100%;
    }
  }
}
// sm	≥768px
@media only screen and (min-width: 768px) {
  @for $i from 0 through 24 {
    .el-col-sm-0 {
      display: none;
    }
    .el-col-sm-#{$i} {
        width: $i / 24 * 100%;
    }
    .el-col-sm-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }
    .el-col-sm-push-#{$i} {
      position: relative;
      left: $i / 24 * 100%;
    }
    .el-col-sm-pull-#{$i} {
      position: relative;
      right: $i / 24 * 100%;
    }
  }
}
// md	≥992px
@media only screen and (min-width: 992px) {
  @for $i from 0 through 24 {
    .el-col-md-0 {
      display: none;
    }
    .el-col-md-#{$i} {
        width: $i / 24 * 100%;
    }
    .el-col-md-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }
    .el-col-md-push-#{$i} {
      position: relative;
      left: $i / 24 * 100%;
    }
    .el-col-md-pull-#{$i} {
      position: relative;
      right: $i / 24 * 100%;
    }
  }
}
// lg	≥1200px 
@media only screen and (min-width: 1200px) {
  @for $i from 0 through 24 {
    .el-col-lg-0 {
      display: none;
    }
    .el-col-lg-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }
    .el-col-lg-push-#{$i} {
      position: relative;
      left: $i / 24 * 100%;
    }
    .el-col-lg-pull-#{$i} {
      position: relative;
      right: $i / 24 * 100%;
    }
  }
}
// xl	≥1920px
@media only screen and (min-width: 1920px) {
  @for $i from 0 through 24 {
    .el-col-xl-0 {
      display: none;
    }
    .el-col-xl-#{$i} {
        width: $i / 24 * 100%;
    }
    .el-col-xl-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }
    .el-col-xl-push-#{$i} {
      position: relative;
      left: $i / 24 * 100%;
    }
    .el-col-xl-pull-#{$i} {
      position: relative;
      right: $i / 24 * 100%;
    }
  }
}
</style>
