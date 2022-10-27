<template>
  <div id="app">
    <!--搜索框开始-->
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-input v-model="wd"  placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!--tree组件-->
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<router-view/>

<script>
import axios from 'axios';

export default {
  data() {
    return { // 在这里定义变量
      wd:"",
      input: '',
      data: [],
      defaultProps: {
        children: 'treeMenu',
        label: 'menuName'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    search() {
      axios.get('http://localhost:8080/treeMenu/selectByWd?wd='+this.wd)
          .then(response => {
            console.log(response);
        this.data = response.data.data.items
      })
        .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    axios.get('http://localhost:8080/treeMenu/selectAllWithTree')
        .then(response => {
          console.log(response);
          this.data = response.data.data.items;
        })
        .catch(error => {
          console.log(error);
        });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
