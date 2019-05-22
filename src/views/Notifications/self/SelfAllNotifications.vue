<template>
<div class="animated fadeIn">
    <!--         
        <div >
            <TestNoti />
        </div>
    -->
    <div class="customcard">
        <div class="cardheading">
            <div>
                <h2>All Notifications</h2>
            </div>
            <div>
                <!-- <router-link :to="{ name: 'NotificationCreate'}">
                    <button class="btn btn-success">Create New Notification</button>
                </router-link> -->
            </div>
        </div>
        <div class="resourcesTable table-responsive">
            <table class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Body</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Read At</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="noti in notifications" :key="noti.id" 
                :class="noti.read_at === null ? 'notReadYet': ''" >
                    <td scope="row"> 
                        <i :class="[noti.data.icon, ]"  :style="notiIconStyle"/> 
                    </td>
                    <td scope="row">{{noti.data.body}}</td>
                    <td>
                        <span :class="setStatusColor(`${noti.data.status}`)">
                            {{noti.data.status}} 
                        </span>
                    </td>
                    <td>{{ makeNotiTimeReadable(noti.created_at) }}</td>
                    <td >
                        <span>{{noti.read_at === null ? 'Not Read' : makeNotiTimeReadable(noti.read_at) }}</span>
                    </td>
                    <td>
                        <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" 
                            data-placement="top" title="View" @click="singleNotiAction(noti)">
                            <i class="fa fa-search"></i>
                        </span>
                        <!-- <router-link :to="`/notifications/edit/${noti.id}`">
                            <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Edit"> <i class="fa fa-edit"></i></span>
                        </router-link>
                        <router-link to="">
                            <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip"  data-placement="top" title="Delete"> <i class="fa fa-trash"></i></span>
                        </router-link> -->
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
    <div>
        <paginate
            :pageCount="totalPageCount"
            :clickHandler="onPaginateClick"
            :prevText="'Prev'"
            :nextText="'Next'"
            :container-class="'pagination'">
        </paginate>
    </div>
</div>
</template>


<script>
//import TestNoti from './TestNoti';
import axios from 'axios';
import paginate from 'vuejs-paginate';

export default {
    name: 'Notifications',
    components: {
        // TestNoti,
        paginate,
        
    },
    data() {
        return {
            totalPageCount: 0,
            perPageItem: 10, // Only set this value 
            pageNumber: 0,
            allNotiCounter: 0,
            notifications: [],


        }
    },
    created() {
        this.countAllNoti();
        this.fetchNotifications();
        this.listenPrivateChannel();
    },
    methods: {
            listenPrivateChannel() {

            const user = this.$store.getters['auth/authUser'];
            const userId = user.id; 
            // This works fine. 
            window.Echo.private('App.User.' + userId)
                .notification((notification) => {
                    this.unreadNotiCounter++;
                    this.allNotiCounter++;
                    this.totalPageCount = Math.ceil(this.allNotiCounter / this.perPageItem);
                    this.fetchNotifications();
                    /*
                        // this.notifications.push(notification.order); 
                        Ai line ta likhle error khabe, karon, axios diye je notification
                        gulo ami niye aschi, Segulor moddhe aro onke key (not_id, created_at) ache.
                        Kintu aikhane sudhu order object. Tai notifications array te push korle vue
                        template a jeye error khabe.
                    */
                });
            
        },
        onPaginateClick(parm) {
            this.pageNumber = parm - 1; // As api start from "pageNumber 0"
            this.fetchNotifications();
        },
        countAllNoti() {
            const BASE_URL = this.$gbvar.BASE_URL;
            axios.get(`${BASE_URL}/api/count-all-noti`)
                .then(res => {
                    this.allNotiCounter = res.data;
                    this.totalPageCount = Math.ceil(this.allNotiCounter / this.perPageItem);
                }).catch(error => {

                }); 
        },
        fetchNotifications() {
            const parmObj = {
                perPageItem: this.perPageItem, 
                pageNumber: this.pageNumber
            };
            this.$store.dispatch('noti/fetchNotifications', parmObj)
            .then(newNoti => {
                this.notifications = newNoti;
            }).catch(error => {

            })
            
        },
        singleNotiAction(notiObj) {
            //console.log('single noti action', notiObj.read_at);
            if (notiObj.read_at === null) {
                this.notiMarkAsRead(notiObj.id);
            }
        },
        notiMarkAsRead(noti_id) {
            const BASE_URL = this.$gbvar.BASE_URL;
            axios.get(`${BASE_URL}/api/mark-as-read/${noti_id}`)
                .then(res => {
                    //console.log('notiMarkAsRead Res === ', res);
                    this.$router.go();
                }).catch(error => {
                    //console.log('notiMarkAsRead Error ===', error.response);
                })
        }

    },
    computed: {
        makeNotiTimeReadable: () => {
            return (date) => {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            }
        },
        setStatusColor: () => {
            return (parm) => {
                if (parm === 'pending') { 
                    return 'badge badge-warning';
                } else if (parm === 'accepted') { 
                    return 'badge badge-primary';
                } else if (parm === 'started') { 
                    return 'badge badge-secondary';
                } else if (parm === 'completed') { 
                    return 'badge badge-success'
                } else if (parm === 'rejected') { 
                    return 'badge badge-dark'
                } else if (parm === 'cancelled') { 
                    return 'badge badge-danger'
                } 
                // badge badge-primary
                
            }
        },
        notiIconStyle: () => {
            return {
                fontSize: '20px',
                color: 'green',
                marginTop: 'auto',
                marginBottom: 'auto',
            }

        }
    },
    beforeDestroy() {
        // Wanted to unsubscribe from pusher here, 
        // But that dosen't needed as pusher lister not fired if I do not access
        // this component (this route.)
        
        //console.log('Notifications/self/SelfAllNotifications.vue, beforeDestroy. ')
    },
    destroyed() {
        // console.log('Notifications/self/SelfAllNotifications.vue, destroyeeeeeeeeeeeeeeed');
    }

}
</script>
<style lang="scss">
.notReadYet {
    background: rgb(204, 224, 235);
}


/* Start: Pagination Styling using SCSS */
    $primaryColor: rgb(238, 238, 238); 
    $bgColor: rgb(77, 148, 138); 
    $selectdItemColor: $bgColor;

    .pagination {
        margin: 5px 0px;
        font-size: 16px;
    }
    .pagination > li > a {
        border-radius: 5%;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: $primaryColor;
        text-decoration: none;
        background-color: $bgColor;
        border: 1px solid #ddd;
    }
    .pagination > .active > a {
        border-radius: 5%;
        z-index: 2;
        color: $selectdItemColor;
        cursor: default;
        background-color:$primaryColor;
        border-color: $primaryColor;
    }

    .disabled >a {
        color: #777;
        cursor: not-allowed;
        background-color: $bgColor;
        border-color: #ddd;
    }
/* End: Pagination Styling  using SCSS */


</style>