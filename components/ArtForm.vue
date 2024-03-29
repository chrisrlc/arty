<template>
  <form @submit.prevent="submitForm(work)">
    <ArtFormFields :work="work" :errors="errors" @setError="setError" />

    <div class="art-form-buttons">
      <div class="field is-grouped is-pulled-left">
        <div class="control">
          <button class="button is-primary" :class="{'is-loading': saving}" :disabled="saving">
            Save
          </button>
        </div>
        <div class="control">
          <button type="button" class="button is-light" @click="returnToIndex">
            {{ cancelButtonText }}
          </button>
        </div>
      </div>
      <div v-if="work.id" class="field">
        <button type="button" class="button is-text is-pulled-right" @click="deleteModal = !deleteModal">
          Delete
        </button>
      </div>
    </div>

    <div v-if="work.id" class="modal" :class="{ 'is-active': deleteModal }">
      <div class="modal-background" @click="deleteModal = !deleteModal" />
      <div class="modal-content">
        <div class="box">
          <p class="content">
            Are you sure you want to delete {{ work.title || 'this artwork' }} from your inventory?
          </p>
          <div class="buttons">
            <button
              type="button"
              class="button is-danger"
              :class="{'is-loading': deleting}"
              :disabled="deleting"
              @click="deleteWork"
            >
              Delete
            </button>
            <button type="button" class="button is-light" @click="deleteModal = !deleteModal">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <button type="button" class="modal-close is-large" aria-label="close" @click="deleteModal = !deleteModal" />
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
    cancelButtonText: {
      type: String,
      required: true
    },
    work: {
      type: Object,
      required: true
    },
    errors: {
      type: Array,
      required: true
    },
    saving: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      deleteModal: false,
      deleting: false
    }
  },
  methods: {
    async deleteWork () {
      try {
        this.deleting = true
        const res = await this.$axios.delete(`/art/${this.work.id}`)
        await this.$router.push(`/art?deleted=${res.data.title || 'Your untitled artwork'}`)
      } catch (err) {
        this.deleteModal = !this.deleteModal
        this.setError(err.response.data.errors)
      } finally {
        this.deleting = false
      }
    },
    async returnToIndex () {
      await this.$router.push('/art')
    },
    setError (errors) {
      this.$emit('setError', errors)
    }
  }
}
</script>

<style lang="scss">
.art-form-buttons {
  margin-top: 0.75rem;
}
</style>
