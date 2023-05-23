<script lang="ts" setup>
import Render from './render'
import { type PropType, defineEmits, type RendererElement, type RendererNode } from 'vue'
import { type PaginationProps, type TableColumnCtx } from 'element-plus'

interface ColumnType extends Partial<TableColumnCtx<any>> {
  render?: (context: any) => globalThis.VNode<RendererNode, RendererElement, {}>
}
defineProps({
  tableData: {
    type: Array
  },
  spanMethod: {
    type: Function
  },
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => []
  },
  pagination: {
    type: Object as PropType<Partial<PaginationProps>>
  },
  maxHeight: {
    type: String
  }
})
const emit = defineEmits(['currentChange'])

const onCurrentChange = (current: number) => {
  emit('currentChange', current)
}
</script>
<template>
  <div>
    <slot name="search" />
  </div>
  <el-table
    :key="new Date().getTime()"
    :data="tableData"
    :span-method="(spanMethod as any)"
    :tree-props="{ children: 'child' }"
    lazy
    :border="true"
    row-key="id"
    style="width: 100%"
    :max-height="maxHeight"
  >
    <template
      v-for="column in columns"
      :key="column.prop">
      <el-table-column
        v-if="column.render"
        :prop="column?.prop"
        :label="column?.label"
        :width="column?.width"
        :fixed="column?.fixed"
        :class-name="column?.className"
        :key="1"
      >
        <template #default="scope">
          <Render
            :column="column"
            :index="scope?.index"
            :render="column.render"
            :row="scope.row"
            v-bind="$attrs"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :fixed="column?.fixed"
        :class-name="column?.className"
        :key="2" />
    </template>
  </el-table>
  <div class="table-pagination" v-if="(pagination?.total || 0) > (pagination?.pageSize || 10)">
    <el-pagination
      :page-size="pagination?.pageSize || 10"
      :total="pagination?.total"
      :background="pagination?.background"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table__header) {
  thead {
    tr {
      th.el-table__cell {
        background-color: #fafafa;
      }
    }
  }
}

.el-table thead {
  background-color: #fafafa;
}

.table-pagination {
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
