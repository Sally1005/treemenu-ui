<template>
  <div id="app">
    <!-- router-view部分将由其它视图组件来完成显示 -->
    <!-- 具体取决于路由配置及访问的URL -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
