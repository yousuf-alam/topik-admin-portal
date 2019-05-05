<template>
    <div class="customcard">
        <h3>View single user</h3>
        <div v-if="user_notfound">
            <h4 class="text-danger">User Not Found</h4>
        </div>
        <div v-if="user!==null">
        <div class="col-6">
            <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Property</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Name</th>
                    <td>{{user.name}}</td>
                </tr>
                <tr>
                    <th scope="row">Phone</th>
                    <td>{{user.phone}}</td>
                </tr>
                <tr>
                    <th scope="row">Roles</th>
                    <td>
                        <div v-for="role in roles" :key="role.id" class="mx-1 badge badge-warning">
                            {{role.name}}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Email</th>
                    <td>{{user.email}}</td>
                </tr>
                <tr>
                    <th scope="row">Address</th>
                    <td>{{user.address}}</td>
                </tr>
                <tr>
                    <th scope="row">Gender</th>
                    <td>{{user.gender}}</td>
                </tr>
                <tr>
                    <th scope="row">Responsibilities</th>
                    <td>{{user.responsibilities}}</td>
                </tr>
                <tr>
                    <th scope="row">Fb accountkit id</th>
                    <td>{{user.fb_accountkit_id}}</td>
                </tr>
            </tbody>
            </table>
        </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'AdministratorShow',
    data() {
        return {
            user: null,
            roles: [],
            user_notfound: false,
        }
    },
    created() {
        const user_id = this.$route.params.id;
        const ADMIN_URL = this.$gbvar.ADMIN_URL;
        const axios = this.$gbvar.axios;
        axios.get(`${ADMIN_URL}/api/users/${user_id}`)
            .then(response => {
                //console.log('Response  ', response)
                this.user = response.data; 
                this.roles = this.user.roles;
            }).catch(error => {
                //console.log('Error. .. .', error.response);
                const errResponse = error.response;
                if (errResponse.status === 404) {
                    this.user_notfound = true;
                }
            })
    }
}
</script>

<style>

</style>
