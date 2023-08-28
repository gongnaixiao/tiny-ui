<template>
  <el-row class="ml10" v-show="showSearch">
    <el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList" ref="queryRef">
      <el-form-item label="岗位名称" prop="postName">
        <el-input
          placeholder="请输入岗位名称"
          style="max-width: 180px"
          v-model="state.queryForm.postName"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList" icon="search" type="primary">查询</el-button>
        <el-button @click="resetQuery" icon="Refresh">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <el-row>
    <div class="mb8" style="width: 100%">
      <el-button @click="formDialogRef.openDialog()" class="ml10" icon="folder-add" type="primary">
        新增
      </el-button>
      <el-button
        plain
        :disabled="multiple"
        @click="handleDelete(selectObjs)"
        class="ml10"
        icon="Delete"
        type="primary"
      >
        删除
      </el-button>
      <RightToolbar
        export="'sys_post_export'"
        @exportExcel="exportExcel"
        @queryTable="getDataList"
        class="ml10"
        style="float: right; margin-right: 20px"
        v-model:showSearch="showSearch"
      ></RightToolbar>
    </div>
  </el-row>
  <el-table
    :data="state.dataList"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    v-loading="state.loading"
    border
  >
    <el-table-column align="center" type="selection" width="40" />
    <el-table-column label="#" type="index" width="60" />
    <el-table-column label="岗位编码" prop="postCode" show-overflow-tooltip />
    <el-table-column label="岗位名称" prop="postName" show-overflow-tooltip />
    <el-table-column label="岗位排序" prop="postSort" show-overflow-tooltip />
    <el-table-column label="岗位描述" prop="remark" show-overflow-tooltip />
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button
          icon="edit-pen"
          @click="formDialogRef.openDialog(scope.row.postId)"
          text
          type="primary"
          >修改
        </el-button>

        <el-button icon="delete" @click="handleDelete([scope.row.postId])" text type="primary"
          >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import RightToolbar from '../../components/RightToolbar/index.vue'
import { fetchList } from '../../api/post.mjs'
import { useTable } from '../../hooks/use-table/table.mjs'

// 搜索变量
const queryRef = ref()
const showSearch = ref(true)
// 多选变量
const selectObjs = ref([])
const multiple = ref(true)

const state = reactive({
  queryForm: {},
  pageList: fetchList
})

//  table hook
const { getDataList, currentChangeHandle, sizeChangeHandle, downBlobFile, tableStyle } =
  useTable(state)

// 清空搜索条件
const resetQuery = () => {
  queryRef.value.resetFields()
  getDataList()
}
// 导出excel
const exportExcel = () => {
  downBlobFile('/admin/post/export', state.queryForm, 'post.xlsx')
}

// 多选事件
const handleSelectionChange = (objs) => {
  selectObjs.value = objs.map(({ postId }) => postId)
  multiple.value = !objs.length
}
</script>
