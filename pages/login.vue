<template>
  <div>
    <h1 class="title">
      Login
    </h1>
    <UserAuthForm buttonText="Login" :submitForm="userLogin" />
  </div>
</template>

<script>
export default {
  methods: {
    // userLogin (userInfo) {
    //   this.$auth.loginWith('local', { data: userInfo })
    // }
    async userLogin (userInfo) {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: userInfo.email,
            password: userInfo.password
          }
        })
        console.log('cool')
        console.log(response)
      } catch (err) {
        console.log('oh no login error')
        console.log(err)
      }
    }
  }
}
</script>
