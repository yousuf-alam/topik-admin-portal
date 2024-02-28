<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row class="p-2">
        <b-col lg="4" sm="12">
          <router-link :to="{ name: 'CustomerReport' }">
            <button class="btn btn-romoni-secondary">
              See Customer Report
            </button>
          </router-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" sm="12" v-for="r in reports">

          <div>
            <b-btn
              variant="outline-dark"
              class="w-75 h-75 m-2"
              @click="getDateModal(r)"
            >
              {{ r }}
            </b-btn>
          </div>
        </b-col>
      </b-row>
      <C-modal name="date-picker-modal" height="600px" :adaptive="true">
        <div class="m-3 p-3">
          <b-row class="p-2 border-bottom">
            <h4>Line Item Revenue Reports</h4>
          </b-row>

          <b-row class="p-5 h-100">
            <b-col>
              <VueCtkDateTimePicker :overlay="true" :range="true" :no-label="true" label="Select" id="RangeDatePicker"
                                    format="YYYY-MM-DD" formatted="ll" color="#7D4E77" v-model="date_range">
              </VueCtkDateTimePicker>
              <br>
              <h6 class="my-3">
                Report : <b>{{ dateType }}</b>
              </h6>


              <b-btn class="center-div btn-block btn-primary" @click="showReport">Show</b-btn>
              <b-btn class="center-div btn-block btn-romoni-secondary" @click="exportReport">Export</b-btn>
              <b-spinner variant="danger" label="Spinning" v-if="exporting"></b-spinner>
            </b-col>
          </b-row>


          <div class="card" v-if="reportShow">
            <v-client-table :data="lineItemData" :columns="lineItemColumn" :options="options">

              <template slot="Actions" slot-scope="{ row }">
                <div>
                  <router-link
                    :to="{ name: 'Area Wise Report Details', params: { from: date_range.start, to: date_range.end, areaName: row.AreaName } }">
                    <button class="btn btn-primary">View Details</button>
                  </router-link>

                </div>
              </template>

            </v-client-table>
          </div>

        </div>
      </C-modal>
    </b-card>
  </div>
</template>


<script>
import Vue from "vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import axios from "axios";
import moment from "moment";
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "LineItemRevenueReport",
  data() {
    return {
      date_range: {
        startDate: null,
        endDate: null
      },
      reports: ["Created", "Scheduled"],
      dateType:'',
      exporting: false,
      reportShow: false,
      lineItemData: [],



      lineItemColumn: [
        "date",
        "lineitem_id",
        "lineitem_name",
        "subcategory_id",
        "name",
        "line_item_count",
        "total_price"

      ],

      options: {
        pagination: { nav: "fixed" },
        filterByColumn: true,
        //dateColumns: ['created_at'],
        toMomentFormat: "YYYY-MM-DD",
        sortIcon: {
          base: "fa fa-sort",
          up: "fa fa-sort-up",
          down: "fa fa-sort-down",
          is: "fa fa-sort"
        }
      }
    };
  },
  created() {

  },
  methods: {
    getDateModal(report) {
      this.$modal.show("date-picker-modal");
      this.dateType = report.toLowerCase();
    },
    closeModal() {
      this.$modal.hide("date-picker-modal");
    },




    showReport() {
      console.log(this.date_range.start)

      if (!this.date_range.start || !this.date_range.end) {
        this.$swal("Error", "Please select a date range.", "error");
        return;
      }
      axios
        .post(`${ADMIN_URL}/line-item-sub-category-revenue`, {
          startDate: this.date_range.start,
          endDate: this.date_range.end,
          dateType:this.dateType
        })
        .then((response) => {
          this.reportShow = true;
          this.lineItemData = response.data.data;

        })


        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    },


    exportReport() {
      this.exporting = true;
      if (!this.date_range.start || !this.date_range.end) {
        this.$swal("Error", "Please select a date range.", "error");
        this.exporting = false;
        return;
      }
      axios({
        method: "post",
        url: `${ADMIN_URL}/export-line-item-revenue`,
        responseType: "blob",
        data: {
          startDate: this.date_range.start,
          endDate: this.date_range.end,
          dateType:this.dateType

        }
      })
        .then(response => {
          console.log(response.data);
          this.exporting = false;
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            moment(this.date_range.start).format("YYYY-MM-DD") +
            "~" +
            moment(this.date_range.end).format("YYYY-MM-DD") +
            ".xlsx"
          );
          document.body.appendChild(link);
          link.click();
          this.$swal("Report Exported Successfully", "", "success");
          this.closeModal();
        })
        .catch(e => {
          this.exporting = false;
          console.log("error occurs", e);
          this.$swal("Error", "Something Went Wrong", "error");
        });
    }
  }
};
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
