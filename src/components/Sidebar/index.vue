<template>
  <div class="sidebar">
    <div class="sidebar-title"><span v-show="!collapse">后台管理系统</span></div>
    <div class="sidebar-box">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="collapse"
        :default-active="activeMenu"
        background-color="#304156"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></SidebarItem>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["permission_routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // console.log(route);
      // 默认激活项
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return {
        menuText: "#ffffff",  // "#bfcbd9"
        menuActiveText: "#ffffff",
        menuBg:  "#001529"
       
      };
    }
  },
  mounted() {
    // console.log(this.permission_routes,12)
  }
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
}
.sidebar-title {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dcdfe6;
  color: #ffffff;
  box-sizing: border-box;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
}
.sidebar-box {
  width: 100%;
  height: calc(100% - 50px);
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: "-moz-scrollbars-none";
  scrollbar-width: none; /*  火狐   */
}
.sidebar-box::-webkit-scrollbar {
  display: none; /*  Chrome  */
  width: 0 !important ; /*  Chrome  */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/deep/.el-menu--collapse{
  width: 50px;
}

.el-menu--collapse /deep/.el-submenu__icon-arrow{
  display: none;
}

/deep/.el-menu-item:not(.submenu-title-noDropdown),
/deep/.el-submenu__title,
/deep/.el-tooltip{
  padding-left: 15px !important;
}

/deep/.submenu-title-noDropdown{
  padding-left: 30px !important;
}

/deep/.el-submenu__title>span,
/deep/.el-menu-item>span{
  margin-left: 20px;
}
</style>