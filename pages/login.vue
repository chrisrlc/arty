<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title has-text-centered">
            Login
          </h1>

          <Notification v-if="error" :message="error" />

          <UserAuthForm button-text="Login" :submit-form="userLogin" />

          <div class="has-text-centered" style="margin-top: 20px">
            Don't have an account?
            <NuxtLink to="/signup">
              Sign Up
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: 'guest',
  data () {
    return {
      error: ''
    }
  },
  methods: {
    async userLogin (userInfo) {
      try {
        await this.$auth.loginWith('local', { data: userInfo })
        await this.$router.push('/art')
      } catch (err) {
        this.error = err.response.data.message
      }
    }
  }
}
</script>
