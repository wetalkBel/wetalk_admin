

import Vue from 'vue';
import Router from 'vue-router';
// Layout
import Layout from '@/components/Layout/Layout';
// Main
//import Dashboard from '@/pages/Dashboard/Dashboard';
import Login from '@/pages/Login/Login';
import Forgot from '@/pages/Forgot/Forgot';
import Reset from '@/pages/Reset/Reset';
import ChangePassword from '@/pages/ChangePassword/ChangePassword';
import Register from '@/pages/Register/Register';
import VerifyEmail from '@/pages/VerifyEmail/VerifyEmail';
import ErrorPage from '@/pages/Error/Error';

// Profile
import Profile from '@/pages/Profile/Profile'

import { isAuthenticated } from './mixins/auth'


import MessagesTable from '@/components/CRUD/Messages/MessagesTable'
import MessagesEdit from '@/components/CRUD/Messages/MessagesEdit'
import MessagesNew from '@/components/CRUD/Messages/MessagesNew'

import ChatsTable from '@/components/CRUD/Chats/ChatsTable'
import ChatsEdit from '@/components/CRUD/Chats/ChatsEdit'
import ChatsNew from '@/components/CRUD/Chats/ChatsNew'

import SessionsTable from '@/components/CRUD/Sessions/SessionsTable'
import SessionsEdit from '@/components/CRUD/Sessions/SessionsEdit'
import SessionsNew from '@/components/CRUD/Sessions/SessionsNew'

import ProblemCodesTable from '@/components/CRUD/ProblemCodes/ProblemCodesTable'
import ProblemCodesEdit from '@/components/CRUD/ProblemCodes/ProblemCodesEdit'
import ProblemCodesNew from '@/components/CRUD/ProblemCodes/ProblemCodesNew'

import TagsTable from '@/components/CRUD/Tags/TagsTable'
import TagsEdit from '@/components/CRUD/Tags/TagsEdit'
import TagsNew from '@/components/CRUD/Tags/TagsNew'

import ArticlesTable from '@/components/CRUD/Articles/ArticlesTable'
import ArticleEdit from '@/components/CRUD/Articles/ArticleEdit'
import ArticleNew from '@/components/CRUD/Articles/ArticleNew'

// import ModulesTable from '@/components/CRUD/Modules/ModulesTable'
// import ModulesEdit from '@/components/CRUD/Modules/ModulesEdit'
// import ModulesNew from '@/components/CRUD/Modules/ModulesNew'

import NotificationTable from '@/components/CRUD/Notification/NotificationTable'
import NotificationEdit from '@/components/CRUD/Notification/NotificationEdit'
import NotificationNew from '@/components/CRUD/Notification/NotificationNew'

// import PagesTable from '@/components/CRUD/Pages/PagesTable'
// import PagesEdit from '@/components/CRUD/Pages/PagesEdit'
// import PagesNew from '@/components/CRUD/Pages/PagesNew'

import CitiesTable from '@/components/CRUD/Cities/CitiesTable'
import CitiesEdit from '@/components/CRUD/Cities/CitiesEdit'
import CitiesNew from '@/components/CRUD/Cities/CitiesNew'

import GendersTable from '@/components/CRUD/Genders/GendersTable'
import GendersEdit from '@/components/CRUD/Genders/GendersEdit'
import GendersNew from '@/components/CRUD/Genders/GendersNew'

// import Module_typesTable from '@/components/CRUD/Module_types/Module_typesTable'
// import Module_typesEdit from '@/components/CRUD/Module_types/Module_typesEdit'
// import Module_typesNew from '@/components/CRUD/Module_types/Module_typesNew'

import MethodsTable from '@/components/CRUD/Methods/MethodsTable'
import MethodsEdit from '@/components/CRUD/Methods/MethodsEdit'
import MethodsNew from '@/components/CRUD/Methods/MethodsNew'

// import TargetsTable from '@/components/CRUD/Targets/TargetsTable'
// import TargetsEdit from '@/components/CRUD/Targets/TargetsEdit'
// import TargetsNew from '@/components/CRUD/Targets/TargetsNew'

