<template>
    <div class="animated fadeIn">
      <div class="cardheading">
          <h4><i class="fa fa-table"></i><span class="ml-1">Third Party Content</span></h4>
        <router-link class="btn btn-success mb-2" to="/third-party-contents/create">+ Add Content</router-link>
      </div>
      <b-row>
          <b-col>
              <b-card>
                  <div class="d-flex">
                    <div style="margin-left: auto;" class="mb-3">
                      <span class="mx-1">Per Page: </span>
                      <select class="form-control" v-model="perPageItem" @change="makeReadySearchParams()">
                        <option :value="5">5</option>
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                      </select>
                    </div>
                </div>
                <div class="table-responsive" id="order_table_container">
                <table>
                  <tr class="hadingOne">
                    <th v-for="item in columns" :key="item" @click="headingSortColumn(item)">
                      <div class="d-flex justify-content-between">
                        <span class="mr-2"> {{ makeColNameReadable(item)}} </span>
                        <span :class="getSortIconStyle(item)" class="d-flex align-items-center"></span>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th v-for="item in columns" :key="item">
                      <div v-if="dateColumns.includes(item)">
                        <span v-html="makeDateRangeStrReadable(dateRangeString[item])"></span>
                        <VueCtkDateTimePicker
                          input-size=sm


                          :range=true
                          :no-label=true
                          label="Select"
                          id="RangeDatePicker"
                          format="YYYY-MM-DD"
                          formatted="ll"

                          color="#533b87"

                          v-model="dateRange[item]"
                          @formatted-value="handleDateRangeChange(item)"

                        >
                          <!-- <button class="btn btn-secondary">Select</button> -->
                        </VueCtkDateTimePicker>

                      </div>
                      <div v-else-if="noFilteColumns.includes(item)">

                      </div>
                      <div v-else>
                        <input
                          v-model="columnInputs[item]"
                          :name="item"
                          class="form-control"
                          :placeholder="`Filter By ${item}`"
                          @keyup="handleInputChange"
                        />
                      </div>
                    </th>
                  </tr>

                  <tr v-for="content in contents" :key="content.id">
                    <td> {{ content.created_at }} </td>
                    <td> {{ content.id }} </td>
                    <td> {{ content.name }} </td>
                    <td> {{ content.platform}} </td>
                    <td> {{ content.type }} </td>
                    <td class="text-center">
                      <span :class="getStyleOfStatus(content.is_published)" style="font-size: 12px;">
                        {{ content.is_published }}
                      </span>
                    </td>

                    <td>
                      <router-link :to="{ path:'third-party-contents/edit/'+content.id }">
                                <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit">
                                    <i class="fa fa-pencil"></i>
                                </span>
                  </router-link>
                  <router-link to="" >
                    <span @click="deleteContent(content.id)" class="btn btn-danger btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
                  </router-link>
                    </td>
                  </tr>
                </table>
                <div class="pl-1 mt-3">
                  <span>{{total_count}} records </span>
                </div>
                </div>
              </b-card>
            <paginate
              :pageCount="totalPageCount"
              :clickHandler="onPaginateClick"
              :prevText="'Prev'"
              :nextText="'Next'"
              :container-class="'pagination'">
            </paginate>
          </b-col>
      </b-row>

    </div>
</template>


