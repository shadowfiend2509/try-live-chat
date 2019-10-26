import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    LOGIN_SUCCESS (state, payload) {
      state.user = payload.user
      localStorage.setItem('token', payload.token)
    }
  },
  actions: {
    loginAction ( context, payload ) {
      console.log(payload)
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/login',
          data: {
            email: payload.email,
            password: payload.password
          },
        })
          .then(({data}) => {
            context.commit('LOGIN_SUCCESS', data)
            resolve(data);
          })
          .catch(reject)
      })
    }
  },
  modules: {
  }
})
