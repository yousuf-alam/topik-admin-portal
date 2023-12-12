<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label> Select Type</label>
            <select class="form-control" type="text" v-model="type">

              <option value="all">All Partners</option>
              <option value="individual">Individual</option>

            </select>
          </div>

          <b-form-group label="Select Partner(p)" v-if="this.type==='individual'">
            <MultiSelect
              v-model="partner_id"
              placeholder="Search or add a tag"
              label="name"
              track-by="id"
              :options="partners"
              :multiple="false">

            </MultiSelect>
          </b-form-group>

          <div  class="form-group">
            <label>Please type notice</label>
            <input class="form-control" type="text" v-model="notice" >
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Notice
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
import MultiSelect from "vue-multiselect";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "NoticeCreate",
  components: {MultiSelect},
  data(){
    return {
      type:'',
      partner_id:'',
      notice:'',
      partners:[]
    }
  },
  created() {
    this.getPartners();
    console.log("hello");
  },
  methods:{
    getPartners() {
      axios.get(`${ADMIN_URL}/all-active-partners`)
        .then(response => {
          this.partners = response.data.data;
          console.log(this.partners);
        })
        .catch(error => {

        });
    },
    onSubmit() {

      let formData = {
        type:this.type,
        partner_id:this.partner_id,
        notice:this.notice,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/in-house-notice/create`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/partner-notice');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
