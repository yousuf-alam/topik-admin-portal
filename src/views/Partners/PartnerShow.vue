<template>
    <div class="customcard">
        <div class="resource-head row">
            <div class="resource-identity col-sm-8  d-flex justify-content-center align-items-center flex-column">
                <img src="https://www.w3schools.com/html/img_girl.jpg" class="rounded-circle" width="100px">
                <div>
                    <h3>SP Name</h3>
                </div>
                <div>
                    <h4 class="status-badge">
                        Verified
                    </h4>
                </div>
                <div>
                    <div class="change-log-modal" v-b-modal.modal-1>
                        Change Log
                    </div>

                    <!-- Modal Component -->
                    <b-modal id="modal-1" title="Change Log of SP">
                        <div class="my-4">
                            <div class="form-check">
                                <div class="radio">
                                    <label><input type="radio" name="optradio" checked> Not Verified </label>
                                </div>
                                <div class="radio">
                                    <label><input type="radio" name="optradio"> Verified </label>
                                </div>
                                <div class="radio">
                                    <label><input type="radio" name="optradio"> Rejected </label>
                                </div>
                            </div>
                        </div>
                    </b-modal>
                </div>

            </div>
            <div class="resource-job-summary col-sm-4 table-responsive">
                <div class="mt-2 ">
                    <h3 class="p-1 bg-primary">Job Summary</h3>
                </div>
                <table class="table">
                    <tbody>
                    <tr>
                        <td scope="row">TODAY SERVES</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td scope="row">WEEKLY SERVES</td>
                        <td>25</td>
                    </tr>
                    <tr>
                        <td scope="row">MONTHLY SERVES</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td scope="row">TOTAL SERVES</td>
                        <td>153</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="resource-body">
            <b-tabs content-class="mt-3" pills card>
                <b-tab title="Basic Info" active>
                    <table class="table">
                        <tr>
                            <th>Bank Name</th>
                            <td>bank</td>
                        </tr>
                        <tr>
                            <th>Branch Name</th>
                            <td>bank</td>
                        </tr>
                        <tr>
                            <th>Routing No.</th>
                            <td>12245</td>
                        </tr>
                        <tr>
                            <th>Account No.</th>
                            <td>1343</td>
                        </tr>
                        <tr>
                            <th>BKash No.</th>
                            <td>other</td>
                        </tr>
                    </table>
                </b-tab>

                <b-tab title="Resources">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>

                <b-tab title="Category">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>

                <b-tab title="SubCategory">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>
                <b-tab title="Line Item">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'PartnerShow',
        components: {},
        data() {
            return {
                columns: ['id', 'name', 'age'],
                tableData: [
                    {id: 1, name: "John", age: "2018-12-18"},
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
                    perPage: 5,
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

}
</script>

<style scoped>
    .status-badge {
        color: white;
        background-color: #4dbd74;
        padding: 0.25rem;
    }
    .change-log-modal {
        color: #0989df;
        text-decoration: underline;
    }

    .change-log-modal:hover {
        text-decoration: underline;
        color: #76b7e2;
        cursor: pointer;
    }
</style>
