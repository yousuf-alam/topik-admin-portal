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
                  <img :src="src_thumbnail+lineitem.thumbnail" style="width: 200px; height: 150px;">
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
                  <img :src="src_banweb+lineitem.banner_web" style="width: 200px; height: 150px;">
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
                  <img :src="src_bantab+lineitem.banner_tab" style="width: 200px; height: 150px;">
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
                  <img :src="src_banand+lineitem.banner_android" style="width: 200px; height: 150px;">
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
                  <img :src="src_banios+lineitem.banner_ios" style="width: 200px; height: 150px;">
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
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Design -  {{index+1}}</label>
                <div class="col-sm-9">
                  <img :src="src_designs+des.image" style="width: 200px; height: 150px;">
                  <button class="btn btn-sm btn-danger top" data-toggle="tooltip" title="Delete Design" @click="deleteDesign(index)"><i class="fa fa-close"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <modal name="modal-design" height="auto" :scrollable="true" :adaptive="true">
          <div class="row justify-content-md-center m-4">
            <div class="col-12 m-3">
              <b-button @click="NewDesign" class="btn btn-success">+ Add More</b-button>
            </div>
            <div class="col-12 m-1" v-for="(des,index) in up_designs">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Design -  {{index+1}}</label>
                <div class="col-sm-9">
                  <button class="btn btn-sm btn-danger" data-toggle="tooltip" title="Delete Answer" @click="deleteUpDesign(index)"><i class="fa fa-close"></i></button>
                  <input class="form-control" type="file" v-on:change="onDesignUpload">
                </div>
              </div>
            </div>
            <div class="col-12 m-3">
              <b-button @click="saveUpDesign" class="btn btn-primary float-right">Update</b-button>
            </div>
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
        src_thumbnail: '/images/lineitem/thumbnail/',
        src_banweb: '/images/lineitem/banner_web/',
        src_bantab: '/images/lineitem/banner_tab/',
        src_banios: '/images/lineitem/banner_ios/',
        src_banand: '/images/lineitem/banner_android/',
        src_designs:'/images/lineitem/designs/',
        up_designs: [],
        new_design: '',
        loading: true,

      }
    },
    created() {

      this.src_thumbnail = BASE_URL + this.src_thumbnail;
      this.src_banweb = BASE_URL + this.src_banweb;
      this.src_bantab = BASE_URL + this.src_bantab;
      this.src_banios = BASE_URL + this.src_banios;
      this.src_banand = BASE_URL + this.src_banand;
      this.src_designs = BASE_URL + this.src_designs;
      let id = window.location.pathname.split("/").pop();
      this.lineitem.id = id;
      axios.post(`${Admin_URL}/line-items/getLineitem`,
        {
          id: this.lineitem.id
        }).then(response => {
        this.lineitem = response.data;
        this.lineitem.fixed_price = response.data.price;
        this.lineitem.options = JSON.parse(response.data.options);
        this.lineitem.price_table = JSON.parse(response.data.price_table);
        this.lineitem.designs = JSON.parse(response.data.designs);
        this.loading = false
      })
        .catch(e => {
          //console.log("error occurs");
        });

    },
    methods: {
      onThumbnailChange(e) {
        this.lineitem.thumbnail = e.target.files[0];
      },
      onBwebChange(e) {
        this.lineitem.banner_web = e.target.files[0];
      },
      onBtabChange(e) {
        this.lineitem.banner_tab = e.target.files[0];
      },
      onBandChange(e) {
        this.lineitem.banner_android = e.target.files[0];
      },
      onBiosChange(e) {
        this.lineitem.banner_ios = e.target.files[0];
      },
      designModal(){
        this.$modal.show('modal-design');
        this.up_designs.push('');
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
        let index = this.up_designs.length -1;
        this.up_designs.splice(index,1);

        this.new_design = e.target.files[0];

        this.up_designs.push(this.new_design);
        this.new_design = '';

      },
      saveUpDesign(){
        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        };
        let formData = new FormData();
        formData.append('id', this.lineitem.id);
        for( let i = 0; i < this.up_designs.length; i++ ){
          let file = this.up_designs[i];
          formData.append('updesigns[' + i + '][image]', file);
        }

        axios.post(`${Admin_URL}/line-items/new-design`, formData, config)
          .then(function (response) {
            currentObj.success = response.data.success;
            location.reload();
          })
          .catch(function (error) {
            currentObj.output = error;
            console.log(error);
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
        formData.append('price_table', JSON.stringify(this.lineitem.price_table));
        formData.append('designs', JSON.stringify(this.lineitem.designs));
        formData.append('thumbnail', this.lineitem.thumbnail);
        formData.append('banner_web', this.lineitem.banner_web);
        formData.append('banner_tab', this.lineitem.banner_tab);
        formData.append('banner_android', this.lineitem.banner_android);
        formData.append('banner_ios', this.lineitem.banner_android);


        axios.post(`${Admin_URL}/line-items/update`, formData, config)
          .then(function (response) {
            currentObj.success = response.data.success;
          })
          .catch(function (error) {
            currentObj.output = error;
            console.log(error);
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
