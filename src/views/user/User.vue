<template>
  <div class="container">
    <el-form ref="queryData" :model="queryData" :rules="userRules" :inline="true" label-suffix=":">
      <el-form-item label="昵称">
        <el-input v-model="queryData.nickname" clearable=""></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="queryData.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册方式">
        <el-select v-model="queryData.method" placeholder="请选择" clearable>
          <el-option
            v-for="item in registerList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="success" size="medium" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="account"
        align="center"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="nickname"
        align="center"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        align="center"
        label="注册方式">
        <template slot-scope="scope">
          <span>{{scope.row.method | methodFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否注销">
        <template slot-scope="scope">
          <span>{{scope.row.isDelete | deleteFilter}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <Pagination
        :limit.sync="queryPage.lineSize"
        :page.sync="queryPage.currentPage"
        :total="queryPage.total"
        @pagination="handleCurrentPageChange"
      />
    </div>
  </div>
</template>

<script>
import User from 'model/user.js'
import Page from 'util/page.js'

import {findAllUser} from 'api/user.js'

import Pagination from '@/components/Pagination/index'

export default {
  name: "Index",
  data() {
    return {
      queryData: new User(),
      userRules: {},
      tableData: [],
      queryPage: new Page({size: 9}),
      registerList: [
        {
          label: '手机号',
          value: 1
        },
        {
          label: '邮箱',
          value: 2
        }
      ]
    }
  },
  components: {
    scroll,
    Pagination
  },
  mounted(){
    this.queryData.role = 2
    this.search()
  },
  methods: {
    reset(){
      this.$refs['queryData'].resetFields()
      this.queryData=new User()
      this.search()
    },
    async search(){
      try{
        let params = Object.assign(this.queryData, {
          currentPage: this.queryPage.currentPage,
          lineSize: this.queryPage.lineSize
        })
        let res = await findAllUser(params)
        console.log(res);
        this.tableData  = res.records
        this.queryPage = new Page(res)
      }catch(e){
        console.log(e);
      }
    },
    handleCurrentPageChange (payload) {
      this.queryPage.lineSize = payload.limit;
      this.queryPage.currentPage = payload.currentPage;
      this.search();
    }
  },
  filters: {
    methodFilter(val){
      const arr = ['手机号', '邮箱']
      return arr[val-1];
    },
    deleteFilter(val){
      const arr = ['未注销', '注销']
      return arr[val]
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  /* background-color: gray; */
}
</style>
