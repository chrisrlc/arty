<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title has-text-centered">
            Sign Up
          </h1>
          <Notification v-if="error" :message="error" />
          <UserAuthForm buttonText="Sign Up" :submitForm="userSignup" :checkTos="true" />
          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account?
            <NuxtLink to="/login">
              Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // middleware: 'guest',
  data () {
    return {
      error: null
    }
  },
  methods: {
    async userSignup (userInfo) {
      try {
        await this.$axios.post('/api/auth/register', {
          email: userInfo.email,
          password: userInfo.password
        })

        const response = await this.$auth.loginWith('local', {
          data: {
            email: userInfo.email,
            password: userInfo.password
          }
        })
        console.log(response)

        this.$router.push('/')
      } catch (err) {
        console.log('oh no signup error')
        console.log(err)
      }
    }
  }
}
</script>
