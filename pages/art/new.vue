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
        const work = await this.$axios.post('/art/new', workInfo)
        const workId = work.data.id

        // TODO: Generate and use slug instead of id
        await this.$router.push(`/art/${workId}`)
      } catch (err) {
        // TODO: Handle error
        console.log(err.response.data.message)
      }
    }
  }
}
</script>
