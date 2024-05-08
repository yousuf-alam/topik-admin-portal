<template>
    <b-card class="m-4">
        <h5 class="mb-4">Create New Product Request</h5>
        <form @submit="onSubmit" enctype="multipart/form-data">
            <div class="form-group">
                <label>Partner Name</label>
                <select class="form-control" v-model="partner_id">
                    <option v-for="partner in partners" :value="partner.id" :key="partner.id">
                        {{ partner . name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Requisition Date</label>
                <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true" label="Select"
                    id="RangeDatePicker" format="YYYY-MM-DD" formatted="ll" color="#7D4E77"
                    v-model="requisition_date" />
            </div>

            <div class="form-group">
                <label>Acquisition Period</label>
                <select v-model="acquisition_period" class="form-control">
                    <option value="পুরো-মাসের-প্রোডাক্ট">পুরো মাসের প্রোডাক্ট</option>
                    <option value="আংশিক-প্রোডাক্ট">আংশিক প্রোডাক্ট</option>

                </select>
            </div>


            <div class="form-group">
                <label>Products</label>
                <VueMultiselect v-model="selectedProducts" :options="allProducts" :multiple="true"
                    :searchable="true" :close-on-select="false" :allow-empty="true" label="name"
                    placeholder="Select products" :preserve-search="true" track-by="id">
                </VueMultiselect>

                <div v-for="(product, index) in selectedProducts" :key="index">
                    <label>{{ product . name }}</label>
                    <input type="number" v-model="product.quantity" class="form-control" min="1" required>
                </div>
                <br>
            </div>

            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Product
                Request</b-button>
        </form>
    </b-card>
</template>
<script>
    import axios from 'axios';
    import VueMultiselect from 'vue-multiselect';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;


    export default {
        name: "ProductRequestCreate",
        components: {

            VueMultiselect

        },
        data() {
            return {
                partners: [],
                partner_id: '',

                requisition_date: '',
                acquisition_period: '',
                products: [{
                    product_id: '',
                    quantity: ''
                }],
                allProducts: [],
                selectedProducts: []
            }
        },

        created() {
            this.fetchInHousePartners();
            this.fetchProducts();

        },

        methods: {


            fetchProducts(searchParam) {
                let url = `${ADMIN_URL}/searchable-product`;
                if (searchParam) {
                    url += `/${searchParam}`;
                }

                axios.get(url)
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



            fetchInHousePartners() {
                axios.get(`${ADMIN_URL}/fetch-inhouse-sp`)
                    .then(response => {
                        this.partners = response.data;
                        if (this.partners.length > 0) {

                            this.partner_id = this.partners[0].id;

                        }
                    })
                    .catch(error => {
                        console.error('Error fetching in-house partners: ', error);
                    });
            },


            onSubmit(event) {
                event.preventDefault();
                const formData = new FormData();
                formData.append('partner_id', this.partner_id);
                formData.append('requisition_date', this.requisition_date);
                formData.append('acquisition_period', this.acquisition_period);

                this.selectedProducts.forEach((product, index) => {
                    formData.append(`products[${index}][product_id]`, product.id);
                    formData.append(`products[${index}][quantity]`, product.quantity);
                });

                axios.post(`${ADMIN_URL}/create-product-request`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        console.log("Product request created, navigating to list");
                        this.$router.push({
                            name: 'ProductRequest'
                        });
                    })
                    .catch(error => {
                        console.error('Error during product request creation:', error.response);
                    });
            }

        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" scoped></style>
