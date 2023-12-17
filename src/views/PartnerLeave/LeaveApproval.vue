<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Leave Application</span></h4>
      <div class="d-flex justify-content-between gap-5">
        <select v-model="key" class="form-control mr-2" @change="handleOptionChange" style="width: 180px;background: #4dbd74;color: white">
          <option value="this_month">This month</option>
          <option value="last_month">Last month</option>
          <option value="last_three_month">Last three month</option>
          <option value="last_six_month">Last six month</option>
          <option value="this_year">This year</option>
          <option value="last_year">Previous year</option>

        </select>
      </div>

    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="applications" :columns="columns" :options="options">

            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${props.row.image_path}`" style="width: 160px;height: 90px;">
              </div>
            </template>

            <template slot="image_path" slot-scope="props">
              <button @click="copyText" class="copy-icon" style="border: none;background: white">
                <i class="fa fa-copy"></i>
              </button>

              <a class="content" :href="props.row.image_path">{{props.row.image_path}}</a>

            </template>



            <template slot="action" slot-scope="props">
              <div class="d-flex gap-2">

                <span class="btn btn-success   cursor-pointer mr-1" data-toggle="tooltip" title="Publish" @click="approveLeave(props.row.id)">
                                    <i class="fa fa-check-square"></i></span>
                <span class="btn btn-danger   cursor-pointer mr-1" data-toggle="tooltip" title="Publish" @click="declineLeave(props.row.id)">
                                    <i class="fa fa-times-circle"></i></span>
                <span @click="deleteLeave(props.row.id)" class="btn btn-danger float-right"><i class="fa fa-trash"></i></span>
              </div>
            </template>
          </v-client-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL  = process.env.VUE_APP_BASE_URL;
export default {
  name: "LeaveApproval",

  data() {
    return {
      applications : [],
      columns: [
        'id', 'name', 'leave_date','remarks', 'is_casual_or_sick_leave','is_unpaid_leave','action'
      ],
      redeem_id:'',
      key:'this_month',
      BASE_URL: BASE_URL,
      src_image : 'images/social/',
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },
  created(){
    this.getUnApproveData();
  },
  methods: {
    handleOptionChange() {
      console.log("key",this.key)
      this.getUnApproveData();
    },

    getUnApproveData(){
      axios.post(`${ADMIN_URL}/leave-approval-data`,{'key':this.key})
        .then(response => {
          console.log('response',response);
          this.applications = response.data.data;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },
    computed: {
      elementHasPermission(permission_name) {
        return (permission_name) => {
          return !!this.$store.getters['auth/hasPermission'](permission_name);
        }
      }
    },
    approveLeave(id) {

      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes approve it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.confirmApprove(id);
        } else {
          //this.$swal('Cancelled', 'Your file is still intact', 'info')
        }
      });
      console.log("hello id",id);



    },
    declineLeave(id) {

      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes decline it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.confirmDecline(id);
        } else {
          //this.$swal('Cancelled', 'Your file is still intact', 'info')
        }
      });
      console.log("hello id",id);



    },
    deleteLeave(id) {

      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.confirmDelete(id);
        } else {
          //this.$swal('Cancelled', 'Your file is still intact', 'info')
        }
      });
      console.log("hello id",id);



    },

    confirmApprove(id) {
      axios.post(`${ADMIN_URL}/approve-leave-in-house`,{
        id : id
      })
        .then(response => {
          this.$swal('Approved Leave', '', 'success');
          setTimeout(()=>{
            window.location.href='/leave-approval';
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });
    },
    confirmDecline(id) {
      axios.post(`${ADMIN_URL}/decline-leave-in-house`,{
        id : id
      })
        .then(response => {
          this.$swal('Approved Leave', '', 'success');
          setTimeout(()=>{
            window.location.href='/leave-approval';
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });
    },
    confirmDelete(id) {
      axios.post(`${ADMIN_URL}/delete-leave-in-house`,{
        id : id
      })
        .then(response => {
          this.$swal('Delete Leave', '', 'success');
          setTimeout(()=>{
            window.location.href='/leave-approval';
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });
    },
    copyText() {
      // Get the text content of the div
      const textToCopy = this.$el.querySelector('.content').textContent;

      // Create a temporary input element
      const tempInput = document.createElement('textarea');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);

      // Select and copy the text
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      // Provide some visual feedback (optional)
      alert('Text copied to clipboard!');
    },

  },
}
</script>
