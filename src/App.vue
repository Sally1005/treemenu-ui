<template>
  <div id="app">
    <!--搜索框开始-->
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-input v-model="menuName"  placeholder="请输入内容"></el-input>
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
      menuName:"",
      data: [],
      defaultProps: {
        label: 'menuName'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    search() {
      axios.get('http://localhost:8080/treeMenu/selectByMenuName?menuName='+this.menuName)
          .then(response => {
            console.log(response);
        this.data = response.data.data.items;
      })
        .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    axios.get('http://localhost:8080/treeMenu/getMenuTree')
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

