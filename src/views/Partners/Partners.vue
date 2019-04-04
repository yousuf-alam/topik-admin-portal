<template>
    <div>
        <b-row>
            <b-col>
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.date.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="Date"
                            prop="date">
                    </el-table-column>
                    <el-table-column
                            label="Name"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="Address"
                            prop="address">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="Type to search"/>
                        </template>
                        <template slot-scope="scope">
                            <router-link :to="{ name: 'Partner / Show', params: { id: 1 }}"><span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="Show"><i class="fa fa-search"></i></span></router-link>
                           <router-link :to="{ name: 'Partner / Edit', params: { id: 1 }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" data-placement="top" title="Go to Partner Portal"><i class="fa fa-edit"></i></span></router-link>
                            <!--<el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">Delete
                            </el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </b-col>
        </b-row>
    </div>
</template>


<script>

    import 'element-ui/lib/theme-chalk/index.css'

    // import DataTables and DataTablesServer separately
    import {DataTables, DataTablesServer} from 'vue-data-tables'


    // import DataTables and DataTablesServer together
    import VueDataTables from 'vue-data-tables'


    import {Table, TableColumn, Button, Pagination} from 'element-ui'


    export default {
        name: 'Partners',
        components: {Table, TableColumn, Button, Pagination},
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-02',
                    name: 'John',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-04',
                    name: 'Morgan',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles'
                }],
                search: '',
            }
        },
        methods: {

            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>
