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
          <div v-if="r === 'SP Report' && getUserPermission('daily reports')">
            <!-- <b-btn
              variant="outline-dark"
              class="w-75 h-75 m-2"
              @click="getDateModal(r)"
            >
              {{ r }}
            </b-btn> -->
          </div>
          <div v-else>
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
            <h4>Export Report</h4>
            <br /><br />
          </b-row>
          <b-row class="p-5 h-100">
            <b-col>
              <VueCtkDateTimePicker
                :overlay="true"
                :range="true"
                :no-label="true"
                label="Select"
                id="RangeDatePicker"
                format="YYYY-MM-DD"
                formatted="ll"
                color="#7D4E77"
                v-model="date_range"
              >
              </VueCtkDateTimePicker>
              <h6 class="my-3">
                Report : <b>{{ selected_report }}</b>
              </h6>
              <b-form-group
                label="Select SP type"
                v-show="selected_report === 'SP Report'"
              >
                <select class="form-control" v-model="sp_type">
                  <option value="1">Freelancer</option>
                  <option value="2">InHouse</option>
                  <option value="3">All</option>
                </select>
              </b-form-group>
              <b-btn
                class="center-div btn-block btn-primary"
                @click="showReport"
                >Show</b-btn
              >
              <b-btn
                class="center-div btn-block btn-romoni-secondary"
                @click="exportReport"
                >Export</b-btn
              >
              <!--              <b-btn class="center-div btn-block btn-danger mt-1" @click="closeModal">Cancel</b-btn>-->
              <b-spinner
                variant="danger"
                label="Spinning"
                v-if="exporting"
              ></b-spinner>
            </b-col>
          </b-row>

          <div class="card" v-if="show">
            <v-client-table
              :data="dailyreport"
              :columns="columns"
              :options="options"
            >
            </v-client-table>
          </div>
          <div class="card" v-if="spshow">
            <v-client-table
              :data="spreport"
              :columns="spcolumns"
              :options="options"
            >
            </v-client-table>
          </div>
          <div class="card" v-if="inhousespshow">
            <v-client-table
              :data="inhousespreport"
              :columns="inhousespcolumns"
              :options="options"
            >
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
  name: "Reports",
  data() {
    return {
      date_range: {
        start: null,
        end: null
      },
      date_type: "scheduled_date",
      selected_report: "",
      exporting: false,
      coupon: {
        id: ""
      },
      subcategory: {
        id: ""
      },
      category: {
        id: ""
      },
      categories: [],
      subcategories: [],
      promos: [],
      sp_type: "3",
      dailyreport: [],
      spreport: [],
      inhousespreport: [],
      reports: ["Daily Report", "SP Report", "In-house SP Report"],
      show: false,
      spshow: false,
      inhousespshow: false,
      columns: [
        "Time",
        "Total No Of Orders",
        "No of Orders from apps/website",
        "No of Orders from existing clients",
        "No of Orders from Outbound Calls",
        "No of Orders from Social Media",
        "Orders Served by InHousedSP",
        "Orders Served by Freelancers",
        "Revenue from Outbound Calls",
        "Total Revenue"
      ],
      spcolumns: [
        "SP Name",
        "SP Type",
        "Job Created",
        "Job Completed",
        "Job Served",
        "Total Service Value",
        "SP Commission",
        "Romoni Revenue"
      ],
      inhousespcolumns: [
        "Borsha's Salon and Spa",
        "Selina's Beauty World",
        "Jubly's Beauty Parlor",
        "Lolona Beauty parlor",
        "Mishu Rose Salon",
        "Shumi Beauty Bar",
        "Brishtys Makeover And Salon",
        "Labonno beauty world"
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
    this.getCoupons();
    this.getCategories();
  },
  methods: {
    getDateModal(report) {
      this.$modal.show("date-picker-modal");
      this.selected_report = report;
    },
    closeModal() {
      this.$modal.hide("date-picker-modal");
    },
    getCoupons() {
      axios
        .get(`${ADMIN_URL}/all-promos`, {
          params: {
            type: "all"
          }
        })
        .then(response => {
          this.promos = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },
    getCategories() {
      axios
        .get(`${ADMIN_URL}/all-categories`)
        .then(response => {
          this.categories = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },
    getSubcategories() {
      axios
        .post(`${ADMIN_URL}/subcategories`, {
          category_id: this.category.id
        })
        .then(response => {
          this.subcategories = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },
    showReport() {
      this.dailyreport = [];
      // this.skip = 0;
      this.loadingData();
    },
    loadingData() {
      axios({
        method: "post",
        url: `${ADMIN_URL}/show-report`,
        data: {
          date_range: this.date_range,
          sp_type: this.sp_type,
          report: this.selected_report
        }
      })
        .then(response => {
          this.loading = false;
          if (this.selected_report === "Daily Report") {
            this.show = true;
            this.dailyreport = response.data;
          } else if (this.selected_report === "In-house SP Report") {
            this.inhousespshow = true;
            this.inhousespreport = response.data;
          } else {
            this.spshow = true;
            this.spreport = response.data;
          }
          console.log("response", response.data);
        })
        .catch(e => {
          console.log("error occurs", e);
        });
    },
    exportReport() {
      this.exporting = true;
      axios({
        method: "post",
        url: `${ADMIN_URL}/export-report`,
        responseType: "blob",
        data: {
          date_range: this.date_range,
          report: this.selected_report,
          coupon_id: this.coupon.id,
          subcategory_id: this.subcategory.id,
          sp_type: this.sp_type,
          date_type: this.date_type
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
            this.selected_report +
              "_" +
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
