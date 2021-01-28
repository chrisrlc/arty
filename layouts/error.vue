<template>
  <section class="section error-page">
    <div class="error has-text-centered">
      <img class="arty-logo" src="~/assets/arty-logo-error.svg">
      <h1 v-if="statusCode === 404" class="title">Page Not Found</h1>
      <h1 v-else class="title">Uh oh, something went wrong</h1>
      <a class="is-link" @click="$router.go(-1)">Go Back</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    }
  },
  head () {
    return {
      title: 'Invalid Page | arty'
    }
  }
}
</script>
