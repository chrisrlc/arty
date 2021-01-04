<template>
  <section class="section">
    <h1 class="title">
      Add new art to your inventory
    </h1>

    <ArtForm :submitForm="addWork" :work="work" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      work: {}
    }
  },
  methods: {
    async addWork (workInfo) {
      try {
        await this.$axios.post('/art', workInfo)
        await this.$router.push('/art')
      } catch (err) {
        // TODO: Handle error
        console.log(err.response.data.message)
      }
    }
  }
}
</script>
