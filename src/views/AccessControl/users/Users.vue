<template>
  <div class="animated fadeIn">
    <div class="">
      <div class="cardheading">
  			<div class="">
  				<h1 class="my-auto tableName">

  				</h1>
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
    <div class="customcard" style="">
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
    <div class="pl-1">
        <paginate
            :pageCount="totalPageCount"
            :clickHandler="onPaginateClick"
            :prevText="'Prev'"
            :nextText="'Next'"
            :container-class="'pagination'">
        </paginate>
    </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import paginate from 'vuejs-paginate';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
    name: 'Users',
    components: {
        paginate,

    },
    data() {
        return {
            totalPageCount: 0,
            perPageItem: 5, // Only set this value
            pageNumber: 0,
            users: []
        }
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        handleDelete() {
            alert('Not implemented yet.');
        },
        fetchUsers() {
            axios.get(`${ADMIN_URL}/users/${this.perPageItem}/${this.pageNumber}`)
            .then(response => {
                this.users = response.data.users;
                this.totalPageCount = Math.ceil(response.data.totalcount / this.perPageItem);
            }).catch(error => {
              
            })
        },
        onPaginateClick(parm) {
            this.pageNumber = parm - 1; // As api start from "pageNumber 0"
            this.fetchUsers();
        }
    }
}
</script>

<style scoped>

</style>
