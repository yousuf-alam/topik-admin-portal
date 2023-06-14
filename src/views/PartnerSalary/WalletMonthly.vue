<template>
  <div class=" " style="overflow-x:scroll">
    <Loader :loader="activeLoader"/>

    <div class="d-flex gap-20 mb-5  mt-8">


      <div class="">
        <label>Month</label>
        <select class="form-control" v-model="month">
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div style="margin-left: 30px">
        <label>Year</label>
        <select class="form-control" v-model="year">
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <div style="margin-left: 30px">
        <label>Partner Name</label>
        <select class="form-control" v-model="partner_id">
          <option v-for="partner in partners" :key="partner.id" :value="partner.id">{{partner.name}}</option>

        </select>
      </div>


      <button @click="onSubmit" class="show-btn"> Show Wallet
      </button>

<!--      <div class="">-->
<!--        <router-link :to="{ name: 'CreatePartnerLeave'}" >-->
<!--          <button class="show-btn">Add Deduction</button>-->
<!--        </router-link>-->
<!--      </div>-->

      <!--      <div>-->
      <!--        <button @click="openModal">Show modal</button>-->
      <!--      </div>-->





    </div>

    <div>
      <table border="1" class="my-table">
        <thead>
        <td>Scheduled Date</td>
        <td>Scheduled_time</td>
        <td>Payment Method</td>
        <td>Total Bill</td>


        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.scheduled_date}}</td>
          <td>{{item.scheduled_time}}</td>
          <td>{{item.payment_method}}</td>
          <td>{{item.total_bill}}</td>

        </tr>
        </tbody>
      </table>
    </div>



  </div>

</template>

<script>
import axios from 'axios';
import LeaveModal from "@/views/PartnerLeave/LeaveModal.vue";
import VueFinalModal from 'vue-final-modal';
import Loader from "@/views/Loader.vue";
import TableColumn from "@/views/TableColumn.vue";

const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "ShowSalary",

  components: {
    LeaveModal,
    VueFinalModal,
    Loader,
  },
  data() {
    return {
      activeLoader: false,
      items: [],
      salaries: [],
      columns: [],
      isExtraEnable: false,
      dataShow: false,
      month: '',
      year: '',
      partner_id : this.$route.params.id,
      partners:[],

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
    const currentDate = new Date();
    this.month = currentDate.getMonth() + 1;
    this.year = currentDate.getFullYear();
    this.partner_id = this.$route.params.id;
    this.onSubmit();
    this.getPartners();

  },
  methods: {
    getPartners() {
      axios.get(`${ADMIN_URL}/in-house-partners`)
          .then(response => {
            this.partners = response.data.data;
            console.log(this.partners);
          })
          .catch(error => {

          });
    },
    openModal(value,date,key) {
      this.$modal.show("modal-order_type");
      // this.closeModal(value,date,key);
      this.partner_id= value.id;
      this.leave_date= date;
      this.key=key;


    },
    submitLeave() {
      this.updateApi();
      this.$modal.hide("modal-order_type");
      window.location.reload();
    },
    closeModal() {
      this.$modal.hide("modal-order_type");
      window.location.reload();
    },

    onSubmit() {
      this.activeLoader = true;
      // this.dataShow=true;

      let formData = {
        month: 5,
        year: 2023,
        partner_id:this.partner_id

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/sp-wallet-monthly`, formData)
          .then(response => {
            this.activeLoader = false;
            this.items = response.data.data;
            console.log(this.items);


            return this.$router.push('/sp-wallet-monthly/'+this.partner_id);

          })
          .catch(error => {

          });
    },


  },

}
</script>

<style scoped lang="scss">
.my-table {
  background-color: white;
  td {
    padding: 10px;
    text-align: center;
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
  margin-top: 25px;
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


</style>
