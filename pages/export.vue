<template>
  <section class="section">
    <h1 class="title">
      Export Inventory
    </h1>
    <p class="content">
      Export data for {{ worksCount }} artworks:
    </p>
    <a @click="download" class="button is-primary">
      Download CSV
    </a>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios, error }) {
    try {
      const res = await $axios.get('/art/count')
      return { worksCount: res.data.count }
    } catch (err) {
      error({ statusCode: err.response.status })
    }
  },
  methods: {
    async download () {
      try {
        const res = await this.$axios.get('/art/download')
        console.log('download success hopefully??')
        console.log(res.data)
      } catch (err) {
        console.log('download error')
        console.log(err.response.data.errors)
      }
    }
  }
}
</script>
