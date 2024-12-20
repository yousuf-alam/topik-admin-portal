<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Title</label>
            <input class="form-control" type="text" v-model="title" >
          </div>
          <div class="form-group">
            <label>Description</label>
            <input class="form-control" type="text" v-model="description">
          </div>

          <div  class="form-group">
            <label>Start Time</label>
            <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true" label="Select"
                                  id="RangeDatePicker" format="YYYY-MM-DD" formatted="ll" color="#7D4E77"
                                  v-model="start_time" />
          </div>

          <div  class="form-group">
            <label>End Time</label>
            <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true" label="Select"
                                  id="RangeDatePicker" format="YYYY-MM-DD" formatted="ll" color="#7D4E77"
                                  v-model="end_time" />
          </div>

          <div  class="form-group">
            <label>Mock Type</label>
            <select class="form-control" v-model="mock_type" >
              <option value="weekly">Weekly</option>
              <option value="practice">Practice</option>
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
            </select>
          </div>

          <div  class="form-group">
            <label>Total Question</label>
            <input class="form-control" type="text" v-model="total_question" >
          </div>

          <div  class="form-group">
            <label>Duration</label>
            <input class="form-control" type="text" v-model="duration" >
          </div>

          <div  class="form-group">
            <label>Passing Percentage</label>
            <input class="form-control" type="text" v-model="passing_percentage" >
          </div>
          <div  class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status" >
              <option value="0">Published</option>
              <option value="1">Pending</option>
            </select>
          </div>





          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Mock
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateMock",
  data(){
    return {
      title:'',
      description:'',
      start_time:'',
      end_time:'',
      mock_type:'',
      total_question:'',
      duration:'',
      passing_percentage:'',
      status:''
    }
  },
  methods:{
    onSubmit() {

      let formData = {
        title: this.title,
        description: this.description,
        start_time: this.start_time,
        end_time: this.end_time,
        mock_type: this.mock_type,
        total_question: this.total_question,
        duration: this.duration,
        passing_percentage: this.passing_percentage,
        status: this.status,
      };

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/create-mock`, formData)
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
