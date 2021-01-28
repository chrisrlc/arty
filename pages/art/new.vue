<template>
  <section class="section">
    <h1 class="title">
      Add new art to your inventory
    </h1>

    <Notification v-if="error" :message="error" />

    <ArtForm :submitForm="addWork" :cancelButtonText="'Cancel'" :work="work" />
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
        this.error = err.response.data.message
      }
    }
  }
}
</script>
