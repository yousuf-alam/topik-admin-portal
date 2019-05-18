<template>
  <b-card class="m-4 p-4">
    <div class="row">
      <div class="col-12 pb-4">
        <b-button @click="NewDesign" class="btn btn-success center-div">+ Add Custom Design</b-button>
      </div>
      <div class="col-12" v-for="(des,index) in designs">
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Design -  {{index+1}}</label>
          <div class="col-sm-9">
            <button class="btn btn-sm btn-danger" data-toggle="tooltip" title="Delete Answer" @click="deleteDesign(index)"><i class="fa fa-close"></i></button>
            <input class="form-control" type="file" v-on:change="onDesignUpload">
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
  import EventBus from '../../../utils/EventBus';
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;

  export default {
    name: "Design",
    data() {
      return {
        designs: [],
        new_design: '',
      }
    },
    methods : {
      NewDesign(){
        this.designs.push('');
        console.log('new new');
      },
      deleteDesign(index)
      {
        this.designs.splice(index,1);
      },
      onDesignUpload(e) {
        let index = this.designs.length -1;
        this.designs.splice(index,1);

        this.new_design = e.target.files[0];

        this.designs.push(this.new_design);
        this.new_design = '';

        EventBus.$emit('design:add',this.designs);

      },
    }
  }
</script>

<style scoped>

</style>
