import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义应用程序的初始状态,state里面必须有原始值才能响应,新添加的属性不能响应修改,所以给个null
    state: {
        token: null,
        roles: [],
        currIndex: null
    },
    // 可以修改状态的方法(响应式)
    mutations: {
        loginIn(state, token, roles) {
            state.token = token;
            state.roles = roles;
        },
        setCurrIndex(state, currIndex) {
            state.currIndex = currIndex
        }
    }
})
export default store;