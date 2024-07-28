<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col sm="6" md="6">
        <b-card>
          <h4 class="text-center">Product Request Details</h4><br>
          <ul class="list-unstyled">
            <li class="mb-3">
              <h6><b>Product Type:</b> {{ productRequest . product_type || 'N/A' }}</h6>
            </li>
            <li class="mb-3">
              <h6><b>Partner Name:</b> {{ productRequest . partner_name }}</h6>
            </li>
            <li class="mb-3">
              <h6><b>Requisition Date:</b> {{ productRequest . requisition_date }}</h6>
            </li>
            <li class="mb-3">
              <h6><b>Acquisition Period:</b> {{ productRequest . acquisition_period }}</h6>
            </li>
            <li class="mb-3">
              <h6><b>Total Price:</b> {{ productRequest . total_price }}</h6>
            </li>
            <li class="mb-3">
              <h6><b>Send Date:</b> {{ productRequest . send_date || 'Not sent yet' }}</h6>
            </li>
            <li class="mb-3">
              <h6><b>Approved By:</b> {{ productRequest . approved_by || 'Not approved yet' }}</h6>
            </li>
            <li class="mb-3">
              <h6><b>Status:</b> <span :class="statusClass">{{ productRequest . status }}</span></h6>
            </li>
          </ul>
        </b-card>
      </b-col>



      <b-col sm="6" md="6">
        <b-card>
          <h4 class="text-center">Product Transactions Details</h4><br>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in productRequest.product_request_transactions" :key="transaction.product_id">
                <td>{{ transaction.product_name }}</td>
                <td>{{ '1 x ' + transaction.quantity }}</td>
                <td>{{ transaction.price }}</td>
              </tr>
            </tbody>
          </table>

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

        computed:{

          statusClass() {
      return {
        'badge': true,
        'badge-primary': this.productRequest.status === 'requested',
        'badge-warning': this.productRequest.status === 'approved',
        'badge-secondary': this.productRequest.status === 'sent',
        'badge-success': this.productRequest.status === 'received',
        'badge-danger': this.productRequest.status === 'rejected'
      };
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
