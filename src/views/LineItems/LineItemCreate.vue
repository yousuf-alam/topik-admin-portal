<template>
    <div>
        <form  class="service_form" action="" method="POST" enctype="multipart/form-data">
            <form-wizard  title="Add New Line Item" subtitle="" color="#6d404d">

                <tab-content title="BASIC INFO" icon="ti-settings" >
                    <div class="form-group row" >
                        <label for="group" class="col-sm-3 col-form-label">Super Service *</label>
                        <div class="col-sm-9">

                            <select  id="category" class="form-control" name="category_id"  required>
                                <option  selected disabled>Select Service</option>
                                <option  value="1">Beauty - On Demand</option>
                                <option  value="2">Beauty - Appintment</option>
                                <option  value="3">Tailor - On Demand</option>
                                <option  value="4">Tailor - Boutique</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row" >
                        <label for="group" class="col-sm-3 col-form-label">Category *</label>
                        <div class="col-sm-9">

                            <select  id="category" class="form-control" name="category_id"  required>
                                <option  selected disabled>Select Category</option>
                                <option  value="1">Salon At Home</option>
                                <option  value="2">Spa at Home</option>
                                <option  value="3">Makeup and Hairstyle</option>
                                <option  value="4">Bridal Makeup and Mehendi</option>
                                <option  value="5">Packages and Offers</option>
                                <option  value="6">Fitness and Wellness</option>
                                <option  value="7">Valentine&#039;s and Falgun Madness Packages</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="secondary_group" class="col-sm-3 col-form-label">SubCategory *</label>
                        <div class="col-sm-9">

                            <select id="subcategory"  class="form-control" name="subcategory_id" required>

                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="name" class="col-sm-3 col-form-label">Name *</label>
                        <div class="col-sm-9">
                            <input type="text"  class="form-control" id="name" name="name">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="thumbnail" class="col-sm-3 col-form-label">Upload Thumbnail *</label>
                        <div class="col-sm-9">
                            <input type="file" name="thumbnail"  class="form-control-file" id="thumbnail" >
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="banner" class="col-sm-3 col-form-label">Upload Banner *</label>
                        <div class="col-sm-9">
                            <input type="file" name="banner"  class="form-control-file" id="banner" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="app_thumbnail" class="col-sm-3 col-form-label">Upload App Thumbnail *</label>
                        <div class="col-sm-9">
                            <input type="file" name="app_thumbnail"  class="form-control-file" id="app_thumbnail" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="app_banner" class="col-sm-3 col-form-label">Upload App Banner *</label>
                        <div class="col-sm-9">
                            <input type="file" name="app_banner"  class="form-control-file" id="app_banner" >
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="long_description" class="col-sm-3 col-form-label">Description *</label>
                        <div class="col-sm-9">

                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>

                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="short_description" class="col-sm-3 col-form-label">Short Description *</label>
                        <div class="col-sm-9">
                            <input type="text" name="short_description" class="form-control"  >
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="pricing" class="col-sm-3 col-form-label">Pricing Type *</label>
                        <div class="col-sm-9">

                            <select class="form-control" name="pricing_type" v-model="pricing_type" >
                                <option  value="fixed">Fixed</option>
                                <option  value="option">Option</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row" >

                        <label for="description" class="col-sm-3 col-form-label">FAQ*</label>
                        <div class="col-sm-9">
                            <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModalCenter">
                                +Add FAQ
                            </button>

                            <div v-for="(faq, index) in faqs">

                                <button type="button" class="btn btn-sm btn-success" data-toggle="modal"  :data-target="'#' + index">
                                    FAQ @{{ index+1 }}
                                </button>

                                <div class="modal fade" :id="index" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-body">

                                                <div class="form-group">

                                                    <label for="question">Question</label>
                                                    <input type="text" class="form-control" :name="'faq'+index" :id="'question'+index" :value=faq.question >

                                                </div>

                                                <div class="form-group">
                                                    <label for="answer">Answer</label>
                                                    <input type="text" class="form-control" :name="'ans'+ index" :id="'answer'+ index" :value=faq.answer >
                                                </div>

                                                <button type="button"  @click="updateData(index)" class="btn btn-primary"  data-dismiss="modal">Update</button>
                                                <button type="button"  @click="deleteData(index)" class="btn btn-primary" data-dismiss="modal">Delete</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-body">

                                        <div class="form-group">

                                            <label for="question">Question</label>
                                            <input type="text"  class="form-control" id="question"  v-model="new_question">

                                        </div>

                                        <div class="form-group">
                                            <label for="answer">Answer</label>
                                            <input type="text" class="form-control" id="answer" v-model="new_answer">
                                        </div>

                                        <button type="button"  @click="addData" class="btn btn-primary" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="form-group row">
                        <label for="duration" class="col-sm-3 col-form-label">Duration (In minutes)</label>
                        <div class="col-sm-9">
                            <input type="number"  class="form-control" name="duration" id="duration">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="minimum_quantity" class="col-sm-3 col-form-label">Minimum Quantity *</label>
                        <div class="col-sm-9">
                            <input type="number"  class="form-control" name="minimum_quantity" id="minimum_quantity">
                        </div>
                    </div>


                    <div class="form-group row">
                        <label for="published" class="col-sm-3 col-form-label">Publish Status</label>
                        <div class="col-sm-9">
                            <div class="custom-control mb-3 custom-checkbox">
                                <input type="checkbox" name="published_status" class="custom-control-input" value="1"  id="customCheck1">
                                <label class="custom-control-label" for="customCheck1">Publish</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="minimum_price" class="col-sm-3 col-form-label">Minimum Price Applicable</label>
                        <div class="col-sm-9">
                            <div class="custom-control mb-3 custom-checkbox">
                                <input type="checkbox" name="minimum_price" class="custom-control-input" value="1"  id="minimum_price">
                                <label class="custom-control-label" for="minimum_price">It is possible to apply price applicable</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="minimum_possiblity" class="col-sm-3 col-form-label">Recurring possiblity</label>
                        <div class="col-sm-9">
                            <div class="custom-control mb-3 custom-checkbox">
                                <input type="checkbox" name="minimum_possiblity" class="custom-control-input" value="1"  id="minimum_possiblity">
                                <label class="custom-control-label" for="minimum_possiblity">It is possible to be a recurring service</label>
                            </div>
                        </div>
                    </div>
                </tab-content>

                <tab-content title="DETAILS" icon="ti-id-badge">

                    <div class="form-group row">
                        <label for="brand_used_id" class="col-sm-3 col-form-label">Brand/ Ingredients used</label>
                        <div class="col-sm-9">
                            <input type="text"  class="form-control" name="brandInfo" id="brand_used_id">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="recommended_id" class="col-sm-3 col-form-label">Recommended For</label>
                        <div class="col-sm-9">
                            <input type="text"  class="form-control" name="recommendation" id="recommended_id">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="benefits_id" class="col-sm-3 col-form-label">Benefits</label>
                        <div class="col-sm-9">
                            <input type="text"  class="form-control" name="benefits" id="benefits_id">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="tips_id" class="col-sm-3 col-form-label">Tips for Customers</label>
                        <div class="col-sm-9">
                            <input type="text"  class="form-control" name="tips" id="tips_id">
                        </div>
                    </div>
                </tab-content>

                <tab-content title="QUESTION SET" icon="ti-view-list-alt" >

                    <div class="form-group row" v-show="pricing_type =='option' " >

                        <label for="description" class="col-sm-3 col-form-label">Question*</label>
                        <div class="col-sm-9">
                              <!--:disabled="questions.length ==2" -->
                            <button type="button"class="btn btn-sm btn-success" data-toggle="modal" data-target="#ModalCenter">
                                +Add Question
                            </button>

                            <div v-for="(faq, index) in questions">

                                <button type="button" class="btn btn-sm btn-success" data-toggle="modal"  :data-target="'#sp' + index">
                                    Question @{{ index+1 }}
                                </button>

                                <div class="modal fade" :id="'sp'+index" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                                    <div class="modal-dialog modal-dialog-centered" role="document">

                                        <div class="modal-content">
                                            <div class="modal-body">

                                                <div class="form-group">
                                                    <label for="question">Title</label>
                                                    <input type="text" :name="'title'+index" class="form-control" :id="'sptitle'+index"   :value=faq.title>
                                                </div>

                                                <div class="form-group">
                                                    <label for="question">Question</label>
                                                    <input type="text" :name="'question'+index" class="form-control" :id="'spquestion'+index"  :value=faq.question>
                                                </div>

                                                <div class="form-group" v-for  ="ans in faq.answer">
                                                    <label for="answer">Answer</label>
                                                    <input type="text" class="form-control" :name="'answer'+ index +'[]'"  :id="'spanswer'+index" v-model="ans.value">
                                                </div>
                                                <button type="button"  @click="deleteQuestion(index)" class="btn btn-primary" data-dismiss="modal">Delete</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-body">

                                        <div class="form-group">

                                            <label for="question">Title</label>
                                            <input type="text"  class="form-control" id="sptitle"  v-model="new_sptitle">
                                        </div>

                                        <div class="form-group">

                                            <label for="question">Question</label>
                                            <input type="text"  class="form-control" id="spquestion"  v-model="new_spquestion">
                                        </div>

                                        <div class="form-group" v-for="ans in answer">
                                            <label for="answer">Answer</label>
                                            <input type="text" class="form-control" name="answer[]" id="spanswer" v-model="ans.value">
                                        </div>

                                        <button  type="button" class="btn btn-primary" @click="addNewAnswer">Add Answer</button>
                                        <button type="button"  @click="addQuestion" class="btn btn-primary" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </tab-content>

                <tab-content title="PRICING" icon="ti-wallet" >

                    <section v-if="pricing_type =='fixed' ">
                        <div class="form-group row">
                            <label for="price" class="col-sm-3 col-form-label">Prefered Price *</label>
                            <div class="col-sm-9">
                                <input type="number" name="fixed_price" class="form-control"  id="price" >
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="description" class="col-sm-3 col-form-label">Description *</label>
                            <div class="col-sm-9">
                                <textarea  class="form-control" name="fixed_description" id="description" rows="5"> </textarea>
                            </div>
                        </div>questions

                    </section>

                    <section v-if="pricing_type =='option' ">

                        <a class="btn btn-success" v-show="bool"  @click="priceTable(questions)">Show Pricetable</a>

                        <div class="table-scrollable" id="priceTable">
                            <table class="table table-striped table-bordered table-hover dt-responsive" width="100%">
                                <thead>
                                <tr>
                                    <th v-for="(question, index) in questions">Option@{{index+1}}</th>
                                    <th>price</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="(question,index) in question_data" >
                                    <td v-for="(item, cnt) in question"> <input type="hidden" :name="'price['  + index + '][name'+ cnt+ ']'" v-model="item.value" > @{{item.value}} </td>
                                    <td><input  type="number" :name="'price['  + index + '][price]'"  multiple ></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </section>

                </tab-content>

                <button type="submit" class="btn btn-success" slot="finish" >Submit</button>
            </form-wizard>
        </form>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    export default {
        name: 'LineItemCreate',
        components: {

        },

        data() {
            return {
                answer: [],
                new_question: "",
                category_id: '',
                subcategory_id: '',
                subcategory: [],
                name: '',
                thumbnail: '',
                banner: '',
                app_thumbnail: '',
                app_banner: '',
                new_answer: "",
                new_sptitle: "",
                long_description: '',
                short_description: '',
                unit: '',
                minimum_quantity: '',
                new_spquestion: "",
                new_spanswer: [],
                faqs: [],
                questions: [],
                option_price: '',
                pricing_type: '',
                published_status: '',
                pricing_table: [],
                question_data: [],
                bool: true,

                editor: ClassicEditor,
                editorData: '',
                editorConfig: {
                    // The configuration of the rich-text editor.
                    height :1000
        }
            }
        },

        methods: {
            addNewAnswer() {
                this.answer.push({value: ''});
            },
            addData() {
                if (!this.new_question && !this.new_answer) return;
                this.faqs.push({question: this.new_question, answer: this.new_answer});
                this.new_question = '';
                this.new_answer = '';
            },
            addQuestion() {

                this.questions.push({title: this.new_sptitle, question: this.new_spquestion, answer: this.answer});
                this.new_spquestion = '';
                this.answer = [];
                this.new_sptitle = '';
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

                var x = document.getElementById("sptitle" + index);
                var y = document.getElementById("spquestion" + index);
                var z = document.getElementById("spanswer" + index);
                console.log(z.value);
                this.questions[index].title = x.value;
                this.questions[index].question = y.value;
                this.questions[index].answer = z;

            },
            priceTable(questions) {
                questions = JSON.stringify(questions);
                axios.post('/getCombination', {
                    data: questions
                })
                    .then(response => {

                        console.log(response.data);
                        this.question_data = response.data;
                        this.bool = false;

                    });
            },

            deleteQuestion(index) {
                this.questions.splice(index, 1);
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
