<template>
  <nav>
    <img
      class="logo"
      src="~@/assets/img/cgyun-gw-logo-white-full.png"
      alt="CGYun logo"
    />

<!--    <div class="is-pulled-right">-->
<!--      <a-->
<!--        id="github"-->
<!--        @click="open('https://github.com/lauthieb/code-notes')"-->
<!--        title="Github"-->
<!--      >-->
<!--        <b-icon icon="github"></b-icon>-->
<!--      </a>-->
<!--    </div>-->

    <div class="is-pulled-right">
      <a id="help" @click="aboutModalActive = true" title="About">
        <b-icon icon="info-circle"></b-icon>
      </a>
    </div>

    <div class="is-pulled-right" v-if="fullName==''">
      <a id="login" @click="loginModalActive = true" title="Login">
        <b-icon icon="sign-in"></b-icon>
      </a>
    </div>


    <div class="is-pulled-right" v-if="fullName!=''">
      <a id="logout" @click="logoutHandle" title="Logout">
        {{fullName}}
        <b-icon icon="sign-out"></b-icon>
      </a>
    </div>



    <b-modal :active.sync="aboutModalActive" has-modal-card>
      <cn-about-modal></cn-about-modal>
    </b-modal>

    <b-modal :active.sync="helpTokenModalActive" has-modal-card>
      <cn-help-token-modal></cn-help-token-modal>
    </b-modal>

    <b-modal :active.sync="loginModalActive" has-modal-card>
      <login-modal @hasSuccessDone="loginModalActive=false"></login-modal>
    </b-modal>


  </nav>
</template>

<script>
// eslint-disable-next-line
import { remote } from "electron";
import HelpTokenModal from "./components/modals/help-token-modal/HelpTokenModal";
import AboutModal from "./components/modals/about-modal/AboutModal";
import LoginModal from "@/components/modals/login-modal/LoginModal";
import { mapGetters } from "vuex";
export default {
  name: "cn-navbar",
  components: {
    "cn-help-token-modal": HelpTokenModal,
    "cn-about-modal": AboutModal,
    "login-modal": LoginModal
  },
  data() {
    return {
      helpTokenModalActive: false,
      loginModalActive:false,
      aboutModalActive: false
    };
  },
  computed:{
    ...mapGetters(["userName"]),
    fullName() {
      return this.userName;
    }
  },
  methods: {
    open: function(link) {
    window.open(link, "_blank");
    },
    logoutHandle() {

      this.$buefy.dialog.confirm({
        title:"注销",
        message: '你确定要退出登录吗？',
        confirmText: "确定",
        cancelText: "取消",
        type: "is-info",
        hasIcon: true,
        onConfirm: () => {
          this.$store.commit('LOGOUT')
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  -webkit-app-region: drag;
  background-color: $primary;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  .logo {
    padding: 10px 10px 4px 10px;
    width: 110px;
    position: relative;
    left: 4%;
  }

  #about-code-notes,
  #github,
  #login,
  #logout,
  #help {
    color: $light;
    position: relative;
    top: 20px;
    right: 20px;
  }

  .modal {
    .media-content {
      text-align: center;
    }

    img {
      width: 250px;
    }

    .badge {
      width: 160px;
    }
  }
}
</style>
