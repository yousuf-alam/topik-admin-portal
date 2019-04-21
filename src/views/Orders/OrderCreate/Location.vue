<template>
    <b-card class="m-4">
        <h5 class="mb-4">Location</h5>
    <b-form-group label="Select District">
        <b-form-select id="district"
                       :plain="true"
                       :options="['Dhaka', 'Chittagong']"
                       value="Dhaka">
        </b-form-select>
    </b-form-group>
        <b-form-group label="Select Area">
            <b-form-select id="area"
                           :plain="true"
                           :options="['Adabor','Agargaon', 'Azimpur']"
                           value="Adabor">
            </b-form-select>
        </b-form-group>
    </b-card>
</template>

<script>
    export default {
        name: "Location"
    }
</script>

<style scoped>

</style>
