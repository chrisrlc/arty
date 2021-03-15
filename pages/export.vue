<template>
  <section class="section">
    <h1 class="title">
      Export Inventory
    </h1>

    <Notification v-if="notification" :message="notification" @clearNotification="notification = ''" />

    <p class="content">
      Export data for {{ worksCount }} artworks (images not included):
    </p>
    <a class="button is-primary" @click="download">
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

        // Get filename from response
        const contentDisposition = res.headers['content-disposition']
        const matches = contentDisposition.match(/filename="([^"]+)/)
        const filename = matches ? matches[1] : 'inventory.csv'

        // Trigger browser download
        const url = URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
      } catch (err) {
        this.notification = err.response.data.errors
      }
    }
  }
}
</script>
