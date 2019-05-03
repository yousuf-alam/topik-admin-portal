<template>
    <div class="">
        <div v-for="role in allRoles" :key="role.id">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :id="`check${role.id}`" 
                   :value="role" v-model="checkedRoles" @change="handleCheckRole">
                <label class="custom-control-label" :for="`check${role.id}`">
                    {{ role.name }}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CheckRoles',
    props: {
        savedCheckedRoles: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            allRoles: [],
            checkedRoles: [],

        }
    },
    created() {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.get(`${ADMIN_URL}/api/roles`)
            .then(resp => {
                this.allRoles = resp.data;
            }).catch(error => {

            })
    },
    mounted() {
        this.checkedRoles = this.savedCheckedRoles ? this.savedCheckedRoles : [];
    },
    methods: {
        handleCheckRole() {
            this.$emit('role-checked', this.checkedRoles)
        }
    }
}
</script>

<style>

</style>
