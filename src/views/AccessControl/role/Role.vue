<template>
    <div class="customcard">
        <div class="cardheading">
			<div class="">
				<h1 class="my-auto ">
                    Roles List:
				</h1>
			</div>
			<div class="">
				<router-link to="/roles/new">				
                    <p class="my-2">
                    <span class="badge badge-secondary new-cat-btn-name p-3">
                        Create New Role <b> + </b>
                    </span>
                    </p> 
				</router-link>
			</div>
		</div>	
        <div class="rolesTable table-responsive"> 
            <table class="table table-hover">
            <thead class="bg-success">
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
                            <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View"> 
                                <i class="fa fa-search"></i>
                            </span> 
                        </router-link>                         
                <!--                         
                        <router-link to="/roles/edit/1" v-if="row.name!=='superadmin'"> 
                            <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Edit"> <i class="fa fa-edit"></i></span>
                        </router-link>    
                -->
                        <router-link to="" v-if="row.name!=='superadmin'" >
                            <span class="btn btn-danger btn-sm m-1" @click="handleDelete" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
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
     name: 'Role',
     data() {
         return {
             roles: []
         }
     },
     created() {        
         this.fetchData()
     },
     methods: {
         fetchData() {
            const Base_URL = process.env.VUE_APP_ADMIN_URL;
            const request = axios.get(`${Base_URL}/api/roles`);
            request.then(response => {
                console.log('Response  === ', response);
                this.roles = response.data; 
            }).catch(error => {
                console.log('Error : ', error.response);
            })
         }, 
         handleDelete() {
             alert('Need to implement delete');
         }
     }
}
</script>

<style scoped>



</style>
