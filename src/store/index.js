import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import auth from './auth';
import changePassword from './changePassword';
import register from './register';
import forgot from './forgot';
import reset from './reset';
import dashboard from './dashboard';
import messages from './lists/messagesList';
import messagesForm from './forms/messagesForm';

import chats from './lists/chatsList';
import chatsForm from './forms/chatsForm';

import sessions from './lists/sessionsList';
import sessionsForm from './forms/sessionsForm';

import problemCodes from './lists/problemCodesList';
import problemCodesForm from './forms/problemCodesForm';

import tags from './lists/tagsList';
import tagsForm from './forms/tagsForm';

import posts from './lists/postsList';
import postsForm from './forms/postsForm';

import modules from './lists/modulesList';
import modulesForm from './forms/modulesForm';

import notification from './lists/notificationList';
import notificationForm from './forms/notificationForm';

import pages from './lists/pagesList';
import pagesForm from './forms/pagesForm';

import cities from './lists/citiesList';
import citiesForm from './forms/citiesForm';

import genders from './lists/gendersList';
import gendersForm from './forms/gendersForm';

import module_types from './lists/module_typesList';
import module_typesForm from './forms/module_typesForm';

import methods from './lists/methodsList';
import methodsForm from './forms/methodsForm';

import targets from './lists/targetsList';
import targetsForm from './forms/targetsForm';

import users from './lists/usersList';
import usersForm from './forms/usersForm';

import calls from './lists/callsList';
import callsForm from './forms/callsForm';

import reviews from './lists/reviewsList';
import reviewsForm from './forms/reviewsForm';

import articles from './lists/articlesList';
import articlesForm from './forms/arcticlesForm';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    changePassword,
    register,
    dashboard,
    forgot,
    reset,
    messages,
    messagesForm,
    chats,
    chatsForm,
    sessions,
    sessionsForm,
    problemCodes,
    problemCodesForm,
    tags,
    tagsForm,
    posts,
    postsForm,
    modules,
    modulesForm,
    notification,
    notificationForm,
    pages,
    pagesForm,
    cities,
    citiesForm,
    genders,
    gendersForm,
    module_types,
    module_typesForm,
    methods,
    methodsForm,
    targets,
    targetsForm,
    users,
    usersForm,
    calls,
    callsForm,
    reviews,
    reviewsForm,
    articles,
    articlesForm
  },
})

