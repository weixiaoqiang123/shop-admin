<template>
  <div class="wrapper">
    <div class="tools">
      <el-button type="primary" size="medium" @click="add">新增</el-button>
      <el-button type="plian" size="medium" :disabled="disable" @click="update">修改</el-button>
      <el-button type="danger" size="medium" :disabled="disable" @click="deleteHandle">删除</el-button>
      <el-button type="plain" size="medium" @click="reload">重载</el-button>
    </div>
    <div 
    class="content" 
    v-loading="loading" 
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <Item 
      v-for="(item, index) in path"
      :deep="index+1"
      :key="index" 
      :title="titles[index]"
      :isReset="resetIndex === index"
      :options="getCurrentLevelList(options, index)"
      @reset="reset"
      @itemSelect="itemSelect"
      @menuClick="menuClick(index)"
      />
    </div>
  </div>
</template>

<script>
import Item from './Item';
import {getData, dfs} from './index.js'

export default {
  name: "Index",
  props: {
     options: {
      type: Array,
      default () {
        return []
      }
    },
    titles: {
      type: Array,
      default: []
    },
    limitDeep: {
      type: Number,
      default: 3
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuItem: {
        cateCode: '',
        index: 0,
        hasChildren: false
      },
      resetIndex: -1,
      // 存放每级菜单的菜单索引和选项索引
      path: [-1],
      disable: true,
      // 基础宽度505
      panelWidth: 505
    }
  },
  mounted () {
    // 判断第一个选项是否有子选项
  },
  methods: {
    add () {
      if(this.menuItem.deep >= this.limitDeep){
        this.$message.error('已达到菜单最大深度')
        return;
      }
      if(this.menuItem.cateCode === ''){
        this.$message({
          type: 'error',
          duration: 1000,
          message: '请选择分类'
        })
      }else{
        // 根据分类编码查询分类
        const cate = dfs(this.options, this.menuItem.cateCode)
        // console.log(cate);
        let editCate = {}
        editCate.parentCateCode = cate.nodeId
        editCate.parentCateName = cate.nodeName
        this.$emit("save", {
          cate: editCate,
          isAdd: true
        })
      }
    },
    deleteHandle (){
      if(this.menuItem.cateCode === ''){
        this.$message({
          type: 'error',
          message: '请选择分类'
        })
      }else{
        this.$emit('deleteItem', {cateCode: this.menuItem.cateCode})
      }
    },
    update () {
      if(this.menuItem.cateCode === ''){
        this.$message({
          type: 'error',
          duration: 1000,
          message: '请选择分类'
        })
      }else{
        const cate = dfs(this.options, this.menuItem.cateCode)
        this.$emit('save', {
          cate: {
            cateCode: cate.nodeId,
            cateName: cate.nodeName
          },
          isAdd: false
        })
      }
    },
    itemSelect(payload){
      // console.log(payload);
      this.menuItem = {
        cateCode: payload.cateCode,
        index: payload.index,
        deep: payload.deep,
        hasChildren: payload.hasChildren
      }
    },
    getCurrentLevelList(data, index){
      return getData(data, this.path.slice(0, index+1));
    },
    menuClick (index){
      // console.log('当前点击的是'+ (index+1) + '级菜单的第'+(this.menuItem.index+1)+'个选项');
      // 获取menu中最后一个元素的menuIndex === index
      let isLast = this.path.length-1 === index;
      // console.log(isLast);
      if(isLast){
        // 同级切换
        // console.log('=========');
        this.handlerChildren(this.menuItem.index);
      }else{
        // console.log('>>>>>>>>');
        this.path = this.path.slice(0, index+1);
        this.handlerChildren(this.menuItem.index);
        this.resetIndex = index+1;
      }
      // console.log(this.path);
      // 点击的是一级菜单禁止操作
      this.disable = index===0 ? true : false
    },
    handlerChildren(itemIndex){
      // 如果当前菜单有子菜单,push当前选中菜单选项索引
      if(this.menuItem.hasChildren){
        this.path.push(itemIndex);
      }
    },
    reset(){
      this.resetIndex=-1;
    },
    reload(){
      this.$emit('reload')
    }
  },
  components: {
    Item
  },
  watch: {
    menuItem: function(val){
      this.panelWidth *= this.path.length
    }
  }
}
</script>

<style scoped>
.wrapper{
  min-height: 500px;
}

.content{
  display: flex;
  /* background-color: gray; */
}
</style>
