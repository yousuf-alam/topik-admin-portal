<template>
    <b-card class="m-4">
        <h5 class="mb-4">Report Complain</h5>
      <b-form-group label="Order ID">
        <b-form-input
          v-model="order_id"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Select Reasons(s)">
        <MultiSelect
          v-model="selected_reasons"
          placeholder="Search or add a tag"
          label="name"
          track-by="id"
          :options="reasons"
          :multiple="true">

        </MultiSelect>
      </b-form-group>
        <b-form-group label="Description">
          <b-form-textarea
            id="textarea"
            v-model="description"
            placeholder="Write something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Report Complain</b-button>
    </b-card>
</template>

<script>
    import axios from 'axios';
    import MultiSelect from 'vue-multiselect';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
        name: "ComplainCreate",
        components: {
            MultiSelect
        },
        data() {
            return {
                reasons: [],
                selected_reasons: [],
                order_id: '',
                description: ''
            }
        },
        created() {
            axios.get(`${ADMIN_URL}/complains`)
                .then(response => {
                    this.reasons = response.data;
                })
                .catch(e => {
                    //console.log("error occurs");
                });
        },
        methods: {
            onSubmit() {

                let formData = new FormData();

                formData.append('order_id', this.order_id);
                formData.append('comment', this.description);
                formData.append('complain_ids', JSON.stringify(this.selected_reasons));

                axios.post(`${ADMIN_URL}/report-complain`,formData)
                    .then(response => {
                        console.log(response.data);
                        if(response.data.success===true)
                        {
                            this.$swal('Success',response.data.message,'success');
                            window.location.href='/complains';
                        }
                        else
                        {
                            this.$swal('Error', response.data.message,'error');
                        }
                    })
                    .catch(error => {
                        console.log('Error  ... ', error.response.data);
                        console.log(error)
                        this.$swal('Error', 'Something went wrong','error');
                    });
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
