<template>
  <div class="container">
    <Cascader 
    :options="queryData" 
    :titles="titles"
    :loading="loading"
    @reload="fetchData"
    @save="save"
    @deleteItem="delHandler"/>
    <AddOrEditDialog 
    :visible.sync="dialogVisible" 
    @cancel="cancelDialog" 
    @search="fetchData"
    :cate.sync="editCate"
    :isAdd="isAdd"
    />
  </div>
</template>

<script>
import Cascader from 'components/Cascader/Index.vue';
import AddOrEditDialog from './AddOrEditDialog'

import {listCate, findById, remove} from 'api/cate.js'
import Cate from 'model/cate.js'

export default {
  name: "Index",
  data() {
    return {
      queryData: [],
      titles: ['一级分类', '二级分类', '三级分类'],
      isAdd: false,
      dialogVisible: false,
      loading: false,
      editCate: new Cate()
    }
  },
  components: {
    Cascader,
    AddOrEditDialog
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    save(payload){
      this.isAdd = payload.isAdd
      // console.log(payload);
      this.editCate = new Cate(payload.cate)
      // console.log(this.editCate);
      this.dialogVisible=true
    },
    async delHandler(cate){
      try{
        let res = await remove(cate.cateCode);
        // console.log(res);
        this.$message({
          message: res.status === 204 ? '删除成功' : '删除失败',
          type: res.status === 204 ? 'success' : 'error',
          duration: 1000
        })
        this.fetchData();
      }catch(e){
        this.$message.error('删除失败')
      }
    },
    async fetchData(){
      this.loading=true
      this.queryDat=[]
      try{
        let res = await listCate();
        this.queryData = res.data
      }catch(e){
        this.$message.error('系统错误, 查询失败')
      }finally{
        this.loading=false
      }
    },
    cancelDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
}
</style>
