<template>
    <div
      :class="[
        'el-row',
        {'el-row--flex': type === 'flex'},
        this.justify !== 'start' && `is-justify-${justify}`,
        align !== 'top' && `is-align-${this.align}`
      ]"
      class="el-row"
      :style="style"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'ElRow',
  props: {
    gutter: {
      type: Number,
      defualt: 0,
    },
    type: String,
    justify: {
      type: String,
      default: 'start',
      // 校验传过来的val是否在['start', 'end', 'center', 'space-around', 'space-between']，是返回true，否则返回false
      validator: (val) => ['start', 'end', 'center', 'space-around', 'space-between'].includes(val),
    },
    align: {
      type: String,
      default: 'top',
      validator: (val) => ['top', 'middle', 'bottom'].includes(val),
    },
  },
  computed: {
    style() {
      const style = {};
      if (this.gutter) {
        style.marginLeft = `-${this.gutter / 2}px`;
        style.marginRight = style.marginLeft;
      }
      return style;
    },
  },
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

  &--flex {
    display: flex;

    // 使用flex的时候去掉浮动
    &::after,
    &::before {
      display: none;
    }

    // &.is-justify-center表示 .el-row--flex下的 .is-justify-center类名
    &.is-justify-center {
      justify-content: center;
    }
    &.is-justify-end {
      justify-content: end;
    }
    &.is-justify-space-between {
      justify-content: space-between;
    }
    &.is-justify-space-around {
      justify-content: space-around;
    }

    &.is-align-middle {
      align-items: center;
    }
    &.is-align-bottom {
      // flex 布局下的垂直排列方式
      align-items: flex-end;
    }
  }
}
</style>
