<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create New Hot Deal</h5>
    <form @submit="onSubmit" enctype="multipart/form-data"> <div class="form-group">
      <label> Name </label>
      <input class="form-control" name="name" rows="3" v-model="name" required>
    </div>


      <div class="form-group">
        <label>Description</label>
        <input class="form-control" name="description" rows="3" v-model="description" >
      </div>

      <div class="form-group">
        <label>Slug</label>
        <input class="form-control" name="slug" rows="10" v-model="slug" required>

      </div>


      <div class="form-group">
        <label>Code</label>
        <input type="text" name="code" class="form-control" v-model="code" required>
      </div>


      <div class="form-group">
        <label>Discount Type</label>
        <select v-model="discount_type" class="form-control">
          <option value="fixed">Fixed</option>
          <option value="percentage">Percentage</option>
        </select>
      </div>


      <div class="form-group">
        <label>Discount Amount</label>
        <input type="text" name="discount_amount" class="form-control" v-model="discount_amount" required>
      </div>

      <div class="form-group row">
        <label class="col-sm-12 col-form-label">Upload Image</label>

        <div class="col-sm-12">
          <input class="form-control" type="file" name="thumbnail" v-on:change="onImageChange">
          <span class="text-danger" v-if="imageSizeError">{{ imageSizeError }}</span>
        </div>
      </div>



      <div class="form-group">
        <label>Status</label>
        <select v-model="status" class="form-control">
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
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
      name: '',
      description: '',
      slug: '',
      code: '',
      discount_type: '',
      discount_amount: '',
      thumbnail:'',
      status: '',
      imageSizeError:''
    }
  },
  methods: {

    onImageChange(e) {
      this.thumbnail = e.target.files[0];
      if (this.thumbnail.size > 1048576) {
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
      }


      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('slug', this.slug);
      formData.append('code', this.code);
      formData.append('discount_type', this.discount_type);
      formData.append('discount_amount', this.discount_amount);
      formData.append('thumbnail', this.thumbnail);
      formData.append('status', this.status);



      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/create-hot-deals`, formData, config)
        .then(response => {
          currentObj.success = response.data.success;

          if(response.data.success===true)
            {
              this.$swal('Success','Hot Deal created successfully.','success');
            }
            else
            {
              this.$swal('Error', 'Something went wrong', 'error');
            }


          this.$router.push({ name: 'HotDeals' })
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
