<template>
  <div class="app ">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" :src="origin_url+'/img/brand/topik.svg'" width="120" height="40" alt="Romoni Logo">
        <img class="navbar-brand-minimized" src="/img/brand/topik.svg" width="30" height="30" alt="Romoni Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Admin Dashboard</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto ">
        <!--
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        -->
        <NotificationDropdown/>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!--
        <b-navbar-nav>
          <TestDesktopNoti />
        </b-navbar-nav>
      -->
<!--      <AsideToggler class="d-none d-lg-block" />-->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body ">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
<!--      <AppAside fixed>-->
<!--        &lt;!&ndash;aside&ndash;&gt;-->
<!--        <DefaultAside/>-->
<!--      </AppAside>-->
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://coreui.io">
          Topik Learning App
        </a>
        <span class="ml-1">&copy; {{ new Date().getFullYear() }} </span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import NotificationDropdown from '../views/Notifications/self/NotificationDropdown';
// import TestDesktopNoti from './TestDesktopNoti';

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    NotificationDropdown,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    // TestDesktopNoti
  },
  data () {
    return {
      nav: nav.items,
      origin_url: window.location.origin
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>
