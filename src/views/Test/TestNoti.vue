<template>
    <div>
        <div class="customcard">
            <h3>Test Pusher Notification in vue</h3>
            <div>
                <span class="btn noti-button" @click="handleClick">{{unreadNotiCounter}}</span>
                <br>
                <div class="item-container" v-if="showNotiPanel" @scroll="infiniteScroll">
                    <!-- <div>Test Noti Panel.</div> -->
                    <div class="item-card" :class="noti.read_at === null ? 'notReadYet': ''"
                    v-for="(noti, index) in notifications" :key="index">
                        <div class="thumbnail"></div>
                        <div class="detail">
                            <div class="title">
                                {{ noti.data.body }}
                            </div>
                            <span class="datetime"><small> {{noti.created_at | moment}} </small></span>
                        </div>
                    </div>
                    <div v-if="showLoading" class="loader">
                        <p>Loading...</p>
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
import moment from 'moment';

export default {
    name: 'testnoti',
    data() {
        return {
            keyValue: 0,
            allNotiCounter: 0,
            unreadNotiCounter: 0,
            showNotiPanel: false,
            notifications: [],
            showLoading: true,

            perPageItem: 10,
            pageNumber: 0,

            notReadYet: '',
        }
    },
    created() {

        this.listenPrivateChannel();
        // this.countAllNoti();
        // this.countUnreadNoti();

    },
    filters: {
        moment: (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
    methods: {

        listenPrivateChannel() {
            /*
                // As we have no custom event named orders, So this will not works
                const { APP_KEY, APP_CLUSTER } = this.$gbvar.PUSHER_CREDENTIALS;
                window.Echo.private('orders')
                    .listen("TestOrderStatusUpdated", e => {
                        console.log('Listened By laravel-echo ', e);
                        this.unreadNotiCounter++;
                        this.notifications.push(e);
                    });
            */
            const user = this.$store.getters['auth/authUser'];
            const userId = user.id;
            // This works fine.
            window.Echo.private('App.User.' + userId)
                .notification((notification) => {
                    // console.log(notification.type);
                    this.unreadNotiCounter++;
                    this.notifications.push(notification.order);
                });

        },
        // countAllNoti() {
        //     const ADMIN_URL = this.$gbvar.ADMIN_URL;
        //     axios.get(`${ADMIN_URL}/api/count-all-noti`)
        //         .then(res => {
        //             this.allNotiCounter = res.data;
        //         }).catch(error => {
        //
        //         });
        // },
        // countUnreadNoti() {
        //     const ADMIN_URL = this.$gbvar.ADMIN_URL;
        //     axios.get(`${ADMIN_URL}/api/count-unread-noti`)
        //         .then(res => {
        //             this.unreadNotiCounter = res.data;
        //         }).catch(error => {
        //
        //         });
        //
        // },
        handleClick() {
            //console.log('inside handle click...');
            //console.log('handleClick, total notifications === ', this.notifications);
            if( this.showNotiPanel === false) {
                this.fetchNotifications();
            } else {
                this.showNotiPanel = false;
            }

        },
        // fetchNotifications() {
        //     const ADMIN_URL = this.$gbvar.ADMIN_URL;
        //     axios.get(`${ADMIN_URL}/api/notifications/${this.perPageItem}/${this.pageNumber}`)
        //         .then(res => {
        //             const newNoti = _.map(res.data.notifications, item => {
        //                 return {...item, ...{data: JSON.parse(item.data)}};
        //             });
        //             this.showNotiPanel = true;
        //             this.pageNumber++;
        //             this.notifications = [...this.notifications, ...newNoti];
        //             if (this.notifications.length === this.allNotiCounter) {
        //                 this.showLoading = false;
        //             }
        //             console.log(
        //                 'this.pageNumber === ', this.pageNumber,
        //                 'this.notifications === ', this.notifications,
        //                 'this.notifications.length === ', this.notifications.length,
        //                 'this.countAllNoti === ', this.allNotiCounter );
        //         }).catch(error => {
        //             //console.log('TestNoti.vue Error === ', error.response);
        //         })
        // },
        // infiniteScroll(event) {
        //     if ((event.target.scrollTop + event.target.offsetHeight ) >=
        //         event.target.scrollHeight) {
        //         this.fetchNotifications();
        //     }
        // }
    }

}
</script>

<style scoped>
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



.item-container {
  width: 100%;
  height: 60vh;
  overflow-y: auto;
}
.item-card {
  width: 100%;
  height: auto;

}
.item-card {
  display: flex;
  margin-bottom: 5px;
  border-radius: 0.25rem;
  border: 1px solid rgb(207, 206, 205);
}
.item-card:hover {
    background: #e8ebe6;
    cursor: pointer;
}

.item-card > .thumbnail {
  background-color: #a6dbd7;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.item-card > .detail {
  margin: 5px 10px;
  font-size: 14px;
  color: #00badd;
}
.item-card > .detail > .title{
  font-size: 14px;
  color: #00badd;
}
.item-card > .detail > .datetime{
  font-size: 14px;
  color: #7f817e;
}

.loader {
  width: 100%;
  height: 100px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.loader::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  transform: translateX(30%);
  animation: loading 1s infinite;
}
.loader > p {
  font-size: 18px;
  font-weight: 600;
  color: blue;
}
 @keyframes loading {
  100% {
    transform: translateX(70%);
  }
}


.notReadYet {
   /* background: #2ed3d311; */
   background: #dddde0;
}

.notReadYet > .detail > .title {
    color: rgb(167, 99, 11);
}

.notReadYet > .detail > .datetime {
    color: rgb(17, 16, 16);
}

.notReadYet:hover {
   /* background: #2ed3d311; */
   background: #5a5d5f ;
}

.notReadYet:hover > .detail > .title {
    color: bisque;
}

.notReadYet:hover > .detail > .datetime {
    color: white;
}




</style>
