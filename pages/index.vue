<template>
  <section class="section home">
    <div class="container">
      <img class="arty-logo" src="~/assets/arty-logo-outline.svg">
      <h1 class="title arty-title">
        arty
      </h1>
      <div class="links">
        <a
          href="https://github.com/chrisrlc/arty"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >
          <span class="icon is-small">
            <font-awesome-icon :icon="['fab', 'github']" />
          </span>
          <span>
            GitHub
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false
}
</script>

<style lang="scss">
.home {
  .container {
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-size: 100px;
  }

  .arty-logo {
    animation: 1s appear;
    margin: auto;
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
  }

  .links {
    padding-top: 15px;
  }

  .links .button:hover {
    color: #fff;
    background-color: $arty-purple;
  }
}
</style>
