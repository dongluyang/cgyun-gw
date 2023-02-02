<template>
  <div class="container">
    <b-field
      label="我的团队">
      <b-select icon="cloud" @input="listProjects"  v-model="clientId" placeholder="请选择一个团队" expanded>
        <option v-for="t in this.teamList" :value="t.clientId" :key="t.id">{{t.groupName}}</option>
      </b-select>
    </b-field>
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
      <login-modal @hasSuccessDone="closeLoginDialog"></login-modal>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
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
    projectList:[],
    clientId:null
  }
},
  mounted() {
    if (this.accessToken ==null) {
      this.loginModalActive = true
    } else {
      this.listProjects()
    }
  },
  methods: {
    async listProjects() {
        if (this.clientId!=null) {
          this.projectList = await window.ipcRenderer.invoke('project:list',
            {clientId: this.clientId,accessToken:this.accessToken}).catch( err => {
            alert(err)
          });
          if (this.projectList instanceof Error) {
            this.loginModalActive = true
          } else {
            this.loginModalActive = false
          }
        }
    },
    selectProject(project) {
      this.$emit('selectProject', project)
    },
    closeLoginDialog() {
      this.loginModalActive = false
    }
  },
  computed: {
    ...mapGetters([
      "accessToken",
      "teamList"
    ]),
  },
}
</script>

<style scoped>

</style>
