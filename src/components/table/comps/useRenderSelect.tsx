import { ElSelect, ElOption } from 'element-plus'
export interface Schema_Type {
  model: string
  label: string
  component: any
  componentProps?: any
  formItemProps?: any
}
export const useRenderSelect = () => {
  const renderSelect = (props: Schema_Type & { formModel: object }) => {
    console.log(props.formModel, '----', props.model)
    return (
      <ElSelect modelValue={props.model} placeholder={props.formItemProps?.placeholder}>
        {() => {
          return props.componentProps?.options.map((option) => {
            return <ElOption label={option.label} value={option.value} />
          })
        }}
      </ElSelect>
    )
  }
  return {
    renderSelect
  }
}
