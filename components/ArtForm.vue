<template>
  <form @submit.prevent="submitForm(work)">
    <div class="field">
      <picture-input
        ref="pictureInput"
        width="600"
        height="600"
        margin="16"
        accept="image/jpeg,image/png"
        size="10"
        button-class="button is-link"
        removeButtonClass="button"
        :removable="true"
        name="image"
        @change="onChange"
        :prefill="work.image"
        :prefillOptions="{mediaType: 'image/jpeg'}"
      />
    </div>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          v-model="work.title"
          class="input"
          type="text"
          name="title"
          placeholder="Arty Rabbit"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Artist</label>
      <div class="control">
        <input
          v-model="work.artist"
          class="input"
          type="text"
          name="artist"
          placeholder="Chrissy C"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          v-model="work.description"
          class="textarea"
          :placeholder="descriptionPlaceholder"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">URL</label>
      <div class="control">
        <input
          v-model="work.acquisitionUrl"
          class="input"
          type="text"
          name="acquisitionUrl"
          placeholder="https://www.etsy.com/transaction/555555555"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Date purchased</label>
      <date-picker
        v-model="work.acquisitionDate"
        placeholder="MM/DD/YYYY"
        format="MM/dd/yyyy"
        :typeable="true"
        name="acquisitionDate"
        input-class="input"
      />
    </div>

    <div class="field">
      <label class="label">Cost</label>
      <div class="control has-icons-left">
        <input
          v-model="work.acquisitionCost"
          class="input"
          type="number"
          min="0"
          step="any"
          name="acquisitionCost"
          placeholder="20"
        >
        <span class="icon is-small is-left">$</span>
      </div>
    </div>

    <div class="control">
      <button class="button is-primary">
        Save
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
    work: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      descriptionPlaceholder: 'Handmade purple patchwork rabbit with tiny horn-rimmed glasses and a judgmental ' +
        'expression, measures 8” long.\n\nMight be haunted?',
      imageUpdated: false
    }
  },
  methods: {
    onChange (image) {
      if (image) {
        this.work.imageUpdated = true
        this.work.image = image
      } else {
        // TODO: Handle error
        console.log('FileReader API not supported')
      }
    }
  }
}
</script>
