<template>
  <div class="card m-4 p-4">
    <div class="card-body">
      <h4 class="card-title text-center mb-5">Order Summary</h4>
      <div class="row m-3">
        <div class="col-6">
          Total Service Charge :
        </div>
        <div class="col-6">
          {{invoice.total_service_charge}}
        </div>
      </div>
      <div class="row m-3">
        <div class="col-6">
          Advance Payment Discount :
        </div>
        <div class="col-6">
          {{invoice.discount_adv_pay}}
        </div>
      </div>
      <div class="row m-3">
        <div class="col-6">
          Promo Discount :
        </div>
        <div class="col-6">
          {{invoice.promo_discount}}
        </div>
      </div>
      <div class="row m-3">
        <div class="col-6">
          Total Discount :
        </div>
        <div class="col-6">
          {{invoice.discount}}
        </div>
      </div>
      <div class="row m-3">
        <div class="col-6">
          Total Bill :
        </div>
        <div class="col-6">
          {{invoice.total_bill}}
        </div>
      </div>

      <div class="row m-3">
        <div class="col-6">
          Total Service:
        </div>
        <div class="col-6">
          {{invoice.serviceNo}}
        </div>
      </div>
     <!-- <div class="row m-3">
        <div class="col-6">
          Address:
        </div>
        <div class="col-6">
          {{invoice.address}}
        </div>
      </div>-->
      <div class="row m-3">
        <div class="col-6">
          Delivery Date:
        </div>

        <div class="col-6" v-if="invoice.schedule !== undefined">
           {{invoice.schedule.selected_date}}
        </div>
      </div>
      <div class="row m-3">
        <div class="col-6">
          Delivery Time:
        </div>
        <div class="col-6" v-if="invoice.schedule !== undefined">
          {{invoice.schedule.selected_time}}
        </div>
      </div>
      <div class="row m-3">
        <div class="col-6">
          Service Provider:  :
        </div>
        <div class="col-6">
          {{invoice.sp}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: "Summary",
    props: ['invoice']
  }
</script>
