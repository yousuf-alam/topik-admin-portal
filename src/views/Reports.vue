<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row class="p-2">
        <b-col>
          <router-link :to="{ name: 'DetailsReport'}">
            <button class="btn btn-romoni-secondary">See Details Report</button>
          </router-link>
        </b-col>

      </b-row>
      <b-row>
        <b-col lg="4" sm="12" v-for="r in reports">
          <b-btn variant="outline-dark" class="w-75 h-75 m-2" @click="getDateModal(r)" >
            {{r}}
          </b-btn>
        </b-col>
      </b-row>
      <modal name="date-picker-modal" height="600px" :adaptive="true">
        <div class="m-3 p-3">
          <b-row class="p-2 border-bottom">
            <h4>Export Report</h4><br><br>
          </b-row>
          <b-row class="p-5 h-100">
            <b-col>
              <VueCtkDateTimePicker
                :overlay=true
                :range=true
                :no-label=true
                label="Select"
                id="RangeDatePicker"
                format="YYYY-MM-DD"
                formatted="ll"
                color="#7D4E77"
                v-model="date_range"
              >
              </VueCtkDateTimePicker>
              <h6 class="my-3">Report : <b>{{selected_report}}</b></h6>
              <b-form-group label="Select Promo" v-show="selected_report==='Order Report of a Promo'">
                <multiselect
                  v-model="coupon"
                  :options="promos"
                  placeholder="Select one"
                  label="code"
                  track-by="id"
                >
                </multiselect>
              </b-form-group>
              <b-form-group label="Select Promo" v-show="selected_report==='Order Report of a Subcategory'">
                <multiselect
                  v-model="category"
                  :options="categories"
                  placeholder="Select one"
                  label="name"
                  track-by="id"
                  @input="getSubcategories"
                >
                </multiselect>
              </b-form-group>
              <b-form-group label="Select Promo" v-show="selected_report==='Order Report of a Subcategory'">
                <multiselect
                  v-model="subcategory"
                  :options="subcategories"
                  placeholder="Select one"
                  label="name"
                  track-by="id"
                >
                </multiselect>
              </b-form-group>
              <b-btn class="center-div btn-block btn-romoni-secondary" @click="exportReport">Export</b-btn>
              <b-btn class="center-div btn-block btn-danger mt-1" @click="closeModal">Cancel</b-btn>
              <b-spinner variant="danger" label="Spinning" v-if="exporting"></b-spinner>
            </b-col>
          </b-row>
        </div>
      </modal>
    </b-card>

    </div>
</template>

<script>
  import Vue from 'vue';
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  import axios from "axios";
  import moment from "moment";
  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: 'Reports',
    data() {
      return {
        date_range: '',
        selected_report: '',
        exporting: false,
        coupon: {
          id: ''
        },
        subcategory: {
          id: ''
        },
        category: {
          id: ''
        },
        categories: [],
        subcategories: [],
        promos: [],
        reports: [
          'All users list',
          'All SP list',
          'In-House SP Orders',
          'Area with subcategories',
          'Order Report of a Subcategory',
          'Order Report of a Promo',
          'Order frequencies per SP',
          'Order frequencies per line-item',
          'SP list with categories',
          'Retaining Users list',
          'Category frequencies per SP',
          'SP with earning,jobs done & recharges',
          'Reviews & Ratings'

        ]
      }
    },
    created() {
      this.getCoupons();
      this.getCategories();
    },
    methods: {
      getDateModal(report){
        this.$modal.show('date-picker-modal');
        this.selected_report = report
      },
      closeModal(){
        this.$modal.hide('date-picker-modal');
      },
      getCoupons(){
        axios.get(`${ADMIN_URL}/all-promos`, {
          params : {
            type : 'all'
          }
        })
          .then(response =>{
            this.promos = response.data;
          })
          .catch(e=>{
            //console.log("error occurs");
          });
      },
      getCategories() {
        axios.get(`${ADMIN_URL}/all-categories`)
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });
      },
      getSubcategories() {
        axios.post(`${ADMIN_URL}/subcategories`, {
          category_id: this.category.id
        })
          .then(response => {
            this.subcategories = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });

      },
      exportReport(){
        this.exporting = true;
        axios({
          method: 'post',
          url: `${ADMIN_URL}/export-report`,
          responseType: 'blob',
          data: {
            date_range: this.date_range,
            report: this.selected_report,
            coupon_id: this.coupon.id,
            subcategory_id: this.subcategory.id
          }
        })
          .then(response => {
            console.log(response.data);
            this.exporting = false;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.selected_report+'_' + moment(this.date_range.start).format('YYYY-MM-DD') + '~' + moment(this.date_range.end).format('YYYY-MM-DD') +'.xlsx');
            document.body.appendChild(link);
            link.click();
            this.$swal('Report Exported Successfully', '', 'success');
            this.closeModal();
          })
          .catch(e => {
            this.exporting = false;
            console.log("error occurs",e);
            this.$swal('Error', 'Something Went Wrong', 'error');
          });


      }
    },

  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
  }
  .test-modal .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
  }
</style>
