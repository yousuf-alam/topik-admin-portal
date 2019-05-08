<template>
    <div class="customcard">
        <h3>Test Pusher Notification in vue</h3>
    </div>
</template>

<script>
import Pusher from 'pusher-js';

export default {
    name: 'testnoti',
    data() {
        return {

        }
    },
    mounted() {
        this.listenPrivateChannel();
    },
    methods: {
        listenPrivateChannel() {
            const { APP_KEY, APP_CLUSTER } = this.$gbvar.PUSHER_CREDENTIALS;

            window.Echo.private('orders')
                .listen("TestOrderStatusUpdated", e => {
                    console.log('Listened By laravel-echo ', e);
                });
        }
    }

}
</script>

<style>

</style>
