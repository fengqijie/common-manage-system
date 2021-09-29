/**
 * Created by Chris on 2017/4/8.
 * routes info, like title, subtitle, breadcrumb of pages.
 */

import _ from "lodash";
import { routes } from "../../router";

function parseRoute(routes = [], parent, pre = {}) {
  for (const route of routes) {
    route.parent = parent;
    if (!route.name && !route.children) {
      console.warn("路由缺少name, 无法使用面包屑", route); // eslint-disable-line no-console
      continue;
    }
    if (route.children) {
      parseRoute(route.children, route, pre);
    } else {
      if (pre[route.name]) {
        console.error("路由name命名冲突", route.name); // eslint-disable-line no-console
        continue;
      }
      pre[route.name] = route;
    }
  }
  return pre;
}

export default {
  state: {
    ROUTE_MAP: null
  },
  mutations: {
    setRouteMap(state, data) {
      state.ROUTE_MAP = data;
    }
  },
  actions: {
    setRoute({ commit, state }) {
      let map = state.ROUTE_MAP;
      if (!map) {
        map = parseRoute(_.clone(routes));
        commit("setRouteMap", map);
      }
    }
  },
  getters: {
    routeMap: state => state.ROUTE_MAP
  }
};
