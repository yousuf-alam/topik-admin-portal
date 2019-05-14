<template>
    <div>
        <div class="customcard">
            <h3>Test Pusher Notification in vue</h3>
            <div>
                <span class="btn noti-button" @click="handleClick">{{notiCounter}}</span>
                <br>
                <div v-if="showNotiPanel" class="notiPanel" @scroll="infiniteScroll">
                    <div>Test Noti Panel.</div>
                    <div class="border" v-for="(noti, index) in notifications" :key="index">
                        <div>{{ noti.data.body }}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Pusher from 'pusher-js';
import axios from 'axios';
import _ from 'lodash';

export default {
    name: 'testnoti',
    data() {
        return {
            keyValue: 0,
            notiCounter: 0,
            showNotiPanel: false,
            notifications: [],

            perPageItem: 10,
            pageNumber: 0
        }
    },
    created() {
        this.listenPrivateChannel();
        this.countUnreadNoti();
    },
    methods: {
        listenPrivateChannel() {
            /*
                // As we have no custom event named orders, So this will not works
                const { APP_KEY, APP_CLUSTER } = this.$gbvar.PUSHER_CREDENTIALS;
                window.Echo.private('orders')
                    .listen("TestOrderStatusUpdated", e => {
                        console.log('Listened By laravel-echo ', e);
                        this.notiCounter++;
                        this.notifications.push(e);
                    });
            */
            const user = this.$store.getters['auth/authUser'];
            const userId = user.id; 
            // This works fine. 
            window.Echo.private('App.User.' + userId)
                .notification((notification) => {
                    // console.log(notification.type);
                    this.notiCounter++;
                    this.notifications.push(notification.order);
                });
            
        },
        countUnreadNoti() {
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/count-unread-noti`)
                .then(res => {
                    this.notiCounter = res.data;
                }).catch(error => {

                });
            
        },
        handleClick() {
            //console.log('inside handle click...');
            //console.log('handleClick, total notifications === ', this.notifications);
            this.fetchNotifications();
        },
        fetchNotifications() {
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/notifications/${this.perPageItem}/${this.pageNumber}`)
                .then(res => {
                    this.notifications = _.map(res.data.notifications, item => {
                        return {...item, ...{data: JSON.parse(item.data)}};
                    });
                    this.showNotiPanel = true;
                    this.pageNumber++;
                    console.log('this. noti === ', this.notifications );
                }).catch(error => {
                    //console.log('TestNoti.vue Error === ', error.response);
                })
        },
        infiniteScroll(event) {
            if ((event.target.scrollTop + event.target.offsetHeight + 1) >= 
                event.target.scrollHeight) {
                this.fetchNotifications();
            }
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
