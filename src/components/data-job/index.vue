<template>
<div style="margin-top: 72px;">
  <button type="button" id="btn" @click="openFile">Open a File</button>
  File path: <strong>{{filePath}}</strong>
</div>
</template>

<script>
import router from "@/router";

export default {
name: "index",
  data() {
    return {
      filePath: "",
    }
  },
  mounted(){
    window.ipcRenderer.on("upload:data", (arg, event) => {
      console.log(arg)
      console.log(event)
    });
  },
methods: {
  async openFile() {
    window.ipcRenderer.invoke('dialog:openFile')
  }
}}
</script>

<style scoped>

</style>
