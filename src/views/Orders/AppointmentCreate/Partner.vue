<template>
  <div class="card m-4">
    <div class="card-body">
        <h3 class="text-center mb-4">Available Service Providers</h3>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="tab-pane list-group partners in active show" style="max-height: 40rem;overflow-y: scroll;">

            <div class="list-group-item list-group-item-action" v-for="(partner, i) in partners" :key="i" @click="selectPartner(partner)" :class="{active: selected_partner === partner , disabledSP: partner.is_booked ===1}">
              <div class="row">
                <div class="col-md-2">
                  <img class="partner-thumb" :src="src_avatar + partner.avatar">
                </div>
                <div class="col-md-10">
                  <h4 class="p-name">{{ partner.name }}</h4>
                </div>
              </div>
            </div>
          </div>
          <h4 class="mt-4" v-if="selected_partner">
            Selected SP:
            <span class="font-weight-bold">{{ selected_partner.name }}</span>
          </h4>
        </div>
      </div>
      <div class="col-sm-12 mt-5">

      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../../utils/EventBus';

  const Base_URL = process.env.VUE_APP_BASE_URL;

  export default {
    name: 'Partner',
    props: ['partners'],
    data(){
      return {
        selected_partner: null,
        src_avatar: ''
      }
    },
    created() {
      this.src_avatar = Base_URL + '/'+ this.src_avatar;
    },
    methods: {
      selectPartner(partner){
        this.selected_partner = partner;
        EventBus.$emit('partner:confirm', this.selected_partner);
      }
    }
  }
</script>

<style scoped="">
  .list-group-item{
    cursor: pointer;
  }
  .list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #524457;
    border-color: #524457;
  }
  .partner-thumb {
    width: 55px;
    height: 55px;
    border: 1px solid rgba(0, 0, 0, 0.27);
    border-radius: 5px;
  }
  .p-name {
    margin-bottom: -3px;
  }
  .list-group-item:active .details-link{
    color: #ffeef7;
  }

</style>
