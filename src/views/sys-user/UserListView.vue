<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%" :fit="false">
      <el-table-column prop="id" label="ID" align="center" width="240"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center" width="240"></el-table-column>
      <el-table-column prop="nickName" label="昵称" align="center" width="240"></el-table-column>
      <el-table-column label="是否启用" align="center" width="200">
        <template slot-scope="scope">
          <el-switch
              @change="changeEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle
                     @click="handleEdit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    changeEnable(user) {
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:8081/users/' + user.id;
      if (user.enable == 1) {
        url += '/enable';
      } else {
        url += '/disable';
      }
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        if (responseBody.state == 20000) {
          this.$message({
            message: '将【' + user.userName + '】的启用状态设置为【' + enableText[user.enable] + '】成功',
            type: 'success'
          });
        } else {
          // this.$message.error(responseBody.message);
          let title = '操作失败';
          this.$alert(responseBody.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.loadUserList();
            }
          });
        }
      });
    },
    handleEdit(user) {
      let title = '提示';
      let message = '您正在尝试编辑【' + user.id + '-' + user.userName + '】的管理员详情，抱歉，此功能尚未实现……';
      this.$alert(message, title, {
        confirmButtonText: '确定'
      });
    },
    openDeleteConfirm(user) {
      let title = '提示';
      let message = '此操作将永久删除【' + user.userName + '】管理员，是否继续？';
      this.$confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(user);
      }).catch(() => {
      });
    },
    handleDelete(user) {
      console.log('handleDelete ... id=' + user.id);
      let url = 'http://localhost:8081/users/' +user.id + '/delete';
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        this.loadUserList();
      });
    },
    loadUserList() {
      console.log('loadUserList ...');
      let url = 'http://localhost:8081/users';
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        this.tableData = responseBody.data;
      });
    }
  },
  mounted() {
    this.loadUserList();
  }
}
</script>

<style scoped>

</style>