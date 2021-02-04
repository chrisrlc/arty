<template>
  <section class="section">
    <h1 class="title">
      Add new art to your inventory
    </h1>

    <Notification v-if="formError()" :message="formError()" />

    <ArtForm :submit-form="addWork" cancel-button-text="Cancel" :work="work" :errors="errors" @failed="setError" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      work: {},
      errors: []
    }
  },
  methods: {
    async addWork (workInfo) {
      try {
        await this.$axios.post('/art', workInfo)
        await this.$router.push('/art')
      } catch (err) {
        this.setError(err.response.data.errors)
      }
    },
    formError () {
      const error = this.errors.find(error => error.param === 'misc')
      if (error) {
        return error.msg
      } else if (this.errors.length) {
        return 'Your changes could not be saved! Scroll down to fix errors.'
      }
    },
    setError (responseErrors) {
      this.errors = responseErrors
      window.scrollTo(0, 0)
    }
  }
}
</script>
