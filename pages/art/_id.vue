<template>
  <section class="section">
    <h1 class="title">
      Edit art details
    </h1>

    <Notification v-if="error" :message="error" />

    <ArtForm :submit-form="editWork" cancel-button-text="Back" :work="work" @failed="setError" />
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
      error: ''
    }
  },
  methods: {
    async editWork (workInfo) {
      try {
        await this.$axios.post(`/art/${this.work.id}`, workInfo)
        // TODO: success notification
      } catch (err) {
        this.setError(err.response.data.message)
      }
    },
    setError (msg) {
      this.error = msg
      window.scrollTo(0, 0)
    }
  }
}
</script>
