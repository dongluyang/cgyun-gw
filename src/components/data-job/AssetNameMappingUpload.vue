<template>
<div>

  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">批量导入</p>
      <button
        type="button"
        class="delete"
        @click="$parent.close()"/>
    </header>
    <section class="modal-card-body">
      <b-button type="is-primary" size="is-small" @click="openFile">打开文件</b-button>
    </section>
    <footer class="modal-card-foot">
      <b-button
        label="关闭"
        @click="$parent.close()" />
      <b-button
        label="提交"
        type="is-primary"
         />
    </footer>
  </div>


</div>
</template>

<script>
export default {
  name: "AssetNameMappingUpload",
  data() {
    return {}
  },
  methods: {
    async openFile() {
      this.data = await window.ipcRenderer.invoke('dialog:openExcel')
      console.log(this.data)
    },
    deleteFile(row) {
      console.log(row)
    },
  }
}
</script>

<style scoped>

</style>
