<template>
    <b-card class="m-4 p-4">
        <h5 class="mb-4">Select Line Item</h5>
        <div class="form-group">
            <label for="1">Select Category</label>
            <select @change="fetchSubcategories" v-model="selected_category" class="form-control" id="1">
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
            <button @click="addService" class="btn btn-romoni-secondary pl-5 pr-5">Add Service</button>
    </b-card>
</template>

<script>
  import EventBus from '../../../utils/EventBus';
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

  export default {
    name: "Service",
    props: ['selected_partner'],
      data() {
        return {
          categories: [],
          subcategories: [],
          servicesObject: [],
          selected_category: "",
          selected_subcategory: "",
          selected_service: '',
          quantity: '1',
          questions: []
        }
      },
      mounted() {
        this.fetchCategories();
      },
      computed: {
        options() {
          return JSON.parse(this.selected_service.options);
        },
        services() {
          return {
            service_id: this.selected_service.id,
            service_name: this.selected_service.name,
            quantity: this.quantity,
            price: this.selected_service.price,
            answer: this.questionFormat
          }
        },
        questionFormat() {
          let ans = _.map(this.questions, option => {
            return {
              ans: option.selected_ans
            };
          });
          return ans ;
        }
      },
    methods: {
      addService() {
        EventBus.$emit('service:add', this.services);
      },
      fetchCategories() {
        
        axios.post(`${ADMIN_URL}/categories`, {
          service_id: 1
        })
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            console.log("error occurs");
          });
      },
      fetchSubcategories() {
        
        axios.post(`${ADMIN_URL}/subcategories`, {
          category_id: this.selected_category
        })
          .then(response => {
            this.subcategories = response.data;
          })
          .catch(e => {
            console.log("error occurs",e);
          });
      },
      fetchServices() {
        
        axios.get(`${ADMIN_URL}/line-items/appointment`, {
          params : {
            subcategory_id: this.selected_subcategory,
            partner_id: this.selected_partner.id
          }
        })
          .then(response => {
            this.servicesObject = response.data;
          })
          .catch(e => {
            console.log("error occurs",e);
          });
      },
      fetchQuestion() {
        this.questions = _.map(this.options, option => {
          return {
            question: option.question,
            answers: option.answer,
            selected_ans: option.answer[0]
          };
        });
      }
    }
 }
</script>

<style scoped>

</style>
