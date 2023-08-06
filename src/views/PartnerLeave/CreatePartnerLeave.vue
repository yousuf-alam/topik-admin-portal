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


      <button @click="onSubmit" class="show-btn"> Show Data
      </button>
      <div class="">
        <router-link :to="{ name: 'ShowPartnerLeave'}" >
          <button class="show-btn">Create</button>
        </router-link>
      </div>

    </div>

    <div class="d-flex gap-10  mt-8 mb-6">
      <div v-for="value in values" :key="values.dates" class="d-flex flex-column">
        <div class="mt-3 mb-3 date-box">
          <h4>{{ value.date }}:</h4>
          <h4>{{ formattedDay(value.date) }}</h4>
        </div>
        <div class="table-container">
          <table class="th-st my-table" border="1" style="margin-right: 20px">
            <thead>
            <tr>

              <th>Providers Name</th>

              <th v-for="columnItem in columns">{{ columnItem }}</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="item in value.items" :key="item.name">

              <td>{{ item.name }}</td>
              <td>

                <router-link :to="{ name: 'LeaveLog', params: { id: item.leave_id }}">
                  <div class="location-name">{{ item.weekly.remarks }}</div>
                  <div class="service-name"> {{ item.weekly.created_by }}</div>
                  <div class="total-bill"> {{ item.weekly.updated_by }}</div>
                  <div class="total-bill"> {{ item.weekly.time }}</div>
                </router-link>
              </td>
              <td>
                <router-link :to="{ name: 'LeaveLog', params: { id: item.leave_id }}">
                  <div class="location-name">{{ item.sick_casual.remarks }}</div>
                  <div class="service-name"> {{ item.sick_casual.created_by }}</div>
                  <div class="total-bill"> {{ item.sick_casual.updated_by }}</div>
                  <div class="total-bill"> {{ item.sick_casual.time }}</div>

                </router-link>

              </td>
              <td>
                <router-link :to="{ name: 'LeaveLog', params: { id: item.leave_id }}">
                  <div class="location-name">{{ item.unpaid.remarks }}</div>
                  <div class="service-name"> {{ item.unpaid.created_by }}</div>
                  <div class="total-bill"> {{ item.unpaid.updated_by }}</div>
                  <div class="total-bill"> {{ item.unpaid.time }}</div>
                </router-link>

              </td>
              <td>
                <router-link :to="{ name: 'LeaveLog', params: { id: item.leave_id }}">
                  <div class="location-name">{{ item.training.remarks }}</div>
                  <div class="service-name"> {{ item.training.created_by }}</div>
                  <div class="total-bill"> {{ item.training.updated_by }}</div>
                  <div class="total-bill"> {{ item.training.time }}</div>
                </router-link>

              </td>

            </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import axios from 'axios';
import Loader from "@/views/Loader.vue";
import TableColumn from "@/views/TableColumn.vue";
import moment from "moment/moment";

const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "CreatePartnerLeave",
  components: {
    Loader,
    TableColumn
  },
  data() {
    return {
      activeLoader: false,
      items: [],
      values: [],
      columns: [],
      isExtraEnable: false,
      dataShow: false,
      month: '',
      year: '',
      partner_id:'',
      leave_date:'',
      is_weekly_leave:'',
      is_casual_or_sick_leave:'',
      is_unpaid_leave:'',

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
    formattedDay(date) {
      return moment(date).format('dddd');
    },

    onSubmit() {
      this.activeLoader = true;
      // this.dataShow=true;

      let formData = {
        month: this.month,
        year: this.year,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/partner-leaves-show`, formData)
          .then(response => {
            this.activeLoader = false;

            this.columns = response.data.columns;
            this.values = response.data.value;
            // console.log("values here",this.values);
            // this.items=this.values[0].items;
            for (let i = 0; i < this.values.length; i++) {
              this.items[i] = this.values[i].items
            }
            console.log("item is here", this.items[5]);

            return this.$router.push('/show-partner-leave-data');

          })
          .catch(error => {

          });
    },
    updateApi(value,date,key) {
      console.log(value,date,key);
      let formData = {
        partner_id: value.id,
        leave_date: date,
        key,
        remarks: "test",


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
  margin-top: 25px;
  width: 100px;

}

.noData {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  font-size: 20px;
  color: #FF3572;
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
