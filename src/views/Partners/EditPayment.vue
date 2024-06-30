<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Payment">
        <b-card-text>
          <div class="form-group">
            <label>Method</label>
            <input class="form-control" type="text" v-model="method" >
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input class="form-control" type="text" v-model="amount">
          </div>

          <div class="form-group" v-if="image">
            <label>Attachment</label>
            <br>
            <!-- <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br> -->
            <div>
              <img :src="image" style="width: 200px; height: 150px;" />
              <input type="file" class="form-control" @change="onImageChange">
              <medium v-if="fileSizeError" class="text-danger">{{ fileSizeError }}</medium>
            </div>
          </div>

          <div class="form-group">
            <label>Payment to</label>
            <input class="form-control" type="text" v-model="payment_to"  >
          </div>
          <div  class="form-group">
            <label>Received Date</label>
            <input class="form-control" type="text" v-model="recieved_date">
          </div>
          <div  class="form-group">
            <label>Remarks</label>
            <input class="form-control" type="text" v-model="remarks">
          </div>



          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Payment
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "EditPayment",
  data(){
    return {
      payments:[],
      method:'',
      amount:'',
      payment_to:'',
      recieved_date:'',
      remarks:'',
      image: '',
      isDisabled: true,
      fileSizeError: '',
      imageFile: null,

    }
  },
  created() {
    this.payment_id = this.$route.params.id;
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/partner-payment/payment-item/${this.payment_id}`)
          .then(response => {

            this.payments = response.data.data;
            this.amount = this.payments.amount;
            this.method = this.payments.method;
            this.payment_to = this.payments.payment_to;
            this.recieved_date = this.payments.recieved_date;
            this.remarks = this.payments.remarks;
            this.image = this.payments.Image;


          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },

    onImageChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 1048576) {
    this.fileSizeError = "Image must be less than 1 MB.";
  } else {

        this.fileSizeError = '';
        this.imageFile = file;
        const imageUrl = URL.createObjectURL(file);
        this.image = imageUrl;
  }
},




    onSubmit() {

      if (this.fileSizeError) {
        return;
      }


      // let formData = {
      //   payment_method:this.method,
      //   amount:this.amount,
      //   payment_to:this.payment_to,
      //   recieved_date:this.recieved_date,
      //   remarks:this.remarks,
      //   image: this.imageFil
      //  }

      // console.log(this.imageFile);
      // console.log(this.method);
      // console.log(this.amount);
      // console.log(this.payment_to);
      // console.log(this.recieved_date);
      // console.log(this.remarks);

      let formData = new FormData();
      formData.append("method", this.method);
      formData.append("amount", this.amount);
      formData.append("payment_to", this.payment_to);
      formData.append("recieved_date", this.recieved_date);
      formData.append("remarks", this.remarks);

      if (this.imageFile) {
        formData.append("image", this.imageFile, this.imageFile.name);
      }

      console.log("FormData contents:");
for (const pair of formData.entries()) {
  console.log(pair[0] + ', ' + pair[1]);
}

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/partner-payment/update-payment/${this.payment_id}`, formData)
          .then(response => {


            if (response.data.success === true) {

              this.$swal('Success','Payment Details updated successfully.','success');

            return this.$router.push('/Partner-payment');
          }
          else
            {
              this.$swal('Error', 'Something went wrong', 'error');
            }




          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
