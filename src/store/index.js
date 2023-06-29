import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: [] // 用于保存菜单数据
  },
  getters: {
    menus: state => state.menus // 获取菜单数据
  },
  mutations: {
    setMenus: (state, menus) => (state.menus = menus) // 设置菜单数据
  },
  actions: {
  },
  modules: {
  }
})