export default {
  name: "ElCol",
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
    tag: {
        type: String,
        default: 'div'
    }
  },
  computed: {
    gutter() {
      let parent = this.$parent;
      //   console.log('parent: ', parent);
      // 可能父元素不是ElRow，所以要一直找，直到找到ElRow位置
      while (parent && parent.$options.name !== "ElRow") {
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
      ["span", "offset", "push", "pull"].forEach((prop) => {
        if (this[prop]) {
          // if (prop === 'span') {
          //   classList.push(`el-col-${this[prop]}`);
          // }
          // // ${this.prop}错误写法
          // classList.push(`el-col-${prop}-${this[prop]}`);

          classList.push(prop === "span" ? `el-col-${this[prop]}` : `el-col-${prop}-${this[prop]}`);
        }
      });

      ["xs", "sm", "md", "lg", "xl"].forEach((size) => {
        if (typeof this[size] === "number") {
          classList.push(`el-col-${size}-${this[size]}`);
        } else if (typeof this[size] === "object") {
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
              prop === "span"
                ? `el-col-${size}-${props[prop]}`
                : `el-col-${size}-${prop}-${props[prop]}`
            );
          });
        }
      });
      return classList;
    },
  },
  render(h) {
    return h(
        this.tag,
        {
            class: ['el-col', this.classList],
            style: this.style
        },
        this.$slots.default
    )
  }
};
