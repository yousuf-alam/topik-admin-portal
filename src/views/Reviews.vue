<template>
  <div class="animated fadeIn">

    <div v-if="data_loaded_successfully">
      <div class="cardheading">
        <h4><i class="fa fa-thumbs-up"></i><span class="ml-1">Reviews</span></h4>
        <div class="d-flex justify-content-between gap-5">

          <div @click="exportReviews" class="form-control" style="background: #4dbd74;color: white;  cursor: pointer; ">
            Export Review</div>
          <select v-model="key" class="form-control mr-2 ml-2" @change="handleOptionChange"
            style="width: 180px;background: #4dbd74;color: white">
            <option value="this_month">This month</option>
            <option value="last_month">Last month</option>
            <option value="last_three_month">Last three month</option>
            <option value="last_six_month">Last six month</option>
            <option value="this_year">This year</option>
            <option value="last_year">Previous year</option>

          </select>


        </div>
      </div>
      <b-row>
        <b-col>
          <b-card>
            <v-client-table :data="tableData" :columns="columns" :options="options">
              <template slot="order_id" slot-scope="props">
                <router-link :to="{ name: 'OrderEdit', params: { id: props.row.order_id }}">
                  <span class="p-2" data-toggle="tooltip" title="See Order Details" :href="props.row.edit">
                    {{props.row.order_id}}
                  </span>
                </router-link>
              </template>
              <template slot="action" slot-scope="props">
                <div>
                  <router-link :to="{ name: 'OrderEdit', params: { id: props.row.order_id }}">
                    <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.edit">
                      <i class="fa fa-edit"></i>
                    </span>
                  </router-link>

                  <button v-if="props.row.rating < 4.0" @click="createComplaint(props.row.id)" class="btn btn-secondary btn-sm m-1" data-toggle="tooltip" title="Create Complaint">
                    <i class="fa fa-plus"></i>
                  </button>

                </div>
              </template>
            </v-client-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div v-else class="customcard">
      Loading...
    </div>
  </div>
</template>


<script>
    import axios from 'axios';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
        name: 'Reviews',
        data() {
            return {
                data_loaded_successfully: false,
                columns: ['order_id', 'shipping_phone','partner', 'rating','comment','created_at' ,'action'],
                tableData: [],
                key:'this_month',
                options: {
                    pagination: {nav: 'fixed'},
                    filterByColumn: true,
                    dateColumns: ['age'],
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},
                }
            }
        },
        created() {
            this.getReviews();
        },
        methods: {
          handleOptionChange() {
            this.getReviews();
          },
            getReviews() {
                axios.post(`${ADMIN_URL}/reviews`,{key:this.key})
                    .then(response => {
                        this.tableData = response.data.data;
                        this.data_loaded_successfully = true;
                    }).catch(error => {
                    // console.log('Errorrrrrrrrrrrrrrr ', error.response);
                })
            },
          closeModal() {
            this.$modal.hide("modal-order_type");
            window.location.reload();
          },
          exportReviews() {
            this.exporting = true;
            axios({
              method: "post",
              url: `${ADMIN_URL}/export-reviews`,
              responseType: "blob",
              data: {
                key: this.key,


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
                  'User_Review' +
                  "_" +
                  "~" +
                  ".xlsx"
                );
                document.body.appendChild(link);
                link.click();
                this.$swal("Reviews Exported Successfully", "", "success");
                this.closeModal();
              })
              .catch(e => {
                this.exporting = false;
                console.log("error occurs", e);
                this.$swal("Error", "Something Went Wrong", "error");
              });
          },
          createComplaint(reviewId) {
            axios.post(`${ADMIN_URL}/create-review-complaint`, { review_id: reviewId })
              .then(response => {

                if (response.data.success === true) {

                     console.log(response.data.data);
                        this.$swal('Success', response.data.message, 'success');
                      }
                      else {
                        this.$swal('Error', response.data.message, 'error');
                      }

                this.$router.push({
                  name: 'Complains'
                });
              });


          },
        }

    }
</script>
