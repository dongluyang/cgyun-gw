<template>
<div style="margin-top: 72px;">
  <div class="buttons">
    <b-button type="is-primary" size="is-small" @click="openFile">打开文件</b-button>
  </div>
  <b-table
    :data="data"
    :checked-rows.sync="checkedRows"
    :paginated="isPaginated"
    :per-page="perPage"
    :current-page.sync="currentPage"
    :pagination-simple="isPaginationSimple"
    :pagination-rounded="isPaginationRounded"
    checkable
    checkbox-position="left"
    checkbox-type="is-primary">
    <template slot-scope="props">
        <b-table-column  field="id" label="ID" width="40">
          {{props.row.id}}
        </b-table-column>
        <b-table-column  field="file_name" label="文件名">
          {{props.row.file_name}}
        </b-table-column>
        <b-table-column  field="file_size" label="文件大小">
          {{props.row.file_size}}
        </b-table-column>
        <b-table-column  field="upload_progress" label="进度">
          {{props.row.upload_progress}}
        </b-table-column>
          <b-table-column field="action" label="操作" width="200">
            <div class="buttons">
              <b-button type="is-primary" size="is-small" @click="uploadFile(props.row)" >上传</b-button>
              <b-button type="is-danger" size="is-small" @click="deleteFile(props.row)">删除</b-button>
            </div>
          </b-table-column>
    </template>
  </b-table>


</div>
</template>

<script>
export default {
name: "index",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      data:[],
      checkedRows:[],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'file_name',
          label: '文件名',
          centered: true
        },
        {
          field: 'file_size',
          label: '文件大小',
          centered: true
        },
        {
          field: 'upload_progress',
          label: '上传进度',
          centered: true
        },
      ]
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
   this.data =  await window.ipcRenderer.invoke('dialog:openFile')
    console.log(this.data)
  },
  deleteFile(row) {
    console.log(row)
  },
  uploadFile(row) {
    window.ipcRenderer.invoke('upload:start',row)
  }
}}
</script>

<style scoped>

</style>
