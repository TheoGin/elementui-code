export default {
  name: "ElRow",
  props: {
    gutter: {
      type: Number,
      defualt: 0,
    },
    type: String,
    justify: {
      type: String,
      default: "start",
      // 校验传过来的val是否在['start', 'end', 'center', 'space-around', 'space-between']，是返回true，否则返回false
      validator: (val) => ["start", "end", "center", "space-around", "space-between"].includes(val),
    },
    align: {
      type: String,
      default: "top",
      validator: (val) => ["top", "middle", "bottom"].includes(val),
    },
    tag: {
      type: String,
      default: "div",
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
  render(h) {
    return h(
        this.tag, 
        {
            class: [
                "el-row",
                { "el-row--flex": this.type === "flex" },
                this.justify !== "start" && `is-justify-${this.justify}`,
                this.align !== "top" && `is-align-${this.align}`,
            ],
            style: this.style
        },
        // 默认插槽
        this.$slots.default
    );
  },
};
