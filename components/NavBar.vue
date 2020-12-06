<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLink class="navbar-item arty-title" to="/">
        arty
      </NuxtLink>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': isActive }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <NuxtLink to="/about" class="navbar-item">
          About
        </NuxtLink>
      </div>

      <div v-if="loggedIn" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <NuxtLink to="/art" class="button is-link">
              <strong>Add new art</strong>
            </NuxtLink>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">{{ user.email }}</a>

          <div class="navbar-dropdown">
            <NuxtLink to="/settings" class="navbar-item">
              Settings
            </NuxtLink>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="logout">
              Log out
            </a>
          </div>
        </div>
      </div>
      <div v-else class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <NuxtLink to="/signup" class="button is-link">
              <strong>Sign up</strong>
            </NuxtLink>
            <NuxtLink to="/login" class="button is-light">
              Log in
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    '$route' () {
      this.isActive = false
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.user
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      await this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
a.arty-title:hover, a.arty-title:active, a.arty-title:focus {
  color: $arty-purple;
}
</style>
