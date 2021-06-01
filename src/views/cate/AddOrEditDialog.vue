<template>
  <div class="wrapper">
    <el-dialog
      :title="isAdd ? '新增分类' : '修改分类'"
      :visible="dialogVisible"
      width="30%"
      @click="reset"
    >
      <el-form ref="editCate" :model="editCate" label-width="120px" label-suffix=":">
        <el-form-item label="父级分类名称" v-if="isAdd">
          <el-input v-model="editCate.parentCateName" disabled class="cate-w"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="editCate.cateName" placeholder="请输入分类名称" class="cate-w" maxlength="10" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" :loading="saveBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addCate, update} from 'api/cate.js'
import Cate from 'model/cate.js'

export default {
  name: "AddOrEditDialog",
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    cate: {
      type: Object
    },
    // 操作类型 add or update
    isAdd: {
      type: Boolean,
      default: 0
    }
  },
  computed: {
    dialogVisible: {
      set(val){
        this.$emit('update:visible', val)
      },
      get(){
        return this.visible
      }
    },
    editCate: {
      set(val){
        this.$emit('update:cate', val);
      },
      get(){
        return this.cate
      }
    }
  },
  data() {
    return {
      saveBtnLoading: false,
      cateNameRules: [
        {required: true,  message: '分类名称不能为空',trigger: 'blur'},
      ]
    };
  },
  components: {},
  mounted () {
    // console.log(this.parentCateCode);
  },
  methods: {
    handleClose() {
      this.$emit("cancel");
    },
    cancel() {
      this.$emit("cancel");
    },
    async confirm () {
      this.saveBtnLoading=true;
      try{
        if(this.isAdd){
          await addCate(this.editCate)
        }else{
          await update(this.editCate)
        }
        this.$message.success('保存成功')
        this.saveBtnLoading=false
        this.dialogVisible=false
        this.reset()
        this.$emit('search')
      }catch(e){
        console.log(e);
        this.$message.error('系统错误，保存失败')
        this.saveBtnLoading=false
      }
    },
    reset(){
      this.$refs['editCate'].resetFields()
      this.editCate = new Cate();
    }
  }
};
</script>

<style scoped>
.cate-w{
  width: 250px;
}
</style>
