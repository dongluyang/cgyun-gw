<template>
<div>
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
    <asset-name-mapping-create></asset-name-mapping-create>
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
  components: {
    // ModalForm
    'asset-name-mapping-create':AssetNameMappingCreate,
    'asset-name-mapping-upload':AssetNameMappingUpload
  },
  data() {
    return {
      formProps: {
        raw_name: '',
        new_name: ''
      },
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
