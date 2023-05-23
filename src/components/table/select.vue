<script lang="tsx">
export default defineComponent({
  name: 'Select',
  props: {
    searchForm: {
      type: Object,
      required: true
    },
    model: {
      type: String
    },
    label: {
      type: String
    },
    component: {
      type: Object
    },
    componentProps: {
      type: Object
    },
    formItemProps: {
      type: Object
    }
  },
  setup(props) {
    return () => (
      <el-select modelValue={props?.model} placeholder={props?.formItemProps?.placeholder}>
        {() => {
          return props.componentProps?.options.map((option) => {
            return <el-option label={option.label} value={option.value} />
          })
        }}
      </el-select>
    )
  }
})
</script>
