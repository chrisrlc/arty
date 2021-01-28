<template>
  <form @submit.prevent="submitForm(work)">
    <ArtFormFields :work="work" />

    <div class="art-form-buttons">
      <div class="field is-grouped is-pulled-left">
        <div class="control">
          <button class="button is-primary">Save</button>
        </div>
        <div class="control">
          <button @click="returnToIndex" type="button" class="button is-light">{{ cancelButtonText }}</button>
        </div>
      </div>
      <div v-if="work.id" class="field">
        <button @click="deleteModal = !deleteModal" type="button" class="button is-text is-pulled-right">Delete</button>
      </div>
    </div>

    <div v-if="work.id" class="modal" :class="{ 'is-active': deleteModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p class="content">Are you sure you want to delete {{ work.title || 'this artwork' }} from your inventory?</p>
          <div class="buttons">
            <button @click="deleteWork" type="button" class="button is-danger">Delete</button>
            <button @click="deleteModal = !deleteModal" type="button" class="button is-light">Cancel</button>
          </div>
        </div>
      </div>
      <button @click="deleteModal = !deleteModal" type="button" class="modal-close is-large" aria-label="close"></button>
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
    }
  },
  data () {
    return {
      deleteModal: false
    }
  },
  methods: {
    async deleteWork () {
      if (this.work.id) {
        try {
          const res = await this.$axios.delete(`/art/${this.work.id}`)
          await this.$router.push('/art')

          // TODO: success notification
          console.log(`${res.data.title || 'Your untitled artwork'} has been deleted.`)
        } catch (err) {
          this.deleteModal = !this.deleteModal

          // TODO: Handle error
          // this.error = err.response.data.message
          // throw new Error(err.response.data.message)
          console.log(err.response.data.message)
        }
      } else {
        this.deleteModal = !this.deleteModal

        // TODO: Handle error
        // this.error = 'No art to delete'
        // throw new Error('No art to delete')
        console.log('No art to delete')
      }
    },
    async returnToIndex () {
      await this.$router.push('/art')
    }
  }
}
</script>

<style lang="scss">
.art-form-buttons {
  margin-top: 0.75rem;
}
</style>
