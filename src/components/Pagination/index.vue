<template>
  <div class="pagination-container" :class="{'hidden':hidden}">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :layout="layout"
      :page-size.sync="pageSize"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 隐藏分页组件
    hidden: {
      type: Boolean,
      default: false
    },
    // 是否显示背景色
    background: {
      type: Boolean,
      default: true
    },
    // table总条数
    total: {
      required: true,
      type: Number
    },
    // 当前页
    page: {
      type: Number
    },
    // 每页显示条数
    limit: {
      type: Number,
      default: 20
    },
    // 需要展示的组件
    layout: {
      type: String,
      default: "total,prev,next,pager,jumper"
    }
  },
  computed: {
    currentPage:{
        // 向上传递需要读取和设置的两个方法
        get(){
            return this.page
        },
        set(val){
            // 改变父组件的页码
            this.$emit("update:page",val)
        }
    },
    pageSize:{
        get(){
            return this.limit
        },
        set(val){
            // 改变父组件的页码
            this.$emit("update:limit",val)
        }
    }
  },
  methods:{
      handleCurrentChange(currentPage){
        this.$emit("pagination",{
            currentPage:currentPage,
            limit:this.pageSize
        });
      }
  }
};
</script>

<style>
.pagination-container.hidden {
  display: none;
}
</style>