<template>
  <div class="container home">
    <div>
      <img class="arty-logo" src="~/assets/arty-logo.svg" />
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
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.home .title {
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
</style>
