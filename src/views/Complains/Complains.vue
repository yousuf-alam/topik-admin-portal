<template>
    <div class="animated fadeIn">

    <div v-if="data_loaded_successfully">
        <div class="cardheading">
          <h4><i class="fa fa-thumbs-down"></i><span class="ml-1">Complains</span></h4>
          <div class="">
            <h1 class="my-auto tableName">

            </h1>
          </div>

            <div class="d-flex justify-content-between gap-5">
              <select v-model="key" class="form-control mr-2" @change="handleOptionChange" style="width: 130px">
                <option value="this_month">This month</option>
                <option value="last_month">Last month</option>
                <option value="last_three_month">Last three month</option>
                <option value="last_six_month">Last six month</option>
                <option value="this_year">This year</option>
                <option value="last_year">Previous year</option>

              </select>
            <router-link :to="{ name: 'ComplainCreate'}">
              <button class="btn btn-success">Report New Complain</button>
            </router-link>
          </div>
        </div>
        <b-row>
            <b-col>
                <b-card>
                <v-client-table :data="tableData" :columns="columns" :options="options">
                    <template slot="order_id" slot-scope="props">
                        <router-link :to="{ name: 'OrderShow', params: { id: props.row.order_id }}">
                            <span class="p-2" data-toggle="tooltip" title="See Order Details" :href="props.row.show">
                                {{props.row.order_id}}
                            </span>
                        </router-link>
                    </template>
                    <template slot="description" slot-scope="props">
                        {{ cutDescriptionToShort(props.row.description) }}
                    </template>
                  <template slot="status" slot-scope="props">
                    <span class="badge badge-danger" v-if="props.row.status==='unresolved'">{{ props.row.status }}</span>
                    <span class="badge badge-success" v-else>{{ props.row.status }}</span>
                  </template>
                    <template slot="action" slot-scope="props">
                        <div>
                            <router-link :to="{ name: 'ComplainShow', params: { id: props.row.id }}">
                                <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                    <i class="fa fa-search"></i>
                                </span>
                            </router-link>
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
    name: 'Complains',
    data() {
        return {
            data_loaded_successfully: false,
            key:'last_year',
            columns: ['order_id', 'partner', 'description','status','created_at' ,'action'],
            tableData: [],
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
        this.getAllComplains();
    },
    methods: {
      handleOptionChange() {
        console.log("key",this.key)
        this.getAllComplains();
      },
        getAllComplains() {
            axios.post(`${ADMIN_URL}/order-complains`,{key:this.key})
                .then(response => {
                    this.tableData = response.data.data;
                    this.data_loaded_successfully = true;
                }).catch(error => {
                    // console.log('Errorrrrrrrrrrrrrrr ', error.response);
                })
        }
    },
    computed: {
        cutDescriptionToShort() {
            return (description) => {
                if (description === null) {
                    return 'No Description Found.';
                }
                return description.substring(0, 50);
            }
        }
    }
}
</script>
