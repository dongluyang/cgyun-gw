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
    <b-modal :active.sync="loginModalActive" has-modal-card>
      <login-modal @hasSuccessDone="listProjects"></login-modal>
    </b-modal>
  </div>
</template>

<script>
import LoginModal from "../modals/login-modal/LoginModal";
export default {
name: "RemoteProject",
  components: {
    "login-modal": LoginModal
  },
data(){
  return {
    loginModalActive: false,
    loading: false,
    projectList:[]
  }
},
  mounted() {
    this.listProjects()
  },
  methods: {
    async listProjects() {
      const accountStr = window.localStorage.getItem("account")
      if (accountStr!=null) {
        const account = JSON.parse(accountStr)
        this.projectList = await window.ipcRenderer.invoke('project:list',
          {clientId: "renyuteamcgteam",accessToken:account.accessToken}).catch( err => {
          alert(err)
        });
        if (this.projectList instanceof Error) {
          this.loginModalActive = true
        }
      } else {
        this.loginModalActive = true
      }
    },
    selectProject(project) {
      this.$emit('selectProject', project)
    }
  }
}
</script>

<style scoped>

</style>
