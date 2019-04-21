<template>
  <b-card class="m-4">

    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>

          <div class="form-group">
            <label for="name">Name*</label>
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
                  <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                    <img :src="src_svg+service.icon_svg">
                  </div>
                  <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Select image </span>
                      <input name="banner" type="file">
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group row ">
              <label class="col-md-3 control-label">App Banner *</label>
              <div class="col-md-9">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                    <img src="">
                  </div>
                  <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Select image </span>
                      <input data-show-preview="true" name="app_banner" type="file">
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label" for="name"></label>
              <div class="col-sm-9">
                <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                </b-button>
              </div>
            </div>
        </b-card-text>
      </b-tab>
      <b-tab title="Change Thumbnail">
        <b-card-text>
            <div class="form-group row ">
              <label class="col-md-3 control-label">Banner *</label>
              <div class="col-md-9">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                    <img src="">
                  </div>

                  <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Select image </span>
                      <input name="banner" type="file">
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group row ">
              <label class="col-md-3 control-label">App Banner *</label>
              <div class="col-md-9">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                    <img src="">
                  </div>

                  <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Select image </span>
                      <input data-show-preview="true" name="app_banner" type="file">
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-3 col-form-label" for="name"></label>
              <div class="col-sm-9">
                <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                </b-button>
              </div>
            </div>
        </b-card-text>
      </b-tab>
      <b-tab title="Change Banner">
        <b-card-text>
            <div class="form-group row ">
              <label class="col-md-3 control-label">Banner *</label>
              <div class="col-md-9">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                    <img src="">
                  </div>

                  <div>
                      <span class="btn default btn-file">
                        <span class="fileinput-new"> Select image </span>
                        <input name="banner" type="file">
                      </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group row ">
              <label class="col-md-3 control-label">App Banner *</label>
              <div class="col-md-9">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                    <img src="">
                  </div>
                  <div>
                    <span class="btn default btn-file">
                      <span class="fileinput-new"> Select image </span>
                      <input data-show-preview="true" name="app_banner" type="file">
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label" for="name"></label>
              <div class="col-sm-9">
                <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                </b-button>
              </div>
            </div>
        </b-card-text>
      </b-tab>
    </b-tabs>

  </b-card>
</template>

<script>
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
        src_svg: '/images/service/icon_svg',
        src_pdf: '/images/service/icon_pdf',
        src_thumbnail: '/images/service/thumbnail',
        src_banweb: '/images/service/banner_web',
        src_bantab: '/images/service/banner_tab',
        src_banios: '/images/service/banner_ios',
        src_banand: '/images/service/banner_android',

      }
    },
    created(){
      const Base_URL = process.env.VUE_APP_ADMIN_URL;
      let id = window.location.pathname.split("/").pop();
      axios.post(`${Base_URL}/api/services/${id}`,
      {
        id: id
      }).then(response =>{
          this.service = response.data;

        })
        .catch(e=>{
          //console.log("error occurs");
        });

    },
    methods: {
      onSVGChange(e) {
        this.icon_svg = e.target.files[0];
      },
      onPDFChange(e) {
        this.icon_pdf = e.target.files[0];
      },
      onThumbnailChange(e) {
        this.thumbnail = e.target.files[0];
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
      onSubmit() {

        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }


        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('short_description', this.short_description);
        formData.append('long_description', this.long_description);
        formData.append('meta_title', this.meta_title);
        formData.append('meta_description', this.meta_description);
        formData.append('published_status', this.published_status);
        formData.append('icon_svg', this.icon_svg);
        formData.append('icon_pdf', this.icon_pdf);
        formData.append('thumbnail', this.thumbnail);
        formData.append('banner_web', this.banner_web);
        formData.append('banner_tab', this.banner_tab);
        formData.append('banner_android', this.banner_android);
        formData.append('banner_ios', this.banner_android);
        console.log(formData);
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${Base_URL}/api/services/edit/`+this.service.id, {name: this.service.name}, config)
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
