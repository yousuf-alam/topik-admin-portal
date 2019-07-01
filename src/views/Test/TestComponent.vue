<template>
    <div class="customcard">
    <h1>Test Component</h1>

    <table>
        <tr class="one">
            <th>
                <span>Firstname</span>
                <span class="sort_icon fa fa-sort pull-right"></span>
            </th>
            <th>
                <span>Lastname</span>
                <span class="sort_icon fa fa-sort pull-right"></span>
            </th>
            <th>
                <span>Age</span>
                <span class="sort_icon  fa fa-sort pull-right"></span>
            </th>
        </tr>
        <tr>
            <th>
                <div>
                    <input class="form-control" placeholder="Filter By Firstname"/>
                </div>
            </th>
            <th>
                <div>
                    <input class="form-control" placeholder="Filter By LastName"/>
                </div>
            </th>
            <th>
                <div>
                    <input class="form-control" placeholder="Filter By Age" />
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
            columns: ["one", "two", "three"]
        }
    },
    created() {
        //console.log('Inside created() ========= ');
        // this.fetchOrder();
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
