import Vue from "vue";
import { logout } from "../utils/sso";

export function useInterceptors(netApi) {
  netApi.interceptors.request.use(function (request) {
    // 请求拦截
    return request;
  });

  netApi.interceptors.response.use(
    // 响应拦截
    function (response) {
      let notify = Vue.prototype.$notify;
      if (response.data.code !== 0) {
        if (response.data.message === "获取用户权限失败") {
          logout();
        }
        if (response.data.code == 504) {
          notify.error("没有登陆");
          logout();
        }
        notify.error({
          title: "数据错误",
          message: response.data.message
        });
        return Promise.reject(response);
      }
    },
  );
}
