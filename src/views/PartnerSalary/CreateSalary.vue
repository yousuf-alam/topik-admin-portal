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


      <button @click="onSubmit" class="show-btn"> Create Salary
      </button>

      <div class="">
        <router-link :to="{ name: 'ShowSalary'}" >
          <button class="show-btn">Show Salary</button>
        </router-link>
      </div>


      <!--      <div>-->
      <!--        <button @click="openModal">Show modal</button>-->
      <!--      </div>-->


      <modal name="modal-order_type" height="auto" :adaptive="true"  :clickToClose="false">
        <div class="m-3 p-3">
          <b-row class="p-2">
            <h4>Please Write Leave Details</h4>
            <div  class="cross-button" @click="closeModal">X</div>

          </b-row>
          <b-row class="p-2">
            <div class="center-div">
              <label>Amount: </label>

              <input v-model="amount"  type="number" >
              <div>
                <label>Remarks:</label>
                <input v-model="remarks"  type="text" >
              </div>
              <button  class="modal-button" @click="submitData">
                submit
              </button>

            </div>
          </b-row>
        </div>
      </modal>



    </div>

    <div class="table-container">
      <table border="1" class="my-table th-st">
        <thead>
        <td>Sp Name</td>
        <td>No of Order</td>
        <td>Order Value</td>
        <td>Bkash Payment</td>
        <td>Ssl Commerze</td>
        <td>Cash/Bkash-Sp</td>
        <td>Gap Amount</td>
        <td>Basic Salary</td>
        <td>TA</td>

        <td>Reward of Month</td>

        <td>Extra Product Bill</td>
        <td>Extra Amount</td>
        <td>Deduction</td>
        <td>Sub Total</td>
        <td>Commission</td>
        <td>Total</td>
        <td>Mobile Recharge</td>
        <td>Zoho Product Amount</td>
        <td>Gross Total</td>
        <td>Percentage</td>

        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.id">
          <router-link :to="{ name: 'WalletMonthly', params: { id: item.id }}">
            <td>{{item.name}}</td>
          </router-link>
          <td>{{item.total_orders}}</td>
          <td>{{formatPrice(item.total_bill)}}</td>
          <td>{{formatPrice(item.bkash)}}</td>
          <td>{{formatPrice(item.ssl)}}</td>
          <td>{{formatPrice(item.cash)}}</td>
          <td>{{formatPrice(item.gap_amount)}}</td>
          <td>{{formatPrice(item.basic_salary)}}</td>
          <td>{{formatPrice(item.ta)}}</td>
          <td>{{formatPrice(item.reward)}}</td>

          <td @click="openModal(item.id,'extra')" style="cursor: pointer;background: #00badd">{{formatPrice(item.extra_product)}}</td>

          <td @click="openModal(item.id,'bonus')" style="cursor: pointer;background: #00badd">{{formatPrice(item.bonus_amount)}}</td>
          <td @click="openModal(item.id,'deduction')" style="cursor: pointer;background: #00badd">{{formatPrice(item.deduction)}}</td>
          <td>{{formatPrice(item.sub_total)}}</td>
          <td>{{formatPrice(item.commission)}}</td>
          <td>{{ formatPrice(item.total)}}</td>
          <td  @click="openModal(item.id,'mobile-recharge')" style="cursor: pointer;background: #00badd">{{ formatPrice(item.mobile_recharge)}}</td>
          <td  @click="openModal(item.id,'zoho-product-amount')" style="cursor: pointer;background: #00badd">{{ formatPrice(item.zoho_product_amount)}}</td>
          <td>{{ formatPrice(item.gross_total)}}</td>
          <td>{{item.percentage}}%</td>

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
  name: "CreateSalary",

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
      partner_id: '',
      slug: '',
      remarks: '',
      amount:'',

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
    this.onSubmit();

  },
  methods: {
    openModal(id,slug) {
      // console.log("i am cliked");
      this.$modal.show("modal-order_type");
      // this.closeModal(value,date,key);
      this.partner_id= id;
      this.slug= slug;



    },
     formatPrice(price) {
  const number = parseFloat(price);
  if (isNaN(number)) return "0";

  // Round the number to the nearest hundred
  const roundedNumber = Math.round(number / 100) * 100;

  const formattedPrice = roundedNumber.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  return formattedPrice;
},
    submitLeave() {
      this.updateApi();
      this.$modal.hide("modal-order_type");
      // window.location.reload();
    },
    closeModal() {
      this.$modal.hide("modal-order_type");
      // window.location.reload();
    },

    onSubmit() {
      this.activeLoader = true;
      // this.dataShow=true;

      let formData = {
        month: this.month,
        year: this.year,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/partners-salary`, formData)
          .then(response => {
            this.activeLoader = false;
            this.items = response.data.data;
            // console.log(this.items);


            return this.$router.push('/partner-salary-create');

          })
          .catch(error => {

          });
    },
    submitData() {

      let formData = {
        partner_id: this.partner_id,
        slug: this.slug,
        amount: this.amount,
        remarks: this.remarks,
        month:this.month,
        year:this.year

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      console.log(formData);

      axios.post(`${ADMIN_URL}/partner-payment-deduction-extra`, formData)
          .then(response => {
            console.log(response);
            this.$modal.hide("modal-order_type");
            this.onSubmit()
            // window.location.reload();

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
.table-container {
  /* Set a fixed height for the table container to enable scrolling */
  height: 500px; /* Adjust the height as per your requirements */
  overflow-y: auto;
  //margin-left: 30px;
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
