<template>
  <nav class="navbar main-nav" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLink class="navbar-item arty-title" :to="loggedIn ? '/art' : '/'">
        arty
      </NuxtLink>

      <div class="navbar-menu-constant">
        <div class="navbar-item">
          <NuxtLink v-if="loggedIn" to="/art/new" class="button is-link" aria-label="Add new art">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </span>
          </NuxtLink>

          <div v-else class="buttons">
            <NuxtLink to="/signup" class="button is-link">
              <strong>Sign up</strong>
            </NuxtLink>
            <NuxtLink to="/login" class="button is-light">
              Log in
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- navbar-menu only contains account links, so no need to display burger when logged out -->
      <a
        v-if="loggedIn"
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isActive }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBurgerDropdown"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div v-if="loggedIn" id="navbarBurgerDropdown" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">{{ user.email }}</a>

          <div class="navbar-dropdown">
            <NuxtLink to="/art" class="navbar-item">
              Art
            </NuxtLink>
            <NuxtLink to="/export" class="navbar-item">
              Export data
            </NuxtLink>
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

  .navbar-brand {
    flex-grow: 1;
  }

  .navbar-menu-constant {
    margin-left: auto;
  }

  .navbar-menu {
    flex-grow: 0;
  }

  .navbar-burger {
    margin-left: unset;
  }

  // Overrides known bulma issue that prevents hoverable dropdown from closing after route change
  // https://github.com/jgthms/bulma/issues/2514
  .navbar-item.is-hoverable:hover .navbar-dropdown {
    display: block !important;
  }

  .navbar-item.is-hoverable:focus-within .navbar-dropdown {
    display: none;
  }
}
</style>
