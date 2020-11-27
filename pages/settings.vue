<template>
  <section class="section">
      <h1 class="title">
        Account Settings
      </h1>
      <p>
        <strong>Email:</strong> {{ user.email }}
      </p>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    user () {
      return this.$auth.user
    }
  }
}
</script>
