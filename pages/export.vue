<template>
  <section class="section">
    <h1 class="title">
      Export Inventory
    </h1>

    <Notification v-if="notification" :message="notification" @clearNotification="notification = ''" />

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
  data () {
    return {
      notification: ''
    }
  },
  methods: {
    async download () {
      try {
        const res = await this.$axios.get('/art/download')

        // TODO: How to trigger browser download?
        console.log('download success hopefully??')
        console.log(res.data)
      } catch (err) {
        this.notification = err.response.data.errors
      }
    }
  }
}
</script>
