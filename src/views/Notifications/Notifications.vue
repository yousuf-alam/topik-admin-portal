<template>
<div class="animated fadeIn">
    <!--         
        <div >
            <TestNoti />
        </div>
    -->
    <div class="customcard">
        <div class="cardheading">
            <div>
                <h2>All Notifications</h2>
            </div>
            <div>
                <router-link :to="{ name: 'NotificationCreate'}">
                    <button class="btn btn-success">Create New Notification</button>
                </router-link>
            </div>
        </div>
        <div class="resourcesTable table-responsive">
            <table class="table table-hover">
            <thead class="bg-success">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Verified</th>
                    <th scope="col">Verified At</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                        <router-link to="/resources/show/1">
                            <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="View">
                                <i class="fa fa-search"></i>
                            </span>
                        </router-link>

                        <router-link to="/resources/edit/1">
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
    <div>
        <paginate
            :pageCount="20"
            :clickHandler="functionName"
            :prevText="'Prev'"
            :nextText="'Next'"
            :container-class="'pagination'">
        </paginate>
    </div>
</div>
</template>


<script>
//import TestNoti from './TestNoti';
import paginate from 'vuejs-paginate';

export default {
    name: 'Notifications',
    components: {
        // TestNoti,
        paginate,
        
    },
    data() {
        return {



        }
    },
    methods: {
        functionName(parm) {
            console.log(parm);
        }

    },
}
</script>
<style lang="scss">

$primaryColor: rgb(236, 245, 235); 
$bgColor: rgb(120, 125, 136); 
$selectdItemColor: $bgColor;

.pagination {
  margin: 5px 0px;
  font-size: 16px;

}
.pagination > li > a {
    border-radius: 5%;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: $primaryColor;
    text-decoration: none;
    background-color: $bgColor;
    border: 1px solid #ddd;
}
.pagination > .active > a {
    border-radius: 5%;
    z-index: 2;
    color: $selectdItemColor;
    cursor: default;
    background-color:$primaryColor;
    border-color: $primaryColor;
}

 .disabled >a {
    color: #777;
    cursor: not-allowed;
    background-color: $bgColor;
    border-color: #ddd;
}



</style>