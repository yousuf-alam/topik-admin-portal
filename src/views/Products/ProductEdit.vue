<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Product">
        <b-card-text>

          <div class="form-group">
            <label>Category Name</label>
            <select v-model="category_name" class="form-control">
              <option value="MAKEUP">MAKEUP</option>
              <option value="BODY">BODY</option>
              <option value="COMMON">COMMON</option>
              <option value="HAIR">HAIR</option>
              <option value="FACE">FACE</option>
              <option value="SP">SP</option>
            </select>
          </div>
          <div class="form-group">
            <label>product_name_en</label>

            <input class="form-control" type="text" v-model="product_name_en">
          </div>
          <div class="form-group">
            <label>product_name_bn</label>
            <input class="form-control" type="text" v-model="product_name_bn">
          </div>

          <div class="form-group">
            <label>zoho_code</label>
            <input class="form-control" type="text" v-model="zoho_code">
          </div>

          <div class="form-group">
            <label>Image</label><br>
            <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br>
            <img :src="image" style="width: 200px; height: 150px;">
            <input type="file" class="form-control" v-on:change="onImageChange">

          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Product
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "EditProduct",
  data() {
    return {
      productItems: [],

      category_name: '',
      product_name_en: '',
      product_name_bn: '',
      zoho_code: '',
      image: '',
      isDisabled: true,
      src_image: '/images/product/',
      show: true,

      fields: [{ name: "" }]
    }
  },
  created() {
    this.product_id = this.$route.params.id;
    // console.log('popup id',this.product_id);
    this.getOld();

  },
  methods: {
    getOld() {
      axios.get(`${ADMIN_URL}/product-by-id/${this.product_id}`)
        .then(response => {

          this.productItems = response.data.data;

          this.category_name = this.productItems.category_name;
          this.product_name_en = this.productItems.product_name_en;
          this.product_name_bn = this.productItems.product_name_bn;
          this.zoho_code = this.productItems.zoho_code;
          this.image = this.productItems.image;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },


    onImageChange(e) {
      this.image = e.target.files[0];
    },
    onSubmit(e) {


      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Accept': 'application/json',
        }
      };
      let formData = new FormData();
      formData.append('category_name', this.category_name);
      formData.append('product_name_en', this.product_name_en);
      formData.append('product_name_bn', this.product_name_bn);
      formData.append('zoho_code', this.zoho_code);
      formData.append('image', this.image);
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/update-product/${this.product_id}`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/products');

        })
        .catch(error => {

        });
    },
  }
}
</script>

<style scoped>
.btn-remove-des {
  height: 35px;
}
</style>
