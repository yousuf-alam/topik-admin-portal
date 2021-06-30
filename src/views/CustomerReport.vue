<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row class="p-2">
        <b-col>
          <table class="table table-bordered">
            <tr>
              <td></td>
              <td>Remarks</td>
              <td>Last 30 Days</td>
              <td>Last 60 Days</td>
              <td>Last 90 Days</td>
              <td>This Year</td>
              <td>Lifetime/Till Date</td>
            </tr>
            <tr>
              <td>No of Unique Customers</td>
              <td></td>
              <td v-for="c in report.unique_customer">{{c}}</td>
            </tr>
            <tr>
              <td>No of customers who ordered before</td>
              <td></td>
              <td v-for="c in report.noof_customer_order_before_days">{{c}}</td>
            </tr>
            <tr>
              <td>Total orders</td>
              <td></td>
              <td v-for="c in report.total_orders">{{c}}</td>
            </tr>
            <tr>
              <td>No of orders from unique customers</td>
              <td></td>
              <td v-for="c in report.orders_unique_customer">{{c}}</td>
            </tr>
            <tr>
              <td>No of customer churn</td>
              <td></td>
              <td v-for="c in report.churn_customer">{{c}}</td>
            </tr>
            <tr>
              <td>No of customers who placed 1+ orders</td>
              <td></td>
              <td v-for="c in report.noof_customer_one_plus_order">{{c}}</td>
            </tr>
            <tr>
              <td>No of customers who placed 2+ orders</td>
              <td></td>
              <td v-for="c in report.noof_customer_two_plus_order">{{c}}</td>
            </tr>
            <tr>
              <td>No of customers who placed 3+ orders</td>
              <td></td>
              <td v-for="c in report.noof_customer_three_plus_order">{{c}}</td>
            </tr>
            <tr>
              <td>No of customers who placed 4+ orders</td>
              <td></td>
              <td v-for="c in report.noof_customer_four_plus_order">{{c}}</td>
            </tr>
            <tr>
              <td>No of customers who placed 5+ orders</td>
              <td></td>
              <td v-for="c in report.noof_customer_five_plus_order">{{c}}</td>
            </tr>

            <!-- <tr>
               <td>Order Placed vs Active SP</td>
               <td>{{report.active_sp_ratio}}</td>
             </tr>-->
          </table>
        </b-col>

      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "DetailsReport",
  data() {
    return {
      report: {
        unique_customer: '',
        order_served: '',
        job_served: '',
        ticket_size: ''
      },
      exporting: false,

    }
  },
  created() {
    this.fetchReport()
  },
  methods: {
    fetchReport(){
      axios.get(`${ADMIN_URL}/customer-report`)
        .then(response => {
          this.report = response.data.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },
    exportReport(){
      this.exporting = true;
      axios({
        method: 'get',
        url: `${ADMIN_URL}/export-report`,
        responseType: 'blob'
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
  }
}
</script>

<style scoped>

</style>
