<template>
  <div class="modal-card">
    <div class="modal-card-body">
      <div class="media">
        <div class="media-content">
          <img src="~@/assets/img/cgyun-gw-logo-black-full.png" alt="Image" />
        </div>
      </div>
      <div class="text-center">
        <h4>v{{ appVersion }}</h4>

        <p>
          CGYun网关，提供安全、可靠的流量控制与数据服务 🚀
        </p>

<!--        <p>-->
<!--          Feel free to contribute on-->
<!--          <a @click="open('https://github.com/lauthieb/code-notes')">Github</a>-->
<!--          🍻-->
<!--        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { remote } from "electron";
export default {
  name: "cn-about-modal",
  data() {
    return {
      appVersion: remote.app.getVersion()
    };
  },
  methods:{
    open: function(link) {
    window.open(link, "_blank");
    }
  }
};
</script>

<style src="./AboutModal.scss" lang="scss"></style>
