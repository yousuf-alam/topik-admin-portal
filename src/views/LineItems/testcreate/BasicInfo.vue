<template>
    <div>
        <h1>Basic Info</h1>
        <form @submit.prevent @click="handleSubmit">
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Super Service *</label>
            <div class="col-sm-9">
              <select @change="getCategories" class='form-control' v-model="service_id">
                <option disabled selected value="0">Select Service</option>
                <option :value="serv.id" v-for="serv in services" :key="serv.id">{{ serv.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Category *</label>
            <div class="col-sm-9">
              <select @change="getSubcategories" class='form-control' v-model="category_id" >
                <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
              </select>
            </div>
          </div>

          <div v-if="service_id !== 2" class="form-group row">
            <label class="col-sm-3 col-form-label">SubCategory *</label>
            <div class="col-sm-9">
              <select class='form-control' v-model="subcategory_id">
                <option :value="subcat.id" v-for="subcat in subcategories" :key="subcat.id">{{ subcat.name }}</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Name *</label>
            <div class="col-sm-9">
              <input class="form-control" name="name" type="text" v-model="name" required>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Thumbnail *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onThumbnailChange">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (Web) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBwebChange">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (Tab) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBtabChange">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (Android) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBandChange">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (iOS) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBiosChange">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Pricing Type *</label>
            <div class="col-sm-9">
              <select class="form-control" name="pricing_type" v-model="pricing_type">
                <option value="fixed" selected>Fixed</option>
                <option value="option">Option</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">FAQ</label>
            <div class="col-sm-9">
              <b-button @click="FAQmodal" class="btn btn-success">+ Add FAQ</b-button>


              <div v-for="(faq, index) in faqs" :key="index">

                <b-button @click="FAQindexModal(index)" class="btn btn-sm btn-dark m-1">FAQ - {{ index+1 }}</b-button>

                <modal :name="'faq-'+index" title="Edit FAQ">
                  <div class="m-3 p-3">
                    <div class="form-group">
                      <label for="question">Question</label>
                      <input :id="'question'+index" :name="'faq'+index" :value=faq.question class="form-control"
                             type="text">
                    </div>
                    <div class="form-group">
                      <label for="answer">Answer</label>
                      <input :id="'answer'+ index" :name="'ans'+ index" :value=faq.answer class="form-control"
                             type="text">
                    </div>
                    <button @click="updateData(index)" class="btn btn-primary" data-dismiss="modal" type="button">
                      Update
                    </button>
                    <button @click="deleteData(index)" class="btn btn-primary m-3" data-dismiss="modal" type="button">
                      Delete
                    </button>
                  </div>
                </modal>
              </div>
              <modal name="modal-faq">
                <div class="m-3 p-3">
                  <div class="form-group">

                    <label for="question">Question</label>
                    <input class="form-control" id="question" type="text" v-model="new_question">

                  </div>

                  <div class="form-group">
                    <label for="answer">Answer</label>
                    <input class="form-control" id="answer" type="text" v-model="new_answer">
                  </div>

                  <button @click="addData" class="btn btn-primary" data-dismiss="modal" type="button">Submit</button>
                </div>
              </modal>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Duration (In minutes)</label>
            <div class="col-sm-9">
              <input class="form-control" type="number" v-model="duration">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Publish Status</label>
            <div class="col-sm-9">
              <div class="form-group">
                <div class="form-check checkbox">
                  <input class="form-check-input" type="checkbox" name="published_status" v-model="published_status">
                  <label class="form-check-label" >Published</label>
                </div>
              </div>
            </div>
          </div>
          <!-- <button type="submit"  >Submit</button> -->
        </form>  
        <modal name="modal-faq">
            <div class="m-3 p-3">
                <div class="form-group">
                    <label for="question">Question</label>
                    <input class="form-control" id="question" type="text" v-model="new_question">
                </div>
                <div class="form-group">
                    <label for="answer">Answer</label>
                    <input class="form-control" id="answer" type="text" v-model="new_answer">
                </div>
                <button @click="addData" class="btn btn-primary" data-dismiss="modal" type="button">Submit</button>
            </div>
        </modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'BasicInfo',
    data() {
        return {
            services: '',
            categories: '',
            subcategories: '',
            service_id: '0',
            category_id: '',
            subcategory_id: '',


            name: '',
            pricing_type: '',
            new_question: '',
            new_answer: '',
            duration: '',
            published_status: '',
            faqs: [],


        }
    },
    created() {
        this.fetchServices();
    },
    methods: {
        fetchServices() {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        const Base_URL = process.env.VUE_APP_BASE_URL;
        this.src_url = Base_URL+ '/images/lineitem/designs/';
        axios.get(`${ADMIN_URL}/services`)
            .then(response => {
                console.log('At created(), TestLineItemCreate ---->> ', response);
                this.services = response.data;
            })
            .catch(e => {
                //console.log("error occurs");
            });
        },
        handleSubmit(e) {
          //e.preventDefault();
          console.log('handle submit   tttttttttttttt ');
        },
        FAQmodal() {
          this.$modal.show('modal-faq');
        },
        getCategories() {

        },
        getSubcategories() {

        },
        onThumbnailChange() {

        },
        onBwebChange() {

        },
        onBtabChange() {

        },
        onBandChange() {

        },
        onBiosChange() {

        },
        addData() {

        },
        
    }
}
</script>

<style>

</style>
