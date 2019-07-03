<template>
    <div class="customcard ">

    <h1>Test Component</h1>
    <div class="table-responsive">
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
                    Decide Later
                </div>
                <div v-else-if="noFilteColumns.includes(item)"> 
                    Why you need filer here
                </div>
                <div v-else>
                    <input 
                        v-model="columnInputValues[item]"
                        :name="item"
                        class="form-control" 
                        :placeholder="`Filter By ${item}`"
                        @keyup="handleInputChange"
                    />
                </div>
            </th>
        </tr>

        <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
        </tr>

        <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
       
        </tr>

    </table>
    </div>

    </div>

</template>

<script>
import axios from 'axios';
import Vue from 'vue';

const Admin_URL = process.env.VUE_APP_ADMIN_URL;
let typingTimer;
export default {
    name: 'TestComponent',
    data() {
        return {
            toSortColumn: '',
            sortingDirection: '',
            columns: [
                'id', 
                'service_type' ,
                'platform', 
                'status',
                'customer', 
                'partner',
                'scheduled_date', 
                'bill',
                'created_at', 
                'action'
            ],
            columnInputValues: {

            },
            dateColumns: [ "created_at", "scheduled_date" ],
            noFilteColumns: ["action"],
            range: ["01/09/2018", "01/10/2018"]
        }
    },
    created() {


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
        dateRangeChange(parm) {

        },
        fetchOrder() {
          axios.get(`${Admin_URL}/orders`)
          .then(response => {
            console.log('response data ===== ', response.data );
            this.orders = response.data;

            const table = this.$refs.myTable;
            console.log('table ==== ==== ', table);
            // this.$refs.myTable.setLimit(25)
          })
          .catch(e => {
            console.log("error occurs",e);
          });
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
            console.log(
                'heading Click colName == ', colName, 
                'sortDir == ',this.sortingDirection
            );
        },
        handleInputChange(e) {
            clearTimeout(typingTimer); 
            typingTimer = setTimeout(() => { 
                this.searchInDB()
            }, 1000);

        },

        searchInDB() {
            console.log('Search In DB === === === ', this.columnInputValues)
        }
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
