<template>
<div class="animated fadeIn">
    <!--         
        <div >
            <TestNoti />
        </div>
    -->
    <div class="customcard">
        <div class="cardheading">
            <div>
                <h2>All Notifications</h2>
            </div>
            <div>
                <router-link :to="{ name: 'NotificationCreate'}">
                    <button class="btn btn-success">Create New Notification</button>
                </router-link>
            </div>
        </div>
        <b-row>
            <b-col>
                <b-card>
                    <v-client-table :data="tableData" :columns="columns" :options="options">
                        <template slot="action" slot-scope="props">
                            <div>
                                <router-link :to="{ name: 'Notification / Edit', params: { id: 1 }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                    <i class="fa fa-edit"></i></span></router-link>
                                <span class="btn btn-success btn-sm m-1" data-toggle="tooltip" title="Delete">
                                    <i class="fa fa-upload"></i></span>
                            </div>
                        </template>
                    </v-client-table>
                </b-card>
            </b-col>
        </b-row>

    </div>
</div>
</template>




<script>

    export default {
        name: 'Notifications',
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

            delete(id) {
                // The id can be fetched from the slot-scope row object when id is in columns
                console.log('hi');
            }
        },
    }
</script>

<style lang="scss">
.notReadYet {
    background: rgb(202, 201, 201);
}


/* Start: Pagination Styling using SCSS */
    $primaryColor: rgb(55, 143, 5); 
    $bgColor: rgb(255, 255, 255); 
    $selectdItemColor: $bgColor;

    .pagination {
        margin: 5px 0px;
        font-size: 16px;
    }
    .pagination > li > a {
        border-radius: 5%;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: $primaryColor;
        text-decoration: none;
        background-color: $bgColor;
        border: 1px solid #ddd;
    }
    .pagination > .active > a {
        border-radius: 5%;
        z-index: 2;
        color: $selectdItemColor;
        cursor: default;
        background-color:$primaryColor;
        border-color: $primaryColor;
    }

    .disabled >a {
        color: #777;
        cursor: not-allowed;
        background-color: $bgColor;
        border-color: #ddd;
    }
/* End: Pagination Styling  using SCSS */


</style>