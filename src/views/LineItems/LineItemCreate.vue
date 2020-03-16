<template>
  <div>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <form-wizard color="#675871" subtitle="" title="Add New Line Item">

        <tab-content icon="ti-settings" title="BASIC INFO">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Super Service *</label>
            <div class="col-sm-9">
              <select @change="getCategories" class='form-control' v-model="service_id">
                <option disabled selected value="0">Select Service</option>
                <option :value="serv.id" v-for="serv in services" :key="serv.id">{{ serv.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Category *</label>
            <div class="col-sm-9">
              <select @change="getSubcategories" class='form-control' v-model="category_id" >
                <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
              </select>
            </div>
          </div>

          <div v-if="service_id !== 2" class="form-group row">
            <label class="col-sm-3 col-form-label">SubCategory *</label>
            <div class="col-sm-9">
              <select class='form-control' v-model="subcategory_id">
                <option :value="subcat.id" v-for="subcat in subcategories" :key="subcat.id">{{ subcat.name }}</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Name *</label>
            <div class="col-sm-9">
              <input class="form-control" name="name" type="text" v-model="name" required>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Thumbnail *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onThumbnailChange">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (Web) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBwebChange">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (Tab) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBtabChange">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (Android) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBandChange">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Upload Banner (iOS) *</label>
            <div class="col-sm-9">
              <input class="form-control" type="file" v-on:change="onBiosChange">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Pricing Type *</label>
            <div class="col-sm-9">
              <select class="form-control" name="pricing_type" v-model="pricing_type">
                <option value="fixed" selected>Fixed</option>
                <option value="option">Option</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">FAQ</label>
            <div class="col-sm-9">
              <b-button @click="FAQmodal" class="btn btn-success">+ Add FAQ</b-button>


              <div v-for="(faq, index) in faqs" :key="index">

                <b-button @click="FAQindexModal(index)" class="btn btn-sm btn-dark m-1">FAQ - {{ index+1 }}</b-button>

                <modal :name="'faq-'+index" title="Edit FAQ">
                  <div class="m-3 p-3">
                    <div class="form-group">
                      <label for="question">Question</label>
                      <input :id="'question'+index" :name="'faq'+index" :value=faq.question class="form-control"
                             type="text">
                    </div>
                    <div class="form-group">
                      <label for="answer">Answer</label>
                      <input :id="'answer'+ index" :name="'ans'+ index" :value=faq.answer class="form-control"
                             type="text">
                    </div>
                    <button @click="updateData(index)" class="btn btn-primary" data-dismiss="modal" type="button">
                      Update
                    </button>
                    <button @click="deleteData(index)" class="btn btn-primary m-3" data-dismiss="modal" type="button">
                      Delete
                    </button>
                  </div>
                </modal>
              </div>
              <modal name="modal-faq">
                <div class="m-3 p-3">
                  <div class="form-group">

                    <label for="question">Question</label>
                    <input class="form-control" id="question" type="text" v-model="new_question">

                  </div>

                  <div class="form-group">
                    <label for="answer">Answer</label>
                    <input class="form-control" id="answer" type="text" v-model="new_answer">
                  </div>

                  <button @click="addData" class="btn btn-primary" data-dismiss="modal" type="button">Submit</button>
                </div>
              </modal>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Duration (In minutes)</label>
            <div class="col-sm-9">
              <input class="form-control" type="number" v-model="duration">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Short Description</label>
            <div class="col-sm-9">
              <input class="form-control" type="text" v-model="description">
              <p class="text-danger">Character left: {{100 - description.length}}</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Publish Status</label>
            <div class="col-sm-9">
              <div class="form-group">
                <div class="form-check checkbox">
                  <input class="form-check-input" type="checkbox" name="published_status" v-model="published_status">
                  <label class="form-check-label" >Published</label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Subscribable Status</label>
            <div class="col-sm-9">
              <div class="form-group">
                <div class="form-check checkbox">
                  <input class="form-check-input" type="checkbox" name="published_status" v-model="subscribable"  true-value=1 false-value=0>
                  <label class="form-check-label" >Subscribable</label>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content   v-if="service_id ===2" icon="ti-id-badge" title="DESIGNS">
          <div>
            <b-card>
              <div class="row justify-content-md-center m-4">
                <div class="col-12 m-3">
                  <b-button @click="NewDesign" class="btn btn-success">+ Add New Design</b-button>
                  <modal name="new-design-modal" height="auto" :scrollable="true">
                    <div class="m-3 p-3">
                      <div class="form-group row">
                      <label>Design Name</label>
                      <input class="form-control" type="text" v-model="new_design.name">
                      </div>
                      <div class="form-group row">
                      <label>Design Description</label>
                      <input class="form-control" type="text" v-model="new_design.description">
                      </div>
                      <div class="form-group row">
                      <label>Upload Design</label>
                      <input class="form-control" type="file" @change="onDesignUpload">
                      </div>

                      <b-button @click="onDesignSave" class="btn btn-success float-right mb-3">Save Design</b-button>

                    </div>
                  </modal>
                </div>
                <div class="col-12 m-1" v-for="(des,index) in designs" :key="index">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Upload Design -  {{index+1}}</label>
                    <div class="col-sm-9">
                      <button class="btn btn-sm btn-danger" data-toggle="tooltip" title="Delete Answer" @click="deleteDesign(index)"><i class="fa fa-close"></i></button><br>
                      <div class="border p-3">
                      <label>Design Name</label>
                      <input class="form-control" type="text" v-model="des.name">
                      <label>Design Description</label>
                      <input class="form-control" type="text" v-model="des.description">
                      <label>Design</label><br>
                      <img :src="des.tmp_image" style="width: 200px; height: 150px;">
                      </div>
                    </div>
                  </div>
                </div>


            </div>
            </b-card>
          </div>
        </tab-content>
        <tab-content v-else icon="ti-id-badge" title="DETAILS">
          <div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Brand/ Ingredients used</label>
            <div class="col-sm-9">
              <input class="form-control" v-model="details.brand" type="text">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Recommended For</label>
            <div class="col-sm-9">
              <input class="form-control" v-model="details.recommendation" type="text">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Benefits</label>
            <div class="col-sm-9">
              <input class="form-control" v-model="details.benefits" type="text">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Tips for Customers</label>
            <div class="col-sm-9">
              <input class="form-control" v-model="details.tips" type="text">
            </div>
          </div>
          </div>
        </tab-content>


        <tab-content icon="ti-view-list-alt" title="QUESTION SET">

          <div class="form-group row" v-show="pricing_type ==='option' ">

            <label class="col-sm-3 col-form-label">Question*</label>
            <div class="col-sm-9">
              <b-button @click="quesModal" class="btn btn-sm btn-success">
                +Add Question
              </b-button>

              <div v-for="(faq, index) in questions" :key="index+5000">

                <b-button @click="quesIndexModal(index)" class="btn btn-sm btn-dark m-1">
                  Question - {{ index+1 }}
                </b-button>

                <modal :name="'ques-'+index" height="auto" :scrollable="true">
                  <div class="m-3 p-3">
                    <div class="form-group">
                      <label for="question">Question</label>
                      <input :id="'spquestion'+index" :name="'question'+index" :value=faq.question class="form-control"
                             type="text">
                    </div>
                    <div class="form-group" v-for="(ans, index) in faq.answer" :key="index">
                      <label for="answer">Answer</label>
                      <input :id="'spanswer'+index" :name="'answer'+ index +'[]'" class="form-control" type="text"
                             v-model="ans.value">
                    </div>
                    <b-button @click="updateQuestion(index)" class="btn btn-primary">Update</b-button>
                    <button @click="deleteQuestion(index)" class="btn btn-primary m-3">Delete</button>
                  </div>
                </modal>
              </div>
            </div>

            <modal name="modal-ques" height="auto" :scrollable="true">
                  <div class="m-3 p-3">
                    <div class="form-group">
                      <label for="question">Title</label>
                      <input class="form-control" id="sptitle" type="text" v-model="new_sptitle">
                    </div>
                    <div class="form-group">
                      <label for="question">Question</label>
                      <input class="form-control" id="spquestion" type="text" v-model="new_spquestion">
                    </div>
                    <div class="form-group" v-for="(ans,index) in answer" :key="index+4000">
                      <label for="answer">Answer <a href="#" data-toggle="tooltip" title="Delete Answer" @click="deleteAns(index)"><i class="fa fa-close"></i></a></label>
                      <input class="form-control" id="spanswer" name="answer[]" type="text" v-model="ans.value">
                    </div>
                    <button @click="addNewAnswer" class="btn btn-success" type="button"><i class="fa fa-plus"></i> Add New Answer</button>
                    <button @click="addQuestion" class="btn btn-primary m-3" data-dismiss="modal" type="button">Submit
                    </button>
                  </div>
            </modal>
          </div>

        </tab-content>

        <tab-content icon="ti-wallet" title="PRICING">

          <section v-if="pricing_type ==='fixed' ">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Preferred Price *</label>
              <div class="col-sm-9">
                <input class="form-control" v-model="fixed_price" type="number">
              </div>
            </div>
          </section>

          <section v-if="pricing_type ==='option' ">
            <div class="table-scrollable" id="priceTable">
              <table class="table table-striped table-bordered table-hover dt-responsive" width="100%">
                <thead>
                <tr>
                  <th v-for="(question, index) in questions" :key="index+1000">Option {{index+1}}</th>
                  <th>Price</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(question,index) in question_data" :key="index+2000">
                  <td v-for="(item, cnt) in question" :key="cnt+3000">
                    <input :name="'price['  + index + '][name'+ cnt+ ']'"
                      type="hidden"
                      v-model="item.value">
                      {{item.value}}
                  </td>
                  <td><input v-model="price[index]" multiple></td>
                </tr>
                </tbody>
              </table>
            </div>

          </section>

        </tab-content>

        <button class="btn btn-lg btn-success" slot="finish" type="submit">Submit Line-item</button>
      </form-wizard>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'LineItemCreate',
    components: {},

    data() {
      return {
        answer: [],
        new_question: "",

        services: '',
        categories: '',
        subcategories: '',
        service_id: '0',
        category_id: '',
        subcategory_id: '',
        subcategory: [],
        name: '',
        details: {
          brand: '',
          recommendation: '',
          tips: '',
          benefits: '',
        },
        duration: '',
        description: '',
        thumbnail: '',
        banner_web: '',
        banner_tab: '',
        banner_android: '',
        banner_ios: '',
        new_answer: "",
        new_sptitle: "",
        new_spquestion: "",
        new_spanswer: [],
        faqs: [],
        questions: [],
        ques_ans: [],
        pricing_type: '',
        published_status: '',
        subscribable: 0,
        price: [],
        fixed_price : '',
        price_table: [],
        question_data: [],
        bool: true,
        designs: [],
        new_design: {},
        src_url: ''

      }
    },
    created() {
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      const Base_URL = process.env.VUE_APP_BASE_URL;
      this.src_url = Base_URL+ '/images/lineitem/designs/';
      axios.get(`${ADMIN_URL}/services`)
        .then(response => {
          console.log('At created(), LineItemCreate ===== ', response);
          this.services = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },
    methods: {
        updatePrice(){
        let ques = this.question_data;
        let price_table = [];
        let price = this.price;
          let nameObj = {};
          for (let i in ques) {
            let res = {};
            for (let j in ques[i]) {
              let key = "name" + j;
              let nameObj = {};
              nameObj[key] = ques[i][j]['value'];
              Object.assign(res, nameObj)
            }
            nameObj['price'] = price[i];
            nameObj['old_price'] = price[i];
            Object.assign(res, nameObj);
            price_table.push(res);
          }
          this.price_table =price_table;

          let option = this.questions;
          let sub_arr = [];
          for(let i in option)
          {
          let arr = [];
          for(let j in option[i]['answer'])
          {
          arr.push(option[i]['answer'][j]['value']);
          }
          sub_arr.push({title : option[i]['title'], question : option[i]['question'], answer : arr});
          }
          this.ques_ans = sub_arr;
          console.log('wow--',this.ques_ans);
        },
        priceTable(questions) {
          questions = JSON.stringify(questions);
          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          axios.post(`${ADMIN_URL}/line-items/price-combination`, {
            data: questions
          })
            .then(response => {

              //console.log(response.data);
              this.question_data = response.data;
              this.bool = false;

            });
        },
        FAQmodal() {
          this.$modal.show('modal-faq');
        },
        FAQindexModal(index) {
          this.$modal.show('faq-' + index);
        },
        quesModal() {
          this.$modal.show('modal-ques');
        },
        quesIndexModal(index) {
          this.$modal.show('ques-' + index);
        },
        addNewAnswer() {
          this.answer.push({value: ''});
        },
        deleteAns(ans) {
          this.answer.splice(ans,1);
        },
        addData() {
          if (!this.new_question && !this.new_answer) return;
          this.faqs.push({question: this.new_question, answer: this.new_answer});
          this.new_question = '';
          this.new_answer = '';
          this.$modal.hide('modal-faq');
        },
        addQuestion() {

          this.questions.push({title: this.new_sptitle, question: this.new_spquestion, answer: this.answer});
          this.new_spquestion = '';
          this.answer = [];
          this.new_sptitle = '';
          this.priceTable(this.questions);
          this.$modal.hide('modal-ques');
        },
        deleteData(id) {

          this.faqs.splice(id, 1);
        },
        updateData(index) {
          var x = document.getElementById("question" + index);
          var y = document.getElementById("answer" + index);
          this.faqs[index].question = x.value;
          this.faqs[index].answer = y.value;
        },
        updateQuestion(index) {

        /*
          var x = document.getElementById("sptitle" + index);
          var y = document.getElementById("spquestion" + index);
          var z = document.getElementById("spanswer" + index);
          console.log(z.value);
          this.questions[index].title = x.value;
          this.questions[index].question = y.value;
          this.questions[index].answer = z;
        */
          this.$modal.hide('ques-' + index);
          this.priceTable(this.questions);

        },


        deleteQuestion(index) {
          this.questions.splice(index, 1);
        },
        getCategories() {
          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          axios.post(`${ADMIN_URL}/categories`, {
            service_id: this.service_id
          })
            .then(response => {
              this.categories = response.data;
            })
            .catch(e => {
              //console.log("error occurs");
            });
        },
        getSubcategories() {
          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          axios.post(`${ADMIN_URL}/subcategories`, {
            category_id: this.category_id
          })
            .then(response => {
              this.subcategories = response.data;
            })
            .catch(e => {
              //console.log("error occurs");
            });

        },
        onThumbnailChange(e) {
          this.thumbnail = e.target.files[0];
          console.log(this.thumbnail);
        },
        onBwebChange(e) {
          this.banner_web = e.target.files[0];
        },
        onBtabChange(e) {
          this.banner_tab = e.target.files[0];
        },
        onBandChange(e) {
          this.banner_android = e.target.files[0];
        },
        onBiosChange(e) {
          this.banner_ios = e.target.files[0];
        },
        NewDesign(){
          this.$modal.show('new-design-modal');
        },
        deleteDesign(index) {
          this.designs.splice(index,1);
        },

        onDesignUpload(e) {

          this.new_design.image = e.target.files[0];
          this.new_design.tmp_image = URL.createObjectURL(this.new_design.image);

        },
        onDesignSave(){
          this.$modal.hide('new-design-modal');

          this.designs.push(this.new_design);
          this.new_design = {};

        },
        saveOneDesign(e){
          e.preventDefault();
          let currentObj = this;
          const config = {
            headers: {'content-type': 'multipart/form-data'}
          };
          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          console.log(this.designs);
          let formData = new FormData();
          formData.append('thumbnail', this.thumbnail);
          axios.post(`${ADMIN_URL}/line-items/design`,formData, config)
            .then(response => {
              console.log('Success', response);
              currentObj.success = response.data.success;
              console.log(response.data);
            })
            .catch(error => {
              console.log('Error  ... ', error.response);
              currentObj.output = error;
              console.log(error);
            });
        },
        saveDesign(e){
          e.preventDefault();
          let currentObj = this;
          const config = {
            headers: {'content-type': 'multipart/form-data'}
          };
          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          let designData = new FormData();
          for( let i = 0; i < this.designs.length; i++ ){
            let file = this.designs[i];


            designData.append('designs[' + i + '][image]', file);
          }
          axios.post(`${ADMIN_URL}/line-items/design`,designData, config)
            .then(response => {
              console.log('Success', response);
              currentObj.success = response.data.success;
              console.log(response.data);
            })
            .catch(error => {
              console.log('Error  ... ', error.response);
              currentObj.output = error;
              console.log(error);
            });
        },
        onSubmit(e) {

          e.preventDefault();
          let currentObj = this;
          const config = {
            headers: {'content-type': 'multipart/form-data'}
          };

          this.updatePrice();

          let formData = new FormData();
          formData.append('name', this.name);
          formData.append('service_id', this.service_id);
          formData.append('category_id', this.category_id);
          formData.append('subcategory_id', this.subcategory_id);
          formData.append('published_status', this.published_status);
          formData.append('subscribable', this.subscribable);
          formData.append('options', JSON.stringify(this.ques_ans));
          formData.append('pricing_type', this.pricing_type);
          formData.append('price_table', JSON.stringify(this.price_table));
          formData.append('fixed_price', this.fixed_price);
          formData.append('duration', this.duration);
          formData.append('description', this.description);
          formData.append('brand', this.details.brand);
          formData.append('tips', this.details.tips);
          formData.append('benefits', this.details.benefits);
          formData.append('recommendation', this.details.recommendation);
          formData.append('faq', JSON.stringify(this.faqs));
          formData.append('thumbnail', this.thumbnail);
          formData.append('banner_web', this.banner_web);
          formData.append('banner_tab', this.banner_tab);
          formData.append('banner_android', this.banner_android);
          formData.append('banner_ios', this.banner_android);


          for( let i = 0; i < this.designs.length; i++ ){
            let file = this.designs[i]['image'];
            let name = this.designs[i]['name'];
            let desc = this.designs[i]['description'];
            formData.append('designs[' + i + '][image]', file);
            formData.append('designs[' + i + '][name]', name);
            formData.append('designs[' + i + '][description]', desc);
          }

          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          console.log(this.name);
          axios.post(`${ADMIN_URL}/line-items/create`, formData, config)
            .then(response => {
              console.log('Success', response);
              currentObj.success = response.data.success;
              console.log(response.data);
              if(response.data.success===true)
              {
                this.$swal('Success',response.data.message,'success');
              }
              else
              {
                this.$swal('Error', 'Something went wrong', 'error');
              }
            })
            .catch(error => {
              console.log('Error  ... ', error.response);
              currentObj.output = error;
              console.log(error);
            });
        }
      }
  }
</script>

<style scoped>
  .error {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 20px;
    color: red;
  }
</style>
