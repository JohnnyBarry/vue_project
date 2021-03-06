<template>
  <v-layout align-center justify-center class="pt-5">
    <v-flex md8 xs10>
      <v-alert outline dismissible :type="alert" v-model="showAlert" class="my-3 headline">
        {{message}}
      </v-alert>
      <panel title="Register">
        <v-form
        v-model="form_valid"
        ref="form"
        autocomplete="off"
        @submit.prevent="submit">
          <v-text-field
            name="email"
            label="Email"
            v-model="email"
            autocomplete="off"
            required
            :rules="[rules.required, rules.email]">
          </v-text-field>
          <v-text-field
            name="password"
            label="Password"
            id="password"
            type="password"
            autocomplete="new-password"
            required
            :rules="[rules.required, rules.password]"
            v-model="password">
          </v-text-field>
          <v-checkbox
          ref = "TAndCs"
          label="Do You Accept Terms?"
          v-model="checkbox"
          :rules="[rules.terms]"
          required
        ></v-checkbox>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="grey lighten-1" @click="clear">Clear</v-btn>
          <v-btn dark color="light-blue" @click="register">Register</v-btn>
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
      checkbox: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: (value) => {
          const pattern = /^[a-zA-Z0-9]{8,32}$/
          return pattern.test(value) || 'Invalid password.'
        },
        terms: (v) => {
          return !!v || 'You must agree to continue!'
        }
      }
    }
  },

  methods: {
    async register () {
      if (this.$refs.form.validate()) {
        try {
          this.error = null
          const response = await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.message = 'Welcome ' + response.data.email + ' Thank You For Registering.'
          this.showAlert = true
          this.alert = SUCCESS_ALERT
        } catch (error) {
          console.log(error)
          if (!(error instanceof ReferenceError)) {
            this.message = error.response.data.error
          }
          this.showAlert = true
          this.alert = ERROR_ALERT
        }
      }
    },
    clear () {
      this.$refs.form.reset()
      this.email = ''
      this.password = ''
      this.checkbox = false
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
