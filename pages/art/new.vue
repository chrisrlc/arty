<template>
  <section class="section">
    <h1 class="title">
      Add new art to your inventory
    </h1>

    <Notification v-if="notification" :message="notification" :success="success" @clearNotification="notification = ''" />

    <ArtForm
      :submit-form="addWork"
      cancel-button-text="Cancel"
      :work="work"
      :saving="saving"
      :errors="errors"
      @setError="setError"
    />
  </section>
</template>

<script>
export default {
  data () {
    return {
      work: {},
      errors: [],
      saving: false,
      success: false,
      notification: ''
    }
  },
  methods: {
    async addWork (workInfo) {
      try {
        // Set loading icon on Save button
        this.saving = true

        // Create work
        const res = await this.$axios.post('/art', workInfo)

        // Redirect to edit
        await this.$router.push(`/art/${res.data.id}?created=${res.data.title || 'Your untitled artwork'}`)
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

      if (this.errors.length) {
        // Set form error notification
        const formError = this.errors.find(error => !Object.keys(this.work).includes(error.param))
        const formErrorMsg = formError ? formError.msg : 'Your artwork could not be saved! Scroll down to fix errors.'
        this.setNotification(false, formErrorMsg)
      } else {
        // Clear notification
        this.notification = ''
      }
    }
  }
}
</script>
