<template>
  <section class="section art-index">
    <h1 class="title">
      That's So Arty
    </h1>
    <div class="container art-container">
      <NuxtLink v-for="work in works" :key="work.id" :to="`/art/${work.id}`" class="box">
        <figure v-if="work.imageUrl" class="image">
          <img :src="work.imageUrl">
        </figure>
        <p v-if="work.title" class="title has-text-centered is-size-5">
          {{ work.title }}
        </p>
        <p v-if="work.artist" class="subtitle has-text-centered is-size-6">
          {{ work.artist }}
        </p>
        <p v-if="work.acquisitionDate" class="has-text-left has-text-grey is-size-7">
          {{ friendlyDate(work.acquisitionDate) }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const res = await $axios.get('/art')
    const works = res.data
    return { works }
  },
  methods: {
    friendlyDate (date) {
      const d = new Date(date)
      return d.toDateString()
    }
  }
}
</script>

<style lang="scss">
.art-index {
  .art-container {
    column-count: 2;
    @media (min-width: $tablet) {
      column-count: 3;
    }
    @media (min-width: $desktop) {
      column-count: 4;
    }
    column-gap: 10px;

    figure {
      max-width: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .box {
      display: grid;
      grid-template-rows: 1fr auto;
      break-inside: avoid;

      figure {
        grid-row: 1 / -1;
        grid-column: 1;
        margin-bottom: 0.5em;

        img {
          width: auto;
        }
      }
    }
  }
}
</style>
