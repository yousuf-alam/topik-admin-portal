<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>

          <div class="form-group">
            <label>Title</label>

            <input class="form-control" type="text" v-model="question"  >
          </div>

          <div  class="form-group">
            <label>Create Faq Answer</label>
            <div v-for="(field, index) in fields" :key="index">
              <input  v-model="field.value" @input="updateFieldValue(index, $event.target.value)" class="mt-2 form-control">
            </div>
            <b-button variant="primary" @click="addField" class="mt-2">Add More FAQ Answers</b-button>

          </div>

          <b-button @click="onSubmit" variant="primary" ><i class="fa fa-dot-circle-o"></i> Create FAQ Reward
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateFaqReward",
  data(){
    return {
      question:'',

      answers:[],
      fields: [{ value: "" }],

    }
  },
  created() {


  },
  methods:{
    updateFieldValue(index, value) {
      this.fields[index].value = value;
    },

    addField() {
      this.fields.push({ value: "" });
    },

    onSubmit(e) {
      let fieldValue = [];
      this.fields.map(ele => {
        fieldValue.push(ele.value);
      });


      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Accept' : 'application/json',
        }
      };


      let formData = new FormData();

      formData.append('question', this.question);
      formData.append('answers', JSON.stringify(fieldValue));

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/reward-faq/create-faq`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/reward-faq');

          })
          .catch(error => {

          });
    },

  }
}
</script>

<style scoped>

</style>
