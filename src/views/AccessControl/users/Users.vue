<template>
  <div class="animated fadeIn">
      <div class="cardheading">
        <h4><i class="fa fa-user"></i><span class="ml-1">Users</span></h4>
  			<div class="">
  				<h1 class="my-auto tableName"></h1>
  			</div>
  			<div class="">
  				<router-link to="/users/new">
                  <p class="my-0">
                  <span class="btn btn-success new-cat-btn-name p-2">
                      Create New User <b> + </b>
                  </span>
                  </p>
  				</router-link>
  			</div>
  		</div>
    <div class="card">
      <v-client-table :data="users" :columns="columns" :options="options">
        <template slot="action" slot-scope="props">
          <div>
            <router-link :to="`/users/show/${props.row.id}`">
                          <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View">
                              <i class="fa fa-search"></i>
                          </span>
            </router-link>

            <router-link :to="`/users/edit/${props.row.id}`">
              <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Edit"> <i class="fa fa-edit"></i></span>
            </router-link>
            <router-link to="" >
              <span @click="handleDelete(props.row)" class="btn btn-danger btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
            </router-link>

          </div>
        </template>
      </v-client-table>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import paginate from 'vuejs-paginate';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
    name: 'Users',
    data() {
        return {
            users: [],
            columns: ['id', 'name','phone','role_name','action'],
            options: {
              pagination: {nav: 'fixed'},
              filterByColumn: true,
              //dateColumns: ['created_at'],
              toMomentFormat: 'YYYY-MM-DD',
              sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

            }
        }
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        handleDelete(parm) {
            if (confirm('Are you sure?') ) {
                const user_id = parm.id;
                axios.delete(`${ADMIN_URL}/users/${user_id}`)
                .then(response => {
                    alert('User Deteted Successfully');
                    this.fetchUsers(); 
                }).catch(error => {

                })

            } else {
                console.log('Noooooo')
            }
        },
        fetchUsers() {
            axios.get(`${ADMIN_URL}/users`)
            .then(response => {
                this.users = response.data;
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>
