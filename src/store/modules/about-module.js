export default {
  namespaced: true,
  state: {
    aboutText: 'about-texxxxxx'
  },
  mutations: {
    updateText (state, text) {
      console.log('a.state', state)
      state.text = text
    }
  },
  getters: {
    textPlus (state, getters, rootState) {
      return state.text + rootState.b.text
    }
  }
  // actions: {
  //   add ({ state, commit, rootState }) {
  //     commit('updateCount', { num: 56789 }, { root: true })
  //   }
  // }
}
