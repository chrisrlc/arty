<template>
  <section class="section">
    <h1 class="title">
      Add new art to your inventory
    </h1>

    <Notification v-if="error" :message="error" />

    <ArtForm :submitForm="addWork" cancelButtonText="Cancel" :work="work" @failed="setError" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      work: {},
      error: ''
    }
  },
  methods: {
    async addWork (workInfo) {
      try {
        await this.$axios.post('/art', workInfo)
        await this.$router.push('/art')
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
