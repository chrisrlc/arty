<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title has-text-centered">
            Login
          </h1>

          <Notification v-if="formError()" :message="formError()" />

          <UserAuthForm :user="user" button-text="Login" :submit-form="userLogin" :errors="errors" />

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
      errors: [],
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    async userLogin (userInfo) {
      try {
        await this.$auth.loginWith('local', { data: userInfo })
        await this.$router.push('/art')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    },
    formError () {
      const error = this.errors.find(error => !Object.keys(this.user).includes(error.param))
      if (error) {
        return error.msg
      }
    }
  }
}
</script>
