<template>
    <b-card class="m-4">
        <h5 class="text-center mb-4">Available Service Providers</h5>

        <div class="tab-pane list-group partners in active show">

            <div class="list-group-item list-group-item-action" v-for="(partner, i) in partners" :key="i" @click="selectPartner(partner)" :class="{active: selected_partner == partner , disabledSP: partner.is_booked ===1}">
                <div class="row">
                    <div class="col-sm-2">
                        <img class="partner-thumb" :src="partner.photo">
                    </div>
                    <div class="col-sm-6">
                        <h6 class="p-name">{{ partner.name }}</h6>
                        <p v-if="partner.is_booked ===1" class="booked mt-2">[ Booked for the selected time ]</p>
                    </div>
                    <div class="col-sm-4 text-right">
                        <h6>৳ {{ partner.price }}</h6>
                    </div>
                </div>
            </div>
        </div>

   <!-- <div class="col-sm-12 black-bg pt-5 pl-5 pr-5 pb-4" style="margin-top: 20px;">
        <div class="float-left" v-if="selected_partner">
            Selected SP: {{ selected_partner.name }}
        </div>
        <div class="text-center" v-if="partners.length">
            <button class="btn btn-romoni" :disabled="selected_partner === null" @click="onConfirm()">Confirm</button>
        </div>
    </div>-->
    </b-card>
</template>

<script>
    export default {
        name: "Partner"
    }
</script>

<style scoped>

</style>