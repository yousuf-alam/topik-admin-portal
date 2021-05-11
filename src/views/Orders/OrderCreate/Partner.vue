<template>
  <div class="card m-4 p-4">
    <div class="card-body">
      <div class="col-sm-12 black-bg">
        <h3 class="text-center">Available Service Providers</h3>
      </div>

      <div class="col-sm-12 p-3" style="max-height: 40rem;
    overflow-y: scroll;" >

        <div class="tab-pane list-group partners in active show">

          <div class="list-group-item list-group-item-action" v-for="(partner, i) in partners" :key="i" @click="selectPartner(partner)" :class="{active: selected_partner === partner , disabledSP: partner.is_booked ===true}">
            <div class="row">
              <div class="col-sm-2">
                <img class="partner-thumb" :src="partner.avatar">
              </div>
              <div class="col-sm-6">
                <h4 class="p-name">{{ partner.name }}</h4>
                <p v-if="partner.is_booked_slots_available === true">
                  <span  v-for="gg in partner.booked_slots" class="badge badge-success">{{ gg }}</span>
                </p>
<!--                <p v-if="partner.is_booked ===true">[ Booked for the selected time ]</p>-->
              </div>
              <div class="col-sm-4 text-right">
                <h5 class="font-weight-bold">৳ {{ partner.price }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="col-sm-12 mt-5">
        <h4 class="float-left" v-if="selected_partner">
          Selected SP:
          <span class="font-weight-bold">{{ selected_partner.name }}</span>
        </h4>
        <div class="float-right" v-if="partners.length">
          <button class="btn btn-lg btn-primary" :disabled="selected_partner === null" @click="onConfirm()">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../../utils/EventBus';

  const BASE_URL = process.env.VUE_APP_BASE_URL;

  export default {
    name: 'Partner',
    props: ['partners'],
    data(){
      return {
        selected_partner: null,
        src_avatar: ''
      }
    },
    methods: {
      selectPartner(partner){
        this.selected_partner = partner;

      },
      onConfirm(){
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
  .disabledSP{
    pointer-events: none;
    background-color: #cecece;
  }

</style>
