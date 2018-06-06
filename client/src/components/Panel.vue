<template>
  <v-card class="elevation-12">
    <v-toolbar dark height=40 color="light-blue">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <slot>
        Slot text undefined at present.
      </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style>

</style>
