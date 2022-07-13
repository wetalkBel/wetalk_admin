

<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Unicef
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Login to your Web App</h3>" customHeader>
        <p class="widget-auth-info">
          Use your email to sign in.
        </p>

        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" v-model="email" required type="email" name="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" v-model="password" required type="password" name="password" placeholder="Password" />
          </div>

          <router-link class="d-block text-right mb-3 mt-1 fs-sm" to="/forgot">
            Forgot password?
          </router-link>

          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="info">{{isFetching ? 'Loading...' : 'Login'}}</b-button>
<!--          <p class="widget-auth-info">or sign in with</p>-->
<!--          <div class="social-buttons">-->
<!--            <b-button @click="googleLogin" variant="primary" class="social-button mb-2">-->
<!--              <i class="social-icon social-google"></i>-->
<!--              <p class="social-text">GOOGLE</p>-->
<!--            </b-button>-->
<!--            <b-button @click="microsoftLogin" variant="success" class="social-button">-->
<!--              <i class="social-icon social-microsoft"></i>-->
<!--              <p class="social-text">MICROSOFT</p>-->
<!--            </b-button>-->
<!--          </div>-->
        </form>
        <p class="widget-auth-info">
          Don't have an account? Sign up now!
        </p>
        <router-link class="d-block text-center" to="register">Create an Account</router-link>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      {{ (new Date()).getFullYear() }} &copy; Unicef - Made by <a href="https://flatlogic.com/">Flatlogic</a>
    </footer>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import config from '../../config'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState('auth', {
      isFetching: state => state.isFetching,
      errorMessage: state => state.errorMessage,
    }),
  },
  methods: {
    ...mapActions('auth', ['loginUser', 'receiveToken', 'receiveLogin']),
    login() {
      if (this.email && this.password) {
        this.loginUser({
          email: this.email,
          password: this.password
        })
      }
    },
    googleLogin() {
      this.loginUser({social: "google"})
    },
    microsoftLogin() {
      this.loginUser({social: "microsoft"})
    }
  },
  created() {
    const token = this.$route.query.token
    if (token) {
      this.receiveToken(token)
    } else if (this.isAuthenticated()) {
      this.receiveLogin()
    }
  },
  mounted() {
    const creds = config.auth
    this.email = creds.email
    this.password = creds.password
  }
}
</script>

