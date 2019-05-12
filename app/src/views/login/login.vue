<template>
  <div class="login">
    <Card class="login-card" icon="md-log-in" title="欢迎登录" :bordered="false">
      <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="userName">
          <Input v-model="form.userName" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button class="login-button" @click="handleSubmit" type="primary" long>登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script src="./login.js">
</script>

<style scoped src="./login.css">
</style>