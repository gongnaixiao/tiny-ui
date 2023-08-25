<script setup>
import { ref, unref, reactive } from 'vue'
import ContentWrap from '../../components/ContentWrap.vue'
import ActionButton from '../../components/ActionButton.vue'

const addAction = () => {
  dialogTitle.value = '新增'
  currentRow.value = null
  dialogVisible.value = true
  actionType.value = ''
}
const delLoading = ref(false)
// const delData = async (row: DepartmentItem | null) => {
//     const elTableExpose = await getElTableExpose()
//     ids.value = row
//         ? [row.id]
//         : elTableExpose?.getSelectionRows().map((v: DepartmentItem) => v.id) || []
//     delLoading.value = true
//     await delList(unref(ids).length).finally(() => {
//         delLoading.value = false
//     })
// }

const visible = ref(true)
const setVisible = async () => {
  console.log('setVisible');
  console.log(visible)
  console.log(!unref(visible))
  visible.value = !unref(visible)
  visible.value = true 
}
const reset = async () => {
  console.log('reset');
}
const search = async () => {
  console.log('search');
}
</script>
<template>
  <ActionButton
    :show-reset=true
    :show-search=true
    :show-expand=true
    :search-loading=false
    :reset-loading=false
    @expand="setVisible"
    @reset="reset"
    @search="search"
  />
  <ContentWrap>
    <div class="mb-10px">
      <ElButton type="primary" @click="addAction">新增</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null)"> 删除 </ElButton>
    </div>
  </ContentWrap>
</template>
