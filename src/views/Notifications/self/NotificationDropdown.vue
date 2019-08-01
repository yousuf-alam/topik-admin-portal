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

                <div class="item-container" @scroll="infiniteScroll">
                    <div class="item-card"
                    :class="noti.read_at === null ? 'notReadYet': ''"
                    v-for="(noti, index) in notifications" :key="index"
                    @click="singleNotiAction(noti)"
                    >
                        <b-dropdown-item class="my-0 py-0">
                            <div class="d-flex justify-content-around">
                                <i :class="[noti.data.icon, notiIconStyle]"  />

                                <div class="m-0 p-0">
                                   <div class="m-0 p-0" style="width:170px"
                                    v-html="resizeText(noti.data.body)" />

                                    <div class="datetime m-0 p-0">
                                        <small> {{ makeNotiTimeReadable(noti.created_at) }} </small>
                                    </div>
                                </div>
                            </div>

                        </b-dropdown-item>
                    </div>
                    <div v-if="showLoading" class="loader">
                        <p>Loading...</p>
                    </div>

                </div>

                <div class="text-center border-top">
                        <span class="btn see-all text-primary" @click="goToAll" style="cursor: pointer">See All</span>
                </div>
            </div>
        </template>
    </AppHeaderDropdown>
</template>

<script>
let timer;
import Pusher from 'pusher-js';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import globalvariables from '../../../globalvariables';
const BASE_URL = process.env.VUE_APP_ADMIN_URL;
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue';
import EventBus from '../../../utils/EventBus';
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
    computed: {
        resizeText: () => {
            return (bodyText) => {
                let strArray = bodyText.split(" ");
                let newStr = '';
                let counter = 1;
                for (let i=0; i<strArray.length; i++) {
                    newStr+= strArray[i] + " ";
                    if(newStr.length > 25*counter ) {
                        counter++;
                        newStr+='<br>';
                    }
                }
                return newStr;
            }
        },
        notiIconStyle: () => {
           return 'text-success my-auto';
        },
        makeNotiTimeReadable: () => {
            return (date) => {
                // return moment(date).format('MMMM Do YYYY, h:mm:ss a');
                return moment(date, "YYYYMMDD h:mm:ss a").fromNow();
            }
        },
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

                    this.initiateDesktopNoti(notification);

                    /*
                        // this.notifications.push(notification.order);
                        Ai line ta likhle error khabe, karon, axios diye je notification
                        gulo ami niye aschi, Segulor moddhe aro onke key (not_id, created_at) ache.
                        Kintu aikhane sudhu order object. Tai notifications array te push korle vue
                        template a jeye error khabe.
                    */
                });

        },
        initiateDesktopNoti(notification) {
            // From this line : "Desktop Notification"
            const userName = this.$store.getters['auth/authUser'].name;
            let desktopNotiTitle = '';
            let desktopNotiBody = '';
            let desktopNotiRedirectURL = '';

            if (notification.type === `App\\Notifications\\OrderStatusUpdated`) {
                desktopNotiTitle = `Hey, ${userName}`
                desktopNotiBody = 'An order has been placed'
                const order_id = notification.order.id;
                const origin = window.location.origin;
                desktopNotiRedirectURL = `${origin}/orders/details/${order_id}`;
            }
            const desktopNotiObject = {
                title: desktopNotiTitle,
                body: desktopNotiBody,
                icon: `${BASE_URL}/images_api/favicon.ico`,
                redirect_url: desktopNotiRedirectURL,
                noti_id: notification.id
            }
            if (!('Notification' in window)) {
                alert('This browser does not support system notifications');
            } else if (Notification.permission === 'granted') {
                this.notifyDesktop(desktopNotiObject);
            } else if(Notification.permission !== 'denied') {
                Notification.requestPermission(function(permission){
                    if (permission === 'granted') {
                        this.notifyDesktop(desktopNotiObject);
                    }
                });
            }
        },

        notifyDesktop(desktopNotiObject) {
            let noti = new Notification(desktopNotiObject.title, {
                icon: desktopNotiObject.icon,
                body: desktopNotiObject.body
            });

            noti.onclick = function() {
                let noti_id = desktopNotiObject.noti_id;
                axios.get(`${BASE_URL}/mark-as-read/${noti_id}`)
                    .then(res => {
                        window.clearTimeout(timer);
                        noti.close();
                        window.open(desktopNotiObject.redirect_url);
                        // we need some modification here, as if more than 1  desktop notification
                        // comes here, may be, desktopNotiObject becomes lost ,
                        // and window.location.href goes to /dashboard.
                        //So we use window.open here.;
                    }).catch(error => {
                        // console.log('Errorrrrrrrrrrrrrr  ', error)
                    })
            }
            timer = setTimeout(noti.close.bind(noti), 5000);
        },
        countAllNoti() {
            axios.get(`${BASE_URL}/count-all-noti`)
                .then(res => { this.allNotiCounter = res.data;})
                .catch(error => {    });
        },
        countUnreadNoti() {
            axios.get(`${BASE_URL}/count-unread-noti`)
                .then(res => { this.unreadNotiCounter = res.data;
                  EventBus.$emit('unread:notification', res.data);})
                .catch(error => {

                });
        },
        handleClick() {
            if (this.notiBtnClicked === 0) {
                    this.fetchNotifications();
                    this.notiBtnClicked++;
            }
        },
        fetchNotifications() {
            const parmObj = {
                perPageItem: this.perPageItem,
                pageNumber: this.pageNumber
            };
            this.dispatchFetchScrollNotifications(parmObj);
        },

        fetchNotiAfterPusherListen() {
            const parmObj = {
                perPageItem: this.perPageItem,
                pageNumber: 0
            };
            this.dispatchFetchScrollNotifications(parmObj);
        },
        dispatchFetchScrollNotifications(parmObj) {
            this.$store.dispatch('noti/fetchScrollNotifications', parmObj)
                .then(res => {
                    this.pageNumber++;
                    const merged_notifications = this.$store.getters['noti/merged_notifications'];
                    if (merged_notifications.length === this.allNotiCounter) {
                        this.showLoading = false;
                    }
                    this.notifications = merged_notifications;
                }).catch(error => {

                })
        },
        infiniteScroll(event) {
            if ((event.target.scrollTop + event.target.offsetHeight ) >=
                event.target.scrollHeight) {
                this.fetchNotifications();
            }
        },

        singleNotiAction(notiObj) {
            if (notiObj.read_at === null) {
              this.notiMarkAsRead(notiObj);
            } else {
              window.location.href = this.makeRedirectionURL(notiObj);
            }
        },
        makeRedirectionURL(notiObj) {
          if( notiObj.type === `App\\Notifications\\OrderStatusUpdated` ) {
              const order_id = notiObj.data.order.id;
              const origin = window.location.origin;
              return `${origin}/orders/details/${order_id}`;
              //this.$router.push({ name: 'OrderShow', params: { id: order_id } }) // do not use this.
          }
        },
        notiMarkAsRead(notiObj) {
            const noti_id = notiObj.id;
            const BASE_URL = this.$gbvar.BASE_URL;
            axios.get(`${BASE_URL}/mark-as-read/${noti_id}`)
                .then(res => {
                  window.location.href = this.makeRedirectionURL(notiObj);
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

<style scoped lang="scss">
    .notificationCard {
        padding: 0;
        margin: 0;
        width: 100%;
    }

/* ------START: Scrolling Portion CSS ------- */
    .item-container {
        width: 100%;
        height: 400px; /*IN_FUTURE:  media query can be added*/
        overflow-y: auto;
    }
    .item-card {
        border-bottom: 1px solid rgb(207, 206, 205);
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
        color: rgb(85, 187, 241);;
    }
    @keyframes loading {
        100% {
            transform: translateX(70%);
        }
    }

    .notReadYet {
        background: rgb(204, 224, 235);
    }
/* ------ END: Scrolling Portion CSS ------- */

    .see-all:hover {
        text-decoration: underline;
    }
</style>
