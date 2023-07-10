<template>
  <div class="login">
    <div style="width: 500px; margin: 50px auto; padding: 30px 50px; background: #fff;">
      <h1 style="text-align: center; margin: 20px 0;">用户登录</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {resetRouter} from "@/router";
import _this from "@/main";

export default {
  data() {
    return {
      role: "", // 添加一个 role 属性，用来存储用户角色
      searchParam: "",
      ruleForm: {
        userName: 'root',
        password: '1234'
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:8081/users/login';
          console.log('尝试登录……');
          console.log('请求路径为：' + url);
          console.log('请求参数为：' + this.ruleForm);
          console.log(this.ruleForm);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('将ruleForm对象转换为FormData：');
          console.log(formData);
          this.axios.post(url, formData).then((response) => {
            console.log('服务器端响应的结果：' + response);
            console.log(response);
            // 修改LoginView.vue中的submitForm方法
            if (response.data.state === 20000) {
              console.log('登录成功');
              this.$message({
                message: '登录成功！',
                type: 'success'
              });
              // 获取服务器端响应的JWT，并保存下来
              let jwt = response.data.data.jwt;
              let menuList = response.data.data.menuList;
              let roles = response.data.data.roleList;
              if (menuList && menuList.length > 0) {
                console.log("menuList", menuList);
                resetRouter(menuList);
              }
              console.log("roles", roles);
              _this.$store.commit('loginIn', jwt, roles);
              console.log('服务器端响应的JWT：');
              console.log(jwt);
              localStorage.setItem('jwt', jwt);
              localStorage.setItem('roles', roles);
              localStorage.setItem('menuList', JSON.stringify(menuList));
              console.log('已经将JWT数据保存到LocalStorage中');
              // 以下仅用于测试从LocalStorage中读取数据，没有实质的功能方面的意义
              let localJwt = localStorage.getItem('jwt');
              console.log('从LocalStorage中取出的JWT：');
              console.log(localJwt);

              // 获取服务器端响应的用户角色，并保存下来
              let userRole = response.data.data.role;
              localStorage.setItem('userRole', userRole);

              // 跳转到后台主页
              this.$router.push('/sys/home');
            } else {
              console.log('登录失败，用户名或密码错误！');
              this.$message.error('登录失败，用户名或密码错误！');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style>
body {
  background-color: #0f66bb !important;
}

.login {
  background-image: url("../../public/login_bg.png");
}
</style>