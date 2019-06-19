<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="10"></b-col>
      <b-col sm="2" class="mb-3">
        <router-link to="/users/new">
          <p class="my-2">
                    <span class="btn btn-success">
                        Create New User +
                    </span>
          </p>
        </router-link>
      </b-col>
    </b-row>
    <div class="customcard">
        <div class="cardheading">
			<div class="">
				<h1 class="my-auto tableName">

				</h1>
			</div>
			<!--<div class="">
				<router-link to="/users/new">
                <p class="my-2">
                <span class="btn btn-success new-cat-btn-name p-2">
                    Create New User <b> + </b>
                </span>
                </p>
				</router-link>
			</div>-->
		</div>
    <div class="card" style="">
      <div class="card-header">
        <b>Users</b>
      </div>
      <div class="usersTable table-responsive">
          <table class="table table-hover">
          <thead class="">
              <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="row in users" :key="row.id">
                  <th scope="row">{{row.id}}</th>
                  <td>{{row.name}}</td>
                  <td>{{row.phone}}</td>
                  <td>
                      <div v-for="role in row.roles" :key="role.id">
                          <span class="mr-1 badge badge-secondary">{{role.name}}</span>
                      </div>
                  </td>
                  <td>
                      <router-link :to="`/users/show/${row.id}`">
                          <span class="btn bg-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View">
                              <i class="fa fa-search"></i>
                          </span>
                      </router-link>

                      <router-link :to="`/users/edit/${row.id}`">
                          <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Edit"> <i class="fa fa-edit"></i></span>
                      </router-link>
                      <router-link to="" >
                          <span @click="handleDelete" class="btn btn-danger btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
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
    name: 'Users',
    data() {
        return {
            users: []
        }
    },
    created() {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        const request = axios.get(`${ADMIN_URL}/users`);
        request.then(response => {
            // console.log('Response  === ', response);
            this.users = response.data;
        }).catch(error => {
            // console.log('Error : ', error.response);
        })
    },
    methods: {
        handleDelete() {
            alert('Not implemented yet.');
        }
    }
}
</script>

<style scoped>

</style>
