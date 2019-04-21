<template>
    <div class="">
        <div class="walletHead card">
            <div class="card-body">
                <h1 class="card-description"> SP Name</h1>
                <div class="wallet-forhead">
                    <div class="leftside">
                    </div>
                    <div class="rightside">
                        <img src="https://partner.staging180601.romoni.xyz/site_assets/img/wallet-pink.png" width="30%"
                             alt="wallet-icon">
                        <div class="badge badge-success money">৳ 1050</div>
                        <div class="money-condition">Credit</div>
                    </div>
                </div>
            </div>
        </div>
        <b-tabs card>
            <b-tab title="Transaction History" active>
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
            </b-tab>
            <b-tab title="Advance Recharge">
                <div class="row w-100">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <input type="hidden" name="_token" value="">
                            <div class="form-group">
                                <label class="text-center">Recharge Amount</label>
                                <input type="number" name="recharge_wallet" class="form-control form-control-lg"
                                       id="recharge">
                            </div>
                            <div class="mt-3">
                                <input class="btn btn-danger btn-block" type="submit" value="Recharge Wallet">
                            </div>
                        </div>

                    </div>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    export default {
        name: 'WalletShow',
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

}
</script>

<style scoped>

    .walletHeadContainer {
        background: white;
    }

    .wallet-forhead {
        display: flex;
        justify-content: space-around;
    }

    .leftside {

        flex-basis: 0;
        flex-grow: 2;
    }

    .rightside {

        flex-basis: 0;
        flex-grow: 1;
    }

    .rightside > .money {
        font-size: 30px;
    }

    .rightside > .money-condition {
        color: rgb(80, 126, 12);
        font-size: 30px;
        margin: auto 0;
        text-align: center;
    }

    @media only screen and (max-width: 600px) {
        .rightside > .money {
            font-size: 20px;
        }

        .rightside > .money-condition {
            color: rgb(80, 126, 12);
            font-size: 20px;
            margin: auto 0;
            text-align: center;
        }
    }

</style>
