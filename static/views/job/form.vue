<template>
  <el-dialog
    :title="form.postId ? '修改' : '新增'"
    width="600"
    v-model="visible"
    :close-on-click-modal="false"
    draggable
  >
    <el-form
      ref="dataFormRef"
      :model="form"
      :rules="dataRules"
      label-width="90px"
      v-loading="loading"
    >
      <el-form-item label="岗位编码" prop="postCode">
        <el-input v-model="form.postCode" placeholder="请输入岗位编码" />
      </el-form-item>
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="form.postName" placeholder="请输入岗位名称" />
      </el-form-item>
      <el-form-item label="岗位排序" prop="postSort">
        <el-input-number v-model="form.postSort" placeholder="请输入岗位排序" />
      </el-form-item>
      <el-form-item label="岗位描述" prop="remark">
        <el-input
          type="textarea"
          maxlength="150"
          rows="3"
          v-model="form.remark"
          placeholder="请输入岗位描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit" :disabled="loading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage } from '../../hooks/use-msg/message.mjs'
import { getObj, addObj, putObj, validatePostCode, validatePostName } from '../../api/post.mjs'

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])

// 定义变量内容
const dataFormRef = ref()
const visible = ref(false)
const loading = ref(false)

// 提交表单数据
const form = reactive({
  postId: '',
  postCode: '',
  postName: '',
  postSort: 0,
  remark: '',
  delFlag: '',
  createTime: '',
  createBy: '',
  updateTime: '',
  updateBy: ''
})

// 定义校验规则
const dataRules = ref({
  postCode: [
    { required: true, message: '岗位编码不能为空', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        validatePostCode(rule, value, callback, form.postId !== '')
      },
      trigger: 'blur'
    }
  ],
  postName: [
    { required: true, message: '岗位名称不能为空', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        validatePostName(rule, value, callback, form.postId !== '')
      },
      trigger: 'blur'
    }
  ],
  postSort: [{ required: true, message: '岗位排序不能为空', trigger: 'blur' }],
  remark: [{ required: true, message: '岗位描述不能为空', trigger: 'blur' }]
})

// 打开弹窗
const openDialog = (id) => {
  visible.value = true
  form.postId = ''

  // 重置表单数据
  nextTick(() => {
    dataFormRef.value?.resetFields()
  })

  // 获取Post信息
  if (id) {
    form.postId = id
    getPostData(id)
  }
}

// 提交
const onSubmit = async () => {
  const valid = await dataFormRef.value.validate().catch(() => {})
  if (!valid) return false

  try {
    loading.value = true
    form.postId ? await putObj(form) : await addObj(form)
    useMessage().success(t(form.postId ? 'common.editSuccessText' : 'common.addSuccessText'))
    visible.value = false
    emit('refresh')
  } catch (err) {
    useMessage().error(err)
  } finally {
    loading.value = false
  }
}

// 初始化表格数据
const getPostData = (id) => {
  // 获取部门数据
  getObj(id).then((res) => {
    Object.assign(form, res.data)
  })
}

// 暴露变量
defineExpose({
  openDialog
})
</script>
