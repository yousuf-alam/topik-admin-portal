<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Third party Content</h5>
    <b-form-group label="Select Platform">
      <select class="form-control" v-model="platform">
        <option value="SHOHOZ" selected>Shohoz</option>
      </select>
    </b-form-group>
    <b-form-group label="Select Type">
      <select class="form-control" v-model="type" @change="fetch()">
        <option value="top_deals">Top Deal</option>
        <option value="top_services">Top Service</option>
        <option value="carousel">Carousel</option>
      </select>
    </b-form-group>
    <b-form-group v-if="type !== 'carousel'" label="Select Line Item">
        <select v-model="selected_lineitem" class="form-control" id="1">
                <option v-for="lineitem in lineitems" :key="lineitem.id" :value="lineitem.id">{{lineitem.name}}</option>
        </select>
    </b-form-group>
    <b-form-group v-if="type == 'carousel'" label="Select Category Item">
       <select v-model="selected_category" class="form-control" >
                <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>
    </b-form-group>
    <b-form-group>
        <div class="form-check checkbox">
            <input class="form-check-input" type="checkbox" name="published_status" v-model="published_status">
            <label class="form-check-label" >Published</label>
        </div>
    </b-form-group>
    <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Third Party Content</b-button>
  </b-card>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "BotOfferCreate",
    data() {
        return {
            platform : 'SHOHOZ',
            type : '',
            title: '',
            subtitle: '',
            lineitems: [],
            selected_lineitem: '',
            categories: [],
            selected_category: '',
            published_status: '',

        }
    },
    created() {
        // this.getAllLineitems();
    },
    methods: {
        getAllLineitems() {
            axios.get(`${ADMIN_URL}/all-line-items-third-party`)
                .then(response => {
                    this.lineitems = response.data;
                })
                .catch(e => {
                    console.log("error occurs", e.response);
                });
        },
        getAllCategories(){
            axios.get(`${ADMIN_URL}/all-categories`)
            .then(response => {
            this.categories = response.data;
            console.log('this.categ',this.categories)
          })
          .catch(e => {
            console.log("error occurs");
          });
        },
        fetch(){
            console.log('changed');
            if(this.type !== 'carousel'){
                this.getAllLineitems();
                this.selected_category = null;
                return
            }
                this.selected_lineitem = null;
                this.getAllCategories();
        },
        setTitle() {
            this.title = this.selected_lineitem.name;
        },
        onSubmit(e) {
            e.preventDefault();
            if (typeof this.selected_lineitem == 'undefined') {
                this.selected_lineitem = NULL;
            }
            if (typeof this.selected_category == 'undefined') {
                this.selected_category = NULL;
            }

            let formData = new FormData();
            formData.append('platform', this.platform);
            formData.append('type', this.type);
            formData.append('lineitem_id', this.selected_lineitem);
            formData.append('category_id', this.selected_category);
            formData.append('published_status', this.published_status);

            axios.post(`${ADMIN_URL}/third-party-contents/create`,formData)
                .then(response => {
                    console.log(response.data);
                    if(response.data.success===true)
                    {
                        this.$swal('Success',response.data.message,'success');
                        window.location.href = "/third-party-contents";
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
