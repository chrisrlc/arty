<template>
  <section class="section">
    <h1 class="title">
      Edit art details
    </h1>

    <ArtForm :submitForm="editWork" :work="work" />
  </section>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    let work = await $axios.get(`/art/${params.id}`)
    work = work.data
    return { work }
  },
  methods: {
    async editWork (workInfo) {
      try {
        const workId = this.$route.params.id
        await this.$axios.post(`/art/${workId}`, workInfo)
      } catch (err) {
        // TODO: Handle error
        console.log(err.response.data.message)
      }
    }
  }
}
</script>
