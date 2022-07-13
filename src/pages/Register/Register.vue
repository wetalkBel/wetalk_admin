

<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-gray"></i>
        Unicef
        <i class="fa fa-circle text-warning"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Create an account</h3>" customHeader>
        <p class="widget-auth-info">
          Please fill all fields below
        </p>
        <form class="mt" @submit.prevent="register">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="email" type="email"
              name="email"
              v-model="email"
              placeholder="Email"
            />
          </div>

          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm"
            />
          </div>

          <b-button type="submit" variant="inverse" class="auth-btn mb-3" size="sm">{{this.isFetching ? 'Loading...' : 'Register'}}</b-button>
<!--          <p class="widget-auth-info">or sign up with</p>-->
<!--          <div class="social-buttons">-->
<!--            <b-button-->
<!--            @click="googleLogin"-->
<!--            variant="primary" class="social-button mb-2">-->
<!--              <i class="social-icon social-google"></i>-->
<!--              <p class="social-text">GOOGLE</p>-->
<!--            </b-button>-->
<!--            <b-button-->
<!--              @click="microsoftLogin"-->
<!--              variant="success" class="social-button">-->
<!--              <i class="social-icon social-microsoft"></i>-->
<!--              <p class="social-text">MICROSOFT</p>-->
<!--            </b-button>-->
<!--          </div>-->
        </form>
        <p class="widget-auth-info">
          Already have the account? Login now!
        </p>
        <router-link class="d-block text-center" to="login">Enter the account</router-link>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      {{ (new Date()).getFullYear() }} &copy; Unicef - Made by <a href="https://flatlogic.com/">Flatlogic</a>
    </footer>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    ...mapState('register', {
      isFetching: state => state.isFetching,
      errorMessage: state => state.errorMessage,
    }),
  },
  methods: {
    ...mapActions('register', ['registerUser', 'registerError']),
    ...mapActions('auth', ['loginUser']),
    async register() {
      await this.registerUser({
        email: this.email,
        password: this.password,
      })
    },
    googleLogin() {
      this.loginUser({social: "google"})
    },
    microsoftLogin() {
      this.loginUser({social: "microsoft"})
    },
  },
  created() {
    const token = this.$route.query.token

    if (token) {
      this.receiveToken(token)
    } else if (this.isAuthenticated()) {
      this.receiveLogin()
    }
  },
}
</script>

