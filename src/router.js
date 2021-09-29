/**
 * 路由配置
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import { login } from "./utils/sso";

Vue.use(VueRouter);

// 页面
import Index from "./views/index.vue";
import CommonParent from "./views/common/parent-page.vue";

// eslint-disable-next-line import/no-mutable-exports
export let routes = [
  {
    path: "/",
    name: "/",
    component: Index
  },
  {
    path: "/oneModule",
    component: CommonParent,
    meta: {
      title: "模块一",
      subtitle: ""
    },
    children: [
      {
        path: "testOne",
        name: "testOne",
        component: () => import("@/views/oneModule/test-one.vue"),
        meta: {
          title: "测试页一",
        }
      },
      {
        path: "testTwo",
        name: "testTwo",
        component: () => import("@/views/oneModule/test-two.vue"),
        meta: {
          title: "测试页二",
        }
      },
    ]
  },
  {
    path: "/twoModule",
    component: CommonParent,
    meta: {
      title: "模块二",
      subtitle: ""
    },
    children: [
      {
        path: "testThree",
        name: "testThree",
        component: () => import("@/views/twoModule/test-three.vue"),
        meta: {
          title: "测试页三",
        }
      },
      {
        path: "testFour",
        name: "testFour",
        component: () => import("@/views/twoModule/test-four.vue"),
        meta: {
          title: "测试页四",
        }
      },
    ]
  },
].concat({
  // 404页面
  path: "*",
  name: "404",
  component: resolve => import("./views/common/404.vue").then(resolve)
});

const router = new VueRouter({
  mode: "hash",
  base: "/" || undefined,
  routes
});

router.afterEach(to => {
  // 开启 sso 登录
  login();

  // 将 route 对象同步到 store
  store.dispatch("setRoute", to);
});

export default router;
