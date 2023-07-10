<template>
  <div class="animated fadeIn">
      <div class="cardheading">
        <h4><i class="fa fa-user"></i><span class="ml-1">Users</span></h4>
  			<div class="">
  				<h1 class="my-auto tableName"></h1>
  			</div>
       
        <b-row>
        <modal name="modal-user_export" height="500px" width="800px" :adaptive="true">
          <div class="m-3 p-3">
            <b-row class="p-2 border-bottom">
              <h4>Export Users as .xlsx</h4><br><br>
            </b-row>
            <b-row class="p-2">
             <b-col>
               <div class="form-group">
					      <label class="font-weight-bold">Select Date Range:</label>
                 <p>
                   <label>From : &nbsp;</label>
                   <datepicker calendar-class="vdp-datepicker" v-model="date_from" format="yyyy-MM-dd"></datepicker>
                   <label>To : &nbsp;</label>
                   <datepicker calendar-class="vdp-datepicker" v-model="date_to" format="yyyy-MM-dd"></datepicker>
                 </p>
               </div>
               
               <button @click="closeModal" class="btn btn-danger float-right m-1">Cancel</button>
               <button @click="ExportUser" class="btn btn-romoni-secondary float-right m-1">Export User Report</button>
               <b-spinner variant="danger" label="Spinning" v-if="exporting"></b-spinner>
             </b-col>
            </b-row>

          </div>
        </modal>
       </b-row>
       <div>
        <button v-if="getUserPermission('admin')" @click="modalExport" class="btn btn-success mb-2"><i class="fa fa-file-excel-o"></i> Export as .xlsx </button>

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
import moment from 'moment';
import paginate from 'vuejs-paginate';
import Datepicker from 'vuejs-datepicker';


const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
    name: 'Users',
    components: {
        Datepicker,
     
      },
    data() {
        return {
            users: [],
            date_from: '',
            date_to: '',
            exporting: false,
            columns: ['id', 'name','phone','action'],
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
        },
        modalExport() {
            this.$modal.show('modal-user_export');
          },
          closeModal(){
            this.$modal.hide('modal-user_export')
          },
          ExportUser(){
            this.exporting = true;
            axios({
              method: 'post',
              url: `${ADMIN_URL}/users/export`,
              responseType: 'blob',
              data: {
                date_from: this.date_from,
                date_to: this.date_to
              }
            })
              .then(response => {
                console.log(response.data);
                this.exporting = false;

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'user_report_' + moment(this.date_from).format('YYYY-MM-DD') + '~' + moment(this.date_to).format('YYYY-MM-DD') +'.xlsx');
                document.body.appendChild(link);
                link.click();
                this.$swal('Report Exported Successfully', '', 'success');
                this.closeModal();
              })
              .catch(e => {
                console.log("error occurs",e);
              });

            
          }
    }
}
</script>

<style scoped>
 .vdp-datepicker{
    display: inline-block;
    margin-right: 1rem;
   
    
  }

 
</style>
