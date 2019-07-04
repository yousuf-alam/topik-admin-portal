<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        :src="origin_url+'/img/avatars/6.jpg'"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>
    <template slot="dropdown">
          <b-dropdown-header tag="div" class="text-center">
            <strong>Romoni Admin</strong>
          </b-dropdown-header>
           <b-dropdown-item class="logged-in-user">
             <div > {{ loggedInUser.name }}  </div>
           </b-dropdown-item>

           <b-dropdown-item>
             <router-link :to="{name: 'SelfAllNotifications'}">
             <i class="fa fa-bell-o"></i> Notifications
             <b-badge variant="danger">{{ itemsCount }}</b-badge>
             </router-link>
           </b-dropdown-item>
           <b-dropdown-item>
            <router-link :to="{name: 'Profile'}">
             <i class="fa fa-user"></i>
             Profile
            </router-link>
           </b-dropdown-item>
           <b-dropdown-item @click="logoutClicked">
             <i class="fa fa-lock text-danger"></i>
             <b class="text-danger"> Logout </b>
           </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import EventBus from '../utils/EventBus';
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown,
  },
  data() {
    return {
      itemsCount: '',
      origin_url: window.location.origin
    }
  },
  created() {
    EventBus.$on('unread:notification'   , this.notificationCount.bind(this));
    this.notificationCount();
  },
  computed: {
    loggedInUser() {
      return this.$store.getters['auth/authUser'];
    }
  },
  methods: {
    logoutClicked(e) {
      this.$store.dispatch('auth/logout')
        .then(result => {
          this.$router.go(); // For reloading the page. . .
        })
        .catch(error => {
          //console.log('logout failure :: ', error.response);
        })
    },
    notificationCount(count) {
      this.itemsCount = count;
    }
  }
}
</script>

<style scoped>
.logged-in-user {
  background-color: #23282c;
  color:white;
  text-align: center;
  font-weight: 600;
}
  a{
    color: initial;
    text-decoration: none;
  }

</style>
