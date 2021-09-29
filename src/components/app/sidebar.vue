<template>
  <aside class="left-sidebar" :class="{ collapsed: menuCollapsed }">
    <div class="menu-toggle" @click="toggleMenu">
      <div class="toggle">
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="menu-container">
      <el-menu
        class="menu-expanded"
        :class="{ collapsed: menuCollapsed }"
        :default-active="$route.name"
        unique-opened
        router
        :collapse="menuCollapsed"
      >
        <template
          v-show="hasChild(item.children)"
          v-for="(item, index) in menu"
        >
          <!--有子菜单-->
          <el-submenu
            v-show="
              item.children &&
                item.children.length > 0 &&
                hasChild(item.children)
            "
            :index="`${index}`"
            :key="item.text"
          >
            <template slot="title">
              <div class="primary-menu-item">
                <i class="fa" :class="item.icon || defIconCls"></i>
                <span>{{ item.text }}</span>
              </div>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :index="child.route.name"
              :route="child.route"
              :key="child.route.path"
              :class="{ 'is-active': isActive(child) }"
              v-show="hasPermissions(child)"
            >
              <div class="second-menu-item">
                {{ child.text }}
              </div>
            </el-menu-item>
          </el-submenu>
          <!--没有子菜单-->
          <el-menu-item
            v-show="hasPermissions(item)"
            :index="item.route.path"
            :route="item.route"
            :key="index"
          >
            <div class="primary-menu-item">
              <i class="fa" :class="item.icon || defIconCls"></i>
              <span>{{ item.text }}</span>
            </div>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </aside>
</template>
<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import { logout } from "../../utils/sso";

export default {
  data() {
    return {
      defIconCls: "fa-circle-o",
      DEV_API: process.env.VUE_APP_ENV !== "production",
      loading: false
    };
  },
  computed: {
    ...mapGetters(["menuCollapsed", "permissions", "menu", "routeMap"])
  },
  methods: {
    ...mapActions(["toggleMenu", "loadPermission", "loadUserInfo"]),
    logout,
    /**
     * 显示子菜单
     */
    showMenu(index, status) {
      this.$refs.collapsedMenu.getElementsByClassName(
        "submenu-hook-" + index
      )[0].style.display = status ? "block" : "none";
    },
    hasChild(list) {
      if (!list) {
        return true;
      }
      const allNotPermission = _.every(
        list,
        node => !this.hasPermissions(node)
      );
      return !allNotPermission;
    },
    /**
     * 拥有菜单权限
     * @param item
     * @return {*}
     */
    hasPermissions(item) {
      let routeMap = this.routeMap || {};
      let permissions = this.permissions || {};
      if (routeMap[item.route.name]) {
        if (routeMap[item.route.name].meta.permission) {
          return permissions[routeMap[item.route.name].meta.permission];
        }
        return true;
      }
    },
    /**
     * 子菜单active
     * @param item
     * @return {boolean}
     */
    isActive(item) {
      let matched = this.$route.matched || [];
      return matched.filter(m => m.path === item.route.path).length > 0;
    },
    /**
     * 父及菜单active
     * @param item
     * @return {boolean}
     */
    isParentActive(item) {
      let isParentMenuActive = false;
      (item.children || []).forEach(child => {
        if (this.isActive(child)) {
          isParentMenuActive = true;
        }
      });
      return isParentMenuActive;
    },
    routerToPage(route) {
      this.$router.push(route);
    }
  },
  created() {
    this.loadUserInfo();
    this.loadPermission();
  }
};
</script>
<style lang="less">
@menu-item-height: 40px;
@text-normal-color: mix(#fff, #2b3b58, 60%);

.left-sidebar {
  width: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #2b3b58;
  transition: all 0.2s ease-in-out;
  &.collapsed {
    width: 50px;
  }

  .menu-toggle {
    position: absolute;
    top: 0;
    right: 0;
    border-top: 50px solid #364766;
    border-left: 50px solid transparent;
    &:hover {
      cursor: pointer;
      border-top: 50px solid #fff;
    }
    .toggle {
      position: absolute;
      top: -50px;
      right: 0;
      color: @text-normal-color;
      margin: 5px;
    }
    .collapsed& {
      border-top: 50px solid #364766;
      border-right: 50px solid transparent;
      &:hover {
        border-top: 50px solid white;
      }
      .toggle {
        left: 0;
        right: auto;
        transform: rotateZ(180deg);
      }
    }
  }

  .menu-container {
    flex: 1;
    margin-top: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    .collapsed& {
      overflow: inherit;
    }
    [class^="fa"] {
      vertical-align: baseline;
      margin-right: 10px;
    }
    .el-menu--collapse {
      width: inherit;
    }
    .el-menu {
      border-right: none;
      background-color: transparent;
      .el-menu-item,
      .el-submenu__title {
        background-color: transparent;
        color: @text-normal-color;
        &:hover {
          color: #fff;
        }
      }
      .el-menu-item {
        height: @menu-item-height;
        line-height: @menu-item-height;
        padding: 0 30px;
        &.is-active {
          color: #fff;
        }
      }
      .el-submenu__title {
        height: @menu-item-height;
        line-height: @menu-item-height;
      }
      .el-submenu {
        &.is-opened {
          .el-submenu__title {
            color: #fff;
          }
        }
        .el-menu-item {
          padding: 0 48px !important;
        }
      }
    }
  }
  .toolbar {
    text-align: center;
    .title-com {
      color: lighten(@text-normal-color, 7%);
      .collapsed& {
        display: none;
      }
      .com {
        font-size: 25px;
        font-weight: bolder;
      }
      .title {
        font-size: 18px;
      }
    }
    .tools {
      padding: 25px 0;
      .tool {
        font-size: 16px;
        color: @text-normal-color;
      }
    }
  }
}
</style>
