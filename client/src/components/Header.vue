<template>
 <v-toolbar fixed dark flat height=50 color="light-blue" >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <router-link to="root" class="btn btn--flat light-blue">
      <v-toolbar-title class="white--text">
        Tab Tracker
      </v-toolbar-title>
    </router-link>
    <!-- TODO implement this later -->
    <v-toolbar-items class="pr-3">
      <router-link
      to="songs"
      class="btn btn--flat light-blue">
        <v-btn
        flat dark>
          Browse
        </v-btn>
      </router-link>
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <router-link
      to="login"
      v-if="!$store.state.isUserLoggedIn"
      class="btn btn--flat light-blue">
        <v-btn
        flat dark>
          Login
        </v-btn>
      </router-link>
      <router-link
      to="register"
      v-if="!$store.state.isUserLoggedIn"
      class="btn btn--flat light-blue">
        <v-btn
        flat dark>
          Sign Up
        </v-btn>
      </router-link>
      <router-link
      v-on:click.native="logout"
      to="root"
      v-if="$store.state.isUserLoggedIn"
      class="btn btn--flat light-blue">
        <v-btn
        flat dark>
          Logout
        </v-btn>
      </router-link>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
