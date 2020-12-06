<template>
  <section class="section">
    <h1 class="title">
      Add new art to your inventory
    </h1>
    <form @submit.prevent="addWork(workInfo)">
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
          v-model="workInfo.image"
          @change="onChange"
        >
        </picture-input>
      </div>

      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="workInfo.title"
            class="input"
            type="text"
            name="title"
            placeholder="e.g. Arty Rabbit"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Artist</label>
        <div class="control">
          <input
            v-model="workInfo.artist"
            class="input"
            type="text"
            name="artist"
            placeholder="e.g. Chrissy C"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            v-model="workInfo.description"
            class="textarea"
            :placeholder="descriptionPlaceholder"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">URL</label>
        <div class="control">
          <input
            v-model="workInfo.acquisitionUrl"
            class="input"
            type="text"
            name="acquisitionUrl"
            placeholder="e.g. https://www.etsy.com/transaction/555555555"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Date purchased</label>
        <date-picker
          v-model="workInfo.acquisitionDate"
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
            v-model="workInfo.acquisitionCost"
            class="input"
            type="number"
            min="0"
            step="any"
            name="acquisitionCost"
            placeholder="e.g. 20"
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
  </section>
</template>

<script>
export default {
  data () {
    return {
      descriptionPlaceholder: 'e.g. Handmade purple patchwork rabbit with tiny horn-rimmed glasses and a judgmental ' +
        'expression, measures 8” long.\n\nMight be haunted?',
      workInfo: {
        title: null,
        artist: null,
        description: null,
        acquisitionUrl: null,
        acquisitionDate: null,
        acquisitionCost: null
      }
    }
  },
  methods: {
    async addWork () {
      try {
        const work = await this.$axios.post('/art', this.workInfo)

        console.log(work)
        // TODO: Redirect to show page
      } catch (err) {
        // TODO: Handle error
        console.log(err.response.data.message)
      }
    },
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported')
      }
    }
  }
}
</script>
