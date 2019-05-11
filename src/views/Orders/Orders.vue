<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="10"></b-col>
            <b-col sm="2" class="mb-3">
                <button @click="modalType" class="btn btn-success">Create New Order</button>
            </b-col>
          <modal name="modal-order_type" height="auto" :adaptive="true">
            <div class="m-3 p-3">
              <b-row class="p-2">
                <h4>Choose Order Type</h4><br><br>
              </b-row>
              <b-row class="p-2">
                <div class="center-div">
                  <router-link :to="{ name: 'OrderCreate'}">
                    <button class="btn btn-romoni-secondary m-2">Beauty On-Demand</button>
                  </router-link>
                  <router-link :to="{ name: 'OrderCreate'}">
                    <button class="btn btn-primary m-2">Beauty Appointment</button>
                  </router-link>
                  <router-link :to="{ name: 'OrderCreate'}">
                    <button class="btn btn-romoni-secondary m-2">Tailor On-Demand</button>
                  </router-link>
                </div>

              </b-row>

            </div>
          </modal>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <v-client-table :data="tableData" :columns="columns" :options="options">
                        <template slot="action" slot-scope="props">
                            <div>
                                <router-link :to="{ name: 'Order / Show', params: { id: 1 }}"><span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                    <i class="fa fa-search"></i></span></router-link>
                                <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit">
                                    <i class="fa fa-edit"></i></span>
                                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete">
                                    <i class="fa fa-trash"></i></span>
                            </div>
                        </template>
                    </v-client-table>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>


<script>


    export default {
        name: 'Orders',
        data() {
            return {
                columns: ['id', 'name', 'age', 'action'],
                tableData: [
                    {id: 1, name: "John", age: "2018-12-18", action: {details: 'yes', delete: 'no'}},
                    {id: 2, name: "Jane", age: "2018-10-31"},
                    {id: 3, name: "Susan", age: "2018-10-31"},
                    {id: 4, name: "Chris", age: "2018-10-31"},
                    {id: 5, name: "Dan", age: "2018-12-30"},
                    {id: 11, name: "John", age: "2018-10-31"},
                    {id: 12, name: "Jane", age: "2018-08-31"},
                    {id: 13, name: "Susan", age: "2018-08-03"},
                    {id: 14, name: "Chris", age: "2018-09-31"},
                    {id: 15, name: "Dan", age: "2018-12-31"},
                    {id: 11, name: "John", age: "2018-12-31"},
                    {id: 12, name: "Jane", age: "2018-12-31"},
                    {id: 13, name: "Susan", age: "2018-12-31"},
                    {id: 14, name: "Chris", age: "2018-12-31"},
                    {id: 15, name: "Dan", age: "2018-12-31"}
                ],
                options: {
                    pagination: {nav: 'fixed'},
                    filterByColumn: true,
                    dateColumns: ['age'],
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

                }

            }
        },
        methods: {
          modalType(){
            this.$modal.show('modal-order_type');
          },

            delete(id) {
                // The id can be fetched from the slot-scope row object when id is in columns
                console.log('hi');
            }
        },
    }
</script>
