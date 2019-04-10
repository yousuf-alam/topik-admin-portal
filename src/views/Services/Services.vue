<template>
    <div>
        <b-row>
            <b-col sm="10"></b-col>
            <b-col sm="2" class="mb-3">
                <router-link :to="{ name: 'ServiceCreate'}"><button class="btn btn-success">Create New Service</button></router-link>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                <v-client-table :data="tableData" :columns="columns" :options="options">
                    <template slot="action" slot-scope="props">
                        <div>
                            <router-link :to="{ name: 'Service / Edit', params: { id: 1 }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.show">
                                    <i class="fa fa-search"></i></span></router-link>
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
        name: 'Services',
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

        },
    }
</script>
