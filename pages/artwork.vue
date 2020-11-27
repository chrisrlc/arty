<template>
  <section class="section">
    <h1 class="title">Add a new artwork to your inventory</h1>
    <form @submit.prevent="addArtwork(artworkInfo)">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="artworkInfo.title"
            class="input"
            type="text"
            name="title"
            placeholder="e.g. Arty Rabbit"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Artist</label>
        <div class="control">
          <input
            v-model="artworkInfo.artist"
            class="input"
            type="text"
            name="artist"
            placeholder="e.g. Chrissy C"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            v-model="artworkInfo.description"
            class="textarea"
            placeholder="e.g. Handmade purple patchwork rabbit with tiny horn-rimmed glasses and a judgmental expression, measures 8” long.

Might be haunted?"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">URL</label>
        <div class="control">
          <input
            v-model="artworkInfo.acquisitionUrl"
            class="input"
            type="text"
            name="acquisitionUrl"
            placeholder="e.g. https://www.etsy.com/transaction/555555555"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Date purchased</label>
        <date-picker
          placeholder="MM/DD/YYYY"
          format="MM/dd/yyyy"
          v-model="artworkInfo.acquisitionDate"
          input-class="input" />
      </div>

      <div class="field">
        <label class="label">Cost</label>
        <div class="control">
          <input
            v-model="artworkInfo.acquisitionCost"
            class="input"
            type="text"
            name="acquisitionCost"
            placeholder="e.g. $20"
          />
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
      artworkInfo: {
        title: null,
        artist: null,
        description: null,
        acquisitionUrl: null,
        acquisitionDate: new Date(),
        acquisitionCost: null
      }
    }
  },
  methods: {
    async addArtwork () {
      try {
        console.log('trying to addArtwork')
        const artwork = await this.$axios.post('/art', this.artworkInfo)
        console.log('in success')
        console.log(artwork.id)

        // TODO: Redirect to show page
      } catch (err) {
        console.log('in error')
        console.log(err.response.data.message)
      }
    }
  }
}
</script>