<script>

  import axios from 'axios';
  import moment from 'moment';
  import Vue from 'vue';
  import paginate from 'vuejs-paginate';
  import _ from 'lodash';
  import Datepicker from 'vuejs-datepicker';
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
  let typingTimer;
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;

    export default {
      name: 'ThirdPartyContents',
      components: {
        Datepicker,
        paginate
      },
        data() {
            return {
                contents: [],
                total_count: '0',
                date_from: '',
                date_to: '',
                date_type: 'schedule',
                service: 'all',
                category: 'all',
                categories: [],
                status: 'all',
                exporting: false,

              totalPageCount: 0,
              perPageItem: 10, // Only set this value
              pageNumber: 0,

              toSortColumn: '',
              sortingDirection: '',
              columns: [
                'created_at',
                'id',
                'name' ,
                'platform',
                'type',
                'is_published',
                'action'
              ],
              columnInputs: {

              },
              dateColumns: [ "created_at"],
              noFilteColumns: ["action" ],


              dateRange: {
                created_at: '',
              },
              dateRangeString: {
                created_at: '',
              }
            }
        },
      created(){
        this.makeReadySearchParams();
      },
      computed: {
        getStyleOfStatus: function () {
          return (parm) => {
            if (parm === 'published') {
              return 'badge badge-success';

            } else if (parm === 'pending') {
              return 'badge badge-warning';

            }else {
              return '';
            }
          }
        },
        getSortIconStyle: function () {
          return (parm) => {
            const defaultIcon = 'fa fa-sort';
            if (parm === this.toSortColumn) {
              return `${defaultIcon}${this.sortingDirection}`;
            }
            return `${defaultIcon}`;
          }
        },
        makeDateRangeStrReadable: function() {
          return (name) => {
            if (name === null || name === undefined || name === '') {
              return name;
            }
            return name;
            let res = name.split("-");
            return res[0]+"<br> - <br>"+res[1];
          }
        },
        makeColNameReadable: function() {
          return (colName) => {
            const splitedWords = colName.split("_");
            for (let  index in splitedWords) {
              splitedWords[index] = splitedWords[index].charAt(0).toUpperCase() + splitedWords[index].slice(1);
            }
            const readableName = splitedWords.join(" "); // splited by _ then join them.
            return readableName.replace(/([a-z0-9])([A-Z])/g, '$1 $2'); // even to split the camelcase
          }
        }
      },
        methods: {
          createOrder(type)
          {
            if(type!=='Beauty Appointment')
            {
              this.$router.push({ name: 'OrderCreate', params: { type } })
            }
            else
            {
              this.$router.push({ name: 'AppointmentCreate' , params: {type} })
            }
           console.log(type);

          },
          handleDateRangeChange(colName) {

            // console.log(
            //     '\ncolName === ', colName,
            //     '\ndateRange === ', this.dateRange,
            //     '\n333333', this.dateRange[colName]
            //     );

            if (this.dateRange[colName] === '' || this.dateRange[colName] === null) {
              this.dateRangeString[colName] = '';
            } else {
              const startDate = this.dateRange[colName].start;
              const endDate = this.dateRange[colName].end;

              const startMoment = moment(startDate).format("MMM Do YY");
              const endMoment = (endDate === null || endDate === '') ? 'Select End Date' : moment(endDate).format("MMM Do YY");
              this.dateRangeString[colName]  =  startMoment + "-" + endMoment;

            }
            this.makeReadySearchParams();
            console.log('Seeeeee   ', this.dateRange, 'EEEEE', this.dateRangeString);

          },
          headingSortColumn(colName) {
            // console.log('heading Click ', colName);
            if (this.toSortColumn === colName) {
              if (this.sortingDirection === '') {
                this.sortingDirection = "-up"
              } else {
                this.sortingDirection = this.sortingDirection === '-up' ? '-down' : '-up'
              }
            } else {
              this.sortingDirection = '-up';
            }
            this.toSortColumn = colName;
            const copyArray = [ ...this.contents ]

            let sortByColumn = colName;
            if (colName === 'action') {
              sortByColumn = 'id';
            }
            if (this.sortingDirection === '-up') {
              this.contents = _.orderBy(copyArray, [sortByColumn], ['asc']);
            } else {
              this.contents = _.orderBy(copyArray, [sortByColumn], ['desc']);
            }

          },
          handleInputChange(e) {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
              this.makeReadySearchParams()
            }, 500);

          },
          makeReadySearchParams() {
            const id = this.getInputValue("id")
            const name = this.getInputValue("name");
            const platform = this.getInputValue("platform");
            const type = this.getInputValue("type");
            const is_published = this.getInputValue("is_published");
            
            let from = '';
            let to = '';
            if (this.dateRange.created_at === ""|| this.dateRange.created_at == null) {
              from = '';
              to = ''
            } else {
              from = this.dateRange.created_at.start;
              to = this.dateRange.created_at.end;
            }
            const created_at = {from: from,     to: to }; // will set these two later

            const srcParms = {
              id,platform, name, type,
              is_published,created_at
            };

            this.fetchContents(srcParms);
            console.log('search ---- parms ---- ', srcParms);

          },
          getInputValue(colName) {
            if (this.columnInputs[colName] === undefined) {
              return '';
            }
            return this.columnInputs[colName];
          },
          fetchContents(srcParms) {
            //console.log('SEARCH PARAMS === ', JSON.stringify(srcParms));
            axios.get(`${Admin_URL}/fetch-third-party-contents/${this.perPageItem}/${this.pageNumber}`, {
              params: srcParms
            })
              .then(response => {
                // console.log('fetchOrder:: response data ===== ', response.data );
                this.contents = response.data.contents;
                this.totalPageCount = Math.ceil(response.data.total_count / this.perPageItem);
                this.total_count = response.data.total_count;
              })
              .catch(e => {
                // console.log("error occurs", e.response);
              });
          },
          onPaginateClick(parm) {
            this.pageNumber = parm - 1; // As api start from "pageNumber 0"
            this.makeReadySearchParams();
          },
          deleteContent(id)
            {
                if (confirm('Are you sure?') ) {
                    axios.post(`${Admin_URL}/third-party-contents/delete-content`,
                        {
                            id : id
                        })
                        .then(response => {
                            this.$swal('Content Deleteed', response.data.message, 'success');
                            window.location.reload();
                        }).catch(error => {
                            console.log(error);

                    })

                } else {
                    console.log('Noooooo')
                }
            },
        },
    }
</script>
<style scoped>
  .vdp-datepicker{
    display: inline-block;
    margin-right: 1rem;
  }
  .form-control{
    border: 1px solid #a9a9a9;
  }
  table, th, td {
    border: 1px solid #c4c4b7;
    border-collapse: collapse;
  }
  th, td {
    padding: 15px;
    text-align: left;
  }
  table#t01 {
    width: 100%;
    background-color: #f1f1c1;
  }
  th {
    border-bottom-width: 2px;
    border-bottom-color: #c4c4b7;
  }

  #order_table_container {
    min-height: 600px;
  }
  .badge {
    font-size: 0.75rem;
  }
  .glow {
    /*animation: blinker 1s linear infinite;*/
  -webkit-animation: glowing 1500ms infinite;
  -moz-animation: glowing 1500ms infinite;
  -o-animation: glowing 1500ms infinite;
  animation: glowing 1500ms infinite;
  }
  @keyframes blinker {
    50% { opacity: 0; }
  }
  @-webkit-keyframes glowing {
    0% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; -webkit-box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #b2295a; -webkit-box-shadow: 0 0 3px #b24b71; }
  }

  @-moz-keyframes glowing {
    0% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; -moz-box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
  }

  @-o-keyframes glowing {
    0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  }

  @keyframes glowing {
    0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  }
</style>
