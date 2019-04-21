<template>
    <div class="customcard">
        <div class="resource-head row">
            <div class="resource-identity col-sm-8  d-flex justify-content-center align-items-center flex-column">
                <img src="https://www.w3schools.com/html/img_girl.jpg" class="rounded-circle" width="100px">
                <div>
                    <h3>Resource Name</h3>
                </div>
                <div>
                    <div class="badge badge-gradient-danger" id="status">
                        Verified
                    </div>
                </div>
                <div>
                    <div class="change-log-modal" v-b-modal.modal-1>
                        Change Log
                    </div>

                    <!-- Modal Component -->
                    <b-modal id="modal-1" title="Change Log of Resource">
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

                <b-tab title="Category">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                </b-tab>

                <b-tab title="SubCategory">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                </b-tab>
                <b-tab title="Line Item">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ResourceShow',
        components: {}
    }
</script>

<style scoped>
    .badge-gradient-danger {
        padding: 10px;
        margin-bottom: 10px;
        background: linear-gradient(to top, #3a4252, #0989df);
        font-size: 20px;
        box-shadow: -3px 4px #b9b3b3;
        font-weight: 400;
        color: #ffffff;
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
