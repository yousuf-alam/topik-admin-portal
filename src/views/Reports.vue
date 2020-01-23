<template>
  <div class="animated fadeIn">
    <b-card>
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

                <!-- <button class="btn btn-secondary">Select</button> -->
              </VueCtkDateTimePicker>
              <h6 class="my-3">Report : <b>{{selected_report}}</b></h6>
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
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: 'Reports',
    data() {
      return {
        date_range: '',
        selected_report: '',
        exporting: false,
        reports: [
          'All users list',
          'All SP list',
          'Area with subcategories',
          'Offer/Package Ordered',
          'Order frequencies per SP',
          'Order frequencies per line-item',
          'SP list with categories',
          'Retaining Users list',
          'Category frequencies per SP',
          'Top 50 Earning SP',
          'SP cash-ins and cash-outs',
          'Pivot table of sales per month',
          'All ratings',
          'Orders Report of a Promo']
      }
    },
    methods: {
      getDateModal(report){
        this.$modal.show('date-picker-modal');
        this.selected_report = report
      },
      closeModal(){
        this.$modal.hide('date-picker-modal');
      },
      exportReport(){
        this.exporting = true;
        axios({
          method: 'post',
          url: `${Admin_URL}/export-report`,
          responseType: 'blob',
          data: {
            date_range: this.date_range,
            report: this.selected_report
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
            console.log("error occurs",e);
            this.$swal('Error', 'Something Went Wrong', 'error');
          });


      }
    },
    computed: {

    }
  }
</script>
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
