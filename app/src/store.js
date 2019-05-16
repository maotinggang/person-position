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
    historyList: [],
    config: {},
    playSpeed: 1000,
    polylineControl: { start: 0, end: 0 }
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
    setHistoryList(state, data) {
      state.historyList = array.concat(state.historyList, data)
    },
    clearHistoryList(state) {
      state.historyList = []
    },
    playSpeed(state, value) {
      state.playSpeed = value * 200
    },
    getConfig(state, data) {
      state.config = data
    },
    setPolylineControlEnd(state, data) {
      state.polylineControl.end = data
    },
    setPolylineControlStart(state) {
      state.polylineControl.start++
    },
    setPolylineControl(state) {
      state.polylineControl = { start: 0, end: 0 }
      if (state.historyList[0]) {
        state.historyList = collection.sortBy(state.historyList, ['time'])
        state.historyList.forEach((value, key) => {
          state.historyList[key].no = key + 1
        })
      }
    }
  },
  actions: {}
})
