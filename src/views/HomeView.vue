<template>
  <div>
    <!-- 整个页面 -->
    <el-container>
      <!-- 顶部 -->
      <el-header class="layout-header">
        <h1 class="title">权限管理平台</h1>
      </el-header>
      <!-- 下半部分 -->
      <el-container class="layout-body">
        <!-- 下半部分的左侧边栏 -->
        <el-aside class="layout-aside">
          <el-menu
              router
              :default-active="this.$router.currentRoute.path"
              class="el-menu-vertical-demo"
              background-color="#1684b0"
              text-color="#fff"
              active-text-color="#fff">
            <el-menu-item index="/sys/index">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/sys/user/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">添加用户</span>
              </el-menu-item>
              <el-menu-item index="/sys/user/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span slot="title">菜单管理</span>
              </template>
              <el-menu-item index="/sys/menu/month">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">月度</span>
              </el-menu-item>
              <el-menu-item index="/sys/menu/quarter">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">季度</span>
              </el-menu-item>
              <el-menu-item index="/sys/menu/year">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">年度</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 下半部分的右侧主体 -->
        <el-main>
          <!-- 将由其它视图组件显示右侧的主体部分 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TreeMenuView from "./sys-menu/TreeMenuView.vue";


export default {
  components: {
    TreeMenuView,
  },
  data() {
    return {
      role: "",
    };
  },
  created() {
    // 获取用户角色。这里假设用户角色已经存储在 localStorage 中，键名为 userRole
    this.role = localStorage.getItem("userRole");
  },
};

</script>

<style>
body {
  background-color: #fff !important;
}

.layout-header {
  background: #1684b0;
  line-height: 60px;
  font-size: 16px;
  color: #fff;
}

.title{
  margin: 0;
}

.layout-body {
  position: absolute;
  top: 69px;
  bottom: 0;
  left: 0;
  right: 0;
}

.layout-aside {
  background: #ADD8E6;
  margin-left: 8px;
}

.layout-aside i {
  color: #fff;
}

.el-menu-item.is-active {
  background-color: #2d3c4d !important;
}
</style>