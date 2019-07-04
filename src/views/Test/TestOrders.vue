<template>
    <div class="customcard ">

    <h1>Test Orders</h1>
    <div class="table-responsive">
    <div class="d-flex">
        <div style="margin-left: auto;" class="mb-1">
            <span class="mx-1">Per Page: </span>
            <select class="select" v-model="perPageItem" @change="makeReadySearchParams">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
            </select>
        </div>   
    </div>
    <table>
        <tr class="hadingOne">
            <th v-for="item in columns" :key="item" @click="headingSortColumn(item)">
                <div class="d-flex justify-content-between">
                    <span class="mr-2"> {{ makeColNameReadable(item)}} </span>
                    <span :class="getSortIconStyle(item)" class="d-flex align-items-center"></span>
                </div>
            </th>
        </tr>
        <tr>
            <th v-for="item in columns" :key="item">
                <div v-if="dateColumns.includes(item)">
                    <span v-html="makeDateRangeStrReadable(dateRangeString[item])"></span>
                    <VueCtkDateTimePicker 
                        input-size=sm
                        

                        :range=true
                        :no-label=true
                        label="Select"
                        id="RangeDatePicker"
                        format="YYYY-MM-DD"
                        formatted="ll"
                     
                        color="#533b87"

                        v-model="dateRange[item]"
                        @formatted-value="handleDateRangeChange(item)" 
                        
                    >
                    <!-- <button class="btn btn-secondary">Select</button> -->
                    </VueCtkDateTimePicker>

                </div>
                <div v-else-if="noFilteColumns.includes(item)"> 
                    
                </div>
                <div v-else>
                    <input 
                        v-model="columnInputs[item]"
                        :name="item"
                        class="form-control" 
                        :placeholder="`Filter By ${item}`"
                        @keyup="handleInputChange"
                    />
                </div>
            </th>
        </tr>

        <tr v-for="order in orders" :key="order.id">
            <td> {{ order.created_at }} </td>
            <td> {{ order.scheduled_date }} </td>
            <td> {{ order.id }} </td>
            <td> {{ order.service_type }} </td>
            <td> {{ order.platform }} </td>
            <td> {{ order.status }} </td>
            <td> {{ order.customer }} </td>
            <td> {{ order.partner }} </td>

            <td> {{ order.bill }} </td>

            <td> 
                <router-link :to="{ name: 'OrderShow', params: { id: order.id }}">
                    <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="order.show">
                        <i class="fa fa-search"></i>
                    </span>
                </router-link>
                <router-link :to="{ name: 'OrderEdit', params: { id: order.id }}">
                    <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="order.show">
                        <i class="fa fa-edit"></i>
                    </span>
                </router-link>
                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete">
                    <i class="fa fa-trash"></i>
                </span>
            </td>
        </tr>


    </table>
    </div>
        <div class="pl-1">
            <paginate
                :pageCount="totalPageCount"
                :clickHandler="onPaginateClick"
                :prevText="'Prev'"
                :nextText="'Next'"
                :container-class="'pagination'">
            </paginate>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Vue from 'vue';
