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
      localStorage.setItem('token', payload.token)
    },
    CHECK_LOGIN (state, payload) {
      state.user = payload
    }
  },
  actions: {
    loginAction ( context, payload ) {
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
    },
    checklogin (context, payload) {
        axios({
          method: 'get',
          url: 'http://localhost:3000/',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            context.commit('CHECK_LOGIN', data)
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  modules: {
  }
})
