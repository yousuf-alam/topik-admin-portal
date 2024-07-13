<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-gift"></i><span class="ml-1">Promo Codes</span></h4>
      <div class="">
        <h1 class="my-auto tableName"></h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'PromoCreate' }">
          <button class="btn btn-success">Create New promo</button>
        </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <router-link :to="{ name: 'PartnerPromos' }">
            <button class="btn btn-romoni-secondary">See Partner Promos</button>
          </router-link>
          <v-client-table :data="promos" :columns="columns" :options="options">
            <template slot="Location" slot-scope="props">
              <div v-if="props.row.Location != 'All' && props.row.Location">
                <span v-for="(location, index) in limitedLocations(props.row)" :key="index" class="location-names">
                  {{ location.trim() }}
                </span>
                <span v-if="shouldShowMore(props.row.Location)" @click="toggleShowMore(props.row.id)" class="show-more">
                  {{ showMore[props.row.id] ? 'Show Less' : 'Show More' }}
                </span>
              </div>
              <div v-else>All</div>
            </template>

            <template slot="action" slot-scope="props">
              <div>
                <router-link v-if="getUserPermission('promocode update')" :to="{ name: 'PromoEdit', params: { id: props.row.id } }">
                  <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>
                <span @click="publish(props.row.id)" class="btn btn-success btn-sm m-1" data-toggle="tooltip"
                  title="Publish">
                  <i class="fa fa-upload"></i>
                </span>
              </div>
            </template>
          </v-client-table>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal for showing all locations -->
    <b-modal id="locations-modal" title="All Locations" v-if="currentLocations.length > 0"
      @hide="resetCurrentLocations">
      <div v-for="(location, index) in currentLocations" :key="index" class="location-names">
        {{ location.trim() }}
      </div>
      <template #modal-footer="{ ok }">
        <b-button size="sm" @click="ok()">Close</b-button>
      </template>
    </b-modal>
  </div>
</template>



<script>
import axios from 'axios';
export default {
  name: 'Promo Codes',
  data() {
    return {
      promos: [],
      columns: ['id', 'code', 'type', 'medium', 'Location', 'status', 'discount_amount', 'expires_at', 'action'],
      options: {
        pagination: { nav: 'fixed' },
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: { base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort' },
      },
      showMore: {},
      currentLocations: [],
    };
  },
  created() {
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    axios.get(`${ADMIN_URL}/all-promos`, {
      params: {
        type: 'all',
      },
    })
      .then(response => {
        this.promos = response.data.map(promo => {
          promo.medium = promo.medium.charAt(0).toUpperCase() + promo.medium.slice(1);
          promo.type = promo.type.charAt(0).toUpperCase() + promo.type.slice(1);
          promo.status = promo.status.charAt(0).toUpperCase() + promo.status.slice(1);
          return promo;
        });
      })
      .catch(e => {
        //console.log("error occurs");
      });
  },
  methods: {
    publish(promo_id) {
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      axios.post(`${ADMIN_URL}/push-promos/publish`, { id: promo_id })
        .then(response => {
          if (response.data.success) {
            this.$swal('Success', response.data.message, 'success');
          } else {
            this.$swal('Error', 'Something went wrong', 'error');
          }
          window.location.reload();
        })
        .catch(e => {
          console.log("error occurs", e);
        });
    },
    limitedLocations(row) {
      const locationArray = row.Location.split(',');
      return locationArray.length > 5 && !this.showMore[row.id] ? locationArray.slice(0, 5) : locationArray;
    },
    shouldShowMore(locations) {
      return locations.split(',').length > 5;
    },

    toggleShowMore(id) {
      const row = this.promos.find(promo => promo.id === id);
      this.currentLocations = row.Location.split(',');
      this.$nextTick(() => {
        this.$bvModal.show('locations-modal');
      });
    },

    resetCurrentLocations() {
      this.currentLocations = [];

    },
  },
}
</script>


<style scoped>
.location-names {
  display: inline-block;
  padding: 5px 10px;
  background-color: #41b883;
  border-radius: 5px;
  margin: 2px;
}

.show-more {
  display: block;
  border-radius: 5px;

  margin: 2px;
  cursor: pointer;
  color: black;
  text-decoration: underline;
}
</style>
