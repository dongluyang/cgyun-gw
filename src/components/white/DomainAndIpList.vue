<template>
  <div style="margin-top: 72px;">

    <b-tabs v-model="activeTab">
      <b-tab-item label="域名">
        <b-button size="is-small" icon-left="save" type="is-primary" @click="updateDomains">
          保存
        </b-button>
        <b-field label="Add some domains">
          <b-taginput
            v-if="refresh"
            v-model="tags"
            ellipsis
            icon="label"
            placeholder="添加一个域名"
            aria-close-label="删除这个域名">
          </b-taginput>
        </b-field>
      </b-tab-item>

      <b-tab-item label="IP">
      </b-tab-item>

    </b-tabs>


  </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  name: "DomainAndIpList",
  data() {
    return {
      activeTab: 0,
      tags:[],
      refresh:false
    }
  },
  mounted() {
    this.refresh = false
    this.tags = this.domainList
    this.refresh = true
  },
  methods: {
    // ...mapActions(["postDomains"]),
    // updateDomains() {
    //   this.postDomains({value:this.tags.join(",")}).then()
    // }
    updateDomains() {
        this.$http.post("http://127.0.0.1:9300/white_domain",{value:this.tags.join(",")}).then(response=>{
         this.$store.commit("SET_DOMAINLIST", response.data.Value);
         this.$buefy.toast.open({
            message: '更新成功!',
            type: 'is-success'
          })
       })
     }
  },
  computed: {
    ...mapGetters([
      "domainList"
    ]),
  },
}
</script>

<style scoped>

</style>
