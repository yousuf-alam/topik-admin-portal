<template>
  <div class="animated fadeIn">
      <div class="cardheading">
        <h4><i class="fa fa-reddit-alien"></i><span class="ml-1">Chat Bot Offer Cards</span></h4>
        <div class="">
          <h1 class="my-auto tableName">

          </h1>
        </div>
        <div class="">
          <router-link :to="{ path: 'bot-offers/create'}">
            <button class="btn btn-success">Create New Card</button>
          </router-link>
        </div>
      </div>
      <b-row>
        <b-col>
          <b-card>
            <v-client-table :data="tableData" :columns="columns" :options="options">
              <template slot="action" slot-scope="props">
                <div>
                  <router-link :to="{ path:'bot-offers/edit/'+props.row.id }">
                                <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.edit">
                                    <i class="fa fa-pencil"></i>
                                </span>
                  </router-link>
                  <router-link to="" >
                    <span @click="deleteOffer(props.row.id)" class="btn btn-danger btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
                  </router-link>
                </div>
              </template>
            </v-client-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
</template>


<script>
    import axios from 'axios';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
        name: 'BotOffers',
        data() {
            return {
                columns: ['id','type', 'title','subtitle' ,'action'],
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
            this.fetchOffers();
        },
        methods: {
            fetchOffers() {
                axios.get(`${ADMIN_URL}/bot/offers`)
                    .then(res => {
                        this.tableData = res.data;
                    }).catch(error => {
                    // console.log('Errorrrrrrrrrrrrrrr ', error.response);
                })
            },
            deleteOffer(id)
            {
                if (confirm('Are you sure?') ) {
                    axios.post(`${ADMIN_URL}/bot/delete-offer`,
                        {
                            id : id
                        })
                        .then(response => {
                            this.$swal('Offer Card Deleted', response.data.message, 'success');
                            window.location.reload();
                        }).catch(error => {
                            console.log(error);

                    })

                } else {
                    console.log('Noooooo')
                }
            }
        }
    }
</script>
