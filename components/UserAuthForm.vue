<template>
  <form @submit.prevent="submitForm(userInfo)">
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input
          v-model="userInfo.email"
          class="input"
          :class="{ 'is-danger': fieldError('email') }"
          name="email"
          required
        >
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </span>
      </div>
      <p v-if="fieldError('email')" class="help is-danger">
        {{ fieldError('email') }}
      </p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input
          v-model="userInfo.password"
          class="input"
          :class="{ 'is-danger': fieldError('password') }"
          type="password"
          name="password"
          minlength="6"
          title="Please choose a password with at least 6 characters."
          required
        >
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
      <p v-if="fieldError('password')" class="help is-danger">
        {{ fieldError('password') }}
      </p>
    </div>

    <div v-if="checkTos" class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="userInfo.agreeToTerms" type="checkbox" required>
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
      <p v-if="fieldError('agreeToTerms')" class="help is-danger">
        {{ fieldError('agreeToTerms') }}
      </p>
    </div>

    <div class="control">
      <button
        :disabled="!valid"
        class="button is-primary is-fullwidth"
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
    checkTos: Boolean,
    errors: {
      type: Array,
      required: true
    }
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
  },
  methods: {
    fieldError (context) {
      const error = this.errors.find(error => error.context === context)
      if (error) {
        return error.msg
      }
    }
  }
}
</script>

<style>
</style>
