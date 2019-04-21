<template>
    <b-card class="m-4">
        <h5 class="mb-4">Customer Info</h5>
        <b-form-group>
            <b-input-group>
                <b-input-group-prepend>
                    <b-input-group-text>+88</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" placeholder="Delivery Mobile"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group>
            <label for="name">Delivery Name</label>
            <b-form-input type="text" id="name"></b-form-input>
        </b-form-group>
    </b-card>
</template>

<script>
    export default {
        name: "Customer"
    }
</script>

<style scoped>

</style>