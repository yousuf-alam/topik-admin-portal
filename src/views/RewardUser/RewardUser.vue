<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-gift"></i><span class="ml-1">Reward user</span></h4>
      <div class="">
        <h1 class="my-auto tableName">
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

        </h1>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="rewards" :columns="columns" :options="options">

            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${props.row.Image_Path}`" style="width: 160px;height: 90px;">
              </div>
            </template>

            <template slot="Image_Path" slot-scope="props">
              <button @click="copyText" class="copy-icon" style="border: none;background: white">
                <i class="fa fa-copy"></i>
              </button>

              <a class="content" :href="props.row.Image_Path">{{props.row.Image_Path}}</a>

            </template>



            <template slot="action" slot-scope="props">
              <div class=" ">

                <span class="btn btn-success   cursor-pointer" data-toggle="tooltip" title="Publish" @click="approveReward(props.row.id)">
                                    <i class="fa fa-check-square"></i></span>

                <span @click="deleteReward(props.row.id)" class="btn btn-danger float-right"><i class="fa fa-trash"></i></span>
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
  name: "RewardUser",

  data() {
    return {
      rewards : [],
      key:'this_month',
      columns: [
        'id', 'User_Name', 'image','Image_Path', 'slug','action'
      ],
      redeem_id:'',
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
      axios.post(`${ADMIN_URL}/social-media/get-data`,{'key':this.key})
        .then(response => {
          console.log('response',response);
          this.rewards = response.data.data;
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
    approveReward(id) {

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
    deleteReward(id) {

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
      axios.post(`${ADMIN_URL}/social-media/approve-reward`,{
        id : id
      })
        .then(response => {
          this.$swal('Approve Reward', '', 'success');
          setTimeout(()=>{
            window.location.href='/reward-user';
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });
    },
    confirmDelete(id) {
      axios.post(`${ADMIN_URL}/social-media/delete-data`,{
        id : id
      })
        .then(response => {
          this.$swal('Delete Reward', '', 'success');
          setTimeout(()=>{
            window.location.href='/reward-user';
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
