<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <b-card>
                    <h3 class="text-center">Complain Description</h3>
                    <p>
                        {{ showDescription(orderComplain.description) }}
                    </p>

                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="6">
                <b-card>

                        <h4 class="card-title">Complain Tags</h4>
                        <ul style="list-style: none;" v-for="comp_id in orderComplain.complain_id" :key="comp_id">
                            <li>
                                <p style="font-size: 16px">
                                    <span class="badge badge-warning" v-html="showThisComplain(comp_id)">
                                        <!-- {{showThisComplain(comp_id)}} -->
                                    </span>
                                </p>
                            </li>
                        </ul>
                  <b-form-checkbox class="font-weight-bold" v-show="orderComplain.status==='unresolved'" @change="resolveComplain">
                    Complain Resolved?
                  </b-form-checkbox>

                </b-card>
            </b-col>
            <b-col sm="6" md="6">
                <b-card>
                    <h4 class="card-title">Complain Details</h4>

                    <ul style="list-style: none;">

                        <!-- <li><h6><span class="font-weight-bold">Status  :</span> <span> abcd </span></h6></li>  -->

                        <li>
                            <h6>
                                <span class="font-weight-bold">  Order ID : </span>
                                <span>
                                   <router-link :to="{ name: 'OrderShow', params: { id: orderComplain.order_id }}">
                                        <span class="p-2" data-toggle="tooltip" title="See Order Details"    >
                                            {{orderComplain.order_id}}
                                        </span>
                                    </router-link>
                                </span>
                            </h6>
                        </li>
                        <li>
                            <h6>
                                <span class="font-weight-bold">  SP Name : </span>
                                <span> {{spName}} </span>
                            </h6>
                        </li>
                        <li><h6>
                                <span class="font-weight-bold">  SP Contact : </span>
                                <span> {{spContact}}</span>
                            </h6>
                        </li>
                      <li><h6>
                        <span class="font-weight-bold">  Status : </span>
                        <span class="badge badge-danger" v-if="orderComplain.status==='unresolved'">{{ orderComplain.status }}</span>
                        <span class="badge badge-success" v-else>{{ orderComplain.status }}</span>
                      </h6>
                      </li>

                    </ul>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const PARTNER_URL = process.env.VUE_APP_PARTNER_URL;
export default {
    name: "OrderShow",
    data() {
        return {
            complains: [],
            orderComplain: '',
            partner: '',
            spName: '',
            spContact: ''

        }
    },
    computed: {
        showDescription() {
            return (description) => {
                if (description === null || description == '') {
                    return 'No Description Found.';
                }
                return description;
            }
        },
        showThisComplain()  {
            return (comp_id) => {
                    for(let i = 0; i < this.complains.length; i++) {
                        if ( this.complains[i].id === parseInt(comp_id)) {
                            const words = this.complains[i].name.split(" ");
                            // words.unshift("<span>")
                            // words.push("</span>")
                            for (let k = 0; k<  words.length; k++ ) {
                                if (k > 4) {
                                    words.splice( k, 0, "<br>");
                                    break;
                                }
                            }
                            return words.join(" ");
                        }
                    }
            }
        }
    },
    created() {
        this.fetchComplians();
        this.fetchSingleOrderComplain();
    },
    methods: {
        fetchComplians() {
            // console.log('fetch ---- complians ---- ', ADMIN_URL);
            axios.get(`${ADMIN_URL}/complains`)
                .then(response => {
                    // console.log('fetchComplains === === ', response);
                    this.complains = response.data;
                }).catch(error => {
                    // console.log('Error response :: ', error.response);
                })
        },
        fetchSingleOrderComplain() {
            const order_complain_PK = this.$route.params.id;
            axios.get(`${ADMIN_URL}/order-complain/${order_complain_PK}`)
                .then(response => {
                    this.orderComplain = response.data;
                    this.orderComplain.complain_id = JSON.parse(response.data.complain_id);
                    // console.log('fetchSingleOrderComplain, Responseeeeeeeeeee ', response);
                    this.fetchOrder(this.orderComplain.order_id);
                }).catch(error => {
                    // console.log('fetchSingleOrderComplain, error === ', error.response);
                })
        },
        fetchOrder(order_id) {
            // console.log('order_id === ', order_id);
            axios.get(`${ADMIN_URL}/orders/show`, {
                params: {
                    order_id: order_id
                }
            }).then(response => {
                this.fetchPartner(response.data.partner_id);
            }).catch(e => {

            });
        },
        fetchPartner(partner_id) {
            // console.log('partner_id ++++++++++++++++ ', partner_id);
            axios.post(`${PARTNER_URL}/show-profile`, {id: partner_id })
                .then(response => {
                this.partner = response.data;
                // console.log('THIS.PARTNER === ', response)
                this.spName = response.data.name;
                this.spContact = response.data.user.phone;
            }).catch(e => {
                console.log("fetchPartner :: error occurs: ", e.response);
            });
        },
        resolveComplain() {
            axios.post(`${ADMIN_URL}/order-complain/resolve`, {

                    id: this.orderComplain.id
            }).then(response => {
                this.$swal('Success', response.data.message, 'success')
                this.fetchSingleOrderComplain();
            }).catch(e => {
                this.$swal('Error', e, 'error')

            });
        }
    }
}
</script>

<style scoped>

</style>
