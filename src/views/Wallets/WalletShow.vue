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
                <b-card-text>
                    <div class="walletBody card table-responsive">
                        <table class="table">
                            <thead class="bg-success">
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">ID</th>
                                <th scope="col">Description</th>
                                <th scope="col">Debit</th>
                                <th scope="col">Credit</th>
                                <th scope="col">Balance</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">2019-01-09 13:24:50</th>
                                <td>Mark</td>
                                <td>Once upon a time there was an application.</td>
                                <td>540</td>
                                <td>700</td>
                                <td>2000</td>
                            </tr>
                            <tr>
                                <th scope="row">2019-01-09 13:24:50</th>
                                <td>Mark</td>
                                <td>Once upon a time there was an application.</td>
                                <td>540</td>
                                <td>700</td>
                                <td>2000</td>
                            </tr>
                            <tr>
                                <th scope="row">2019-01-09 13:24:50</th>
                                <td>Mark</td>
                                <td>Once upon</td>
                                <td>540</td>
                                <td>700</td>
                                <td>2000</td>
                            </tr>
                            <tr>
                                <th scope="row">2019-01-09 13:24:50</th>
                                <td>Mark</td>
                                <td>Once upon</td>
                                <td>540</td>
                                <td>700</td>
                                <td>2000</td>
                            </tr>
                            <tr>
                                <th scope="row">2019-01-09 13:24:50</th>
                                <td>Mark</td>
                                <td>Once upon</td>
                                <td>540</td>
                                <td>700</td>
                                <td>2000</td>
                            </tr>
                            <tr>
                                <th scope="row">2019-01-09 13:24:50</th>
                                <td>Mark</td>
                                <td>Once upon</td>
                                <td>540</td>
                                <td>700</td>
                                <td>2000</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </b-card-text>
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
        name: 'WalletShow'
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
