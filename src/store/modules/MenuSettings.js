const state = {
  menuIndex:0 ,
};

const mutations = {
  SET_MENU_INDEX(state, menuIndex) {
    state.menuIndex = menuIndex;
  },
};

const getters = {
  getMenuIndex: state => state.menuIndex,
};

export default {
  state,
  mutations,
  getters
};
