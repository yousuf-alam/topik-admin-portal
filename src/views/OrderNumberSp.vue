<template>
  <div class=" " >
    <Loader :loader="activeLoader"/>
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
     <button @click="exportOrderCount"  class="show-btn"> Export
     </button>

     </div>

     <div v-if="dataShow && columns.length" class="table-container">

       <div class="header-part-item-wrapper">
         <div class="header-td-items">
           <div class="fixed-item">
             <div class="h-td-item">
               Date
             </div>
             <div class="h-td-item">
               Day of Week
             </div>
           </div>
           <div class="scrollable-item" id="headerTdItem">
             <div class="h-td-item">
               In House Order Served
             </div>
             <div class="h-td-item">
               Freelance Order Served
             </div>
             <div class="h-td-item">
               Total Order Served
             </div>
             <div class="h-td-item">
               In House%
             </div>
             <div class="h-td-item">
               In House Order Placed
             </div>
             <div class="h-td-item">
               Freelance Order Placed
             </div>
             <div class="h-td-item">
               Total Order Placed
             </div>
             <div class="h-td-item" v-for="columnItem in columns">
               {{ columnItem.name }}
             </div>

           </div>
         </div>
       </div>
       <div class="table-body-data">
         <div class="left-bar">
           <div class="left-body">
             <div class="left-body-item" v-for="(dateItem, index) in dates" :key="(index) + '-' + dateItem" :class="{ 'divide' : dateItem.line_break == true, 'colorfull' : (index+1) % 8 == 0 || (index+1) == dates.length }">
               <div class="left-body-item-data" :class="{ 'collapsable' : dateItem.day_of_week == 'collapsed' }">
                 {{ dateItem.date }}
               </div>
               <div class="left-body-item-data" v-if="dateItem.day_of_week != 'collapsed'">
                 {{ dateItem.day_of_week }}
               </div>
             </div>
           </div>
         </div>
         <div class="table-wrapper">
          <table border="1" class="th-st">
         <thead >
         <tr class="header-fixed-part">
         </tr>
         </thead>
         <tbody>
         <tr v-for="(dateItem, index) in dates" :key="(index) + '-' + dateItem" :class="{ 'divide' : dateItem.line_break == true, 'colorfull' : (index+1) % 8 == 0 || (index+1) == dates.length }">

           <td> {{ dateItem.in_house_order_served }}</td>
           <td>{{dateItem.fr_order_served}}</td>
           <td> {{ dateItem.total_order }}</td>
           <td>{{dateItem.percentage_inhouse}}%</td>
           <td>{{dateItem.inhouse_placed}}</td>
           <td> {{ dateItem.freelancer_placed }}</td>
           <td>{{dateItem.total_placed}}</td>
           <td v-for="columnItem in dateItem.value"
               :class="{
                                'green-cell': columnItem.rebonding == true,
                                'yellow-cell': columnItem.dayOff == true,
                                'red-cell': columnItem.count == 1 || columnItem.count == 0,

                  }">
             {{ columnItem.count }}
           </td>


         </tr>

         </tbody>
       </table>
       </div>
       </div>
     </div>
<!--     <div class="noData">-->
<!--       <span> Please select month and year and submit button</span>-->
<!--     </div>-->



   </div>