import paginate from 'vuejs-paginate';
const Admin_URL = process.env.VUE_APP_ADMIN_URL;
let typingTimer;
import _ from 'lodash';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
export default {
    name: 'TestOrders',
    components: {
        paginate
    },
    data() {
        return {
            totalPageCount: 0,
            perPageItem: 10, // Only set this value
            pageNumber: 0,

            toSortColumn: '',
            sortingDirection: '',
            columns: [
                'created_at', 
                'scheduled_date', 

                'id', 
                'service_type' ,
                'platform', 
                'status',
                'customer', 
                'partner',

                'bill',
                
                'action'
            ],
            columnInputs: {

            },
            dateColumns: [ "created_at", "scheduled_date" ],
            noFilteColumns: ["action"],
            orders: [],

            dateRange: {
                created_at: '',
                scheduled_date: ''
             },
            dateRangeString: {
                created_at: '',
                scheduled_date: ''
             }
        }
    },
    created() {
        this.makeReadySearchParams();

    },
    mounted() {

    },
    computed: {
        
        getSortIconStyle: function () {
            return (parm) => {
                const defaultIcon = 'fa fa-sort';
                if (parm === this.toSortColumn) {
                   return `${defaultIcon}${this.sortingDirection}`;
                }
                return `${defaultIcon}`;
            }
        },
        makeDateRangeStrReadable: function() {
            return (name) => {
                console.log("KKKKKKKKKK", name);
                if (name == null || name == undefined || name == '') {
                    return name;
                }
                return name;
                let res = name.split("-");
                return res[0]+"<br> - <br>"+res[1];
            }
        },
        makeColNameReadable: function() {
            return (colName) => {
                const splitedWords = colName.split("_");
                for (let  index in splitedWords) {
                    splitedWords[index] = splitedWords[index].charAt(0).toUpperCase() + splitedWords[index].slice(1);
                }
                const readableName = splitedWords.join(" "); // splited by _ then join them. 
                return readableName.replace(/([a-z0-9])([A-Z])/g, '$1 $2'); // even to split the camelcase
            }
        }
    },
    methods: {
        handleDateRangeChange(colName) {

            // console.log(
            //     '\ncolName === ', colName, 
            //     '\ndateRange === ', this.dateRange, 
            //     '\n333333', this.dateRange[colName]
            //     );
            
            if (this.dateRange[colName] === '' || this.dateRange[colName] === null) {
                this.dateRangeString[colName] = '';
            } else {
                const startDate = this.dateRange[colName].start;
                const endDate = this.dateRange[colName].end;

                const startMoment = moment(startDate).format("MMM Do YY");
                const endMoment = (endDate === null || endDate === '') ? 'Select End Date' : moment(endDate).format("MMM Do YY");
                this.dateRangeString[colName]  =  startMoment + "-" + endMoment;                  
            }

             console.log('Seeeeee   ', this.dateRange, 'EEEEE', this.dateRangeString);  
                   
        },
        headingSortColumn(colName) {
            //console.log('heading Click ', colName);
            if (this.toSortColumn === colName) {
                if (this.sortingDirection === '') {
                    this.sortingDirection = "-up"
                } else {
                    this.sortingDirection = this.sortingDirection === '-up' ? '-down' : '-up' 
                }
            } else {
                this.sortingDirection = '-up';
            }
            this.toSortColumn = colName; 
            const copyArray = [ ...this.orders ]
            
            let sortByColumn = colName;
            if (colName === 'action') {
                sortByColumn = 'id';
            }
            if (this.sortingDirection === '-up') {
                this.orders = _.orderBy(copyArray, [sortByColumn], ['asc']);
            } else {
                this.orders = _.orderBy(copyArray, [sortByColumn], ['desc']);
            }

        },
        handleInputChange(e) {
            clearTimeout(typingTimer); 
            typingTimer = setTimeout(() => { 
                this.makeReadySearchParams()
            }, 500);

        },
        makeReadySearchParams() {
            const id = this.getInputValue("id")
            const service_type = this.getInputValue("service_type");
            const platform = this.getInputValue("platform");
            const status = this.getInputValue("status");
            const customer = this.getInputValue("customer");
            const partner = this.getInputValue("partner");
            const bill = this.getInputValue("bill");
            
            const created_at = {from: '', to: ''}; // will set these two later
            const scheduled_date = {from: '', to: ''}; // will set these two later

            const srcParms = {
                id, service_type, platform, status, customer, 
                partner, bill, created_at, scheduled_date
            };
            
            this.fetchOrder(srcParms);
            // console.log('parms ---- ', parms);

        },
        getInputValue(colName) {
            if (this.columnInputs[colName] === undefined) {
                return '';
            } 
            return this.columnInputs[colName];
        },
        fetchOrder(srcParms) {
          axios.get(`${Admin_URL}/fetch-orders/${this.perPageItem}/${this.pageNumber}`, {
              params: srcParms
          })
          .then(response => {
            console.log('fetchOrder ...... response data ===== ', response.data );
            this.orders = response.data.orders;
            this.totalPageCount = Math.ceil(response.data.totalcount / this.perPageItem);
          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
        },
        onPaginateClick(parm) {
            this.pageNumber = parm - 1; // As api start from "pageNumber 0"
            this.makeReadySearchParams();
        },

    }

}
</script>

<style scoped>
table, th, td {
  border: 1px solid #c4c4b7;
  border-collapse: collapse;
}
th, td {
  padding: 15px;
  text-align: left;
}
table#t01 {
  width: 100%;    
  background-color: #f1f1c1;
}
th {
    border-bottom-width: 2px;
    border-bottom-color: #c4c4b7;
}
</style>
