<template>
  <aside class="menu">
    <p class="menu-label">
      导航
    </p>
    <ul class="menu-list">
      <li>
        <a
          :class="{ 'is-active': getMenuIndex==0 }"
          @click="selectMenuSidebar(0)"
        >首页
          <b-icon icon="home" class="is-pulled-right"></b-icon>
        </a>
      </li>
      <li>
        <a
          :class="{ 'is-active': getMenuIndex==1 }"
          @click="selectMenuSidebar(1)"
          >白名单
          <b-icon icon="wifi" class="is-pulled-right"></b-icon>
        </a>
      </li>
      <li>
        <a
          :class="{ 'is-active': getMenuIndex==2 }"
          @click="selectMenuSidebar(2)"
          >数据管理
          <b-icon icon="tasks" class="is-pulled-right"></b-icon>
        </a>
      </li>

      <li>
        <a
          :class="{ 'is-active': getMenuIndex==3 }"
          @click="selectMenuSidebar(3)"
        >渲染管理
          <b-icon icon="cloud-upload" class="is-pulled-right"></b-icon>
        </a>
      </li>

    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cn-sidebar",
  methods: {
    ...mapActions(["selectLanguage","loadDomainList"]),
    selectLanguageSidebar(language) {
      this.selectLanguage(language);
    },
    selectMenuSidebar(menuIndex) {
      this.$store.commit("SET_MENU_INDEX",menuIndex)
      if (menuIndex ==0) {
        this.$router.push("/").catch(()=>{});
      } else if (menuIndex ==1) {
        this.loadDomainList()
        this.$router.push("/white").catch(()=>{});
      } else if (menuIndex ==2) {
        this.$router.push("/datajob").catch(()=>{});
      }
    },
  },
  computed: {
    ...mapGetters([
      "languages",
      "getMenuIndex"
    ])
  }
};
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  top: 48px;
  width: 22%;
  margin-top: 24px;

  li {
    margin: 5px 0;

    a {
      padding-bottom: 11px !important;
    }
  }

  #menu-list-languages {
    overflow: scroll;
    max-height: 52vh;
  }

  @media (min-height: 500px) {
    #menu-list-languages {
      overflow: auto;
      max-height: 52vh;
    }
  }

  @media (min-height: 550px) {
    #menu-list-languages {
      overflow: auto;
      max-height: 55vh;
    }
  }

  @media (min-height: 600px) {
    #menu-list-languages {
      overflow: auto;
      max-height: 59vh;
    }
  }

  @media (min-height: 650px) {
    #menu-list-languages {
      overflow: auto;
      max-height: 61vh;
    }
  }

  @media (min-height: 700px) {
    #menu-list-languages {
      overflow: auto;
      max-height: 64vh;
    }
  }

  @media (min-height: 800px) {
    #menu-list-languages {
      overflow: auto;
      max-height: 70vh;
    }
  }
}
</style>
