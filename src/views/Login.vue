<template>
  <div id="LoginBackground">
    <el-form id="Login" :model="ruleForm" :rules="rules" ref="ruleForm">
      <h3>系统登录</h3>
      <el-form-item prop="userName">
         <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input> 
      </el-form-item>
       <el-form-item prop="passWord"> 
        <el-input type="password" v-model="ruleForm.passWord" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" @click.prevent="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import bus from '../bus/bus.js'
export default {
  name: 'Login',
  data() {
    let checkUserName = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let checkPassword = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      showLoading: false,
      ruleForm: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        passWord: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 账号传值
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.showLoading = true
          // 请求接口判断登录信息
          if (this.ruleForm.userName == 'root' && this.ruleForm.passWord == '111111') {
            this.$router.push('/actManage')
          } else {
            Message.error({
              message: '登录名或密码错误'
            })
          }
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss" type="text/css" scoped>
#LoginBackground {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url("../assets/loginBg.jpg") no-repeat center;
  background-size: cover;
}

#Login {
  width: 350px;
  padding: 35px 35px 15px 35px;
  margin: 180px auto 0;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0 0 25px #cac6c6;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
}

#Login h3 {
  margin: 0 auto 40px;
  text-align: center;
  color: #505458;
}

.submit {
  width: 100%;
}
</style>
