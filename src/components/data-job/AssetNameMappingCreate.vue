<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">资产名称映射</p>
        <button
          type="button"
          class="delete"
          @click="$parent.close()"/>
      </header>
      <section class="modal-card-body">
        <b-field label="原名称">
          <b-input
            v-model="formProps.raw_name"
            placeholder="资产原名称"
            validation-message="资产原名称必填"
            required>
          </b-input>
        </b-field>

        <b-field label="新名称">
          <b-input
            v-model="formProps.new_name"
            placeholder="重命名后名称"
            validation-message="重命名后名称必填"
            required>
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <b-button
          label="关闭"
          @click="$parent.close()" />
        <b-button
          label="提交"
          type="is-primary"
          @click="submitMapping()" />
      </footer>
    </div>
  </form>

</template>

<script>
export default {
  name: "AssetNameMappingCreate",
  data() {
    return {
      formProps: {
        raw_name: '',
        new_name: ''
      },
    }
  },
  methods:{
    submitMapping() {
      if (this.formProps.raw_name.trim().length==0 ||
          this.formProps.new_name.trim().length==0) {
        return
      }
      alert("1111")
    }
  }
}
</script>

<style scoped>

</style>
