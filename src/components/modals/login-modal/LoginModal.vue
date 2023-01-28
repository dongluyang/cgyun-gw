<template>
  <div class="modal-card">
    <div class="modal-card-body">
      <b-field>
        <b-input placeholder="请输入用户名" icon="user"></b-input>
      </b-field>
      <b-field>
        <b-input type="password"
                 placeholder="请输入密码" icon="lock" >
        </b-input>
      </b-field>
      <b-field>
        <b-button type="is-primary">登录</b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
name: "LoginModal"
}
</script>

<style scoped>

</style>
