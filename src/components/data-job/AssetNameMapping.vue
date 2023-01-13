<template>
<div>
  <b-taglist v-if="project!=null">
    <b-tag type="is-info">{{project.alias}}</b-tag>
    <b-tag type="is-info">{{project.name}}</b-tag>
  </b-taglist>
  <div class="buttons">
    <b-button type="is-primary" size="is-small" @click="openDialog" >添加</b-button>
    <b-button type="is-primary" size="is-small" @click="importData" >导入</b-button>
  </div>

  <b-modal
    :active.sync="isAdd"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-label="Example Modal"
    close-button-aria-label="Close"
    aria-modal>
    <asset-name-mapping-create v-if="project!=null" :project-id="project.id" @addEvent="addEventHandler"></asset-name-mapping-create>
  </b-modal>

  <b-modal
    :active.sync="isBatchAdd"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-label="Example Modal"
    close-button-aria-label="Close"
    aria-modal>
    <asset-name-mapping-upload></asset-name-mapping-upload>
  </b-modal>



  <b-table
    :data="data"
    :columns="columns"
    :sticky-header="stickyHeaders"
  ></b-table>
</div>
</template>

<script>
// const ModalForm = {
//   props: ['canCancel'],
//   template: `
//             <form action="">
//                 <div class="modal-card" style="width: auto">
//                     <header class="modal-card-head">
//                         <p class="modal-card-title">资产名称映射</p>
//                         <button
//                             type="button"
//                             class="delete"
//                             @click="this.$emit('close')"/>
//                     </header>
//                     <section class="modal-card-body">
//                         <b-field label="原名称">
//                             <b-input
//                                 :value="raw_name"
//                                 placeholder="资产原名称"
//                                 required>
//                             </b-input>
//                         </b-field>
//
//                         <b-field label="新名称">
//                             <b-input
//                                 :value="new_name"
//                                 placeholder="重命名后名称"
//                                 required>
//                             </b-input>
//                         </b-field>
//
//                     </section>
//                     <footer class="modal-card-foot">
//                         <b-button
//                             label="关闭"
//                             @click="this.$emit('close')" />
//                         <b-button
//                             label="提交"
//                             type="is-primary"
//                             @click="submitMapping" />
//                     </footer>
//                 </div>
//             </form>
//         `
// }
import AssetNameMappingCreate from "./AssetNameMappingCreate";
import AssetNameMappingUpload from './AssetNameMappingUpload'
export default {
  name: "asset-name-mapping",
  props:{
    project:Object
  },
  components: {
    // ModalForm
    'asset-name-mapping-create':AssetNameMappingCreate,
    'asset-name-mapping-upload':AssetNameMappingUpload
  },
  data() {
    return {
      stickyHeaders: true,
      isAdd: false,
      isBatchAdd:false,
      data:[],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
          sticky: true,
          headerClass: "is-sticky-column-one",
          cellClass: "is-sticky-column-one"
        },
        {
          field: "raw_name",
          label: "原名称",
          centered: true,
          sticky: true,
          headerClass: "is-sticky-column-two",
          cellClass: "is-sticky-column-two"
        },
        {
          field: "new_name",
          label: "新名称",
          centered: true,
          sticky: true,
          headerClass: "is-sticky-column-two",
          cellClass: "is-sticky-column-two"
        },
      ]
    }
  },
  methods:{
    openDialog() {
      this.isAdd = true
    },
    importData() {
      this.isBatchAdd = true
    },
    addEventHandler() {
      this.$http.get("http://cgyun.cn/cgproxy/system/rename/list",
        {projectId:this.project.id},{headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQyMDg2MDksInVzZXJfbmFtZSI6ImRlbW91c2VyIiwianRpIjoiMzM1MTljMmUtMWIzNS00ZTBmLTkzNjgtZWYyYWJiNGJjNTE3IiwiaWRlbnRpdHkiOiJkZW1vdXNlciIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.UHcEux9e4by1xpTLzuyMeN-NeMS6mKWbmklawzbAYcU"}}).then(response=>{
        const res = response.data
        this.data = res.data
      })
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    project(oldValue, newValue) {
      this.$http.get("http://cgyun.cn/cgproxy/system/rename/list",
        {projectId: this.project.id}, {headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQyMDg2MDksInVzZXJfbmFtZSI6ImRlbW91c2VyIiwianRpIjoiMzM1MTljMmUtMWIzNS00ZTBmLTkzNjgtZWYyYWJiNGJjNTE3IiwiaWRlbnRpdHkiOiJkZW1vdXNlciIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.UHcEux9e4by1xpTLzuyMeN-NeMS6mKWbmklawzbAYcU"}}).then(response => {
        const res = response.data
        this.data = res.data
      })

    }
  }
}
</script>

<style scoped>
.is-sticky-column-one {
  background: #23d160 !important;
  color: white !important;
}
.is-sticky-column-two {
  background: #167df0 !important;
  color: white !important;
}
</style>
