<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        :src="`${BASE_URL}/${profile_image_url}`"
        class="img-avatar"
        @error="imageViewError"
        :alt="profile_image_title"
      />
    </template>
    <template slot="dropdown">
          <b-dropdown-header tag="div" class="text-center">
            <strong>Topik Admin</strong>
          </b-dropdown-header>
           <b-dropdown-item class="logged-in-user">
              {{ loggedInUser.name }}
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
const BASE_URL = process.env.VUE_APP_BASE_URL;
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown,
  },
  data() {
    return {
      BASE_URL: BASE_URL,
      itemsCount: '',
      profile_image_url: '',
      profile_image_title: ''
    }
  },
  created() {
    EventBus.$on('unread:notification'   , this.notificationCount.bind(this));
    this.notificationCount();
    // this.image_url = BASE_URL +'/';
  },
  computed: {
    loggedInUser() {
      return this.$store.getters['auth/authUser'];
    }
  },
  mounted() {
    this.profile_image_url = this.$store.getters['auth/authUser'].avatar;
    this.profile_image_title = this.$store.getters['auth/authUser'].name;
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
    },
    imageViewError() {
      this.profile_image_url = 'images_api/imgnotfound3.png';
      this.profile_image_title = 'Image Not Found';
    }
  }
}
</script>

<style scoped>
.logged-in-user {
  background-color: #BBCAF3;
  text-align: center;
  font-weight: 600;
}
  a{
    color: initial;
    text-decoration: none;
  }

</style>
