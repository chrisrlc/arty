<template>
  <section class="section art-index">
    <h1 class="title">
      That's So Arty
    </h1>
    <div class="container art-container">
      <NuxtLink :to="`/art/${work.id}`" v-for="work in works" :key="work.id" class="box">
        <figure class="image" v-if="work.imageUrl">
          <img :src="work.imageUrl">
        </figure>
        <p class="title">{{ work.title }}</p>
        <p class="subtitle">{{ work.artist }}</p>
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
    }

    .box {
      display: grid;
      grid-template-rows: 1fr auto;
      break-inside: avoid;

      > * {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }

      figure {
        grid-row: 1 / -1;
        grid-column: 1;
        margin-bottom: 0.5em;

        img {
          width: auto;
        }
      }

      .title {
        font-size: 1.25rem;
      }

      .subtitle {
        font-size: 1rem;
      }
    }
  }
}
</style>
