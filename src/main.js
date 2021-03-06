import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./components/app/app.vue";
import "./styles/main.less";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
