

<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/app">Unicef</router-link>
      </header>
      <ul class="nav">
          <NavLink
              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"
              :activeItem="activeItem"
              header="Calls"
              link="/admin/calls"
              iconName="flaticon-message-circle"
              index="calls"
              isHeader
          />

<!--        <NavLink-->
<!--            v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--            :activeItem="activeItem"-->
<!--            header="Reviews"-->
<!--            link="/admin/reviews"-->
<!--            iconName="flaticon-message-circle"-->
<!--            index="reviews"-->
<!--            isHeader-->
<!--        />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('coordinator') || currentUser.role.includes('admin'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Messages"-->
<!--              link="/admin/messages"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="messages"-->
<!--              isHeader-->
<!--          />-->

          <NavLink
              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"
              :activeItem="activeItem"
              header="Chats"
              link="/admin/chats"
              iconName="flaticon-message-circle"
              index="chats"
              isHeader
              :childrenLinks="[
                  { header: 'Chats', link: '/admin/chats' },
                  { header: 'Messages', link: '/admin/messages'}
              ]"
          />

          <NavLink
              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"
              :activeItem="activeItem"
              header="Sessions"
              link="/admin/sessions"
              iconName="flaticon-message-circle"
              index="sessions"
              isHeader
              :childrenLinks="[
                  { header: 'Sessions', link: '/admin/sessions' },
                  { header: 'Notifications', link: '/admin/notifications' },
                  { header: 'Reviews', link: '/admin/reviews' },
                  { header: 'ReportCodes', link: '/admin/reportCodes' }
              ]"
          />

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="ReportCodes"-->
<!--              link="/admin/reportCodes"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="reportCodes"-->
<!--              isHeader-->
<!--          />-->

          <NavLink
              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"
              :activeItem="activeItem"
              header="Articles"
              link="/admin/articles"
              iconName="flaticon-message-circle"
              index="articles"
              isHeader
              :childrenLinks="[
                    { header: 'Articles', link: '/admin/articles' },
                    { header: 'Posts', link: '/admin/posts' },
                    { header: 'Tags', link: '/admin/tags' }
                ]"
          />

          <NavLink
              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"
              :activeItem="activeItem"
              header="Filters"
              link="/admin/cities"
              iconName="flaticon-message-circle"
              index="cities"
              isHeader
              :childrenLinks="[
                  { header: 'Cities', link: '/admin/cities' },
                  { header: 'Genders', link: '/admin/genders' },
                  { header: 'Methods', link: '/admin/methods' }
              ]"
          />

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Posts"-->
<!--              link="/admin/posts"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="posts"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Tags"-->
<!--              link="/admin/tags"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="tags"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Modules"-->
<!--              link="/admin/modules"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="modules"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Notification"-->
<!--              link="/admin/notification"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="notification"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Pages"-->
<!--              link="/admin/pages"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="pages"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Cities"-->
<!--              link="/admin/cities"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="cities"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Genders"-->
<!--              link="/admin/genders"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="genders"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Module_types"-->
<!--              link="/admin/module_types"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="module_types"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Methods"-->
<!--              link="/admin/methods"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="methods"-->
<!--              isHeader-->
<!--          />-->

<!--          <NavLink-->
<!--              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"-->
<!--              :activeItem="activeItem"-->
<!--              header="Targets"-->
<!--              link="/admin/targets"-->
<!--              iconName="flaticon-message-circle"-->
<!--              index="targets"-->
<!--              isHeader-->
<!--          />-->

          <NavLink
              v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"
              :activeItem="activeItem"
              header="Users"
              link="/admin/users"
              iconName="flaticon-message-circle"
              index="users"
              isHeader
          />


        <NavLink
            v-if="currentUser && (currentUser.role.includes('user') || (currentUser.role.includes('psychologist') && !currentUser.role.includes('coordinator')))"
            :activeItem="activeItem"
            header="Profile"
            link="/app/profile"
            iconName="flaticon-person"
            index="profile"
            isHeader
        />

        <NavLink
          v-if="currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('coordinator'))"
          :activeItem="activeItem"
          header="Change password"
          link="/app/password"
          iconName="flaticon-person"
          index="profile"
          isHeader
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  // beforeMount() {
  //   console.log(this.currentUser.role, 'before')
  // },
  // mounted() {
  //   console.log(this.currentUser.role)
  // },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
    isAdmin() {
      // const roles = ['admin', 'coordinator']
      // const isRoleExisted = this.currentUser.role.some(role => {
      //   return roles.includes(role)
      // })

      let isAdmin = false;
      //const roles = ['admin', 'coordinator', 'psychologist']
      this.currentUser.role.forEach(role => {
        switch (role) {
          case 'admin':
            console.log('admin')
            isAdmin = true;
            break;
          case 'coordinator':
            console.log('coordinator')
            isAdmin = true;
            //console.log('coordinator')
            break;
          case 'coordinator'&&'psychologist':
            console.log('coordinator && psychologist')
            isAdmin = true;
            //console.log('coordinator && psychologist')
            break;
          case 'admin'&&'coordinator':
            console.log('admin && psychologist')
            isAdmin = true;
            break;
          case 'user':
            console.log('user')
            isAdmin = false;
          default:
            isAdmin = false;
        }
      })
      return isAdmin;
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
    ...mapState('auth', {
      currentUser: state => state.currentUser
    })
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
