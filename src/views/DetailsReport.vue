<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row class="p-2">
        <b-col>
          <table class="table table-bordered">
            <tr>
              <td></td>
              <td>Lifetime</td>
              <td>Last 30 Days</td>
              <td>Last 60 Days</td>
              <td>Last 90 Days</td>
              <td>Last 120 Days</td>
            </tr>
            <tr>
              <td>Unique Customers</td>
              <td v-for="c in report.unique_customer">{{c}}</td>
            </tr>
            <tr>
              <td>Orders Served</td>
              <td v-for="c in report.order_served">{{c}}</td>
            </tr>
            <tr>
              <td>Jobs Served</td>
              <td v-for="c in report.job_served">{{c}}</td>
            </tr>
            <tr>
              <td>Average Ticket Size</td>
              <td v-for="c in report.ticket_size">{{c}}</td>
            </tr>
            <tr>
              <td>Retaining Customers</td>
              <td v-for="c in report.retaining_customer">{{c}}</td>
            </tr>
            <tr>
              <td>Churn Customers</td>
              <td v-for="c in report.churn_customer">{{c}}</td>
            </tr>
            <tr>
              <td>Total SP</td>
              <td>{{report.total_sp}}</td>
            </tr>
            <tr>
              <td>Active SP</td>
              <td>{{report.active_sp}}</td>
            </tr>
            <tr>
              <td>Total Resource</td>
              <td>{{report.active_sp}}</td>
            </tr>
            <tr>
              <td>Active Resource</td>
              <td>{{report.active_resource}}</td>
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
          axios.get(`${ADMIN_URL}/details-report`)
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
