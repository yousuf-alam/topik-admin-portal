<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-file-image-o"></i><span class="ml-1">B2C Homepage Sections</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
          <router-link :to="{ name: 'B2CSectionCreate'}">
              <button class="btn btn-success">Create New Content</button>
          </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="sections" :columns="columns" :options="options">
            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${BASE_URL}/${src_image}${props.row.image}`" style="width: 160px;height: 90px;">
              </div>
            </template>
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'B2CSection / Edit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete"> <i class="fa fa-trash"></i></span>
              </div>
            </template>
          </v-client-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
  import axios from 'axios';
  const BASE_URL  = process.env.VUE_APP_BASE_URL;

  export default {
    name: 'B2CSections',
    data() {
      return {
        BASE_URL: BASE_URL,
        sections : [],
        src_image : 'images/banners/',
        columns: ['image', 'title', 'section', 'published_status', 'created_at', 'action'],
        options: {
          pagination: {nav: 'fixed'},
          filterByColumn: true,
          toMomentFormat: 'YYYY-MM-DD',
          sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

        }

      }
    },
    created(){
      const Admin_URL = process.env.VUE_APP_ADMIN_URL;
      const BASE_URL  = process.env.VUE_APP_BASE_URL;
      axios.get(`${Admin_URL}/b2c/items`)
        .then(response => {
          // console.log('B2CSections.vue, response === ', response.data);
          this.sections = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {

    },
  }
</script>
