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
    paginated
    backend-pagination
    :total="total"
    :per-page="perPage"
    @page-change="onPageChange"
    :current-page.sync="currentPage">
    <template slot-scope="props">
      <b-table-column  field="id" label="ID" width="40">
        {{props.row.id}}
      </b-table-column>
      <b-table-column  field="rawName" label="原名称">
        {{props.row.rawName}}
      </b-table-column>
      <b-table-column  field="newName" label="新名称">
        {{props.row.newName}}
      </b-table-column>
      <b-table-column field="action" label="操作" width="200">
        <div class="buttons">
          <b-button type="is-danger" size="is-small" @click="deleteAssetRename(props.row.id)">删除</b-button>
        </div>
      </b-table-column>
    </template>
  </b-table>
</div>
</template>

<script>
import AssetNameMappingCreate from "./AssetNameMappingCreate";
import AssetNameMappingUpload from './AssetNameMappingUpload'
export default {
  name: "asset-name-mapping",
  props:{
    project:Object
  },
  components: {
    'asset-name-mapping-create':AssetNameMappingCreate,
    'asset-name-mapping-upload':AssetNameMappingUpload
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      isPaginationSimple: false,
      isPaginationRounded: false,
      isAdd: false,
      total:0,
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
          field: "rawName",
          label: "原名称",
          centered: true,
          sticky: true,
          headerClass: "is-sticky-column-two",
          cellClass: "is-sticky-column-two"
        },
        {
          field: "newName",
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
    async addEventHandler() {
      let result = await window.ipcRenderer.invoke('asset:list',
        {projectId:this.project.id,page:this.currentPage,pageSize:this.perPage})
      this.data = result.list
      this.total = result.total
      this.isAdd = false
    },
    async deleteAssetRename(id) {

      this.$buefy.dialog.confirm({
        title: '删除重命名',
        message: '你确定要 <b>删除</b> 这个资产重命名吗? ',
        confirmText: '删除',
        cancelText: '取消',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          let code = await window.ipcRenderer.invoke('asset:delete', id)
          if (code == 200) {
            this.currentPage = 1
            let result = await window.ipcRenderer.invoke('asset:list',
              {projectId:this.project.id,page:this.currentPage,pageSize:this.perPage})
            this.data = result.list
            this.total = result.total
          }
        }
      })

    },
    /*
     * Handle page-change event
     */
    onPageChange(page) {
      this.currentPage = page
      this.addEventHandler()
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    async project(oldValue, newValue) {
      // this.$http.get("http://cgyun.cn/cgproxy/system/rename/list",
      //   {projectId: this.project.id}, {headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQyMDg2MDksInVzZXJfbmFtZSI6ImRlbW91c2VyIiwianRpIjoiMzM1MTljMmUtMWIzNS00ZTBmLTkzNjgtZWYyYWJiNGJjNTE3IiwiaWRlbnRpdHkiOiJkZW1vdXNlciIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.UHcEux9e4by1xpTLzuyMeN-NeMS6mKWbmklawzbAYcU"}}).then(response => {
      //   const res = response.data
      //   this.data = res.data
      // })
      await this.addEventHandler()
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
