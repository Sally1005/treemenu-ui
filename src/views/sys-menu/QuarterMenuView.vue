<template>
  <div>
    <h1>Quarter Menu View</h1>
    <el-tree
        :data="menuItems"
        :props="{ label: 'menuName'}"
    ></el-tree>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuarterMenuView",
  data() {
    return {
      menuItems: []
    };
  },
  async created() {
    const res = await axios.get('/sys/menu/quarter');
    this.menuItems = res.data.data.menus;
  },
};
</script>

<style scoped>

</style>