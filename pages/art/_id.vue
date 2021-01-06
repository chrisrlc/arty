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
    const res = await $axios.get(`/art/${params.id}`)
    return { work: res.data }
  },
  methods: {
    async editWork (workInfo) {
      try {
        await this.$axios.post(`/art/${this.work.id}`, workInfo)
        // TODO: success notification
      } catch (err) {
        // TODO: Handle error
        console.log(err.response.data.message)
      }
    }
  }
}
</script>
