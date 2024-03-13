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
                        <ul style="list-style: none;" >
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Complain Channel : </span>
                              <span> {{complain.channel}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Complain Type: </span>
                              <span> {{complain.type}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Complain Date : </span>
                              <span> {{complain.complain_date}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Assign  to : </span>
                              <span> {{complain.assigned_to}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Assign  by : </span>
                              <span> {{complain.assigned_by}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Priority: </span>
                              <span> {{complain.priority}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Deduction: </span>
                              <span> {{complain.deduction}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Solve Type: </span>
                              <span> {{complain.solve_type}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Solve Description: </span>
                              <span> {{complain.solve_description}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Complementary Order Date: </span>
                              <span> {{complain.complementary_order_date}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Complementary Order Id: </span>
                              <span> {{complain.complementary_order_id}} </span>
                            </h6>
                          </li>
                          <li>
                            <h6>
                              <span class="font-weight-bold">  Complementary Partner Id: </span>
                              <span> {{complain.complementary_partner_name}} </span>
                            </h6>
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
                                   <router-link :to="{ name: 'OrderShow', params: { id: complain.order_id }}">
                                        <span class="p-2" data-toggle="tooltip" title="See Order Details"    >
                                            {{complain.order_id}}
                                        </span>
                                    </router-link>
                                </span>
                            </h6>
                        </li>
                        <li>
                            <h6>
                                <span class="font-weight-bold">  SP Name : </span>
                                <span> {{complain.partner_name}} </span>
                            </h6>
                        </li>
                        <li><h6>
                                <span class="font-weight-bold">  Customer Name : </span>
                                <span> {{complain.customer_name}}</span>
                            </h6>
                        </li>
                      <li><h6>
                        <span class="font-weight-bold">  Shipping Phone : </span>
                        <span> {{complain.shipping_phone}}</span>
                      </h6>
                      </li>
                      <li><h6>
                        <span class="font-weight-bold">  Shipping Address : </span>
                        <span> {{this.complain.shipping_address.address_details}}</span>
                      </h6>
                      </li>
                      <li><h6>
                        <span class="font-weight-bold">  Complain Details : </span>
                        <span> {{complain.description}}</span>
                      </h6>
                      </li>
                      <li><h6>
                        <span class="font-weight-bold">  Status : </span>
                        <span class="badge badge-danger">{{ complain.status }}</span>

                      </h6>
                      </li>

                      <li v-if="complain.image"><h6>
                        <span class="font-weight-bold">  image : </span>
                        <img :src="complain.image" alt="" width="250" height="250">

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
            complain: [],
            orderComplain: '',
            partner: '',
            spName: '',
            spContact: '',
             shipping_address:''

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

        this.fetchSingleComplain();
    },
    methods: {

        fetchSingleComplain() {
          this.complain_id = window.location.pathname.split("/").pop();
          axios.get(`${ADMIN_URL}/user-complain-by-id`, {
            params: {
              id: this.complain_id
            }
          }).then(response => {

            this.complain = response.data.data;
            this.shipping_address = this.complain.shipping_address;
            console.log('this.complain',this.shipping_address.address_details);


          }).catch(e => {
            console.log("error occurs",e);
          });
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
