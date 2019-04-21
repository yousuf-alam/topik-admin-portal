<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6" md="6">
                <customer></customer>
            </b-col>
            <b-col sm="6" md="6">
                <location></location>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <schedule></schedule>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="6">
                <service></service>
            </b-col>
            <b-col sm="6" md="6">
                <cart></cart>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <partner></partner>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    import Customer from './OrderCreate/Customer'
    import Location from './OrderCreate/Location'
    import Schedule from './OrderCreate/Schedule'
    import Service  from './OrderCreate/Service'
    import Cart     from './OrderCreate/Cart'
    import Partner  from './OrderCreate/Partner'
    import Summary  from './OrderCreate/Summary'

    export default {
        name: "OrderCreate",
        components: {
            Customer,
            Location,
            Schedule,
            Service,
            Cart,
            Partner,
            Summary
        }
    }
</script>

<style scoped>

</style>