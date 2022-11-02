<template>
  <div>
    <h1>lazyMenu</h1>
    <el-tree :props="props"
             :load="loadNode"
             lazy
             show-checkbox>
    </el-tree>
  </div>

</template>

<script>
export default {
  name: "LazyMenuView",
  data () {
    return {
      props: {
        label: 'menuName',
        children: 'zones',
        isLeaf: 'leaf',
      },
      count:1,
    };
  },
  methods: {
    loadNode (node, resolve) {
      //如果展开第一级节点，从后台加载一级节点列表
      if (node.level == 0) {
        this.loadfirstnode(resolve);
      }
      //如果展开其他级节点，动态从后台加载下一级节点列表
      if (node.level >= 1) {
        this.loadchildnode(node, resolve);
      }
    },
    //加载第一级节点
    loadfirstnode (resolve) {

      this.api({
        url: "/test/tree",
        method: "post",

      }).then(data => {
        console.log(data);
        //this.data = data.list;
        return resolve(data.list);

      })
    },
    //加载节点的子节点集合
    loadchildnode (node, resolve) {
      this.api({
        url: "/test/tree2",
        method: "post",
        params: {
          id: node.data.id
        }
      }).then(data => {
        console.log(data);
        //this.defaultProps.children = data.list;
        return resolve(data.list);

      })
    }

  }

}
</script>

<style scoped>

</style>
