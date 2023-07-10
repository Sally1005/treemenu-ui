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
            <el-menu-item index="/sys/home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu v-for="(menu, num) in menuList" :key="num" :index="num + ''">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>{{menu.menuName}}</span>
              </template>
              <el-menu-item v-for="(cmenu, cnum) in menu.children" :index="cmenu.path">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">{{cmenu.menuName}}</span>
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
      menuList: ""
    };
  },
  created() {
    // 获取用户角色。这里假设用户角色已经存储在 localStorage 中，键名为 userRole
    this.role = localStorage.getItem("userRole");
    this.menuList = JSON.parse(localStorage.getItem("menuList"));
    console.log(this.menuList)
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