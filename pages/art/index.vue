<template>
  <section class="section art-index">
    <h1 class="title">
      That's So Arty
    </h1>

    <div class="art-tiles-container">
      <div v-for="work in works" :key="work.id" class="box">
        <a class="art-details" @click="populateModal(work.id)">
          <p v-if="work.acquisitionDate" class="date has-text-left has-text-grey is-size-7">
            {{ friendlyDate(work.acquisitionDate) }}
          </p>
          <figure v-if="work.imageUrl" class="image content">
            <img :src="work.imageUrl">
          </figure>
          <p v-if="work.title || !work.imageUrl" class="title has-text-centered is-size-5">
            {{ work.title || 'Untitled Artwork' }}
          </p>
          <p v-if="work.artist" class="subtitle has-text-centered is-size-6">
            {{ work.artist }}
          </p>
        </a>
      </div>
    </div>

    <div v-if="!works.length" class="container has-text-centered">
      <h2 class="subtitle">
        No art added yet to your inventory!
      </h2>
      <NuxtLink to="/art/new" class="button is-link">
        <span class="icon-text">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </span>
          <span>Add new art</span>
        </span>
      </NuxtLink>
    </div>

    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="showModal = !showModal" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ modalWork.title || 'Untitled Artwork' }}<span v-if="modalWork.artist"> by {{ modalWork.artist }}</span>
          </p>
          <button aria-label="close" class="delete" @click="showModal = !showModal" />
        </header>
        <section class="modal-card-body">
          <ArtFormFields :work="modalWork" :disabled="true" />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-link" @click="editArt(modalWork.id)">
            Edit
          </button>
          <button class="button" @click="showModal = !showModal">
            Close
          </button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const res = await $axios.get('/art')
    return { works: res.data }
  },
  data () {
    return {
      showModal: false,
      modalWork: {}
    }
  },
  methods: {
    friendlyDate (date) {
      const d = new Date(date)
      return d.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
    },
    async editArt (workId) {
      await this.$router.push(`/art/${workId}`)
    },
    async populateModal (workId) {
      const res = await this.$axios.get(`/art/${workId}`)
      this.modalWork = res.data
      this.showModal = !this.showModal
    }
  }
}
</script>

<style lang="scss">
.art-index {
  img {
    width: auto;
    margin-left: auto;
    margin-right: auto;
  }

  // Coming soon, apparently: https://bulma.io/documentation/elements/icon/#icon-text
  .icon-text {
    align-items: flex-start;
    color: inherit;
    display: inline-flex;
    flex-wrap: wrap;
    line-height: 1.5rem;
    vertical-align: top;
  }
  .icon-text .icon:not(:last-child) {
    margin-right: .25em;
  }
  .icon-text .icon {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .art-tiles-container {
    column-count: 2;
    @media (min-width: $tablet) {
      column-count: 3;
    }
    @media (min-width: $desktop) {
      column-count: 4;
    }
    column-gap: 10px;

    .box {
      display: grid;
      grid-template-rows: 1fr auto;
      break-inside: avoid;

      .art-details {
        max-width: 100%;
        display: block;

        .date {
          margin-bottom: 0.5rem;
        }

        figure {
          grid-row: 1 / -1;
          grid-column: 1;
        }
      }
    }
  }
}
</style>
