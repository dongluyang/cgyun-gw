import Vue from 'vue'
const state = {
  domainList:[] ,
  ipList:[]
};

const mutations = {
  SET_DOMAINLIST(state, domainList) {
    state.domainList = domainList;
  },
  SET_IPLIST(state, ipList) {
    state.ipList = ipList;
  }
};

const actions = {
  loadDomainList(store) {
    return Vue.http.get("http://127.0.0.1:9300/white_domain").then(response=>{
      console.log(response.data.Value)
      store.commit("SET_DOMAINLIST", response.data.Value);
    })
  },
};

const getters = {
  domainList: state => state.domainList,
  ipList: state => state.ipList
};

export default {
  state,
  mutations,
  actions,
  getters
};
