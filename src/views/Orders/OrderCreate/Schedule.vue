<template>
    <b-card class="m-4">
        <h5 class="mb-4">Date & Schedule</h5>
        <b-form-group label="Select Date">
        <datepicker :disabledDates="disabledDates"></datepicker>
        </b-form-group>
        <b-form-group label="Select Time">
            <b-form-select id="area"
                           :plain="true"
                           :options="['Adabor','Agargaon', 'Azimpur']"
                           value="Adabor">
            </b-form-select>
        </b-form-group>
        <b-form-group label="Delivery Address">
            <b-form-input type="text" id="address"></b-form-input>
        </b-form-group>
    </b-card>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: "Schedule",
        components: {
            Datepicker
        },
        data(){
            return {
                disabledDates: {
                    to: new Date(Date.now() - 8640000)
                }
            };
        },
    }
</script>

<style scoped>

</style>