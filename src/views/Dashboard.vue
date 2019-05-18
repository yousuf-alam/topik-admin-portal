<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-cogs bg-primary p-4 font-2xl mr-3 float-left"></i>
            <div class="h5 text-primary mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-laptop bg-info p-4 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-moon-o bg-warning p-4 font-2xl mr-3 float-left"></i>
            <div class="h5 text-warning mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-bell bg-danger p-4 font-2xl mr-3 float-left"></i>
            <div class="h5 text-danger mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row><!--/.row-->
  </div>
</template>

<script>


export default {
  name: 'dashboard',
  components: {

  },

}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
