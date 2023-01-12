<template>
  <div class="container">
      <div class="card" aria-id="contentIdForA11y3" :key="index" v-for="(project, index) in projectList" >
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            <template v-if="!loading">{{project.name}}</template>
            <b-skeleton size="is-large" :active="loading"></b-skeleton>
          </p>
        </div>
        <div class="card-content">
          <div class="content">
            <template v-if="!loading">
              <a>{{project.alias}}</a>.
            </template>
            <b-skeleton size="is-large" :active="loading" :count="2"></b-skeleton>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            <template v-if="!loading">选择</template>
            <b-skeleton size="is-large" :active="loading"></b-skeleton>
          </a>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
name: "RemoteProject",
data(){
  return {
    loading: false,
    projectList:[]
  }
},
  mounted() {
    this.listProjects()
  },
  methods: {
    listProjects() {
      this.$http.post("http://newsightcgteam.cgyun.cn:18889/cgteam/cgteam/getAllProjects").then(response=>{
        let obj = {};
        let res = response.data
        let data = res.reduce((cur, next) => {
          obj[next.project] ? '' : (obj[next.project] = true && (cur += next.project + ','));
          return cur;
        }, '');
        this.getParentProjectList(data,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzM4NDk5NzgsInVzZXJfbmFtZSI6Inp5IiwianRpIjoiMTZlNGE5ZGEtYWU5Mi00M2YwLTlmODYtYTNjNzI4YjE2ZDNiIiwiaWRlbnRpdHkiOiJ6eSIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.iWD3z4ziP2RSMoa0jofRJkCO-dbbR-Kka7CJdMPbnNQ")
      })
    },
    getParentProjectList(data,token) {

      this.$http.post("http://newsightcgteam.cgyun.cn:18889/cgteam/cgteam/getRemoteProject",
        { projects: data, token: token}).then(response=>{
        const res = response.data
        const list = res.data;
        for (let i = 0; i < list.length; i++) {
          this.projectList.push({
            id: i,
            name: list[i].name,
            alias: list[i].name,
            image: list[i].coverUrl,
          });
        }
      });

    }
  }
}
</script>

<style scoped>

</style>
