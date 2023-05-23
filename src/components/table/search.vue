<script lang="tsx">
export interface Schema_Type {
  model: string
  label: string
  component: any
  componentProps?: any
  formItemProps?: any
}
export default defineComponent({
  name: 'Search',
  props: {
    searchForm: {
      type: Object
    },
    schema: {
      type: Array as PropType<Schema_Type[]>
    }
  },
  setup() {
    // const renderComponent = (s: Schema_Type) => {
    //   switch(s.component) {
    //     case 'Select':
    //       return h(Select, {...s, searchForm: props.searchForm })
    //     default:
    //       return
    //   }
    // }
    const searchForm = reactive({
      role: '',
      name: ''
    })
    return () => (
      <el-form inline={true} model={searchForm}>
        {/* {{
          default: () => {
            return props?.schema?.map((item) => {
              return (
                <el-form-item
                  key={item.model}
                  label={item.label}>
                  {{
                    default: (form) => {
                      console.log(form, '---form00000')
                      return renderComponent({ ...item, ...form })
                    }
                  }}
                </el-form-item>
              )
            })
          }
        }} */}
        <el-form-item label="姓名">
          <el-input model="searchForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色选择">
          <el-select model="searchForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="ADMIN" />
            <el-option label="普通用户" value="DEFAULT" />
          </el-select>
        </el-form-item>
      </el-form>
    )
  }
})
</script>
