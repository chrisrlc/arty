<template>
  <section class="section">
    <h1 class="title">
      Edit {{ work.title || 'Untitled Artwork' }}
    </h1>

    <Notification v-if="notification" :message="notification" :success="success" @clearNotification="notification = ''" />

    <ArtForm
      :submit-form="editWork"
      cancel-button-text="Back"
      :work="work"
      :saving="saving"
      :errors="errors"
      @failed="setError"
    />
  </section>
</template>

<script>
export default {
  async asyncData ({ params, $axios, error }) {
    try {
      const res = await $axios.get(`/art/${params.id}`)
      return { work: res.data }
    } catch (err) {
      error({ statusCode: err.response.status })
    }
  },
  data () {
    return {
      errors: [],
      saving: false,
      success: this.$route.query.created,
      notification: this.$route.query.created ? `${this.$route.query.created} has been created!` : ''
    }
  },
  methods: {
    async editWork (workInfo) {
      try {
        // Set loading icon on Save button
        this.saving = true

        // Update work
        await this.$axios.post(`/art/${this.work.id}`, workInfo)

        // Set success notification
        this.setNotification(true, `${this.work.title || 'Your untitled artwork'} has been updated!`)

        // Clear any errors
        this.errors = []

        // Repopulate form fields from db in case of changes during update, e.g. acquisitionCost decimal rounding
        const res = await this.$axios.get(`/art/${this.work.id}`)
        this.work = res.data
      } catch (err) {
        this.setError(err.response.data.errors)
      } finally {
        // Stop loading icon on Save button
        this.saving = false
      }
    },
    setNotification (success, message) {
      this.success = success
      this.notification = message

      // Scroll to top to see notification
      window.scrollTo(0, 0)
    },
    setError (responseErrors) {
      // Set field errors
      this.errors = responseErrors

      // Set form error notification
      const formError = this.errors.find(error => !Object.keys(this.work).includes(error.param))
      const formErrorMsg = formError ? formError.msg : 'Your changes could not be saved! Scroll down to fix errors.'
      this.setNotification(false, formErrorMsg)
    }
  }
}
</script>
