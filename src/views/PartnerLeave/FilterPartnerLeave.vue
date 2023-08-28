<template>
 <div>



   <div class="d-flex gap-10 mb-5  align-items-center">
     <span class="font-weight-bold ">Select Date:</span>
     <div class="ml-3">


         <datepicker
             calendar-class="vdp-datepicker"
             v-model="leaveDate"
             format="yyyy-MM-dd"
         ></datepicker>

     </div>
     <button @click="onSubmit" class="show-btn">Filter Leave</button>
   </div>


   <modal name="modal-order_type" height="auto" :adaptive="true"  :clickToClose="false">
     <div class="m-3 p-3">
       <b-row class="p-2">
         <h4>Please Write Leave Details</h4>
         <div  class="cross-button" @click="closeModal">X</div>

       </b-row>
       <b-row class="p-2">
         <div class="center-div">
           <label>Remarks: </label>

           <input v-model="remarks" type="text" >
           <div>
             <label>Status:</label>
             <select v-model="status">
               <option value="1">Approved</option>
               <option value="0">Rejected</option>
             </select>
           </div>
           <div>
             <label>Training time:</label>
             <select v-model="training_time">
               <option value="1">Full Day</option>
               <option value="2">1st Half</option>
               <option value="3">2nd Half</option>


             </select>
           </div>
           <button  class="modal-button" @click="submitLeave">
             submit
           </button>

         </div>
       </b-row>
     </div>
   </modal>


  <div class="d-flex gap-10  mt-8 mb-6">

      <div class="table-container">
        <table class="th-st my-table" border="1" style="margin-right: 20px">
          <thead>
          <tr>

            <th>Providers Name</th>

            <th v-for="columnItem in columns">{{ columnItem }}</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.name">

            <td>{{ item.name }}</td>
            <td>
              <div class="location-name">
                <input type="radio"  @click="openModal(item,'wl')" :checked="item.first"/>
              </div>
            </td>
            <td>
              <div class="location-name">
                <input type="radio"  @click="openModal(item,'sl')" :checked="item.second"/>
              </div>
            </td>
            <td>
              <div class="location-name">
                <input type="radio"  @click="openModal(item,'up')" :checked="item.third"/>
              </div>
            </td>
            <td>
              <div class="location-name">
                <input type="radio"  @click="openModal(item,'tr')" :checked="item.forth"/>
              </div>
            </td>

          </tr>

          </tbody>
        </table>
      </div>
    </div>

  </div>


</template>


<script>

import axios from 'axios';
import moment from 'moment';
import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import paginate from "vuejs-paginate";
import LeaveModal from "@/views/PartnerLeave/LeaveModal.vue";
import VueFinalModal from "vue-final-modal";
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
export default {
name: "FilterPartnerLeave",
  components: {
    Datepicker,
    LeaveModal,
    VueFinalModal,

  },
  data() {
    return {
      activeLoader: false,
      items: [],
      values: [],
      columns: [],
      isExtraEnable: false,
      dataShow: false,
      leaveDate: '',
      year: '',
      partner_id:'',
      leave_date:'',
      is_weekly_leave:'',
      is_casual_or_sick_leave:'',
      is_unpaid_leave:'',
      remarks:'',
      status:'',
      training_time:'',
      key:'',
      showModal: false,
      selectedItem: null,

      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },

  computed: {
    elementHasPermission(permission_name) {
      return (permission_name) => {
        return !!this.$store.getters['auth/hasPermission'](permission_name);
      }
    }
  },
  mounted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    this.leaveDate = `${year}-${month}-${day}`;
    // this.leaveDate='2023-06-01'
    this.onSubmit();

  },
  methods: {
    openModal(value,key) {
      console.log(value,key)
      this.$modal.show("modal-order_type");
      // this.closeModal(value,date,key);
      this.partner_id= value.id;
      this.leave_date= this.leaveDate;
      this.key=key;


    },
    formattedDay(date) {
      return moment(date).format('dddd');
    },
    submitLeave() {
      this.updateApi();
      this.$modal.hide("modal-order_type");
      // window.location.reload();
    },
    closeModal() {
      this.$modal.hide("modal-order_type");
      window.location.reload();
    },

    onSubmit() {
      this.activeLoader = true;
      // this.dataShow=true;

      let formData = {
        leaveDate: this.leaveDate,
      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/filter-partner-leaves`, formData)
          .then(response => {
            this.activeLoader = false;
            this.columns = response.data.columns;
            this.items = response.data.data;
            return this.$router.push('/filter-leave');

          })
          .catch(error => {

          });
    },
    updateApi(value,date,key) {
      console.log(value,date,key);
      let formData = {
        partner_id: this.partner_id,
        leave_date: this.leaveDate,
        key: this.key,
        training_time:this.training_time,
        remarks: this.remarks,
        status:this.status


      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/partner-leaves`, formData)
          .then(response => {
            console.log(response);

          })
          .catch(error => {

          });
    }

  },

}
</script>



<style scoped lang="scss">
.date-box {
  background: #FF3571;
  width: 250px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 30px;
}
.th-st {

  tr {
    th {
      white-space: nowrap;
      padding: 5px 5px;
      text-align: center;
    }

    td {
      padding: 5px 5px;
      text-align: center;
      min-width: 190px;
      height: 60px;

      .location-name {
        font-size: 13px;
        font-weight: 700;
        color: #FF3572;
      }

      .service-name {
        font-size: 11px;
        font-weight: 650;
        color: #0187CE;

      }

      .total-bill {
        font-size: 11px;
        font-weight: 700;
        color: #C10417;
      }

      &.black-cell {
        background-color: #000000;
        min-width: 190px;
        min-height: 100px !important;
      }

      &.sky-cell {
        background-color: #01FFFF;
        min-width: 190px;
        min-height: 100px !important;
      }

      &.paste-cell {
        background-color: #9FC5E8;
        //color: yellow;
        min-width: 190px;
        min-height: 100px !important;
      }

    }

  }


}


.show-btn {
  padding: 10px;
  background: #FF3572;
  color: #ffffff;
  font-weight: 700;
  border-radius: 10px;
  margin-left: 30px;
  border: 2px solid #ffffff;
  height: 43px;
  //margin-top: 25px;
  width: 150px;

}

.noData {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  font-size: 20px;
  color: #FF3572;
}
::v-deep .modal-content {
  display: inline-block;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
.modal-button{
  background: #FF3572;
  color: #ffffff;
  font-weight: 700;
  border-radius: 10px;
  margin-left: 30px;
  border: 2px solid #ffffff;
  height: 43px;
  margin-top: 25px;
  width: 150px;
}

select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.cross-button {
  margin-left: 500px;
  color:white;
  margin-top:-25px;
  cursor: pointer;
  font-size: 25px;
  border-radius: 50%;
  padding: 5px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF3572;
}
.table-container {
  /* Set a fixed height for the table container to enable scrolling */
  height: 300px; /* Adjust the height as per your requirements */
  overflow-y: auto;
  margin-left: 30px;
}

.my-table {
  width: 100%;
  border-collapse: collapse;
}

.my-table th,
.my-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.my-table thead {
  /* Set the table header row to be sticky at the top */
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  z-index: 1;
}

</style>
