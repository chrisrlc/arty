<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        My Profile
      </h1>
      <div class="content">
        <p>
          <strong>Email:</strong> {{ user.email }}
        </p>
      </div>
    </div>
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
