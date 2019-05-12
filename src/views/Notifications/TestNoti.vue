<template>
    <div>
        <div class="customcard">
            <h3>Test Pusher Notification in vue</h3>
            <div>
                <span class="btn noti-button" @click="handleClick">{{notiCounter}}</span>
                <br>
                <div v-if="showNotiPanel">
                    <div class="border" v-for="(noti, index) in notifications" :key="index">
                        <div>{{noti}}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Pusher from 'pusher-js';

export default {
    name: 'testnoti',
    data() {
        return {
            keyValue: 0,
            notiCounter: 0,
            showNotiPanel: false,
            notifications: [],

        }
    },
    created() {
        /*
        
        */
        this.listenPrivateChannel();
    },
    methods: {
        listenPrivateChannel() {
            const { APP_KEY, APP_CLUSTER } = this.$gbvar.PUSHER_CREDENTIALS;
            window.Echo.private('orders')
                .listen("TestOrderStatusUpdated", e => {
                    console.log('Listened By laravel-echo ', e);
                    this.notiCounter++;
                    this.notifications.push(e);
                });
        },
        handleClick() {
            this.showNotiPanel = true;
            console.log('inside handle click...');
        }
    }

}
</script>

<style>
.noti-button {
  color: white;
  border-radius: 50%; 
  background: red;
  padding: 10px; 
  width: 30px;
  height: 30px;
  display: flex;
  justify-content:center;
  align-items:center;
}



</style>
