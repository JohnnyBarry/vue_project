<template>
 <v-toolbar fixed dark color="light-blue" >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Tab Tracker</v-toolbar-title>
    <!-- TODO implement this later -->
    <!-- <v-toolbar-items class="pr-3">
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items> -->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <router-link to="register" class="btn btn--flat light-blue">
        <v-btn flat dark>
          Sign Up
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

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