import UsersTable from '@/components/CRUD/Users/UsersTable';
import UsersEdit from '@/components/CRUD/Users/UsersEdit';
import UsersNew from '@/components/CRUD/Users/UsersNew';

import CallsTable from "@/components/CRUD/Calls/CallsTable";
import CallsNew from "@/components/CRUD/Calls/CallsNew";
import CallsEdit from "@/components/CRUD/Calls/CallsEdit";

import ReviewsTable from "./components/CRUD/Reviews/ReviewsTable";
import PsyArticlesTable from "./components/CRUD/Posts/PostPsyTable";
import ArticlesEdit from "./components/CRUD/Posts/PostPsyEdit";
import PsyArticlesNew from "./components/CRUD/Posts/PostPsyNew";


Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', redirect: { name: 'Profile' } },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot
    },
    {
      path: '/password-reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/verify-email',
      component: VerifyEmail
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      redirect: { name: 'Profile' },
      beforeEnter: ((to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/login'  })
      }),
      children: [
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: 'password',
          name: 'Password',
          component: ChangePassword,
        },
      ],
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: { name: 'Calls' },
      component: Layout,
      beforeEnter: ((to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/login'  })
      }),
      children: [
        {
          path: 'messages',
          name: 'Messages',
          component: MessagesTable,
        },
        {
          path: 'messages/:id/edit',
          component: MessagesEdit,
        },
        {
          path: 'messages/new',
          component: MessagesNew,
        },
        {
          path: 'messages/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/messages/${from.params.id}/edit`)
            },
          },
        
        {
          path: 'chats',
          name: 'Chats',
          component: ChatsTable,
        },
        {
          path: 'chats/:id/edit',
          component: ChatsEdit,
        },
        {
          path: 'chats/new',
          component: ChatsNew,
        },
        {
          path: 'chats/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/chats/${from.params.id}/edit`)
            },
          },

        {
          path: 'calls',
          name: 'Calls',
          component: CallsTable,
        },

        {
          path: 'calls/:id/edit',
          component: CallsEdit,
        },
        {
          path: 'calls/new',
          component: CallsNew,
        },
        {
          path: 'calls/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/calls/${from.params.id}/edit`)
          },
        },
        {
          path: 'sessions',
          name: 'Sessions',
          component: SessionsTable,
        },
        {
          path: 'sessions/:id/edit',
          component: SessionsEdit,
        },
        {
          path: 'sessions/new',
          component: SessionsNew,
        },
        {
          path: 'sessions/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/sessions/${from.params.id}/edit`)
            },
        },

        {
          path: 'reviews',
          name: 'Reviews',
          component: ReviewsTable,
        },

        {
          path: 'reportCodes',
          name: 'reportCodes',
          component: ProblemCodesTable,
        },
        {
          path: 'reportCodes/:id/edit',
          component: ProblemCodesEdit,
        },
        {
          path: 'reportCodes/new',
          component: ProblemCodesNew,
        },
        {
          path: 'reportCodes/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/problemCodes/${from.params.id}/edit`)
            },
          },
        
        {
          path: 'tags',
          name: 'Tags',
          component: TagsTable,
        },
        {
          path: 'tags/:id/edit',
          component: TagsEdit,
        },
        {
          path: 'tags/new',
          component: TagsNew,
        },
        {
          path: 'tags/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/tags/${from.params.id}/edit`)
            },
          },
        
        {
          path: 'posts',
          name: 'Posts',
          component: PsyArticlesTable,
        },
        {
          path: 'posts/:id/edit',
          component: ArticlesEdit,
        },
        {
          path: 'posts/new',
          component: PsyArticlesNew,
        },
        {
          path: 'posts/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/posts/${from.params.id}/edit`)
            },
          },

        {
          path: 'articles',
          name: 'Articles',
          component: ArticlesTable,
        },
        {
          path: 'articles/:id/edit',
          component: ArticleEdit,
        },
        {
          path: 'articles/new',
          component: ArticleNew,
        },
        {
          path: 'articles/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/articles/${from.params.id}/edit`)
          },
        },
        
        // {
        //   path: 'modules',
        //   name: 'Modules',
        //   component: ModulesTable,
        // },
        // {
        //   path: 'modules/:id/edit',
        //   component: ModulesEdit,
        // },
        // {
        //   path: 'modules/new',
        //   component: ModulesNew,
        // },
        // {
        //   path: 'modules/:id',
        //   beforeEnter(from, to, next) {
        //     if (from.params.id === 'new') next()
        //     else next(`/admin/modules/${from.params.id}/edit`)
        //     },
        //   },
        
        {
          path: 'notifications',
          name: 'Notifications',
          component: NotificationTable,
        },
        {
          path: 'notification/:id/edit',
          component: NotificationEdit,
        },
        {
          path: 'notification/new',
          component: NotificationNew,
        },
        {
          path: 'notification/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/notification/${from.params.id}/edit`)
            },
          },
        
        // {
        //   path: 'pages',
        //   name: 'Pages',
        //   component: PagesTable,
        // },
        // {
        //   path: 'pages/:id/edit',
        //   component: PagesEdit,
        // },
        // {
        //   path: 'pages/new',
        //   component: PagesNew,
        // },
        // {
        //   path: 'pages/:id',
        //   beforeEnter(from, to, next) {
        //     if (from.params.id === 'new') next()
        //     else next(`/admin/pages/${from.params.id}/edit`)
        //     },
        //   },
        
        {
          path: 'cities',
          name: 'Cities',
          component: CitiesTable,
        },
        {
          path: 'cities/:id/edit',
          component: CitiesEdit,
        },
        {
          path: 'cities/new',
          component: CitiesNew,
        },
        {
          path: 'cities/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/cities/${from.params.id}/edit`)
            },
          },
        
        {
          path: 'genders',
          name: 'Genders',
          component: GendersTable,
        },
        {
          path: 'genders/:id/edit',
          component: GendersEdit,
        },
        {
          path: 'genders/new',
          component: GendersNew,
        },
        {
          path: 'genders/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/genders/${from.params.id}/edit`)
            },
          },
        
        // {
        //   path: 'module_types',
        //   name: 'Module_types',
        //   component: Module_typesTable,
        // },
        // {
        //   path: 'module_types/:id/edit',
        //   component: Module_typesEdit,
        // },
        // {
        //   path: 'module_types/new',
        //   component: Module_typesNew,
        // },
        // {
        //   path: 'module_types/:id',
        //   beforeEnter(from, to, next) {
        //     if (from.params.id === 'new') next()
        //     else next(`/admin/module_types/${from.params.id}/edit`)
        //     },
        //   },
        
        {
          path: 'methods',
          name: 'Methods',
          component: MethodsTable,
        },
        {
          path: 'methods/:id/edit',
          component: MethodsEdit,
        },
        {
          path: 'methods/new',
          component: MethodsNew,
        },
        {
          path: 'methods/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/methods/${from.params.id}/edit`)
            },
          },
        
        // {
        //   path: 'targets',
        //   name: 'Targets',
        //   component: TargetsTable,
        // },
        // {
        //   path: 'targets/:id/edit',
        //   component: TargetsEdit,
        // },
        // {
        //   path: 'targets/new',
        //   component: TargetsNew,
        // },
        // {
        //   path: 'targets/:id',
        //   beforeEnter(from, to, next) {
        //     if (from.params.id === 'new') next()
        //     else next(`/admin/targets/${from.params.id}/edit`)
        //     },
        //   },
        
        {
          path: 'users',
          name: 'Users',
          component: UsersTable,
        },
        {
          path: 'users/:id/edit',
          component: UsersEdit,
        },
        {
          path: 'users/new',
          component: UsersNew,
        },
        {
          path: 'users/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next()
            else next(`/admin/users/${from.params.id}/edit`)
            },
          },
        
      ]
    }
  ],
})

export default router

