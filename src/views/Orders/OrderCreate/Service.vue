<template>
    <b-card class="m-4 p-4">
        <h5 class="mb-4">Select Line Item</h5>
        <div class="form-group">
            <label for="1">Select Category</label>
            <select @change="fetchSubcategories" v-model="selected_category" class="form-control" id="1">
                <option v-for="category in categories" :value="category.id">{{category.name}}</option>
            </select>
        </div>
        <div class="form-group"  v-if="type==='Beauty On-Demand'">
            <label for="3">Select Subcategory</label>
            <select @change="fetchServices" v-model="selected_subcategory" class="form-control" id="3">
                <option v-for="subcategory in subcategories" :value="subcategory.id">{{subcategory.name}}
                </option>
            </select>

        </div>
        <div class="form-group">
            <label for="2">Select Line Item</label>
            <select @change="fetchQuestion" v-model="selected_service" class="form-control" id="2">
                <option v-for="service in servicesObject" :value="service">{{service.name}}</option>
            </select>
        </div>
        <div class="form-group" v-if="type==='Tailor On-Demand'">
          <button @click="designModal" class="btn btn-primary btn-sm m-1">Choose Design</button>
          <button @click="accessoriesModal" class="btn btn-dark btn-sm m-1">Choose Accessories</button>
        </div>

        <div class="form-group">
            <label>Add Quantity</label>
            <input type="number" v-model="quantity" class="form-control" placeholder="1">
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

      <modal name="modal-designs" :adaptive="true">
        <div class="p-3">
          <b-row class="p-2">
            <h4>Choose Design</h4><br><br>
          </b-row>
          <b-list-group style="max-height: 40rem;
    overflow-y: scroll;">
            <b-list-group-item sm="12" class="list-group-item" v-for="des in item_designs" @click="selectDesign(des)" :class="{active: selected_item_design === des}">
              <img :src="src_item_design+des.image" class="center-div " style="width: 200px; height: 150px;">
              <h5 class="center-div font-weight-bold">{{des.name}}</h5>
            </b-list-group-item>
          </b-list-group>
          <b-row>
            <b-col>
              <button @click="confirmDesign" class="btn btn-romoni-secondary float-right mt-2">Confirm Design</button>
            </b-col>

          </b-row>

        </div>
      </modal>
      <modal name="modal-accessories" height="auto" :adaptive="true">
        <div class="m-4 p-4">
          <h5 class="mb-4">Select Accessories (Optional)</h5>
          <div class="form-group">
            <b-row>
              <b-col sm="3" v-for="acc in accessories" class="form-check checkbox mr-4 mb-2" >
                <input class="form-check-input" type="checkbox" :value="acc.id" v-model="selected_accessories">
                <label class="form-check-label">{{acc.name}}</label>
              </b-col>
            </b-row>
          </div>
          <button @click="addAccessories" class="btn btn-romoni-secondary pl-5 pr-5">Save</button>
          <button @click="closeAccessoriesModal" class="btn btn-light pl-5 pr-5">Cancel</button>
        </div>
      </modal>
      <b-row>
        <button @click="addService" class="btn btn-romoni-secondary pl-5 pr-5">Add Line Item</button>
      </b-row>

    </b-card>
</template>

<script>
  import EventBus from '../../../utils/EventBus';
  import axios from 'axios';
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;
  const BASE_URL = process.env.VUE_APP_BASE_URL;

  export default {
    name: "Service",
    props: ['type'],
      data() {
        return {
          categories: [],
          subcategories: [],
          servicesObject: [],
          selected_category: "",
          selected_subcategory: "",
          selected_service: '',
          quantity: 1,
          questions: [],
          item_designs: [],
          selected_item_design: '',
          src_item_design: '/images/lineitem/designs/',
          accessories: [],
          selected_accessories: []
        }
      },
      mounted() {
        this.fetchCategories();
        this.fetchAccessories();
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
            answer: this.questionFormat,
            design: this.selected_item_design.name,
            accessories: this.selected_accessories
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
        this.selected_accessories = [];
      },
      fetchCategories() {
        let serviceID;
        if(this.type==='Beauty On-Demand')
          serviceID = 1;
        else
          serviceID = 2;

        axios.post(`${Admin_URL}/categories`, {
          service_id: serviceID
        })
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            console.log("error occurs");
          });
      },
      fetchSubcategories() {
        if(this.type==='Tailor On-Demand')
        {
          this.fetchServices();
        }
        else
        {
          axios.post(`${Admin_URL}/subcategories`, {
            category_id: this.selected_category
          })
            .then(response => {
              this.subcategories = response.data;
            })
            .catch(e => {
              console.log("error occurs",e);
            });
        }

      },
      fetchServices() {

        axios.post(`${Admin_URL}/all-line-items`, {
          category_id: this.selected_category,
          subcategory_id: this.selected_subcategory

        })
          .then(response => {
            this.servicesObject = response.data;
          })
          .catch(e => {
            console.log("error occurs",e);
          });
      },

      fetchQuestion() {
        this.item_designs = JSON.parse(this.selected_service.designs);
        this.src_item_design = BASE_URL + this.src_item_design;
        this.questions = _.map(this.options, option => {
          return {
            question: option.question,
            answers: option.answer,
            selected_ans: option.answer[0]
          };
        });
      },
      fetchAccessories(){
        axios.get(`${Admin_URL}/accessories`)
          .then(response => {
            this.accessories = response.data;
          })
          .catch(e => {
            console.log("error occurs",e);
          });
      },
      designModal(){
        this.$modal.show('modal-designs');
      },
      accessoriesModal(){
        this.$modal.show('modal-accessories');
      },
      closeAccessoriesModal() {
        this.selected_accessories = [];
        this.$modal.hide('modal-accessories');
      },
      addAccessories(){
        this.$modal.hide('modal-accessories');
      },
      selectDesign(design) {
        this.selected_item_design = design;
      },
      confirmDesign() {
        this.$modal.hide('modal-designs');
      }
    }
 }
</script>

<style scoped>
  .list-group-item{
    cursor: pointer;
  }
  .list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #524457;
    border-color: #524457;
  }

</style>
