

<template>
  <div :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard', 'sidebar-' + sidebarColorName, 'sidebar-' + sidebarType, 'navbar-' + navbarColorName]">
    <Sidebar />
    <Helper />
    <div class="wrap">
      <Header />
      <v-touch class="content" @swipe="handleSwipe" :swipe-options="{direction: 'horizontal'}">
        <breadcrumb-history :exclude="['chat']"></breadcrumb-history>
        <transition name="router-animation">
          <router-view />
        </transition>
        <footer class="contentFooter">
          Unicef - Made by <a href="https://flatlogic.com" rel="nofollow noopener noreferrer" target="_blank">Flatlogic</a>
        </footer>
      </v-touch>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('layout');

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import Helper from '@/components/Helper/Helper';
import BreadcrumbHistory from '@/components/BreadcrumbHistory/BreadcrumbHistory';

export default {
  name: 'Layout',
  components: { Sidebar, Header, Helper, BreadcrumbHistory },
  methods: {
    ...mapActions(['switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar', 'toggleHelper']),
    handleWindowResize() {
      const width = window.innerWidth;

      if (width <= 768 && this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      }
    },
  },
  computed: {
    ...mapState(["sidebarClose", "sidebarStatic", "sidebarColorName", 'navbarColorName', "sidebarType", "helperOpened"]),
  },
  created() {
    const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

    if (staticSidebar) {
      this.$store.state.layout.sidebarStatic = true;
    } else if (!this.sidebarClose) {
      setTimeout(() => {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }, 2500);
    }

    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
};
</script>

<style src="./Layout.scss" lang="scss" />

