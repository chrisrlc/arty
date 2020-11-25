<template>
  <div>
    <NavBar />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style lang="scss">
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.arty-title {
  font-family:
    'Cedarville Cursive',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-weight: 300;
  color: $arty-purple;
}

.button.is-arty {
  background-color: $arty-purple;
  color: #fff;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: $arty-purple;
}
</style>
