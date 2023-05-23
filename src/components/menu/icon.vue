<script lang="ts">
import { h } from 'vue'
import { UserFilled, HomeFilled, Management } from '@element-plus/icons-vue'
const map: { [key: string]: Component } = {
  UserFilled: UserFilled,
  HomeFilled: HomeFilled,
  Management: Management
}
export default {
  props: {
    type: {
      type: String,
      require: true
    },
    style: {
      type: String
    }
  },
  components: { UserFilled, HomeFilled, Management },
  setup(props: any) {
    return () => {
      const { type, ...other } = props
      return h(map[type], { ...other })
    }
  }
}
</script>
