import Vue from 'vue'
import Vuex from 'vuex'
import collection from 'lodash/collection'
import array from 'lodash/array'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    selected: {},
    checked: [],
    historyList: []
  },
  mutations: {
    listInit(state, devices) {
      state.list = devices
    },
    listAdd(state, device) {
      state.list.push(device)
    },
    listDelete(state, id) {
      state.list = collection.reject(state.list, { id: id })
    },
    listUpdate(state, device) {
      state.list = collection.reject(state.list, { id: device.id })
      state.list.push(device)
    },
    deviceSelected(state, device) {
      state.selected = collection.find(state.list, { name: device[0].title })
    },
    deviceChecked(state, devices) {
      state.checked = []
      if (devices[0]) {
        devices = collection.reject(devices, { nodeKey: 0 })
        devices.forEach(element => {
          state.checked.push(
            collection.find(state.list, {
              name: element.title
            })
          )
        })
      }
    },
    getHistoryList(state, data) {
      state.historyList = array.concat(state.historyList, data)
    },
    clearHistoryList(state) {
      state.historyList = []
    }
  },
  actions: {}
})
