<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Name</label>
            <input class="form-control" type="text" v-model="lineitem.name">
          </div>
          <div v-show="lineitem.pricing_type==='fixed'" class="form-group">
            <label>Price</label>
            <input class="form-control" type="number" v-model="lineitem.fixed_price">
          </div>
          <div class="form-group">
            <label>Duration</label>
            <input class="form-control" type="text" v-model="lineitem.duration">
          </div>
          <div class="form-group">
            <input name="published_status" type="radio" v-model="lineitem.published_status" value="pending">
            <label>Unpublished</label><br>
            <input name="published_status" type="radio" v-model="lineitem.published_status" value="published">
            <label>Published</label>
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Lineitem
          </b-button>
        </b-card-text>
      </b-tab>
      <b-tab title="Change Thumbnail">
        <b-card-text>
          <div class="form-group row ">
            <label class="col-md-3 control-label">Thumbnail</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="url_thumbnail" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Thumbnail </span>
                      <input name="thumbnail" type="file" v-on:change="onThumbnailChange">
                    </span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label"></label>
            <div class="col-sm-9">
              <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Lineitem
              </b-button>
            </div>
          </div>
        </b-card-text>
      </b-tab>
      <b-tab title="Change Banner">
        <b-card-text>
          <div class="form-group row ">
            <label class="col-md-3 control-label">Banner (Web)</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="url_banner_web" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Banner (Web) </span>
                      <input name="banner_web" type="file" v-on:change="onBwebChange">
                    </span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 control-label">Banner (Tab)</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="url_banner_tab" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Banner (Tab) </span>
                      <input name="banner_android" type="file" v-on:change="onBtabChange">
                    </span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row ">
            <label class="col-md-3 control-label">Banner (Android)</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="url_banner_android" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Banner (Android) </span>
                      <input name="banner_android" type="file" v-on:change="onBandChange">
                    </span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row ">
            <label class="col-md-3 control-label">Banner (iOS)</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="url_banner_ios" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Banner (iOS)</span>
                      <input name="banner_ios" type="file" v-on:change="onBiosChange">
                    </span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label"></label>
            <div class="col-sm-9">
              <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Lineitem
              </b-button>
            </div>
          </div>
        </b-card-text>
      </b-tab>
      <b-tab v-if="lineitem.service_id===2" title="Designs">
        <div>
          <div class="row justify-content-md-center m-4">
            <div class="col-12 m-3">
              <b-button @click="designModal" class="btn btn-success m-2">+ Add New Design</b-button>
              <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Lineitem
              </b-button>
            </div>
            <div class="col-12 m-1" v-for="(des,index) in lineitem.designs">
              <b-card>
                <div class="form-group row">
                  <div class="col-sm-3">
                    <img :src="BASE_URL+src_designs+des.image"  class="form-control" style="width: 200px; height: 150px;margin-bottom: 2rem">
                    <button class="btn btn-danger pl-5 pr-5" @click="deleteDesign(index)">X Delete Design</button>
                  </div>
                  <div class="col-sm-5">
                    <div class="form-group row">
                      <label>Design Name</label>
                      <input class="form-control" type="text" size="31" v-model="des.name">
                    </div>
                    <div class="form-group row">
                      <label>Design Description</label>
                      <textarea class="form-control" cols="30" rows="4" v-model="des.description"></textarea>
                    </div>
                  </div>
                </div>
              </b-card>

            </div>
          </div>
        </div>
        <modal name="modal-design" height="auto" :scrollable="true" :adaptive="true">
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
            <b-button @click="saveUpDesign" class="btn btn-success float-right mb-3">Save Design</b-button>
          </div>
        </modal>
      </b-tab>
      <b-tab v-else title="Service Details">
        <b-card-text>
          <div class="form-group">
            <label>Brand/ Ingredients Used</label>
            <input class="form-control" v-model="lineitem.brandInfo" type="text">
          </div>

          <div class="form-group">
            <label>Recommended For</label>
            <input class="form-control" v-model="lineitem.recommendation" type="text">
          </div>
          <div class="form-group">
            <label>Benefits</label>
            <input class="form-control" v-model="lineitem.benefits" type="text">
          </div>
          <div class="form-group">
            <label>Tips For Customer</label>
            <input class="form-control" v-model="lineitem.tips" type="text">
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label"></label>
            <div class="col-sm-9">
              <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Lineitem
              </b-button>
            </div>
          </div>
        </b-card-text>
      </b-tab>
      <b-tab v-if="lineitem.pricing_type ==='option'" title="Change Pricing">
        <b-card-text>
        <div class="table-responsive">
          <table class="table table-striped table-bordered dt-responsive" width="100%">
            <thead>
            <tr>
              <th  v-for="(option,index) in lineitem.options">Option {{ index+1 }}</th>
              <th> Price </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(price,index) in lineitem.price_table">
              <td v-for="(option,key) in lineitem.options">
                {{ price[`name${key}`] }}
              </td>
              <td>
                <input  type="number" v-model="price.price"  multiple>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
          <b-row>
            <b-col>
              <div class="float-right">
                <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Lineitem
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>

  import axios from 'axios';
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;
  const BASE_URL  = process.env.VUE_APP_BASE_URL;
  export default {
    name: "LineitemEdit",
    data() {
      return {
        BASE_URL: BASE_URL,
        lineitem: {
          id: '',
          name: '',
          service_id: '',
          category_id: '',
          subcategory_id: '',
          published_status: '',
          thumbnail: '',
          banner_web: '',
          banner_tab: '',
          banner_android: '',
          banner_ios: '',
          details: {
            brand: '',
            recommendation: '',
            tips: '',
            benefits: '',
          },
          duration: '',
          pricing_type: '',
          fixed_price : '',
          price_table: [],
          question_data: [],
          bool: true,
          designs: [],
        },
        url_thumbnail: '',
        url_banner_web: '',
        url_banner_tab: '',
        url_banner_android: '',
        url_banner_ios: '',

        src_thumbnail: '/images/lineitem/thumbnail/',
        src_banweb: '/images/lineitem/banner_web/',
        src_bantab: '/images/lineitem/banner_tab/',
        src_banios: '/images/lineitem/banner_ios/',
        src_banand: '/images/lineitem/banner_android/',
        src_designs:'/images/lineitem/designs/',
        up_designs: [],
        new_design: [],
        loading: true,

      }
    },
    created() {

      /*
      this.src_thumbnail = BASE_URL + this.src_thumbnail;
      this.src_banweb = BASE_URL + this.src_banweb;
      this.src_bantab = BASE_URL + this.src_bantab;
      this.src_banios = BASE_URL + this.src_banios;
      this.src_banand = BASE_URL + this.src_banand;
      this.src_designs = BASE_URL + this.src_designs;
      */
     this.fetchData();


    },
    methods: {
      fetchData() {
          let id = window.location.pathname.split("/").pop();
          this.lineitem.id = id;
          axios.post(`${Admin_URL}/line-items/getLineitem`, { id: this.lineitem.id})
          .then(response => {
            console.log('Response === === === ', response.data);
            this.lineitem = response.data;
            this.lineitem.fixed_price = response.data.price;
            this.lineitem.options = JSON.parse(response.data.options);
            this.lineitem.price_table = JSON.parse(response.data.price_table);
            this.lineitem.designs = JSON.parse(response.data.designs);
            this.loading = false;

            this.url_thumbnail = this.lineitem.thumbnail === null ? null : `${BASE_URL}${this.src_thumbnail}${this.lineitem.thumbnail}`;
            this.url_banner_web = this.lineitem.banner_web === null ? null : `${BASE_URL}${this.src_banweb}${this.lineitem.banner_web}`;
            this.url_banner_tab = this.lineitem.thumbnail === null ? null : `${BASE_URL}${this.src_bantab}${this.lineitem.banner_tab}`;
            this.url_banner_android = this.lineitem.thumbnail === null ? null : `${BASE_URL}${this.src_banand}${this.lineitem.banner_android}`;
            this.url_banner_ios = this.lineitem.thumbnail === null ? null : `${BASE_URL}${this.src_banios}${this.lineitem.banner_ios}`;

          })
          .catch(e => {
              //console.log("error occurs");
          });
      },

      previewImage(e, file_name, file_url) {
        const file = e.target.files[0];
        if (file === undefined) {
          return;
        }
        this.lineitem[file_name] = file;
        this[file_url] = URL.createObjectURL(file);
      },


      onThumbnailChange(e) {
        this.previewImage(e, 'thumbnail', 'url_thumbnail');
      },
      onBwebChange(e) {
        this.previewImage(e, 'banner_web', 'url_banner_web');
      },
      onBtabChange(e) {
        this.previewImage(e, 'banner_tab', 'url_banner_tab');
      },
      onBandChange(e) {
        this.previewImage(e, 'banner_android', 'url_banner_android')
      },
      onBiosChange(e) {
        this.previewImage(e, 'banner_ios', 'url_banner_ios');
      },
      designModal(){
        this.$modal.show('modal-design');
      },
      NewDesign(){
        this.up_designs.push('');
        console.log('new new');
      },
      deleteDesign(index)
      {
        this.lineitem.designs.splice(index,1);
      },
      deleteUpDesign(index)
      {
        this.up_designs.splice(index,1);
      },
      onDesignUpload(e) {

        this.new_design.image = e.target.files[0];
        this.new_design.tmp_image = URL.createObjectURL(this.new_design.image);

      },
      saveUpDesign(){

        this.$modal.hide('modal-design');

        this.up_designs.push(this.new_design);


        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        };
        let formData = new FormData();
        formData.append('id', this.lineitem.id);


        for( let i = 0; i < this.up_designs.length; i++ ){
          let file = this.up_designs[i]['image'];
          let name = this.up_designs[i]['name'];
          let desc = this.up_designs[i]['description'];
          formData.append('updesigns[' + i + '][image]', file);
          formData.append('updesigns[' + i + '][name]', name);
          formData.append('updesigns[' + i + '][description]', desc);
        }

        axios.post(`${Admin_URL}/line-items/new-design`, formData, config)
          .then(function (response) {
            currentObj.success = response.data.success;
            alert(response.data.message);
            if(response.data.success===true)
            {
              //this.$swal('Success', response.data.message, 'success');
              alert(response.data.message);
            }
            else
            {
              this.$swal('Error', "Something wrong Happened", 'error');
            }
            location.reload();
          })
          .catch(function (error) {
            currentObj.output = error;
            console.log(error);
            alert(response.data.message);
          });
      },
      onSubmit() {
        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        };
        let formData = new FormData();
        formData.append('id', this.lineitem.id);
        formData.append('name', this.lineitem.name);
        formData.append('published_status', this.lineitem.published_status);
        formData.append('brand', this.lineitem.brandInfo);
        formData.append('tips', this.lineitem.tips);
        formData.append('benefits', this.lineitem.benefits);
        formData.append('recommendation', this.lineitem.recommendation);
        formData.append('duration', this.lineitem.duration);
        formData.append('price', this.lineitem.fixed_price);
        formData.append('price_table', JSON.stringify(this.lineitem.price_table));
        formData.append('designs', JSON.stringify(this.lineitem.designs));
        formData.append('thumbnail', this.lineitem.thumbnail);
        formData.append('banner_web', this.lineitem.banner_web);
        formData.append('banner_tab', this.lineitem.banner_tab);
        formData.append('banner_android', this.lineitem.banner_android);
        formData.append('banner_ios', this.lineitem.banner_ios);


        axios.post(`${Admin_URL}/line-items/update`, formData, config)
          .then(function (response) {
            console.log('Lineitem Update Successful === ', response.data);
            currentObj.success = response.data.success;
            if(response.data.success===true)
            {
              alert(response.data.message);
            }
            else
            {
              alert("Something wrong happened");
            }
          })
          .catch(function (error) {
            currentObj.output = error;
             console.log('Errorrrrr === ', error.response);

          });
      }
    }
  }
</script>

<style scoped>
  .nav-pills .nav-link {
    border-radius: 1.5rem;
    border: 1px solid #d0d2d4;
  }

  .nav-link {
    display: block;
    padding: 0.5rem 2rem;
    margin: 0rem 2rem;
  }
  .top{
    vertical-align: top;
  }
</style>
