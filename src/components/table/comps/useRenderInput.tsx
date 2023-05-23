export const useRenderSelect = (props: any) => {
  const renderSelect = () => {
    return (
      <el-select v-model={props.model} placeholder={props.formItemProps?.placeholder}>
        {() => {
          return props.componentProps.options.map((option) => {
            return <el-option label={option.label} value={option.value} />
          })
        }}
      </el-select>
    )
  }
  return {
    renderSelect
  }
}
