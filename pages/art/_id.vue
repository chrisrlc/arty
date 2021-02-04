<template>
  <section class="section">
    <h1 class="title">
      Edit art details
    </h1>

    <Notification v-if="formError()" :message="formError()" />

    <ArtForm :submit-form="editWork" cancel-button-text="Back" :work="work" :errors="errors" @failed="setError" />
  </section>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    const res = await $axios.get(`/art/${params.id}`)
    return { work: res.data }
  },
  data () {
    return {
      errors: []
    }
  },
  methods: {
    async editWork (workInfo) {
      try {
        await this.$axios.post(`/art/${this.work.id}`, workInfo)
        // TODO: success notification
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
