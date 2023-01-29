const state = {
  userName: window.localStorage.getItem('userName') == null ? '':window.localStorage.getItem('userName') ,
  accessToken: window.localStorage.getItem('account') == null ? '' : JSON.parse(window.localStorage.getItem('account')).accessToken,
  teamList:[]
};

const mutations = {
  SET_USERNAME(state, userName) {
    window.localStorage.setItem("userName",userName)
    state.userName = userName;
  },
  SET_TEAMLIST(state, teamList) {
    state.teamList = teamList;
  },
  SET_ACCESSTOKEN(state,accessToken) {
    state.accessToken = accessToken
  }
};


const getters = {
  userName: state => state.userName,
  teamList: state => state.teamList,
  accessToken:state => state.accessToken
};

export default {
  state,
  mutations,
  getters
};
