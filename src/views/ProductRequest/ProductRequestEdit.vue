<template>
    <b-card class="m-4">
        <b-tabs card pills>
            <b-tab active title="Edit Product Request">
                <b-card-text>
                    <form @submit="onSubmit" enctype="multipart/form-data">

                        <!-- Partner Name -->
                        <div class="form-group">
                            <label>Partner Name</label>

                            <br>
                            <input class="form-control" type="text" v-model="partner_name" disabled>
                        </div>

                        <!-- Requisition Date -->
                        <div class="form-group">
                            <label>Requisition Date</label>
                            <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true"
                                label="Select" id="RangeDatePicker" format="YYYY-MM-DD" formatted="ll" color="#7D4E77"
                                v-model="requisition_date" />
                        </div>


                        <!-- Send Date -->
                        <div class="form-group">
                            <label>Send Date</label>
                            <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true"
                                label="Select" id="RangeDatePicker" format="YYYY-MM-DD" formatted="ll" color="#7D4E77"
                                v-model="send_date" />
                        </div>

                        <!-- Acquisition Period -->
                        <div class="form-group">
                            <label>Acquisition Period</label>
                            <select v-model="acquisition_period" class="form-control">
                                <option value="পুরো-মাসের-প্রোডাক্ট">পুরো মাসের প্রোডাক্ট</option>
                                <option value="আংশিক-প্রোডাক্ট">আংশিক প্রোডাক্ট</option>
                            </select>
                        </div>

                        <!-- status -->
                        <div class="form-group">
                          <label>Status</label>
                          <select v-model="status" class="form-control">
                              <option value="requested">Requested</option>
                              <option value="approved">Approved</option>
                              <option value="sent">Sent</option>
                              <option value="received">Received</option>
                              <option value="rejected">Rejected</option>
                          </select>
                      </div>

                        <!-- Products -->
                        <div class="form-group">
                            <label>Products</label>
                            <VueMultiselect v-model="selectedProducts" :options="allProducts" :multiple="true"
                                :searchable="true" :close-on-select="false" :allow-empty="true" label="name"
                                placeholder="Select products" :preserve-search="true" track-by="id">
                            </VueMultiselect>
                            <div v-for="(product, index) in selectedProducts" :key="index">
                                <label>{{ product . name }}</label>
                                <input type="number" v-model="product.quantity" class="form-control" min="1"
                                    required>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Product
                            Request</b-button>
                    </form>
                </b-card-text>
            </b-tab>
        </b-tabs>
    </b-card>
</template>
<script>
    import axios from 'axios';
    import VueMultiselect from 'vue-multiselect';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

    export default {
        name: "ProductRequestEdit",
        components: {
            VueMultiselect
        },
        data() {
            return {
                requestId: this.$route.params.id,
                partners: [],
                partner_id: '',
                partner_name: '',
                requisition_date: '',
                send_date: '',
                acquisition_period: '',
                allProducts: [],
                selectedProducts: [] ,
                status:'',
                products: [{
                    product_id: '',
                    quantity: ''
                }],
            }
        },
        created() {
            this.fetchProductRequest();
            // this.fetchInHousePartners();
            this.fetchProducts();
        },
        methods: {
            fetchProductRequest() {
                axios.get(`${ADMIN_URL}/fetch-request-by-id/${this.requestId}`)
                    .then(response => {
                        const data = response.data.data;
                        this.partner_name = data.partner_name;
                        this.requisition_date = data.requisition_date;
                        this.send_date = data.send_date;
                        this.acquisition_period = data.acquisition_period;
                        this.status = data.status;
                        this.selectedProducts = data.product_request_transactions.map(item => ({
                          id : item.product_id,
                            name: item.product_name,
                            quantity: item.quantity,
                        }));
                    })
                    .catch(error => {
                        console.error('Error fetching product request:', error);
                    });
            },

            fetchProducts() {
                axios.get(`${ADMIN_URL}/searchable-product`)
                    .then(response => {
                        this.allProducts = response.data.data.map(product => ({
                            id: product.id,
                            name: product.name,
                            value: product.value
                        }));
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                    });
            },
          onSubmit(event) {
            event.preventDefault();
            const formData = new FormData();
            formData.append('partner_id', this.partner_id);
            formData.append('requisition_date', this.requisition_date);
            if (this.send_date) {
              formData.append('send_date', this.send_date);
            }
            formData.append('acquisition_period', this.acquisition_period);
            formData.append('status', this.status);
                this.selectedProducts.forEach((product, index) => {

                  formData.append(`products[${index}][product_id]`, product.id);
                    formData.append(`products[${index}][quantity]`, product.quantity);

                });

                axios.post(`${ADMIN_URL}/update-request-by-id/${this.requestId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {

                      if (response.data.success === true) {
                        this.$swal('Success', 'Product Request updated successfully.', 'success');
                      }
                      else {
                        this.$swal('Error', 'Something went wrong', 'error');
                      }

                        this.$router.push({
                            name: 'ProductRequest'
                        });
                    })
                    .catch(error => {
                        console.error('Error during product request update:', error.response);
                    });
            }
        }
    }
</script>
