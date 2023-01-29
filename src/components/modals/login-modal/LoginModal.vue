<template>
  <div class="modal-card">
    <div class="modal-card-body">
      <b-field>
        <b-input v-model="formProps.userName" placeholder="请输入用户名" icon="user"></b-input>
      </b-field>
      <b-field>
        <b-input v-model="formProps.password" type="password"
                 placeholder="请输入密码" icon="lock" >
        </b-input>
      </b-field>
      <b-field>
        <b-button type="is-primary" @click="doLogin">登录</b-button>
      </b-field>
      <b-field>
        <div style="color: red">{{msg}}</div>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
name: "LoginModal",
data() {
    return {
      account:null,
      msg:"",
      formProps: {
        userName: '',
        password: ''
      },
    }
},
methods: {
    async doLogin() {
      this.account = await window.ipcRenderer.invoke('account:login',
        this.formProps).catch( err => {
        alert(err)
      });
      if (!(this.account instanceof Error)){
        this.msg = ""
        this.$emit('hasSuccessDone', true)
        window.localStorage.setItem("account",JSON.stringify(this.account))
      } else {
        this.msg = this.account.message
      }
    },
  }
}
</script>

<style scoped>

</style>
