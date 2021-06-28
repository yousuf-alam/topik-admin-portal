export default {
  methods:{
    getUserPermission(permissionName) {
      return this.$store.getters['auth/getAllPermission'].includes(permissionName);
    },
  }
}
