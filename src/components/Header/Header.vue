

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <b-navbar class="app-header d-print-none" :class="[navbarTypeClass, 'header-' + navbarColorScheme]">
    <b-nav>
      <b-nav-item id="v-step-0">
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod">
          <i class='fi flaticon-menu' />
        </a>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <i class='fi flaticon-menu' />
        </a>
      </b-nav-item>
    </b-nav>
    <b-nav>
      <b-form class="d-sm-down-none ml-5" inline>
        <b-form-group>
          <b-input-group class="input-group-no-border search-input">
            <template v-slot:prepend>
              <b-input-group-text><i class='fi flaticon-search-2'/></b-input-group-text>
            </template>
            <b-form-input id="search-input" placeholder="Search Dashboard" />
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-nav>
    <a  class="navbarBrand d-md-none">
      <i class="fa fa-circle text-primary mr-n-sm" />
      <i class="fa fa-circle text-danger" />
      Unicef
      <i class="fa fa-circle text-danger mr-n-sm" />
      <i class="fa fa-circle text-primary" />
    </a>

    <b-nav class="ml-auto d-flex align-items-center">
      <span class="avatar rounded-circle thumb-sm float-left mr-2">
              <img
                v-if="avatar"
                class="rounded-circle"
                :src="avatar"
                :alt="user.name"
              />
              <span v-else>{{firstUserLetter}}</span>
            </span>
      <span>{{ currentUser && currentUser.firstName  ? currentUser.firstName : 'User' }}</span>

      <b-nav-item-dropdown id="v-step-2" class="settcurrentUseringsDropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <i class='fi flaticon-settings-10 px-3' />
        </template>
<!--        <b-dropdown-item href="/app/profile"><i class='fi flaticon-user' />-->
<!--          My Account-->
<!--        </b-dropdown-item>-->

        <b-dropdown-item-button @click="logoutUser">
          <i class="fi flaticon-power" /> Log Out
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      dropdown: false,
      user: JSON.parse(localStorage.getItem('user') || {})
    }
  },
  computed: {
    ...mapState('layout', [
      'sidebarClose',
      'sidebarStatic',
      'navbarType',
      'navbarColorScheme'
    ]),
    ...mapState('auth', {
      currentUser: state => state.currentUser
    }),
    avatar() {
      return this.currentUser && this.currentUser.avatar.length
        ? this.currentUser.avatar[0].publicUrl
        : null
    },
    firstUserLetter() { return this.currentUser && this.currentUser.firstName ? this.currentUser.firstName[0].toUpperCase() : 'U' },
    navbarTypeClass: function () {
      return "navbar-" + this.navbarType + "-type"
    }
  },
  methods: {
    ...mapActions('layout', [
      'toggleSidebar',
      'switchSidebar',
      'changeSidebarActive',
    ]),
    ...mapActions('auth', ['logoutUser']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    }
  }
};
</script>

<style src="./Header.scss" lang="scss"></style>

