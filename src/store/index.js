/**
 * store of vuex
 */

import Vue from "vue";
import Vuex from "vuex";
import route from "./modules/route";
import menu from "./modules/menu";

Vue.use(Vuex);

// use modules
const store = new Vuex.Store({
  modules: {
    route,
    menu,
  },
});

export default store;
