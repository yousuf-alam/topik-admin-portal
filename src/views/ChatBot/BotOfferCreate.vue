<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Offer Card</h5>
    <b-form-group label="Select Type">
      <select class="form-control" v-model="type">
        <option value="hot-deal">Hot Deal</option>
        <option value="beauty">Beauty Offer</option>
        <option value="tailor">Tailor Offer</option>
      </select>
    </b-form-group>
    <b-form-group label="Select Line Item">
      <multiselect
        v-model="selected_lineitem"
        :options="lineitems"
        placeholder="Select one"
        label="name"
        track-by="id"
        @close="setTitle"
      >
      </multiselect>
    </b-form-group>
    <b-form-group label="Title" v-show="selected_lineitem.id">
      <b-form-input type="text" v-model="title"></b-form-input>
    </b-form-group>
    <b-form-group label="Subtitle" v-show="selected_lineitem.id">
      <b-form-input type="text" v-model="subtitle"></b-form-input>
    </b-form-group>
    <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Offer Card</b-button>
  </b-card>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "BotOfferCreate",
    data() {
        return {
            type : '',
            title: '',
            subtitle: '',
            lineitems: [],
            selected_lineitem: '',

        }
    },
    created() {
        this.getAllLineitems();
    },
    methods: {
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
            this.title = this.selected_lineitem.name;
        },
        onSubmit(e) {
            e.preventDefault();

            let formData = new FormData();
            formData.append('type', this.type);
            formData.append('lineitem_id', this.selected_lineitem.id);
            formData.append('title', this.title);
            formData.append('subtitle', this.subtitle);

            axios.post(`${ADMIN_URL}/bot/create-offer`,formData)
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
