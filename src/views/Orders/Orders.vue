<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="10"></b-col>
            <b-col sm="2" class="mb-3">
                <button @click="modalType" class="btn btn-success">Create New Order</button>
            </b-col>
          <modal name="modal-order_type" height="auto" :adaptive="true">
            <div class="m-3 p-3">
              <b-row class="p-2">
                <h4>Choose Order Type</h4><br><br>
              </b-row>
              <b-row class="p-2">
                <div class="center-div">
                  <button @click="createOrder('Beauty On-Demand')" class="btn btn-romoni-secondary m-2">Beauty On-Demand</button>
                  <button @click="createOrder('Beauty Appointment')" class="btn btn-primary m-2">Beauty Appointment</button>
                  <button @click="createOrder('Tailor On-Demand')" class="btn btn-romoni-secondary m-2">Tailor On-Demand</button>
                </div>

              </b-row>

            </div>
          </modal>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <v-client-table :data="tableData" :columns="columns" :options="options">
                        <template slot="action" slot-scope="props">
                            <div>
                                <router-link :to="{ name: 'OrderShow', params: { id: 1 }}"><span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                    <i class="fa fa-search"></i></span></router-link>
                                <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit">
                                    <i class="fa fa-edit"></i></span>
                                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete">
                                    <i class="fa fa-trash"></i></span>
                            </div>
                        </template>
                    </v-client-table>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>


<script>
    export default {
      name: 'Orders',
        data() {
            return {
                columns: ['id', 'service_type', 'booking' ,'platform', 'customer', 'partner', 'bill', 'action'],
                tableData: [
                    {id: 1, service_type: 'beauty', booking: 'on-demand',platform: 'admin_portal', customer: "John", partner: "Sansa",bill: "1200", created_at: "2018-12-18", action: {details: 'yes', delete: 'no'}},
                    {id: 2, service_type: 'tailor', booking: 'on-demand',platform: 'admin_portal',customer: "Jane", partner: "Sansa",bill: "1200",created_at: "2018-10-31"},
                    {id: 3, service_type: 'beauty', booking: 'appointment',platform: 'admin_portal', customer: "Susan",partner: "Sansa",bill: "1200",created_at: "2018-10-31"},
                    {id: 4, service_type: 'beauty', booking: 'on-demand',platform: 'admin_portal',customer: "Chris",partner: "Sansa",bill: "1200", created_at: "2018-10-31"},
                    {id: 5, service_type: 'tailor', booking: 'on-demand',platform: 'admin_portal',customer: "Dan",  partner: "Sansa",bill: "1200",created_at: "2018-12-30"},
                ],
                options: {
                    pagination: {nav: 'fixed'},
                    filterByColumn: true,
                    dateColumns: ['age'],
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

                }

            }
        },
        methods: {
          modalType(){
            this.$modal.show('modal-order_type');
          },
          createOrder(type)
          {
            if(type!=='Beauty Appointment')
            {
              this.$router.push({ name: 'OrderCreate', params: { type } })
            }
            else
            {
              this.$router.push({ name: 'AppointmentCreate' , params: {type} })
            }
           console.log(type);

          }
        },
    }
</script>
