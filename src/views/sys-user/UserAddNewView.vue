<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
            v-model="ruleForm.enable"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ccc">
        </el-switch>
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择">
          <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      ruleForm: {
        userName: '',
        password: '',
        nickName: '',
        description: '',
        enable: '',
        roleIds: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 25 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        enable: [
          {required: true, message: '', trigger: 'change'}
        ],
        roleIds: [
          {type: 'array', required: true, message: '请选择角色', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    loadRoleList() {
      let url = 'http://localhost:8081/roles';
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let responseBody = response.data;
        this.roleList = responseBody.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:8081/users/add-new';
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData：' + formData);
          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
              .post(url, formData).then((response)=> {
            let responseBody = response.data;
            if (responseBody.state === 20000) {
              this.$message({
                message: '添加管理员成功！',
                type: 'success'
              });
              this.resetForm(formName);
            } else {
              this.$message.error(responseBody.message);
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
    }
  },
  mounted() {
    this.loadRoleList();
  }
}
</script>

<style scoped>

</style>