<template>
    <div class="customcard">
        <div class="cardheading">
			<div class="">
				<h1 class="my-auto ">
                    Users:
				</h1>
			</div>
			<div class="">
				<router-link to="/users/new">
                    <p class="my-2">
                    <span class="badge badge-secondary new-cat-btn-name p-3">
                        Create New User <b> + </b>
                    </span>
                    </p>
				</router-link>
			</div>
		</div>
        <div class="usersTable table-responsive">
            <table class="table table-hover">
            <thead class="bg-dark">
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
                            <span class="mr-1 badge badge-warning">{{role.name}}</span>
                        </div>
                    </td>
                    <td>
                        <router-link :to="`/users/show/${row.id}`">
                            <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View">
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
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        const request = axios.get(`${Base_URL}/users`);
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

<style>

</style>
