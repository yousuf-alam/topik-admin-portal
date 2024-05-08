<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <b-card>
                    <h3 class="text-center">Product Request Description</h3>


                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="6">
                <b-card>
                    <h3 class="text-center">Product Request Details</h3><br>
                    <ul class="list-unstyled">
                        <li class="mb-3">
                            <h5><b>Partner Name:</b> {{ productRequest . partner_name }}</h5>
                        </li>
                        <li class="mb-3">
                            <h5 ><b>Status:</b> <span class="badge badge-success">{{ productRequest . status }}</span></h5>
                        </li>
                        <li class="mb-3">
                            <h5><b>Requisition Date:</b> {{ productRequest . requisition_date }}</h5>
                        </li>
                        <li class="mb-3">
                            <h5><b>Acquisition Period:</b> {{ productRequest . acquisition_period }}</h5>
                        </li>
                        <li class="mb-3">
                            <h5><b>Total Price:</b> {{ productRequest . total_price }}</h5>
                        </li>
                        <li class="mb-3">
                            <h5><b>Send Date:</b> {{ productRequest . send_date || 'Not sent yet' }}</h5>
                        </li>
                        <li class="mb-3">
                            <h5><b>Approved By:</b> {{ productRequest . approved_by || 'Not approved yet' }}</h5>
                        </li>
                    </ul>
                </b-card>
            </b-col>



            <b-col sm="6" md="6">
                <b-card>
                    <h4 class="text-center">Product Transactions Details</h4><br>
                    <div v-for="transaction in productRequest.product_request_transactions"
                        :key="transaction.product_id">
                        <b-card no-body class="mb-3">
                            <b-card-body>
                                <h6>
                                    <span class="font-weight-bold">Product Name:</span> {{ transaction . product_name }}
                                </h6>
                                <h6>
                                    <span class="font-weight-bold">Quantity:</span> {{ '1 x ' + transaction . quantity }}
                                </h6>
                                <h6>
                                    <span class="font-weight-bold">Total Price:</span> {{ transaction . price }}
                                </h6>
                            </b-card-body>
                        </b-card>
                    </div>
                </b-card>
            </b-col>


        </b-row>

    </div>
</template>
<script>
    import axios from 'axios';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

    export default {
        name: "ProductRequestShow",
        data() {
            return {
                productRequest: null
            }
        },
        created() {
            this.fetchProductRequest();
        },
        methods: {
            fetchProductRequest() {
                const id = this.$route.params.id;
                axios.get(`${ADMIN_URL}/fetch-request-by-id/${id}`)
                    .then(response => {
                        this.productRequest = response.data.data;
                    })
                    .catch(error => {
                        console.error('Error fetching product request:', error);
                    });
            }
        }
    }
</script>
