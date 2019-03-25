<template>
    <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                <a> <router-link :to="{ name: 'orders', params: { id: 123 }}"></router-link></a>
                <a class="btn btn-primary btn-sm m-1" data-toggle="tooltip" data-placement="top" title="Show"><i class="fa fa-search"></i></a>
                <a class="btn btn-warning btn-sm m-1" data-toggle="tooltip" href="" data-placement="top" title="Edit"> <i class="fa fa-edit"></i></a>
                <a class="btn btn-danger btn-sm m-1" data-toggle="tooltip" href="" data-placement="top" title="Delete"> <i class="fa fa-trash"></i></a>
                <!--<el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete
                </el-button>-->
            </template>
        </el-table-column>
    </el-table>
</template>


<script>

    import 'element-ui/lib/theme-chalk/index.css'
    import {DataTables, DataTablesServer} from 'vue-data-tables'
    import VueRouter from 'vue-router'
    import {Table, TableColumn, Button, Pagination} from 'element-ui'


    export default {
        name: 'Orders',
        components: {Table, TableColumn, Button, Pagination, VueRouter},
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
