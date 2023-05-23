import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Render-Column',
  props: {
    row: Object,
    render: Function,
    index: String,
    column: {
      type: Object,
      default: null
    }
  },
  setup: function (props: any, context: any) {
    return () =>
      props.render({
        ...props,
        ...context.attrs
      })
  }
})
