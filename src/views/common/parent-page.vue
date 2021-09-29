<template>
  <router-view
    v-loading="loading"
    element-loading-text="拼命加载中"
    :key="key"
  ></router-view>
</template>

<script>
let timer = null;
const loadingTime = 333;

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    // 一个name对应一个组件
    key() {
      return this.$route.name !== undefined ? this.$route.name : this.$route;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath !== from.fullPath) {
      this.loading = true;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      this.loading = false;
    }, loadingTime);
    next();
  }
};
</script>
