<template>
  <v-layout align-center justify-center class="pt-5">
    <v-flex md8 xs10>
      <v-alert outline dismissible :type="alert" v-model="showAlert" class="my-3 headline">
        {{message}}
      </v-alert>
      <panel title="Login">
        <v-form
        v-model="form_valid"
        ref="form"
        @submit.prevent="submit">
          <v-text-field
            name="email"
            label="Email"
            v-model="email"
            required
            :rules="[rules.required, rules.email]">
          </v-text-field>
          <v-text-field
            name="password"
            label="Password"
            id="password"
            type="password"
            required
            :rules="[rules.required, rules.password]"
            v-model="password">
          </v-text-field>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="light-blue" @click="login">Login</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </panel>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationServices'
import {ERROR_ALERT, SUCCESS_ALERT} from '@/assets/constants'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: false,
      warning: false,
      success: false,
      showAlert: false,
      alert: SUCCESS_ALERT,
      message: null,
      form_valid: true,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: (value) => {
          const pattern = /^[a-zA-Z0-9]{8,32}$/
          return pattern.test(value) || 'Invalid password.'
        }
      }
    }
  },

  methods: {
    async login () {
      if (this.$refs.form.validate()) {
        try {
          this.error = null
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.message = 'Welcome back ' + response.data.user.email
          this.showAlert = true
          this.alert = SUCCESS_ALERT
        } catch (error) {
          this.message = error.response !== undefined ? error.response.data.error : 'Error occured ooops !!!!'
          this.showAlert = true
          this.alert = ERROR_ALERT
        }
      }
    },
    clear () {
      this.$refs.form.reset()
      this.email = ''
      this.password = ''
      this.showAlert = false
    }
  },

  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
