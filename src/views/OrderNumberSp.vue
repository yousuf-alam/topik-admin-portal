<template>
  <div class="animated fadeIn " style="overflow-x:scroll" >
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Minimum Order</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>

    </div>
   <div>
     <table border="1" class="th-st">
       <thead>
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

                  <td v-for="columnItem in dateItem.value" :class="{ 'red-cell': columnItem.count == 1 || columnItem.count == 0}">
                    {{ columnItem.count }}
                  </td>

<!--         <td v-for="columnItem in columns" :class="{ 'red-cell': showCount(columnItem, dateItem, dateItem.date)==1 || showCount(columnItem, dateItem, dateItem.date)==0}">-->
<!--&lt;!&ndash;           0&ndash;&gt;-->
<!--           {{ showCount(columnItem, dateItem, dateItem.date) }}-->
<!--&lt;!&ndash;           <TableColumn :item="dateItem" :column :main-data="results"/>&ndash;&gt;-->
<!--         </td>-->
         <td> {{ dateItem.total }}</td>
         <td>-</td>
       </tr>

       </tbody>
     </table>

<!--     <div class="date d-flex flex-column">-->
<!--       <span v-for="date in dates">{{date}}</span>-->
<!--     </div>-->
<!--     <div class="date d-flex flex-column" style="padding-left: 15px">-->
<!--       <div v-for="rox in romoni_roksana">-->
<!--           <span >{{rox.admin_count}}</span>-->
<!--          -->
<!--       </div>-->
<!--     </div>-->
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
      results:[],
      romoni_roksana:[],
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
  created(){
    axios.get(`${ADMIN_URL}/order-number-sp`)
        .then(response => {
          // response.data.data.map((item) => {
          //   this.columns.push(item.name);
          // });
          // this.columns.push('Total','Fr');
          this.dates = response.data.value;
          this.columns=response.data.data;
          this.isExtraEnable = response.data.isExtraEnable;

          // this.results = response.data.results;
          // this.romoni_roksana = this.results.Romoni_Roksana;

          // console.log('RESULTS',this.romoni_roksana);
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
  methods: {
    showCount(partnerItem, result, date) {
      let count = 0;

      let valueItem = result.value;
      if (valueItem.length > 0) {
        if (result.date == date) {
            for (let i = 0; i < valueItem.length; i++) {
              let item = valueItem[i];
              if (item.id == partnerItem.id) {
                count = item.admin_count;
                break;
              }
            }
            return count;
        }
      }
      else
      {
        return 0;
      }

      return 0;
    },
    showTotal(index) {
      let total = index;
      console.log('TOTAL',total);
      // let valueItem = this.dates[index].value;
      // if (valueItem.length > 0) {
      //   for (let i = 0; i < valueItem.length; i++) {
      //     let item = valueItem[i];
      //     total += item.admin_count;
      //   }
      // }
      return total;
    }
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
        background-color: red;
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

</style>
