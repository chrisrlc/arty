<template>
  <nav class="navbar main-nav" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLink class="navbar-item arty-title" to="/">
        arty
      </NuxtLink>

      <div v-if="loggedIn" class="navbar-menu-constant is-hidden-desktop">
        <div class="navbar-item">
          <NuxtLink to="/art" class="button is-link is-outlined" aria-label="Add new art">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </span>
          </NuxtLink>
        </div>
      </div>
      <div v-else class="navbar-menu-constant is-hidden-desktop">
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

      <a
        v-if="loggedIn"
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isActive }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="isActive = !isActive"
      >
        <span class="icon is-small has-text-link">
          <font-awesome-icon :icon="['fas', 'cog']" />
        </span>
      </a>
    </div>

    <div v-if="loggedIn" id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-end">
        <div class="navbar-item is-hidden-touch">
          <NuxtLink to="/art" class="button is-link is-outlined" aria-label="Add new art">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </span>
          </NuxtLink>
        </div>
        <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
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

        <NuxtLink to="/settings" class="navbar-item is-hidden-desktop">
          Settings
        </NuxtLink>
        <a class="navbar-item is-hidden-desktop" @click="logout">
          Log out
        </a>
      </div>
    </div>

    <div v-else id="navbarBasicExample" class="navbar-menu is-hidden-touch" :class="{ 'is-active': isActive }">
      <div class="navbar-end">
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
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.user
    }
  },
  watch: {
    '$route' () {
      this.isActive = false
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
.main-nav {
  a.arty-title {
    font-size: 1.5em;

    &:hover, &:active, &:focus {
      color: $arty-purple;
    }
  }

  .navbar-menu-constant {
    margin-left: auto;
  }

  .navbar-burger {
    margin-left: unset;
    span {
      background-color: transparent;
    }

    &.is-active span {
      transform: none;
    }
  }
}
</style>
