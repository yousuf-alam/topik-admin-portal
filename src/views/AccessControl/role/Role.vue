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
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td> 
                        <router-link to="/roles/show/1"> 
                            <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View"> 
                                <i class="fa fa-search"></i>
                            </span> 
                        </router-link>                         
                        
                        <router-link to="/roles/edit/1"> 
                            <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Edit"> <i class="fa fa-edit"></i></span>
                        </router-link>    
                        <router-link to="">
                            <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
                        </router-link> 
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Mark</td>
                    <td> 
                        <router-link to="/roles/show/2"> 
                            <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View"> 
                                <i class="fa fa-search"></i>
                            </span> 
                        </router-link>                         
                        
                        <router-link to="/roles/edit/2"> 
                            <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Edit"> <i class="fa fa-edit"></i></span>
                        </router-link>    
                        <router-link to="">
                            <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
                        </router-link> 
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    // name: 'roles'
}
</script>

<style scoped>



</style>
