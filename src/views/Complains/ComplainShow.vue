<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <b-card>
                    <h3 class="text-center">Complain Title</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non nisl a nisi tincidunt
                        consequat. Fusce fringilla tellus eu consequat pulvinar. Aenean arcu ligula, placerat sit amet
                        erat et, porta tristique augue. Sed nec pulvinar quam, nec elementum ligula. Sed sollicitudin
                        nulla a orci euismod pretium. Maecenas sit amet sodales risus. Maecenas feugiat ut justo eget
                        tempor. Cras a ante volutpat, luctus felis eget, vulputate elit. Sed placerat finibus aliquam.
                        Praesent sodales sem risus, eget lacinia est auctor eget. Proin a mauris sed massa rhoncus
                        pharetra ac non neque. Nulla vitae mi condimentum, molestie libero vel, elementum leo. Donec at
                        lectus eget magna condimentum varius at vitae lectus. Donec id volutpat sem.</p>

                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="6">
                <b-card>
                    <h4 class="card-title">Complain Details</h4>

                    <ul style="list-style: none;">
                        <li><h6><span class="font-weight-bold">Status  :</span> <span> abcd </span></h6></li>
                        <li><h6><span class="font-weight-bold">  Order ID : </span>
                            <span> abcd </span></h6></li>
                        <li><h6><span class="font-weight-bold">  SP Name : </span>
                            <span> abcd</span></h6></li>
                        <li><h6><span class="font-weight-bold">  SP Contact : </span>
                            <span> abcd</span></h6></li>

                    </ul>
                </b-card>
            </b-col>
            <b-col sm="6" md="6">
                <b-card>
                    <h4 class="card-title">Complain Details</h4>

                    <ul style="list-style: none;">
                        <li><h6><span class="font-weight-bold">Status  :</span> <span> abcd </span></h6></li>
                        <li><h6><span class="font-weight-bold">  Order ID : </span>
                            <span> abcd </span></h6></li>
                        <li><h6><span class="font-weight-bold">  SP Name : </span>
                            <span> abcd</span></h6></li>
                        <li><h6><span class="font-weight-bold">  SP Contact : </span>
                            <span> abcd</span></h6></li>

                    </ul>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
    name: "OrderShow",
    data() {
        return {

        }
    },
    created() {
        this.fetchComplians();
    },
    methods: {
        fetchComplians() {
            console.log('fetch ---- complians ---- ', ADMIN_URL);
            axios.get(`${ADMIN_URL}/complains`)
                .then(response => {
                    console.log('fetchComplains === === ', response);
                }).catch(error => {
                    console.log('Error response :: ', error.response);
                })
        },
        fetchSingleOrderComplain() {
            
        }
    }
}
</script>

<style scoped>

</style>