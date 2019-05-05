<template>
    <div class="customcard">
        <h3>Create New Role</h3>
        <div v-if="loaded" class="d-flex justify-content-center">
            <div class="col-8">
                <form @submit.prevent>
                <div class="form-group">
                    <label for="name">Enter Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name"
                        v-model="name" @keyup="nameKeyUp" required>
                    <span id="nameHelp" ref="name_warn" class="form-text text-danger" tabindex="1">
                        {{name_warning}}
                    </span>
                </div>
                <div>
                    <h3>Assign Permissions</h3>
                    <div ref="p_warn" class="text-danger" tabindex="0">
                        {{ permission_warning }}
                    </div>
                    <div class="px-2 py-2">
                        <input type="checkbox" id="checkall" v-model="checkall"
                            @change="checkAll">
                        <label for="checkall" class="col-10 ">Check All</label>                
                    </div>
                    <div class="px-2">
                        <div v-for="row in totalPermissions" :key="row.id">
                            <input 
                                type="checkbox" :id="row.id" :value="row" 
                                v-model="checkedPermissions" @change="checkSingle"
                            >
                            <label :for="row.id" class="col-10 ">{{row.name}}</label>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" :disabled="disableSubmitBtn"
                 @click="handleSubmit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateNewRole',
    data() {
        return {
            loaded: false,
            name: '',
            name_warning: '',
            role: {},
            checkall: false,
            totalPermissions: [],
            checkedPermissions: [],
            permission_warning: ''
        }
    },
    created() {
        this.fetchPermissions();
    },
    computed: {
        disableSubmitBtn() {
            if (this.name.length === 0) {
                return true;
            }
        }
    }, 
    mounted() {

    },
    methods: {
        handleSubmit() {
            if (this.checkedPermissions.length === 0) {
                this.permission_warning = "You haven't select any permission";
                this.$refs.p_warn.focus();
                return;
            }
            this.createRole();
        },
        nameKeyUp(event) {
            if (this.name.length > 100) {
                this.name_warning = 'Role name must be less than 100 char'
            } else {
                this.name_warning = '';
            }
        },
        checkAll(e) {
            this.checkedPermissions = e.target.checked ? this.totalPermissions : [] ;
        },
        checkSingle() {
            this.checkall = false;
        }, 
        fetchPermissions() {
            const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
            const role_id = this.$route.params.id;
            this.$gbvar.axios.get(`${ADMIN_URL}/api/permissions`)
                .then(response => {
                    this.totalPermissions = response.data;
                    this.loaded = true;
                }).catch(error => {

                })
        },
        createRole() {
            const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
            const formvalus = {};
            formvalus.name = this.name;
            this.$gbvar.axios.post(`${ADMIN_URL}/api/roles`, formvalus)
                .then(response => {
                    if (response.status == 201) {
                        this.role = response.data;
                        this.assignPermissionToRole();
                    }
                }).catch(error => {
                    if (error.response === undefined) {
                        return;
                    }
                    if (error.response.status === 422) {
                        const msg = error.response.data.errors.name[0];
                        this.name_warning = `${msg} Try Another.`;
                        this.$refs.name_warn.focus();
                    }
                })
        },
        assignPermissionToRole() {
            const permission_ids = _.map(this.checkedPermissions, 'id');
            const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
            const URL = `${ADMIN_URL}/api/roles/${this.role.id}`;
            const config = { headers: {'Content-Type': 'application/json'} };
            this.$gbvar.axios.put(URL, permission_ids, config)
                .then(response => {
                    alert('Permissions Updated Successfully'); 
                    this.$router.push({name: 'Roles'});
                }).catch(error => {

                })

        }
    }
}
</script>

<style>

</style>
