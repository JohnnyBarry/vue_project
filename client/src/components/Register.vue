<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex md8 xs10>
            <v-alert outline dismissible :type="alert" v-model="showAlert" class="my-3 headline">
              {{message}}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
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
                  <v-checkbox
                  ref = "TAndCs"
                  label="Do You Accept Terms?"
                  v-model="checkbox"
                  :rules="[rules.terms]"
                  required
                ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey lighten-1" @click="clear">Clear</v-btn>
                <v-btn color="primary" @click="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationServices'
import {ERROR_ALERT, SUCCESS_ALERT} from '@/assets/constants'
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