</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
import TableColumn from './TableColumn.vue';
import Loader from "@/views/Loader.vue";
export default {
  name: "OrderNumberSp",
  components: {
    Loader,
      TableColumn
  },
  data() {
    return {
      activeLoader: false,
      amounts : [],
      columns: ['Date','Days'],
      isExtraEnable: false,
      dates:[],
      dataShow:false,
      results:[],
      month:'05',
      year:'2023',
      redeem_id:'',
      tableTdWidth: "160px",
      tableThWidth120: "120px",
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },
  mounted() {
    const currentDate = new Date();
    this.month = currentDate.getMonth() + 1;
    this.year = currentDate.getFullYear();
    this.onSubmit();


  },
  computed: {
    elementHasPermission(permission_name) {
      return (permission_name) => {
        return !!this.$store.getters['auth/hasPermission'](permission_name);
      }
    }
  },
  methods: {

    onSubmit() {
      this.activeLoader = true;
      this.dataShow=true;

      let formData = {
        month:this.month,
        year:this.year,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/order-number-sp`, formData)
          .then(response => {
            this.activeLoader = false;
            console.log('Success', response);
            this.dates = response.data.value;
            this.columns=response.data.data;
            this.isExtraEnable = response.data.isExtraEnable;
            setTimeout( (e) => {
              this.scrollDetection();
            }, 1000);
            return this.$router.push('/order-number-sp');

          })
          .catch(error => {

          });
    },
    closeModal() {
      this.$modal.hide("modal-order_type");
      window.location.reload();
    },
    exportOrderCount() {
      this.exporting = true;
      axios({
        method: "post",
        url: `${ADMIN_URL}/export-order-number-sp`,
        responseType: "blob",
        data: {
          month:this.month,
          year:this.year,


        }
      })
        .then(response => {
          console.log(response.data);
          this.exporting = false;
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            'Order_Number_SP' +
            "_" +
            "~" +
            ".xlsx"
          );
          document.body.appendChild(link);
          link.click();
          this.$swal("Reviews Exported Successfully", "", "success");
          this.closeModal();
        })
        .catch(e => {
          this.exporting = false;
          console.log("error occurs", e);
          this.$swal("Error", "Something Went Wrong", "error");
        });
    },

    scrollDetection() {
      $(".table-wrapper").on("scroll", function(e) {
        let scrollLeft = $(".table-wrapper").scrollLeft();
        document.getElementById("headerTdItem").scrollLeft = scrollLeft;
      });

    }

  },

}
</script>

<style scoped lang="scss">
$tableTdWidth:160px;
$tableThWidth120:120px;
$tableThWidth1202x:240px;
.th-st
{
  position:relative;
  //overflow: auto;
  tr {
    th {
      white-space: nowrap;
      padding: 5px 10px;
      text-align: center;
      min-width: $tableTdWidth;
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
    //min-width: v-bind(tableTdWidth);
    min-width: $tableTdWidth
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
.table-container {
  //width: 100%;

  //white-space: nowrap;
  //position: relative;/* Set the overflow property to enable scrolling */
  //display: flex;
  //align-items: flex-start;
  //flex-direction: column;

  .table-body-data {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 300px; /* Set the height of the table container */
    overflow-y: auto;
  }
  .left-header {
    display: flex;
    align-items: center;
    justify-content: center;
    .head-item {
      min-width: $tableThWidth120;
      flex: 0 50%;
      text-align: center;
      background: #fff;
      padding: 5px;
      border: thin solid #000;
      &:nth-last-child(1) {
        border-left: none;
        //border-right: none;
      }
    }
  }
  .left-body {

    .left-body-item {
      display: flex;
      align-items: center;
      justify-content: center;



      .left-body-item-data {
        min-width: $tableThWidth120;
        flex: 0 50%;
        text-align: center;
        background: #fff;
        padding: 5px;
        border: thin solid #000;
        &:nth-last-child(1) {
          border-left: none;
          border-top: none;
          //border-right: none;
        }
        &:nth-last-child(2) {
          //border-left: none;
          border-top: none;
        }
        &.collapsable {
          min-width: $tableThWidth1202x;
          border-left: thin solid #000;
        }
      }

      &.divide {
        border-bottom: 9px solid #000;
      }
      &.colorfull{
        background: #00c55152 !important;
      }
    }
  }
  .table-wrapper {
    position: relative;
    width: 100%;
    overflow-x: auto;
    table {
      //width: 100%;
    }
  }

}

//table {
//  width: 230%;
//  table-layout: fixed; /* Set the table layout to fixed */
//}

th {
  //position: sticky;
  top: 0;
  background-color: white; /* Set the background color of the header cells */
}

.table-body {
  //height: calc(100% - 40px); /* Set the height of the table body */
  //overflow-y: auto; /* Set the overflow property of the table body to enable vertical scrolling */
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  //background-color: white;
}

 .header-fixed-part {
  //position: absolute;
   //top: -80px;
   top: 0;
 }

 .header-part-item-wrapper {
   .header-td-items {
     display: flex;
     align-items: center;
     justify-content: flex-start;
     .fixed-item {
       display: flex;
       align-items: center;
       justify-content: flex-start;
     }
      .scrollable-item  {
        overflow-x: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &::-webkit-scrollbar {
          display: none;
        }
      }
     .h-td-item {
       min-width: 120px;
       text-align: center;
       background: #fff;
       padding: 5px;
       border: thin solid #000;
       white-space: nowrap;
       &:nth-last-child(1) {
         //border-left: none;
         border-right: none;
       }
     }

     .scrollable-item  {
       .h-td-item {
         min-width: $tableTdWidth;
         border-right: none;
       }
     }
   }
 }


</style>
