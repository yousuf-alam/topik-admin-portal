<template>
  <div class="animated fadeIn">
    <div class="">
        <div class="cardheading">
          <h4><i class="fa fa-podcast"></i><span class="ml-1">Roles</span></h4>
    			<div class="">
    				<h2 class="my-auto tableName"> </h2>
    			</div>
    			<div class="">
    				<router-link to="/roles/new">
                <p class="my-0">
                    <span class="btn btn-success new-cat-btn-name p-2">
                        Create New Role <b> + </b>
                    </span>
                </p>
    				</router-link>
    			</div>
		   </div>
        <div class="text-danger text-center" ref="role_delete_error" tabindex="0">
            {{ role_delete_error }}
        </div>

        <div class="card">
          <div class="card-header">
            <b>Roles</b>
          </div>

          <div class="rolesTable table-responsive">
              <table class="table table-hover">
              <thead class="thead-">
                  <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="row in roles" :key="row.id">
                      <th scope="row">{{row.id}}</th>
                      <td>{{row.name}}</td>
                      <td>
                          <router-link :to="`/roles/show/${row.id}`">
                              <span class="btn bg-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View">
                                  <i class="fa fa-search"></i>
                              </span>
                          </router-link>
                  <!--
                          <router-link to="/roles/edit/1" v-if="row.name!=='superadmin'">
                              <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Edit"> <i class="fa fa-edit"></i></span>
                          </router-link>
                  -->
                          <router-link to="" v-if="row.name!=='superadmin'" >
                              <span class="btn btn-danger btn-sm m-1" @click="handleDelete(row)" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
                          </router-link>
                      </td>
                  </tr>
              </tbody>
              </table>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
     name: 'Role',
     data() {
         return {
             roles: [],
             role_delete_error: ''
         }
     },
     created() {
         this.fetchData()
     },
     methods: {
         fetchData() {
            const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
            const request = axios.get(`${ADMIN_URL}/roles`);
            request.then(response => {
                this.roles = response.data;
            }).catch(error => {
                //console.log('Error : ', error.response);
            })
         },
         handleDelete(role) {
             const role_id = role.id;
             const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
             if (confirm('Are you sure to delete this role? ')) {
                const request = axios.delete(`${ADMIN_URL}/roles/${role_id}`);
                request.then(response => {
                    if (response.status === 200) {
                        alert('Role deleted successfully');
                        this.fetchData();
                    }
                }).catch(error => {
                    if (error.response.status === 404 ) {
                        const msg = error.response.data;
                        this.role_delete_error = `${msg}. Reload the page & Try again.`;
                        this.$refs.role_delete_error.focus();
                    } else if (error.response.status === 422) {
                        this.role_delete_error = error.response.data;
                        this.$refs.role_delete_error.focus();
                    }
                })
             } else {
                 //console.log('No, I do not want to delete any role.');
             }

         }
     }
}
</script>

<style scoped>


</style>
