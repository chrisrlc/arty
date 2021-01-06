<template>
  <section class="section art-index">
    <h1 class="title">
      That's So Arty
    </h1>
    <div class="container">
      <div v-for="work in works" :key="work.id" class="box">
        <NuxtLink :to="`/art/${work.id}`" class="art-details">
          <p v-if="work.acquisitionDate" class="date has-text-left has-text-grey is-size-7">
            {{ friendlyDate(work.acquisitionDate) }}
          </p>
          <figure v-if="work.imageUrl" class="image">
            <img :src="work.imageUrl">
          </figure>
          <p v-if="work.title" class="title has-text-centered is-size-5">
            {{ work.title }}
          </p>
          <p v-if="work.artist" class="subtitle has-text-centered is-size-6">
            {{ work.artist }}
          </p>
        </NuxtLink>
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
  methods: {
    friendlyDate (date) {
      const d = new Date(date)
      return d.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
    }
  }
}
</script>

<style lang="scss">
.art-index {
  .container {
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
          margin-bottom: 0.5rem;

          img {
            width: auto;
            margin-left: auto;
            margin-right: auto;
          }
        }
      }
    }
  }
}
</style>
