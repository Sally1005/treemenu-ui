<template>
  <div id="app">
    <!--搜索框开始-->
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-input v-model="searchParam" placeholder="请输入名称"></el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!--tree组件-->
    <el-tree
      node-key="id"
      lazy
      :load="loadNode"
      :props="defaultProps"
      v-loading="list.loading"
      :data="treeData"
      ref="tree">
    </el-tree>
  </div>
</template>

<script>
import axios from 'axios';

// import mock from '../mock/mock.json'

export default {
  data() {
    return { // 在这里定义变量
      searchParam:"",
      list: {
        loading: false,
        isExpand: false
      },
      defaultProps: { // tree 控件的数据结构，需要设置 isLeaf
        children: 'children',
        label: 'menuName',
        isLeaf: 'isLeaf'
      },
      loading:false,
      treeData: []
    };
  },
  methods: {
   async loadNode(node, resolve) { // 懒加载时触发
      if (node.level === 0) {
        return resolve(await this.getRootItems())
      } else {
        return resolve(await this.getChildren(node.data.id))
      }
    },
    async getRootItems () {
      this.list.loading = true // 在这里进行mock测试，数据为mock.json中从后端拿回来的数据
      const res = await axios.get('/treeMenu'); // const res = mock;
      const data = res.data.data.menus; // const data = res.data.menus;
      data.forEach((item, index) => {
        item.id = item.menuId
      })
      this.list.loading = false;
      return data
    },

    async getChildren (menuId) {
      const res = await axios.get(`/treeMenu/${menuId}`);
      const data = res.data.data.menus;
      data.forEach((item, index) => {
        item.id = item.menuId
      })
      return data
    },

    async handleSearch () {
      // 根据参数判断是否开启懒加载
      this.$refs.tree.$data.store.lazy = !this.searchParam
      if (this.searchParam) {
        const res = await axios.get(`/treeMenu/search/${this.searchParam}`);
        const data = res.data.data.menus;
        this.treeData = data
      }
    }
  }
};
</script>

