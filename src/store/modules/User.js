const state = {
  userName: window.localStorage.getItem('userName') == null ? '':window.localStorage.getItem('userName') ,
  accessToken: window.localStorage.getItem('account') == null ? '' : JSON.parse(window.localStorage.getItem('account')).accessToken,
  teamList:window.localStorage.getItem('account') == null ? '' : JSON.parse(window.localStorage.getItem('account')).teams
};

const mutations = {
  SET_USERNAME(state, userName) {
    window.localStorage.setItem("userName",userName)
    state.userName = userName;
  },
  SET_ACCOUNT(state,account) {
    window.localStorage.setItem("account",JSON.stringify(account))
    state.accessToken = account.accessToken
    state.teamList = account.teamList
  },
  SET_TEAMLIST(state, teamList) {
    state.teamList = teamList;
  },
  SET_ACCESSTOKEN(state,accessToken) {
    state.accessToken = accessToken
  },
  LOGOUT(state){
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('account');
    state.userName = '';
    state.accessToken = '';
    state.teamList = [];
  },
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
