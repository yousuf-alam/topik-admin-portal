<template>
    <AppHeaderDropdown right no-caret>
        <template slot="header">
            <div @click="handleClick">
                <i class="icon-bell"></i>
                <b-badge pill variant="danger" >
                    {{unreadNotiCounter}}
                </b-badge>
                <!-- 
                    <b-nav-item class="d-md-down">
                        <i class="icon-bell"></i>
                        <b-badge pill variant="danger">5</b-badge>
                    </b-nav-item>             
                -->
            </div>

        </template>
        <template slot="dropdown" >

            <div class="notificationCard">
                <b-dropdown-header tag="div" class="text-center">
                    <strong>Your Notifications</strong>
                </b-dropdown-header>

                <div> 
                    <div class="item-container" @scroll="infiniteScroll">
                        <!-- <div>Test Noti Panel.</div> -->
                        <div class="item-card" 
                        :class="noti.read_at === null ? 'notReadYet': ''" 
                        v-for="(noti, index) in notifications" :key="index"
                        @click="singleNotiAction(noti)"
                        >
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

                <div class="text-center mt-1">
                    <hr class="m-0 p-0">
                        <span class="btn see-all" @click="goToAll" style="color:blue">See All</span>
                </div>
            </div>
        </template>
    </AppHeaderDropdown>
</template>

<script>
import Pusher from 'pusher-js';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue';
export default {
    name: 'NotificationDropdown',
    components: {
        AppHeaderDropdown,
    },
    data() {
        return {
            keyValue: 0,
            allNotiCounter: 0,
            unreadNotiCounter: 0,
            notifications: [],
            showLoading: true,
            perPageItem: 10,
            pageNumber: 0,
            notReadYet: '',

            notiBtnClicked: 0
        }
    },
    created() {
        this.listenPrivateChannel();
        this.countAllNoti();
        this.countUnreadNoti();
        
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
                    this.unreadNotiCounter++;
                    this.allNotiCounter++;
                    this.pageNumber = 0;
                    this.fetchNotiAfterPusherListen();
                    /*
                        // this.notifications.push(notification.order); 
                        Ai line ta likhle error khabe, karon, axios diye je notification
                        gulo ami niye aschi, Segulor moddhe aro onke key (not_id, created_at) ache.
                        Kintu aikhane sudhu order object. Tai notifications array te push korle vue
                        template a jeye error khabe.
                    */
                });
            
        },
        countAllNoti() {
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/count-all-noti`)
                .then(res => {
                    this.allNotiCounter = res.data;
                }).catch(error => {

                }); 
        },
        countUnreadNoti() {
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/count-unread-noti`)
                .then(res => {
                    this.unreadNotiCounter = res.data;
                }).catch(error => {

                });
            
        },
        handleClick() {
            if (this.notiBtnClicked === 0) {
                    this.fetchNotifications();
                    this.notiBtnClicked++;
            }
        },
        fetchNotifications() {
            //console.log('fetchNotifications called ');
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/notifications/${this.perPageItem}/${this.pageNumber}`)
                .then(res => {
                    //console.log('Response success', res);
                    const newNoti = _.map(res.data.notifications, item => {
                        return {...item, ...{data: JSON.parse(item.data)}};
                    });
                    this.pageNumber++;
                    this.mergeNewNotiToExistingNotificationsArray(newNoti);                    
                }).catch(error => {
                    //console.log('TestNoti.vue Error === ', error.response);
                })
        },
        fetchNotiAfterPusherListen() {
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/notifications/${this.perPageItem}/${0}`)
                .then(res => {
                    const newNoti = _.map(res.data.notifications, item => {
                        return {...item, ...{data: JSON.parse(item.data)}};
                    });
                    this.pageNumber++;
                    this.mergeNewNotiToExistingNotificationsArray(newNoti);
                    
                }).catch(error => {
                    //console.log('TestNoti.vue Error === ', error.response);
                })
        },
        mergeNewNotiToExistingNotificationsArray(newNoti) {
            const notificationsObj = _.keyBy(this.notifications, 'id');
            const newNotiObj = _.keyBy(newNoti, 'id');
            
            let mergedNotiObj = Object.assign({}, notificationsObj);
            mergedNotiObj = Object.assign(mergedNotiObj, newNotiObj);
            
            const mergedNotiArray = [];
            for (let key in mergedNotiObj) {
                if (mergedNotiObj.hasOwnProperty(key)) {
                        mergedNotiArray.push(mergedNotiObj[key])
                }
            }
            this.notifications = [...mergedNotiArray];
            if (this.notifications.length === this.allNotiCounter) {
                this.showLoading = false;
            }

            this.notifications.sort(function(a, b) {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            });
        },
        infiniteScroll(event) {
            if ((event.target.scrollTop + event.target.offsetHeight ) >= 
                event.target.scrollHeight) {
                this.fetchNotifications();
            }
        },
        singleNotiAction(notiObj) {
            //console.log('single noti action', notiObj.read_at);
            if (notiObj.read_at === null) {
                this.notiMarkAsRead(notiObj.id);
            }
        },
        notiMarkAsRead(noti_id) {
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/mark-as-read/${noti_id}`)
                .then(res => {
                    //console.log('notiMarkAsRead Res === ', res);
                    this.$router.go();
                }).catch(error => {
                    //console.log('notiMarkAsRead Error ===', error.response);
                })
        },
        goToAll() {
            this.$router.push({ name: 'SelfAllNotifications'})
            this.$router.go();
        }

    }
}
</script>

<style scoped>
.notificationCard {
    padding: 0;
    margin: 0;
    width: 400px;
}


/* ------START: Scrolling Portion CSS ------- */
    .item-container {
        width: 100%;
        height: 60vh;
        overflow-y: auto;
    }
    .item-card {
        /* width: 100%; */
        margin-left: 5px;
        margin-right: 5px;
        height: auto;
    
    }
    .item-card {
        display: flex;
        margin-top: 5px;
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
        height: 40px;
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
        font-size: 16px;
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
/* ------ END: Scrolling Portion CSS ------- */

.see-all:hover {
    text-decoration: underline;
}
</style>
