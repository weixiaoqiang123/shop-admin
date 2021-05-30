<template>
  <div class="container clearfix">
    <div class="wrapper">
      <div>
        <el-input v-model="account" placeholder="请输入用户名" class="w">
          <i slot="prefix" class="iconfont icon-tubiao211"></i>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" placeholder="请输入密码" class="w" show-password>
          <i slot="prefix" class="iconfont icon-tubiao211"></i>
        </el-input>
      </div>
      <div>
        <el-button type="primary" class="w" @click="login">登录</el-button>
      </div>
      <div class="op w">
        <a>注册账号</a>
        <a>忘记密码？</a>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from 'api/user.js'
import md5 from 'js-md5'
import {setToken} from 'util/auth.js'
import {arr} from 'store/modules/user.js'

export default {
  name: "Index",
  data() {
    return {
      account: 'admin',
      password: 'admin',
      role: -1,
    }
  },
  components: {
  },
  mounted () {
    const role = this.$route.meta.roles[0]
    this.role = arr.indexOf(role)
    console.log(this.role);
  },
  methods: {
    async login () {
      const data = {
        account: this.account,
        password: md5(this.password),
        role: this.role
      }
      try{
        let res = await login(data)
        // console.log(res);
        if(res.success){
          // 保存用户信息
          this.$store.commit('user/SET_TOKEN', res.data);
          setToken(res.data)
          // 重定向到首页
          this.$router.push('/index')
        }else{
          this.$message.error('账号或密码错误')
        }
      }catch(e){
        // console.log(e);
        this.$message.error('系统错误')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.container{
  height: 100vh;
  background-image: url('../../assets/img/girl.jpg');
  background-size: cover;
  background-position: center;
}

.wrapper{
  width: 200px;
  height: 300px;
  margin: 180px auto;
}

.wrapper>div{
  margin-bottom: 12px;
}

.w{
  width: 250px;
}

/deep/.el-input__prefix{
  display: flex;
  align-items: center;
}

.op{
  display: flex;
  justify-content: space-between;
}
</style>
