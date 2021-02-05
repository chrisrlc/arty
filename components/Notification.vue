<template>
  <div class="notification" :class="success ? 'is-success' : 'is-danger'">
    <button class="delete" @click="clearMessage()" />
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: true
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clearMessage () {
      this.$emit('clearNotification')
    }
  }
}
</script>
