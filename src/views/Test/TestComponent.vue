<template>
    <div class="customcard">
    <h1>Test Component</h1>

    <table>
        <tr class="hadingOne">
            <th v-for="item in columns" :key="item" @click="headingClick(item)">
                <span >{{item}}</span>
                <span :class="`${item}_sort_icon fa fa-sort pull-right`"></span>
            </th>
        </tr>
        <tr>
            <th v-for="item in columns" :key="item">
                <div>
                    <input class="form-control" :placeholder="`Filter By ${item}`"/>
                </div>
            </th>
        </tr>
        <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
        </tr>
        <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
        </tr>
        <tr>
            <td>John</td>
            <td>Doe</td>
            <td>80</td>
        </tr>
    </table>
    </div>

</template>

<script>
import axios from 'axios';

const Admin_URL = process.env.VUE_APP_ADMIN_URL;
console.log('ADMIN_URL === ', Admin_URL);
export default {
    name: 'TestComponent',
    data() {
        return {
            toSortFlag: '',
            columns: ["one", "two", "three"]
        }
    },
    created() {
        //console.log('Inside created() ========= ');
        // this.fetchOrder();
    },
    mounted(){

    },
    methods: {
        fetchOrder() {
          axios.get(`${Admin_URL}/orders`)
          .then(response => {
            console.log('response data ===== ', response.data );
            this.orders = response.data;

            const table = this.$refs.myTable;
            console.log('table ==== ==== ', table);
            // this.$refs.myTable.setLimit(25)
          })
          .catch(e=>{
            console.log("error occurs",e);
          });
        },
        headingClick(colName) {
            console.log('heading Click ', colName);
            this.columns.forEach(element => {
                console.log(element);
            });
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
