/**
 * Created by xujian1 on 2017/4/10.
 */

import _ from "lodash";
import { getUserInfo, getPermission } from "../../network";
import menuConfig from "../config/menu-config";

export default {
  state: {
    menuCollapsed: false,
    userInfo: {},
    permissions: {},
    menu: menuConfig
  },
  mutations: {
    toggleMenu(state) {
      state.menuCollapsed = !state.menuCollapsed;
    },
    updatePermission(state, data) {
      state.permissions = _.keyBy(data);
    },
    updateUserInfo(state, data) {
      state.userInfo = data;
    }
  },
  actions: {
    toggleMenu({ commit }) {
      commit("toggleMenu");
    },
    loadPermission({ commit }) {
      getPermission().then(response => {
        commit("updatePermission", response.data.data);
      });
    },
    loadUserInfo({ commit }) {
      getUserInfo().then(response => {
        commit("updateUserInfo", response.data.data);
      });
    }
  },
  getters: {
    menuCollapsed: state => state.menuCollapsed,
    userInfo: state => state.userInfo,
    permissions: state => state.permissions,
    menu: state => state.menu
  }
};
