<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Offer Card</h5>
    <b-form-group label="Select Type">
      <select class="form-control" v-model="offer.type">
        <option value="hot-deal">Hot Deals</option>
        <option value="beauty">Beauty Offer</option>
        <option value="tailor">Tailor Offer</option>
      </select>
    </b-form-group>
    <b-form-group label="Select Line Item">
      <multiselect
        v-model="offer.lineitem"
        :options="lineitems"
        placeholder="Select one"
        label="name"
        track-by="id"
        @close="setTitle"
      >
      </multiselect>
    </b-form-group>
    <b-form-group label="Title">
      <b-form-input type="text" v-model="offer.title"></b-form-input>
    </b-form-group>
    <b-form-group label="Subtitle">
      <b-form-input type="text" v-model="offer.subtitle"></b-form-input>
    </b-form-group>
    <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Offer Card</b-button>
  </b-card>
</template>

<script>
    import axios from 'axios';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
        name: "BotOfferEdit",
        data() {
            return {
                offer : [],
                lineitems: []
            }
        },
        created() {
            this.getAllLineitems();
            this.fetchOffer();
        },
        methods: {
            fetchOffer(){
                let id = window.location.pathname.split("/").pop();
                axios.get(`${ADMIN_URL}/bot/offer-show`,{
                    params : {
                        id : id
                    }
                })
                    .then(response =>{
                        this.offer = response.data;
                    })
                    .catch(e=>{
                        console.log("error occurs");
                    });
            },
            getAllLineitems() {
                const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
                axios.get(`${ADMIN_URL}/all-line-items`)
                    .then(response => {
                        this.lineitems = response.data;
                    })
                    .catch(e => {
                        console.log("error occurs", e.response);
                    });
            },
            setTitle() {
                this.title = this.offer.lineitem.name;
            },
            onSubmit(e) {
                e.preventDefault();

                let formData = new FormData();
                formData.append('id', this.offer.id);
                formData.append('type', this.offer.type);
                formData.append('lineitem_id', this.offer.lineitem.id);
                formData.append('title', this.offer.title);
                formData.append('subtitle', this.offer.subtitle);

                axios.post(`${ADMIN_URL}/bot/update-offer`,formData)
                    .then(response => {
                        console.log(response.data);
                        if(response.data.success===true)
                        {
                            this.$swal('Success',response.data.message,'success');
                            window.location.href = "/bot-offers";
                        }
                        else
                        {
                            this.$swal('Error', 'Something went wrong', 'error');
                        }
                    })
                    .catch(error => {
                        console.log('Error  ... ', error.response);
                        this.output = error;
                        console.log(error);
                    });
            }
        }

    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
