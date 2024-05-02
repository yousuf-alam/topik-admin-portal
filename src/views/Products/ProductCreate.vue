<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create New Product</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
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
        <label>Product Name En</label>
        <input class="form-control" name="product_name_en" rows="3" v-model="product_name_en" required>
      </div>

      <div class="form-group">
        <label>Product Name Bn</label>
        <input class="form-control" name="product_name_bn" rows="10" v-model="product_name_bn" required>

      </div>


      <div class="form-group">
        <label>Zoho Code</label>
        <input type="text" name="zoho_code" class="form-control" v-model="zoho_code" required>
      </div>


      <div class="form-group">
        <label>Old Price</label>
        <input type="text" name="old_price" class="form-control" v-model="old_price" required>
      </div>


      <div class="form-group">
        <label>New Price</label>
        <input type="text" name="new_price" class="form-control" v-model="new_price" required>
      </div>

      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Upload Image</label>
        <div class="col-sm-9">
          <input class="form-control" type="file" name="image" v-on:change="onImageChange">
        </div>
      </div>

      <b-button type="submit" value="Submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Product
      </b-button>
    </form>
  </b-card>
</template>

<script>
import axios from 'axios';
export default {
  name: "ProductCreate",
  created() {
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    console.log('Service Create ADMIN_URL === ', ADMIN_URL);
  },
  data() {
    return {
      category_name: '',
      product_name_en: '',
      product_name_bn: '',
      zoho_code: '',
      old_price: '',
      new_price: '',
      image: '',

    }
  },
  methods: {

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
      }


      let formData = new FormData();
      formData.append('category_name', this.category_name);
      formData.append('product_name_en', this.product_name_en);
      formData.append('product_name_bn', this.product_name_bn);
      formData.append('zoho_code', this.zoho_code);
      formData.append('old_price', this.old_price);
      formData.append('new_price', this.new_price);
      formData.append('image', this.image);



      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/create-product`, formData, config)
        .then(response => {
          currentObj.success = response.data.success;
          this.$router.push({ name: 'Products' })
        })
        .catch(error => {
          // console.log('Error  ... ', error.response);
          currentObj.output = error;
        });
    }
  }

}
</script>

<style scoped></style>
