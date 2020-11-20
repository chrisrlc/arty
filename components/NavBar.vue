<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <NuxtLink to="/" class="navbar-item">
          Home
        </NuxtLink>

        <NuxtLink to="/about" class="navbar-item">
          About
        </NuxtLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="$auth.loggedIn">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  {{ $auth.user.email }}
                </a>

                <div class="navbar-dropdown">
                  <NuxtLink to="#" class="navbar-item">
                    Settings
                  </NuxtLink>
                  <NuxtLink to="/logout" class="navbar-item">
                    Log out
                  </NuxtLink>
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
