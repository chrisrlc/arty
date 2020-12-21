<template>
  <nav class="level is-mobile" role="navigation" aria-label="main navigation">
    <!-- Left side -->
    <div class="level-left">
      <NuxtLink class="level-item arty-title" to="/">
        arty
      </NuxtLink>
    </div>

    <!-- Right side -->
    <div v-if="loggedIn" class="level-right">
      <div class="level-item">
        <NuxtLink to="/art" class="button is-link is-outlined" aria-label="Add new art">
          <span class="icon is-small">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </span>
        </NuxtLink>
      </div>

      <div class="level-item dropdown is-hoverable">
        <div class="dropdown-trigger">
          <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
            <span class="is-hidden-desktop">
              <span class="icon is-small has-text-link">
                <font-awesome-icon :icon="['fas', 'cog']" />
              </span>
            </span>
            <span class="is-hidden-touch">
              <span>{{ user.email }}</span>
              <span class="icon is-small has-text-link">
                <font-awesome-icon :icon="['fas', 'angle-down']" />
              </span>
            </span>

          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <NuxtLink to="/settings" class="dropdown-item">
              Settings
            </NuxtLink>
            <hr class="dropdown-divider">
            <a class="dropdown-item" @click="logout">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="level-right">
      <div class="level-item">
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
a.arty-title {
  font-size: 1.5em;
}

a.arty-title:hover, a.arty-title:active, a.arty-title:focus {
  color: $arty-purple;
}

.level .level-item {
  padding-top: 0.5rem;
}

.level .level-item:first-of-type {
  padding-left: 0.75rem;
}

.level .level-item:last-of-type {
  padding-right: 0.75rem;
}
</style>
