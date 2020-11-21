<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLink class="navbar-item" to="/">
        Arty
      </NuxtLink>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <NuxtLink to="/about" class="navbar-item">
          About
        </NuxtLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="loggedIn">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">{{ user.email }}</a>

                <div class="navbar-dropdown">
                  <NuxtLink to="/profile" class="navbar-item">
                    My Profile
                  </NuxtLink>
                  <hr class="navbar-divider">
                  <a class="navbar-item" @click="logout">
                    Log out
                  </a>
                </div>
              </div>
            </div>
            <div v-else>
              <NuxtLink to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </NuxtLink>
              <NuxtLink to="/login" class="button is-light">
                Log in
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
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
      this.$router.push('/login')
    }
  }
}
</script>
