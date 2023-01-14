<template>
  <div class="container">
      <div class="card" aria-id="contentIdForA11y3" :key="index" v-for="(project, index) in projectList" >
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            <template v-if="!loading">{{project.alias}}({{project.name}})</template>
            <b-skeleton size="is-large" :active="loading"></b-skeleton>
          </p>
        </div>
        <div class="card-content">
          <div class="content">
            <template v-if="!loading">
              <img :src="project.image" />
            </template>
            <b-skeleton size="is-large" :active="loading" :count="2"></b-skeleton>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            <b-button type="is-primary" @click="selectProject(project)">选择</b-button>
<!--            <template v-if="!loading">选择</template>-->
<!--            <b-skeleton size="is-large" :active="loading"></b-skeleton>-->
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
    async listProjects() {
      // this.$http.post("http://cgyun.cn/cgproxy/system/project/getMyTeamProjects",
      //   {client_id:"renyuteamcgteam"},{headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQyMDg2MDksInVzZXJfbmFtZSI6ImRlbW91c2VyIiwianRpIjoiMzM1MTljMmUtMWIzNS00ZTBmLTkzNjgtZWYyYWJiNGJjNTE3IiwiaWRlbnRpdHkiOiJkZW1vdXNlciIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.UHcEux9e4by1xpTLzuyMeN-NeMS6mKWbmklawzbAYcU"}}).then(response=>{
      //   const res = response.data
      //   const list = res.data;
      //   for (let i = 0; i < list.length; i++) {
      //     this.projectList.push({
      //       id: list[i].project.id,
      //       name: list[i].project.name,
      //       alias: list[i].project.alias,
      //       image: list[i].content,
      //     });
      //   }
      // })
      this.projectList = await window.ipcRenderer.invoke('project:list',
        {clientId: "renyuteamcgteam"})
    },
    selectProject(project) {
      this.$emit('selectProject', project)
    }
  }
}
</script>

<style scoped>

</style>
