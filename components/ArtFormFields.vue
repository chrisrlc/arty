<template>
  <div class="art-form-fields">
    <div v-if="!readonly" class="field">
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
    <figure v-else-if="readonly && work.imageUrl" class="image content">
      <img :src="work.imageUrl">
    </figure>

    <div class="field" v-if="!readonly">
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

    <div class="field" v-if="!readonly">
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

    <div class="field" v-if="!readonly || work.description">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          v-model="work.description"
          class="textarea"
          :placeholder="descriptionPlaceholder"
          :readonly="readonly"
        />
      </div>
    </div>

    <div class="field" v-if="!readonly || work.acquisitionDate">
      <label class="label">Date Acquired</label>
      <date-picker
        v-model="work.acquisitionDate"
        placeholder="MM/DD/YYYY"
        format="MM/dd/yyyy"
        :typeable="!readonly"
        name="acquisitionDate"
        input-class="input readonly"
        :disabled="readonly"
      />
    </div>

    <div class="field" v-if="!readonly || work.source">
      <label class="label">Source</label>
      <div class="control">
        <input
          v-model="work.source"
          class="input"
          name="source"
          placeholder="SFMOMA Museum Store"
          :readonly="readonly"
        >
      </div>
    </div>

    <div class="field" v-if="!readonly || work.location">
      <label class="label">Location</label>
      <div class="control">
        <input
          v-model="work.location"
          class="input"
          name="source"
          placeholder="San Francisco, CA"
          :readonly="readonly"
        >
      </div>
    </div>

    <div class="field" v-if="!readonly || work.acquisitionUrl">
      <label class="label">URL</label>
      <div class="control">
        <input
          v-model="work.acquisitionUrl"
          class="input"
          type="text"
          name="acquisitionUrl"
          placeholder="https://www.etsy.com/transaction/555555555"
          :readonly="readonly"
        >
      </div>
    </div>

    <div class="field" v-if="!readonly || work.acquisitionCost">
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
          :readonly="readonly"
        >
        <span class="icon is-small is-left">$</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true
    },
    readonly: {
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
.art-form-fields {
  // Override disabled styling on date-picker input
  .readonly {
    color: $grey-darker;
    background-color: $white;
    border-color: $grey-lighter;
  }

  .control.has-icons-left .icon, .control.has-icons-right .icon {
    color: $grey-darker;
  }
}
</style>
