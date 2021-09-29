<template>
  <el-col
    :span="24"
    class="breadcrumb-container"
    v-show="$route.path && $route.meta.title"
  >
    <strong class="title">
      {{ $route.meta.title }}
      <span class="sub-title">{{ $route.meta.subtitle }}</span>
    </strong>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.breadcrumb-container {
  line-height: 1;
  padding: 5px 0 10px 0;
  .title {
    float: left;
    font-size: 24px;
    font-weight: 300;
    .sub-title {
      font-weight: 200;
      font-size: 14px;
    }
  }
  .breadcrumb {
    float: right;
    line-height: 24px;
  }
}
</style>
