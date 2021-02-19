<template>
  <fieldset :disabled="disabled" class="art-form-fields">
    <div v-if="!disabled" class="field" :class="{ 'picture-danger': fieldError('image') }">
      <client-only>
        <picture-input
          ref="pictureInput"
          width="600"
          height="600"
          margin="16"
          :crop="false"
          accept="image/jpeg,image/png"
          size="10"
          button-class="button is-link"
          remove-button-class="button"
          :removable="true"
          name="image"
          :prefill="work.imageUrl"
          :prefill-options="{mediaType: 'image/jpeg'}"
          @change="onChange"
          @remove="onRemove"
        />
      </client-only>
      <p v-if="fieldError('image')" class="help is-danger has-text-centered">
        {{ fieldError('image') }}
      </p>
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
          :class="{ 'is-danger': fieldError('title') }"
          type="text"
          name="title"
          placeholder="Arty Rabbit"
        >
      </div>
      <p v-if="fieldError('title')" class="help is-danger">
        {{ fieldError('title') }}
      </p>
    </div>

    <div class="field">
      <label class="label">Artist</label>
      <div class="control">
        <input
          v-model="work.artist"
          class="input"
          :class="{ 'is-danger': fieldError('artist') }"
          type="text"
          name="artist"
          placeholder="Chrissy C"
        >
      </div>
      <p v-if="fieldError('artist')" class="help is-danger">
        {{ fieldError('artist') }}
      </p>
    </div>

    <div v-if="!disabled || work.description" class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          v-model="work.description"
          class="textarea"
          :class="{ 'is-danger': fieldError('description') }"
          :placeholder="descriptionPlaceholder"
        />
      </div>
      <p v-if="fieldError('description')" class="help is-danger">
        {{ fieldError('description') }}
      </p>
    </div>

    <div v-if="!disabled || work.acquisitionDate" class="field">
      <label class="label">Date Acquired</label>
      <client-only>
        <date-picker
          v-model="work.acquisitionDate"
          placeholder="MM/DD/YYYY"
          format="MM/dd/yyyy"
          :typeable="!disabled"
          name="acquisitionDate"
          :input-class="{ 'input': true, 'is-danger': fieldError('acquisitionDate') }"
          :disabled="disabled"
        />
        <div slot="placeholder">
          <div class="control">
            <input
              v-model="work.acquisitionDate"
              class="input"
              :class="{ 'is-danger': fieldError('acquisitionDate') }"
              type="text"
              name="acquisitionDate"
              placeholder="MM/DD/YYYY"
            >
          </div>
        </div>
      </client-only>
      <p v-if="fieldError('acquisitionDate')" class="help is-danger">
        {{ fieldError('acquisitionDate') }}
      </p>
    </div>

    <div v-if="!disabled || work.source" class="field">
      <label class="label">Source</label>
      <div class="control">
        <input
          v-model="work.source"
          class="input"
          :class="{ 'is-danger': fieldError('source') }"
          name="source"
          placeholder="SFMOMA Museum Store"
        >
      </div>
      <p v-if="fieldError('source')" class="help is-danger">
        {{ fieldError('source') }}
      </p>
    </div>

    <div v-if="!disabled || work.location" class="field">
      <label class="label">Location</label>
      <div class="control">
        <input
          v-model="work.location"
          class="input"
          :class="{ 'is-danger': fieldError('location') }"
          name="source"
          placeholder="San Francisco, CA"
        >
      </div>
      <p v-if="fieldError('location')" class="help is-danger">
        {{ fieldError('location') }}
      </p>
    </div>

    <div v-if="!disabled || work.acquisitionUrl" class="field">
      <label class="label">URL</label>
      <div class="control">
        <input
          v-model="work.acquisitionUrl"
          class="input"
          :class="{ 'is-danger': fieldError('acquisitionUrl') }"
          type="text"
          name="acquisitionUrl"
          placeholder="https://www.etsy.com/transaction/555555555"
        >
      </div>
      <p v-if="fieldError('acquisitionUrl')" class="help is-danger">
        {{ fieldError('acquisitionUrl') }}
      </p>
    </div>

    <div v-if="!disabled || work.acquisitionCost" class="field">
      <label class="label">Cost</label>
      <div class="control has-icons-left">
        <input
          v-model="work.acquisitionCost"
          class="input"
          :class="{ 'is-danger': fieldError('acquisitionCost') }"
          type="number"
          min="0"
          step="any"
          name="acquisitionCost"
          placeholder="20"
        >
        <span class="icon is-small is-left">$</span>
      </div>
      <p v-if="fieldError('acquisitionCost')" class="help is-danger">
        {{ fieldError('acquisitionCost') }}
      </p>
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
    },
    errors: {
      type: Array,
      default () {
        return []
      }
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
        // Set image on work data to be saved
        this.work.image = image
        this.work.imageUpdated = true

        // Remove any image errors
        this.$emit('setError', this.errors.filter(error => error.param !== 'image'))
      } else {
        this.$emit('setError', [...this.errors, { param: 'image', msg: 'Image file could not be uploaded.' }])
      }
    },
    onRemove () {
      // Remove image from work data to be saved
      this.work.imageUpdated = true
      this.work.image = null

      // Remove any image errors
      this.$emit('setError', this.errors.filter(error => error.param !== 'image'))
    },
    fieldError (param) {
      const error = this.errors.find(error => error.param === param)
      if (error) {
        return error.msg
      }
    }
  }
}
</script>

<style lang="scss">
.picture-danger canvas {
  border: 1px red solid;
}
</style>
