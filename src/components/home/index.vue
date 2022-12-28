<template>
  <div id="notes-list" style="margin-top: 72px;">
    <b-tabs>
      <b-tab-item label="Socks代理" icon="share">
        {{this.proxies['socks']}}
        <b-button type="button"
                  size="is-small"
                  icon-right="copy"
                v-clipboard:copy="this.proxies['socks']"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"></b-button>
      </b-tab-item>
      <b-tab-item label="Http(s)代理" icon="yelp">{{this.proxies['proxy']}}

        <b-button type="button"
                  size="is-small"
                  icon-right="copy"
                  v-clipboard:copy="this.proxies['proxy']"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"></b-button>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>

export default {
  name: "home-page",
  data() {
    return {
      proxies:{}
    };
  },
  mounted() {
    this.$http.get("http://127.0.0.1:9300/list_proxy").then(response=>{
      this.proxies = response.data.Value;
    })
  },
  methods: {
    onCopy: function (e) {
      this.$buefy.toast.open({
        message: '你刚刚复制了'+e.text,
        type: 'is-success'
      })
    },
    onError: function (e) {
      console.log(e.text)
      this.$buefy.toast.open({
        message: '你刚刚复制失败了！',
        type: 'is-danger'
      })
    }
  }
};
</script>
