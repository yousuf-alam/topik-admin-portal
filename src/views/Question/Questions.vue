<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="icon icon-location-pin"></i><span class="ml-1">questions</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'QuestionCreate'}">
          <button class="btn btn-success">Create New Question</button>
        </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>

          <v-client-table :data="questions" :columns="columns" :options="options">
            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${BASE_URL}/${src_image}${props.row.image}`" style="width: 160px;height: 90px;">
              </div>
            </template>
            <template slot="audio" slot-scope="props">
              <div class="center-div">
                <audio controls>
                  <source :src="`${BASE_URL}/${src_audio}${props.row.audio}`" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </template>

            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'EditQuestion', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.show">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete">
                                    <i class="fa fa-trash"></i></span>
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
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL  = process.env.VUE_APP_BASE_URL;
export default {
  name: 'Questions',
  data() {
    return {
      questions : [],
      columns: ['id','type', 'title','image', 'audio','action'],
      BASE_URL:BASE_URL,
      ADMIN_URL:ADMIN_URL,
      src_image : 'images/',
      src_audio : 'listening/',

      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },
  created(){
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    axios.get(`${ADMIN_URL}/all-questions`)
      .then(response =>{
        this.questions = response.data.data;
      })
      .catch(e=>{
        console.log("error occurs");
      });
  },
  methods: {

    delete(id) {
      // The id can be fetched from the slot-scope row object when id is in columns
      console.log('hi');
    }
  }
}
</script>
