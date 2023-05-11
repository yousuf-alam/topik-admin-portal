<template>
  <div class=" " style="overflow-x:scroll" >
<!--    <div class="cardheading">-->
<!--      <h4><i class="fa fa-bars"></i><span class="ml-1">Minimum Order</span></h4>-->
<!--      <div class="">-->
<!--        <h1 class="my-auto tableName">-->

<!--        </h1>-->
<!--      </div>-->

<!--    </div>-->
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
                   <option value="2023" >2023</option>
                   <option value="2024">2024</option>
                   <option value="2025">2025</option>
                 </select>
               </div>



               <button @click="onSubmit"  class="show-btn"> Show Data
               </button>

     </div>

     <div v-if="dataShow">
       <table border="1" class="th-st" style="max-height: 500px;overflow-y:scroll;">
         <thead  style="position: sticky">
         <tr >
           <th>Date</th>
           <th>Day of Week</th>
           <th v-for="columnItem in columns">{{columnItem.name}}</th>
           <th>Total</th>
           <th>Fr</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="(dateItem, index) in dates" :key="(index) + '-' + dateItem" :class="{ 'divide' : dateItem.line_break == true, 'colorfull' : (index+1) % 8 == 0 || (index+1) == dates.length }">
           <td style="white-space: nowrap">{{ dateItem.date }}</td>
           <td>{{dateItem.day_of_week}}</td>

           <td v-for="columnItem in dateItem.value"
               :class="{
                                'green-cell': columnItem.rebonding == true,
                                'yellow-cell': columnItem.dayOff == true,
                                'red-cell': columnItem.count == 1 || columnItem.count == 0,

                  }">
             {{ columnItem.count }}
           </td>

           <td> {{ dateItem.total }}</td>
           <td>{{dateItem.fr}}</td>
         </tr>

         </tbody>
       </table>
     </div>
     <div class="noData">
       <span> Please select month and year and submit button</span>
     </div>



   </div>

</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
import TableColumn from './TableColumn.vue';
export default {
  name: "OrderNumberSp",
  components: {
      TableColumn
  },
  data() {
    return {
      amounts : [],
      columns: ['Date','Days'],
      isExtraEnable: false,
      dates:[],
      dataShow:false,
      results:[],
      month:'',
      year:'',
      redeem_id:'',
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },
  // created(){
  //   axios.get(`${ADMIN_URL}/order-number-sp`)
  //       .then(response => {
  //         // response.data.data.map((item) => {
  //         //   this.columns.push(item.name);
  //         // });
  //         // this.columns.push('Total','Fr');
  //         this.dates = response.data.value;
  //         this.columns=response.data.data;
  //         this.isExtraEnable = response.data.isExtraEnable;
  //
  //         // this.results = response.data.results;
  //         // this.romoni_roksana = this.results.Romoni_Roksana;
  //
  //         // console.log('RESULTS',this.romoni_roksana);
  //       })
  //       .catch(e => {
  //         console.log("error occurs", e.response);
  //       });
  // },
  computed: {
    elementHasPermission(permission_name) {
      return (permission_name) => {
        return !!this.$store.getters['auth/hasPermission'](permission_name);
      }
    }
  },
  methods: {

    onSubmit() {
      this.dataShow=true;

      let formData = {
        month:this.month,
        year:this.year,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/order-number-sp`, formData)
          .then(response => {
            console.log('Success', response);
            this.dates = response.data.value;
            this.columns=response.data.data;
            this.isExtraEnable = response.data.isExtraEnable;

            return this.$router.push('/order-number-sp');

          })
          .catch(error => {

          });
    }
    // showCount(partnerItem, result, date) {
    //   let count = 0;
    //
    //   let valueItem = result.value;
    //   if (valueItem.length > 0) {
    //     if (result.date == date) {
    //         for (let i = 0; i < valueItem.length; i++) {
    //           let item = valueItem[i];
    //           if (item.id == partnerItem.id) {
    //             count = item.admin_count;
    //             break;
    //           }
    //         }
    //         return count;
    //     }
    //   }
    //   else
    //   {
    //     return 0;
    //   }
    //
    //   return 0;
    // },
    // showTotal(index) {
    //   let total = index;
    //   console.log('TOTAL',total);
    //   // let valueItem = this.dates[index].value;
    //   // if (valueItem.length > 0) {
    //   //   for (let i = 0; i < valueItem.length; i++) {
    //   //     let item = valueItem[i];
    //   //     total += item.admin_count;
    //   //   }
    //   // }
    //   return total;
    // }
  },

}
</script>

<style scoped lang="scss">
.th-st
{

  tr {
    th {
      white-space: nowrap;
      padding: 5px 10px;
      text-align: center;
    }
    td {
      &.red-cell {
        background-color: #FF0000;
      }
      &.yellow-cell {
        background-color: #FFD965;
      }
      &.green-cell {
        background-color: #01FF00;
      }

    }
    &.divide {
      border-bottom: 10px solid #000000;
    }
    &.colorfull {
      background: #00c55152!important;
      td {
        background: #00c55152!important;
      }
    }
  }
  td {
    padding: 5px 10px;
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
  border:2px solid #ffffff;
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

</style>
