<template>
  <div id="app" class="app">
    <el-row class="app-container">
      <el-col :span="24" class="main-container">
        <left-sidebar></left-sidebar>
        <section class="content-container">
          <top-breadcrumb></top-breadcrumb>
          <el-col :span="24" class="content-wrapper">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-col>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sidebar from "./sidebar.vue";
import breadcrumb from "./breadcrumb.vue";

export default {
  name: "app",
  components: {
    "left-sidebar": sidebar,
    "top-breadcrumb": breadcrumb
  },
  data() {
    return {};
  },
  computed: {}
};
</script>
<style lang="less" scoped>
.app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .app-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .main-container {
      display: flex;
      position: absolute;
      top: 0;
      bottom: 0;
      overflow: hidden;
      .content-container {
        background-color: #ecf0f5;
        flex: 1;
        overflow-y: auto;
        padding: 15px;
      }
    }
  }
}
</style>
