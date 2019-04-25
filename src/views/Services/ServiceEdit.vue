<template>
  <b-card class="m-4">

    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>

          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" id="name" name="name" type="text" v-model="service.name">
          </div>

          <div class="form-group">
            <label>Short Description</label>
            <textarea class="form-control" name="short_description" v-model="service.short_description"
                      rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Long Description</label>
            <textarea class="form-control" name="long_description" v-model="service.long_description" rows="10"></textarea>

          </div>


          <div class="form-group">
            <label>Meta Title</label>
            <input class="form-control" name="meta_title" v-model="service.meta_title" type="text">
          </div>


          <div class="form-group">
            <label>Meta Description</label>
            <textarea class="form-control"  name="meta_description" v-model="service.meta_description"
                      rows="10"></textarea>
          </div>

          <div class="form-group">
            <label>Commission Percentage</label>
            <input class="form-control" name="commission" type="text" v-model="service.commission">
          </div>
          <div class="form-group">

            <input type="radio" name="published_status" value="pending" v-model="service.published_status">
            <label>Unpublished</label><br>
            <input type="radio" name="published_status" value="published" v-model="service.published_status">
            <label>Published</label>
          </div>
          <b-button  @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
          </b-button>

        </b-card-text>
      </b-tab>
      <b-tab title="Change Icon">
        <b-card-text>
            <div class="form-group row ">
              <label class="col-md-3 control-label">Icon (SVG)</label>
              <div class="col-md-9">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail">
                    <img :src="src_svg+service.icon_svg" style="width: 200px; height: 150px;">
                  </div>
                  <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Icon (SVG) </span>
                      <input name="icon_svg" type="file" v-on:change="onSVGChange">
                    </span>
                  </div>
                </div>
              </div>
            </div>

          <div class="form-group row ">
            <label class="col-md-3 control-label">Icon (PDF)</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="src_pdf+service.icon_pdf" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Icon (PDF) </span>
                      <input name="icon_pdf" type="file" v-on:change="onPDFChange">
                    </span>
                </div>
              </div>
            </div>
          </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label" for="name"></label>
              <div class="col-sm-9">
                <b-button  @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                </b-button>
              </div>
            </div>
        </b-card-text>
      </b-tab>
      <b-tab title="Change Thumbnail">
        <b-card-text>
          <div class="form-group row ">
            <label class="col-md-3 control-label">Thumbnail</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="src_thumbnail+service.thumbnail" style="width: 200px; height: 150px;">
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
              <label class="col-sm-3 col-form-label" for="name"></label>
              <div class="col-sm-9">
                <b-button  @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
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
                  <img :src="src_banweb+service.banner_web" style="width: 200px; height: 150px;">
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

          <div class="form-group row ">
            <label class="col-md-3 control-label">Banner (Tab)</label>
            <div class="col-md-9">
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="src_bantab+service.banner_tab" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Icon (SVG) </span>
                      <input name="banner_tab" type="file" v-on:change="onBtabChange">
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
                  <img :src="src_banand+service.banner_android" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Icon (SVG) </span>
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
                  <img :src="src_banios+service.banner_ios" style="width: 200px; height: 150px;">
                </div>
                <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Icon (SVG) </span>
                      <input name="banner_ios" type="file" v-on:change="onBiosChange">
                    </span>
                </div>
              </div>
            </div>
          </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label" for="name"></label>
              <div class="col-sm-9">
                <b-button  @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                </b-button>
              </div>
            </div>
        </b-card-text>
      </b-tab>
    </b-tabs>

  </b-card>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "ServiceEdit",
    data() {
      return {
        service: {
          id: '',
          name: '',
          short_description: '',
          long_description: '',
          meta_title: '',
          meta_description: '',
          published_status: '',
          icon_svg: '',
          icon_pdf: '',
          thumbnail: '',
          banner_web: '',
          banner_tab: '',
          banner_android: '',
          banner_ios: '',
        },
        src_svg: '/images/service/icon_svg/',
        src_pdf: '/images/service/icon_pdf/',
        src_thumbnail: '/images/service/thumbnail/',
        src_banweb: '/images/service/banner_web/',
        src_bantab: '/images/service/banner_tab/',
        src_banios: '/images/service/banner_ios/',
        src_banand: '/images/service/banner_android/',

      }
    },
    created(){
      const Base_URL = process.env.VUE_APP_ADMIN_URL;
      this.src_svg = Base_URL + this.src_svg;
      this.src_pdf = Base_URL + this.src_pdf;
      this.src_thumbnail = Base_URL + this.src_thumbnail;
      this.src_banweb = Base_URL + this.src_banweb;
      this.src_bantab = Base_URL + this.src_bantab;
      this.src_banios = Base_URL + this.src_banios;
      this.src_banand = Base_URL + this.src_banand;
      let id = window.location.pathname.split("/").pop();
      this.service.id = id;
      axios.post(`${Base_URL}/api/services/edit`,
      {
        id: this.service.id
      }).then(response =>{
          this.service = response.data;

        })
        .catch(e=>{
          //console.log("error occurs");
        });

    },
    methods: {
      onSVGChange(e) {
        this.service.icon_svg = e.target.files[0];
      },
      onPDFChange(e) {
        this.service.icon_pdf = e.target.files[0];
      },
      onThumbnailChange(e) {
        this.service.thumbnail = e.target.files[0];
      },
      onBwebChange(e) {
        this.service.banner_web = e.target.files[0];
      },
      onBtabChange(e) {
        this.service.banner_tab = e.target.files[0];
      },
      onBandChange(e) {
        this.service.banner_android = e.target.files[0];
      },
      onBiosChange(e) {
        this.service.banner_ios = e.target.files[0];
      },
      onSubmit() {

        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }


        let formData = new FormData();
        formData.append('id', this.service.id);
        formData.append('name', this.service.name);
        formData.append('short_description', this.service.short_description);
        formData.append('long_description', this.service.long_description);
        formData.append('meta_title', this.service.meta_title);
        formData.append('meta_description', this.service.meta_description);
        formData.append('published_status', this.service.published_status);
        formData.append('icon_svg', this.service.icon_svg);
        formData.append('icon_pdf', this.service.icon_pdf);
        formData.append('thumbnail', this.service.thumbnail);
        formData.append('banner_web', this.service.banner_web);
        formData.append('banner_tab', this.service.banner_tab);
        formData.append('banner_android', this.service.banner_android);
        formData.append('banner_ios', this.service.banner_android);
        console.log(formData);
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${Base_URL}/api/services/update`, formData, config)
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
</style>
