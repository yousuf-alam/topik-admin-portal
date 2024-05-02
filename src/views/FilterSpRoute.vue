<template>
  <div class=" " style="overflow-x:scroll">
    <Loader :loader="activeLoader"/>

    <div class="d-flex gap-20 mb-2  mt-2">


      <div class="">
        <div  class="form-group">
          <label>Receive date</label>
          <VueCtkDateTimePicker
            :overlay="true"
            :range="false"
            :no-label="true"
            label="Select"
            id="RangeDatePicker"
            format="YYYY-MM-DD"
            formatted="ll"
            color="#7D4E77"
            v-model="filter_date"
          />
        </div>
      </div>


      <button @click="onSubmit" class="show-btn"> Show Data
      </button>

    </div>

    <div class="d-flex gap-10  mt-2 mb-6">
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
            <tr v-for="item in value.items" :key="item.name" >

              <td :class="{'off-cell':item.offDay===true}">{{ item.name }}</td>


              <td :class="{'paste-cell':item.fifth.city==='Chittagong','tr-cell':item.fifth===2 || item.fifth===3,'tr-cell-full':item.offDay===1,'off-cell':item.offDay===true,'black-cell':item.fifth===false,'sky-cell':item.fifth==true}">
                <router-link :to="{ name: 'OrderEdit', params: { id: item.fifth.order_id }}">
                  <div  class="location-name">
                    {{ item.fifth.name }}
                  </div>
                  <div class="service-name"> {{ item.fifth.service_name }}</div>
                  <div class="total-bill"> {{ item.fifth.total_bill }}</div>

                  <div :class="{'red-bold-cell':item.fifth.payment_status === 'Pending','other-payment': item.fifth.payment_status !== 'Pending'}"> {{ item.fifth.payment_status }}</div>
                </router-link>
              </td>
              <td :class="{'paste-cell':item.sixth.city==='Chittagong','tr-cell':item.sixth===2 || item.sixth===3,'tr-cell-full':item.offDay===1,'off-cell':item.offDay===true,'black-cell':item.sixth===false,'sky-cell':item.sixth==true}">
                <router-link :to="{ name: 'OrderEdit', params: { id: item.sixth.order_id }}">
                  <div  class="location-name">
                    {{ item.sixth.name }}
                  </div>
                  <div class="service-name"> {{ item.sixth.service_name }}</div>
                  <div class="total-bill"> {{ item.sixth.total_bill }}</div>

                  <div :class="{'red-bold-cell':item.sixth.payment_status === 'Pending','other-payment': item.sixth.payment_status !== 'Pending'}"> {{ item.sixth.payment_status }}</div>
                </router-link>
              </td>
              <td :class="{'paste-cell':item.seventh.city==='Chittagong','tr-cell':item.seventh===2 || item.seventh===3,'tr-cell-full':item.offDay===1,'off-cell':item.offDay===true,'black-cell':item.seventh===false,'sky-cell':item.seventh==true}">
                <router-link :to="{ name: 'OrderEdit', params: { id: item.seventh.order_id }}">
                  <div  class="location-name">
                    {{ item.seventh.name }}
                  </div>
                  <div class="service-name"> {{ item.seventh.service_name }}</div>
                  <div class="total-bill"> {{ item.seventh.total_bill }}</div>
                  <div :class="{'red-bold-cell':item.seventh.payment_status === 'Pending','other-payment': item.seventh.payment_status !== 'Pending'}"> {{ item.seventh.payment_status }}</div>
                </router-link>
              </td>
              <td :class="{'paste-cell':item.eighth.city==='Chittagong','tr-cell':item.eighth===2 || item.eighth===3,'tr-cell-full':item.offDay===1,'off-cell':item.offDay===true,'black-cell':item.eighth===false,'sky-cell':item.eighth==true}">
                <router-link :to="{ name: 'OrderEdit', params: { id: item.eighth.order_id }}">
                  <div  class="location-name">
                    {{ item.eighth.name }}
                  </div>
                  <div class="service-name"> {{ item.eighth.service_name }}</div>
                  <div class="total-bill"> {{ item.eighth.total_bill }}</div>

                  <div :class="{'red-bold-cell':item.eighth.payment_status === 'Pending','other-payment': item.eighth.payment_status !== 'Pending'}"> {{ item.eighth.payment_status }}</div>
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
import moment from "moment";

const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "FilterSpRoute",
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
      // dates: ["2023-05-01","2023-05-02","2023-05-03","2023-05-04"],
      isExtraEnable: false,

      dataShow: false,
      filter_date: '',

      month: '',
      year: '',

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
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');

    this.filter_date = `${year}-${month}-${day}`;

    console.log("filter date", this.filter_date);
    this.onSubmit();
    setInterval(() => {
      this.onSubmit();
    }, 30 * 60 * 1000);
  },
  methods: {

    onSubmit() {
      this.activeLoader = true;
      // this.dataShow=true;

      let formData = {
        month: this.month,
        year: this.year,
        filter_date: this.filter_date,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/filter-sp-route`, formData)
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

          return this.$router.push('/filter-sp-route');

        })
        .catch(error => {

        });
    },
    formattedDay(date) {
      return moment(date).format('dddd');
    },

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
.table-container {
  /* Set a fixed height for the table container to enable scrolling */
  height: 500px; /* Adjust the height as per your requirements */
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
      .red-bold-cell {
        color: red;
        font-weight: bold;
      }
      .other-payment {
        color: green;
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
      &.off-cell {
        background-color: yellow !important;
        min-width: 190px;
        min-height: 100px !important;

      }
      &.tr-cell {
        background-color: #9F91CC !important;
        min-width: 190px;
        min-height: 100px !important;

      }
      &.tr-cell-full {
        background-color: #9F91CC !important;
        min-width: 190px;
        min-height: 100px !important;

      }
      &.red-bold-cell {
        color: red;
        font-weight: 700;
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
  color: #FF3572;
}


</style>
