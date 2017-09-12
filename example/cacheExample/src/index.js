/**
 * Created by yuanqiangniu on 2017/9/12.
 */
import vuex from 'vuex'
import Vue from 'vue'
import debug from 'debug'
import cachePlugin from '../../../src/index'

Vue.use(vuex)

const cl = debug('index')

const LOAD_DATE = 'LOAD_DATE'

const eleApp = document.querySelector('#app')

const store = new vuex.Store({
  actions: {
    loadDate({ commit }, payload) {
      setTimeout(() => {
        const data = {
          data: `data${Date.now()}`
        }
        commit(LOAD_DATE, data)
      }, 1000)
    }
  },
  mutations: {
    [LOAD_DATE](state, payload) {
      cl('commit a mutation')
      eleApp.innerHTML = payload.data
    }
  },
  plugins: [cachePlugin({ longTermCaching: true , key: 'cache_example'})]
})

store.dispatch('loadDate', { cacheData: true })