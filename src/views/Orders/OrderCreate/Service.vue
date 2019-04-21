<template>
    <b-card class="m-4">
        <h5 class="mb-4">Select Service</h5>
        <div class="form-group">
            <label for="1">Select Category</label>
            <select @change="fetchSubcategories" v-model="select_catgeory" class="form-control" id="1">
                <option v-for="category in categories" :value="category.id">{{category.name}}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="3">Select Subcategory</label>
            <select @change="fetchServices" v-model="selected_subcategory" class="form-control" id="3">
                <option v-for="subcategory in subcategories" :value="subcategory.id">{{subcategory.name}}
                </option>
            </select>

        </div>
        <div class="form-group">
            <label for="2">Select Service</label>
            <select @change="fetchQuestion" v-model="selected_service" class="form-control" id="2">
                <option v-for="service in servicesObject" :value="service">{{service.name}}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Add Quantity</label>
            <input type="number" v-model="quantity" class="form-control" id="exampleInputEmail1"
                   placeholder="1">
        </div>

        <div class="form-group" v-if="questions">
            <ul class="list-group">
                <li class="list-group-item" v-for="(question, i) in questions" :key="i">
                    <div class="title">
                        {{ question.question }}
                    </div>
                    <div class="option">
                        <select class="form-control" v-model="question.selected_ans">
                            <option :value="answer" v-for="answer in question.answers">{{ answer }}</option>
                        </select>
                    </div>
                </li>
            </ul>
        </div>
            <button @click="addService" class="btn btn-info pl-5 pr-5">Add Service</button>
    </b-card>
</template>

<script>
    export default {
        name: "Service"
    }
</script>

<style scoped>

</style>