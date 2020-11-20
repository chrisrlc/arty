<template>
  <div>
    <h1 class="title">
      Sign Up
    </h1>
    <UserAuthForm buttonText="Sign Up" :submitForm="userSignup" :checkTos="true" />
  </div>
</template>

<script>
export default {
  methods: {
    async userSignup (userInfo) {
      try {
        console.log('before sign up')
        await this.$axios.post('/api/auth/register', {
          email: userInfo.email,
          password: userInfo.password
        })

        console.log('after sign up, before login')
        const response = await this.$auth.loginWith('local', {
          data: {
            email: userInfo.email,
            password: userInfo.password
          }
        })
        console.log('after signup + login')
        console.log(response)
      } catch (err) {
        console.log('oh no signup error')
        console.log(err)
      }
    }
  }
}
</script>
