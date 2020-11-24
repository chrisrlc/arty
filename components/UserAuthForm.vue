<template>
  <form @submit.prevent="submitForm(userInfo)">
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input
          v-model="userInfo.email"
          class="input"
          type="email"
          name="email"
          required
        >
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input
          v-model="userInfo.password"
          class="input"
          type="password"
          name="password"
          minLength="6"
          title="Please choose a password with at least 6 characters."
          required
        >
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>

    <div v-if="checkTos" class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="userInfo.agreeToTerms" type="checkbox" required>
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
    </div>

    <div class="control">
      <button
        :disabled="!valid"
        class="button is-link is-fullwidth"
      >
        {{ buttonText }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    submitForm: {
      type: Function,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    checkTos: Boolean
  },
  data () {
    return {
      valid: true,
      userInfo: {
        email: null,
        password: null,
        agreeToTerms: false
      }
    }
  }
}
</script>

<style>
</style>
