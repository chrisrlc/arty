<template>
  <section class="section art-index">
    <h1 class="title">
      All the arts
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
    console.log('in art.vue')
    console.log(res)
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
      margin: 0;
      display: grid;
      grid-template-rows: 1fr auto;
      margin-bottom: 10px;
      break-inside: avoid;
    }

    .box > figure {
      grid-row: 1 / -1;
      grid-column: 1;
    }
  }
}
</style>
