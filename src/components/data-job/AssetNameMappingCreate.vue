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
            v-model="formProps.rawName"
            placeholder="资产原名称"
            validation-message="资产原名称必填"
            required>
          </b-input>
        </b-field>

        <b-field label="新名称">
          <b-input
            v-model="formProps.newName"
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
  props:{
    projectId:Number
  },
  data() {
    return {
      formProps: {
        rawName: '',
        newName: ''

      },
    }
  },
  methods:{
    submitMapping() {
      if (this.formProps.rawName.trim().length==0 ||
          this.formProps.newName.trim().length==0) {
        return
      }
      this.$http.post("http://cgyun.cn/cgproxy/system/rename",
        {projectId:this.projectId,...this.formProps},{headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQzMTg2NjIsInVzZXJfbmFtZSI6Inp5IiwianRpIjoiNDg0ZGYxMTQtZjhmYy00Yzg4LWJkZGEtZmUzNTIwNDZhNGQwIiwiaWRlbnRpdHkiOiJ6eSIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.1dQgMbWSqVSIZVUam9KdMpXj4VEyc35EljdF6fAm5BQ"}}).then(response=>{
        const res = response.data
        if (res.code==200) {
          this.$buefy.toast.open({
            message: '添加成功!',
            type: 'is-success'
          })
          this.$emit("addEvent")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
