<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Item</label>
            <input class="form-control" type="text" v-model="items"   :disabled="isDisabled" >
          </div>
          <div class="form-group">
            <label>Sub Item</label>
            <input class="form-control" type="text" v-model="sub_items"  :disabled="isDisabled" >
          </div>
          <div class="form-group">
            <label>Name</label>
            <input class="form-control" type="text" v-model="name"  >
          </div>
          <div  class="form-group">
            <label>Reward Point</label>
            <input class="form-control" type="text" v-model="reward_point">
          </div>



          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Redeem
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
  name: "EditMock",
  data() {
    return {
      items: '',
      sub_items: '',
      reward_point: '',
      redeem_id: '',
      name: '',
      sub_title: '',
      step: '',
      link: '',
      msg: '',
      isDisabled: true,
    }
  },
  created() {
    this.redeem_id = this.$route.params.id;
    console.log('redeem id', this.redeem_id);
    this.getOld();

  },
  methods: {
    getOld() {
      axios.get(`${ADMIN_URL}/redeem/redeem-item/${this.redeem_id}`)
        .then(response => {

          this.redeems = response.data.data;
          this.items = this.redeems.items;
          this.sub_items = this.redeems.sub_items;
          this.name = this.redeems.name;
          this.reward_point = this.redeems.reward_point;
          this.sub_title = this.redeems.sub_title,
            this.step = this.redeems.step,
            this.link = this.redeems.link,
            this.msg = this.redeems.msg,
            console.log('redeem id data', this.redeems);
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },
    onSubmit() {

      let formData = {
        items: this.items,
        sub_items: this.sub_items,
        reward_point: this.reward_point,
        name: this.name,
        sub_title: this.sub_title,
        step: this.step,
        link: this.link,
        msg: this.msg,
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/redeem/update-redeem/${this.redeem_id}`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/redeem');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
