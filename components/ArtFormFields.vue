<template>
  <fieldset :disabled="disabled" class="art-form-fields">
    <div v-if="!disabled" class="field">
      <picture-input
        ref="pictureInput"
        width="600"
        height="600"
        margin="16"
        :crop="false"
        accept="image/jpeg,image/png"
        size="10"
        button-class="button is-link"
        removeButtonClass="button"
        :removable="true"
        name="image"
        :prefill="work.imageUrl"
        :prefillOptions="{mediaType: 'image/jpeg'}"
        @change="onChange"
        @remove="onRemove"
      />
    </div>
    <figure v-else-if="disabled && work.imageUrl" class="image content">
      <img :src="work.imageUrl">
    </figure>

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

    <div class="field" v-if="!disabled || work.description">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          v-model="work.description"
          class="textarea"
          :placeholder="descriptionPlaceholder"
        />
      </div>
    </div>

    <div class="field" v-if="!disabled || work.acquisitionDate">
      <label class="label">Date Acquired</label>
      <date-picker
        v-model="work.acquisitionDate"
        placeholder="MM/DD/YYYY"
        format="MM/dd/yyyy"
        :typeable="!disabled"
        name="acquisitionDate"
        input-class="input"
        :disabled="disabled"
      />
    </div>

    <div class="field" v-if="!disabled || work.source">
      <label class="label">Source</label>
      <div class="control">
        <input
          v-model="work.source"
          class="input"
          name="source"
          placeholder="SFMOMA Museum Store"
        >
      </div>
    </div>

    <div class="field" v-if="!disabled || work.location">
      <label class="label">Location</label>
      <div class="control">
        <input
          v-model="work.location"
          class="input"
          name="source"
          placeholder="San Francisco, CA"
        >
      </div>
    </div>

    <div class="field" v-if="!disabled || work.acquisitionUrl">
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

    <div class="field" v-if="!disabled || work.acquisitionCost">
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
  </fieldset>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
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
    },
    onRemove () {
      this.work.imageUpdated = true
      this.work.image = null
    }
  }
}
</script>

<style lang="scss">
</style>
