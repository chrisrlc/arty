<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title has-text-centered">
            Sign Up
          </h1>

          <Notification v-if="formError()" :message="formError()" />

          <UserAuthForm :user="user" button-text="Sign Up" :submit-form="userSignup" :check-tos="true" :errors="errors" />

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account?
            <NuxtLink to="/login">
              Log in
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
        password: null,
        agreeToTerms: false
      }
    }
  },
  methods: {
    async userSignup (userInfo) {
      try {
        await this.$axios.post('/auth/register', userInfo)
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
