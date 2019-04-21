<template>
    <b-card class="m-4">
        <h5 class="mb-4">Create Notification</h5>
        <b-form-group label="Select Target">
            <b-form-select id="area"
                           :plain="true"
                           :options="['All Users','All SP']"
                           value="All Users">
            </b-form-select>
        </b-form-group>
        <b-form-group label="Title">
            <b-form-input type="text" id="title"></b-form-input>
        </b-form-group>
        <b-form-group label="Description">
            <b-form-input type="text" id="description"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Notification</b-button>
    </b-card>
</template>

<script>
    export default {
        name: "NotificationCreate"
    }
</script>

<style scoped>

</style>