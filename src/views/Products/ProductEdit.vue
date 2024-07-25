<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Product">
        <b-card-text>

          <div class="form-group">
            <label>Product Type</label>
            <select v-model="type" class="form-control">
              <option value="Salon">Salon</option>
              <option value="Makeup">Makeup</option>
            </select>
          </div>

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
            <label>Old Price</label>
            <input class="form-control" type="text" v-model="old_price">
          </div>


          <div class="form-group">
            <label>New Price</label>
            <input class="form-control" type="text" v-model="new_price">
          </div>

          <div class="form-group">
            <label>Image</label><br>
             <img :src="image" style="width: 200px; height: 150px;">
            <input type="file" class="form-control" v-on:change="onImageChange">
            <span class="text-danger" v-if="imageSizeError">{{ imageSizeError }}</span>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="status" class="form-control">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
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
      type: '',
      category_name: '',
      product_name_en: '',
      product_name_bn: '',
      zoho_code: '',
      old_price: '',
      new_price: '',
      status: '',
      image: '',
      isDisabled: true,
      src_image: '/images/product/',
      show: true,
      imageSizeError:'',

      fields: [{ name: "" }]
    }
  },
  created() {
    this.product_id = this.$route.params.id;
    this.getOld();

  },
  methods: {
    getOld() {
      axios.get(`${ADMIN_URL}/product-by-id/${this.product_id}`)
        .then(response => {

          this.productItems = response.data.data;

          this.type = this.productItems.type;
          this.category_name = this.productItems.category_name;
          this.product_name_en = this.productItems.product_name_en;
          this.product_name_bn = this.productItems.product_name_bn;
          this.zoho_code = this.productItems.zoho_code;
          this.old_price = this.productItems.old_price;
          this.new_price = this.productItems.new_price;
          this.status = this.productItems.status;
          this.image = this.productItems.image;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },



   onImageChange(e) {
      this.image = e.target.files[0];
      if (this.image.size > 1048576) {
        this.imageSizeError = 'Image size should be less than 1 MB';
        e.target.value = '';
      }
      else {
        this.imageSizeError = '';
      }

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
      formData.append('type', this.type);
      formData.append('category_name', this.category_name);
      formData.append('product_name_en', this.product_name_en);
      formData.append('product_name_bn', this.product_name_bn);
      formData.append('zoho_code', this.zoho_code);
      formData.append('old_price', this.old_price);
      formData.append('new_price', this.new_price);
      formData.append('status', this.status);
      formData.append('image', this.image);
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/update-product/${this.product_id}`, formData)
        .then(response => {

          if(response.data.success===true)
            {
              this.$swal('Success','Product updated successfully.','success');
            }
            else
            {
              this.$swal('Error', 'Something went wrong', 'error');
            }


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
