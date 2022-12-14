<template>
 <div class="calendear-partner">
    <div class="caledar-data">
        <div class="left-item">
            <strong>Date & Type</strong>
            <div class="date-range">
                <div>From : <strong>{{ date_range.start }}</strong></div>
                <div>To : <strong>{{ date_range.end }}</strong></div>
                <div class="change-date">
                    <VueCtkDateTimePicker
                        :no-value-to-custom-elem="true"
                        :overlay="true"
                        :range="true"
                        :no-label="true"
                        @validate="hiddenPicker($event)"
                        label="Select"
                        format="YYYY-MM-DD"
                        formatted="ll"
                        color="#7D4E77"
                        v-model="date_range"
                    >
                        <button>Change</button>
                    </VueCtkDateTimePicker>
                </div>
            </div>
            <div class="date-range">
                <div>Data Type : <strong>{{ active == "booked" ? 'Booked' : 'Free' }}</strong></div>
            </div>
        </div>
        <div class="middle-item">
            <button @click="searchApi" :class="`btn-search-item ${ changed == false ? 'disable' : ''}`">{{ searchBtnText }}</button>
        </div>
        <div class="right-item">
            <div class="buttons-group">
                <div @click="changeDataType('booked')" :class="`btn-item ${active == 'booked' ? 'active' : ''} booked-data`">Booked</div>
                <div @click="changeDataType('free')" :class="`btn-item ${active == 'free' ? 'active' : ''} free-data`">Free</div>
            </div>
            <div class="free-types">
                <div @click="setFreeType('all')" :class="`free-type-btn ${freeType == 'all' ? 'active' : ''}`">All</div>
                <div @click="setFreeType('inhouse')" :class="`free-type-btn ${freeType == 'inhouse' ? 'active' : ''}`">In House</div>
                <div @click="setFreeType('freelancer')" :class="`free-type-btn ${freeType == 'freelancer' ? 'active' : ''}`">Freelancer</div>
            </div>
        </div>
    </div>

    <div class="caleder-view table-responsive">
        <table class="table" width="100%" v-if="dataContent.data.length > 0">
            <thead>
                <th width="20%">
                    Date
                </th>
                <th width="20%" v-for="item, index in dataContent.header" :key="'header-' + index">
                    <div class="slot-duration">
                        <span class="slot-position"><span v-html="setSlotValue(index)"></span> Slot</span>
                        <span class="slot-time">({{ item }})</span>
                    </div>
                </th>
            </thead>
            <tbody>
                <tr v-for="item, index in dataContent.data" :key="index + 'data-body'">
                    <td>
                        <div class="user-card">
                            <div :class="`user-info ${index%2 == 0 ? 'odd' : ''}`" @click="showSingleData(item.date, item.slots, true)">
                                <!-- <div class="user-item pt-1">
                                    <span>Serial: <strong>{{ index }}</strong></span>
                                </div> -->
                                <div class="user-item only-header-date pt-1 user-item-partners-item">
                                    <span>Total Partners: <strong>{{ item.count }}</strong> </span>
                                </div>
                                <div class="user-item only-header-date">
                                    <span>{{ item.date }}</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td v-for="slotItem, slotItemIndex in item.slots" :key="'slot-item-index' + slotItemIndex">
                        <template v-if="slotItem.count > 0">
                            <div class="user-card">
                                <div :class="`user-info ${index%2 == 0 ? 'odd' : ''}`">
                                    <div class="user-item-partners">
                                        <span>Total Partners: <strong>{{ slotItem.count }}</strong> </span>
                                    </div>
                                    <div class="user-item nowrap">
                                        <div class="user-item-list" v-html="showPartnerList(slotItem.partners,'#e05080')"></div>
                                        <span v-if="slotItem.count > 4" class="user-item-span" @click="showSingleData(slotItemIndex, slotItem.partners)">More...</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="user-empaty-card" v-else>
                            Empty Slot
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="no-data" v-else>
            {{ apiLoading == true ? "Searching..." : "No data found..." }}
        </div>
    </div>

    <div class="single-view" v-if="openSingle">
        <div class="single-box">
            <div class="single-title">Details of <strong>{{ singleSlot.title }}</strong></div>
            <div class="single-box-closs" @click="openSingle = false">
                <i class="fa fa-close"></i>
            </div>
            <div class="single-view-search">
                <input type="text" placeholder="Search partner name..." class="form-control" v-model="searchPartners" @input="checkSearchingData($event.target.value, $event)">
            </div>
            <div class="single-view-list">
                <div class="item-view" v-for="item, index in singleSlot.data" :key="index + 'slot-index'">
                    <span>{{ item.name }}</span>
                    <span>
                        Date: {{ item.scheduled_date }} & Slot: {{ item.scheduled_time }}
                    </span>
                </div>
            </div>
        </div>
    </div>


 </div>
</template>


<script>
import Vue from "vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import axios from "axios";
import moment from "moment";
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);
export default {
    data: () => ({
        singleSlot: {
            title: "Slot ",
            data: [],
            full_data: [],
            type: false
        },
        currentSearchLength: 0,
        searchPartners: null,
        apiLoading: false,
        openSingle: false,
        active: "booked",
        freeType: "all",
        searchBtnText: "Search",
        changed: false,
        date_range: {
            start: null,
            end: null
        },
        dataContent: {
            header: [],
            data: []
        }
    }),
    created() {
        var now = new Date();
        this.date_range.start = moment(now).format("YYYY-MM-DD");
        this.date_range.end = moment(now).add(7, "days").format("YYYY-MM-DD");
    },
    mounted() {
        this.searchApi();
    },
    methods: {
        changeDataType(type) {
            this.changed = true;
            this.active = type;
            this.searchApi();
        },
        searchApi() {
            if (this.apiLoading) {
                return false;
            }
            this.apiLoading = true;
            this.searchBtnText = "Searching...";
            axios({
                method: "post",
                url: "https://developers.romoni.com.bd/api/sp-calender",
                data: {
                    date_range: this.date_range,
                    type: this.active,
                    plan: this.freeType
                }
            })
            .then(response => {
                this.searchBtnText = "Search";
                this.changed = false;
                this.apiLoading = false;
                this.dataContent.header = response.data.slots;
                this.dataContent.data = response.data.body;
            }).catch(err => {
                this.searchBtnText = "Search";
                this.apiLoading = false;
                this.changed = true;
            });
        },
        setSlotValue(item) {
            if (item == 0) {
                return "1<sup>st</sup>";
            }
            else if (item == 1) {
                return "2<sup>nd</sup>";
            }
            else if (item == 2) {
                return "3<sup>rd</sup>";
            }
            else {
                return item+1 + "<sup>th</sup>";
            }
        },
        showPartnerList(item, color) {
            let data = "";
            let count = 0;
            for ( var i = 0; i < item.length; i++) {
                if (count >= 4) {
                    break;
                }
                if (item[i].name != null || item[i].name != "" || item[i].name != "null") {
                  let dataMake = `<span style="
                    /* color: #fff;
                    background: ${color}; */
                    color: #4f5f6f;
                    border: thin solid #999;
                    font-weight: normal;
                    font-size: 12px;
                    padding: 0px 5px;
                    display: inline-block;
                    margin: 3px;
                    border-radius: 0.25rem;
                    transition: all 200ms linear;cursor:pointer;">${item[i].name}</span>`;
                  data = data + "" + dataMake;
                  count++;
                }
            }
            return data;
        },
        showSingleData(slot, item, type = false) {
            this.singleSlot.type = type;
            this.singleSlot.title = slot;
            if (type == true)
            {
                let newData = [];
                for (var i = 0; i < Object.keys(item).length; i++) {
                    var slotItem = item[Object.keys(item)[i]].partners;
                    newData = newData.concat(slotItem);
                }
                this.singleSlot.data = newData;
            }
            else
            {
                this.singleSlot.data = item;
            }
            this.singleSlot.full_data = this.singleSlot.data;
            this.openSingle = true;
        },
        checkSearchingData(value, event) {
            if (value.length == 0 || event.inputType == "deleteContentBackward") {
                this.singleSlot.data = this.singleSlot.full_data;
            }
            else {
                let newArray = this.singleSlot.data.filter(ele => {
                    if (ele.name.toLowerCase().includes(value.toLowerCase())) {
                        return ele;
                    }
                });
                this.singleSlot.data = newArray;
            }
        },
        setFreeType(type) {
            this.changed = true;
            this.freeType = type;
            this.searchApi();
        },
        hiddenPicker(event) {
            this.changed = true;
            this.searchApi();
        }
    },
    watch : {
        date_range : function(val) {
            this.changed = true;
        }
    }
}
</script>


<style scoped lang="scss">
.caleder-view {
    margin-top: 30px;
    .table {
        // border: thin solid #bbb!important;
        th {
            color: #d5d5d5;
            background: #2a2f33;
            text-align: center;
            border: none;
            vertical-align: middle;
            border-left: thin solid #2a2f33!important;
            border-right: thin solid #2a2f33!important;
            border-bottom: thin solid #ccc!important;
            &:nth-last-child(1) {
                border-right: none;
            }
            white-space: nowrap;
        }
        td {
            text-align: center;
            border: none;
            vertical-align: middle;
            border-left: thin solid #ccc!important;
            border-right: thin solid #ccc!important;
            border-bottom: thin solid #ccc!important;
            &:nth-last-child(1) {
                border-right: none;
            }
        }
        .slot-duration {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            .slot-time {
                padding-left: 5px;
            }
        }

        .user-info {
            padding: 0 0;
            display: flex;
            flex-direction: column;
            // color: #fff;
            background: #e91e6312;
            font-weight: bold;
            font-size: 16px;
            border-width: 1px;
            border-style: solid;
            border-image: linear-gradient(45deg, #fff, #e91e63) 30;
            .user-item {
                border-image: linear-gradient(45deg, #fff, #e91e63) 30;
                border-bottom-width: 1px;
                border-bottom-style: solid;
                padding-bottom: 5px;
                padding-top: 5px;
                &:nth-child(1) {
                    padding-top: 0px;
                }
                &:nth-last-child(1) {
                    border: none;
                }
                span, strong {
                    color: #e91e63;
                }
                &.nowrap {
                    padding: 5px 10px;
                    font-size: 14px;
                    .user-item-span{
                        // background: #e5b5c5;
                        color: rgb(34, 33, 61);
                        border: thin solid #bbb;
                        font-weight: normal;
                        font-size: 12px;
                        padding: 0px 5px;
                        display: inline-block;
                        margin: 3px;
                        border-radius: 0.25rem;
                        transition: all 200ms linear;
                        &:hover {
                            border: thin solid #e91e63;
                            cursor: pointer;
                            color: #e91e63;
                        }
                    }
                }
                &.user-item-partners-item {
                    font-size: 12px!important;
                    span {
                        color: #2f3f4f;
                    }
                }
            }
            .user-item-partners {
                font-size: 12px;
                border-image: linear-gradient(45deg, #fff, #e91e63) 30;
                border-bottom-width: 1px;
                border-bottom-style: solid;
                padding-bottom: 5px;
                padding-top: 5px;
                span, strong {
                    color: #2f3f4f;
                }
            }
            .user-item-total {
                 background: linear-gradient(45deg, #e91e63, #9c27b0);
                 color: #fff;
                 padding: 10px;
            }
            .user-item-view {
                padding-top: 10px;
                padding-bottom: 5px;
                button {
                    // background: linear-gradient(45deg, #e91e63, #9c27b0);
                    border-radius: 0.25rem;
                    color: #c01950;
                    border: none;
                    font-size: 14px;
                    padding: 0px 5px;
                    transition: all 200ms linear;

                    border-image: linear-gradient(#e91e63, #9c27b0) 10;
                    border-width: 2px;
                    border-style: solid;

                    &:hover {
                        background: #c01950;
                        color: #fff;
                    }
                }
            }
            .user-item-date {
                padding: 5px 0;
            }
            &.odd {
                background: #1e51e912;
                border-image: linear-gradient(45deg, #fff, #1e51e9) 30;
                .user-item {
                    border-image: linear-gradient(45deg, #fff, #1e51e9) 30;
                    span, strong {
                        color: #1e51e9;
                    }
                    &.nowrap {
                        .user-item-span {
                            &:hover {
                                border: thin solid #1e51e9;
                                color: #1e51e9;
                            }
                        }
                    }
                }
                .user-item-total {
                    background: linear-gradient(45deg, #1e51e9, #9c27b0);
                }
                .user-item-partners {
                    border-image: linear-gradient(45deg, #fff, #1e51e9) 30;
                }
                .user-item-view {
                    button {
                        color: #1e51e9;
                        border-image: linear-gradient(#1e51e9, #9c27b0) 10;
                        &:hover {
                            color: #fff;
                            background: #1e51e9;
                        }
                    }
                }
            }
        }
        .user-empaty-card {
            background: #fff;
            display: inline-block;
            width: 100%;
            height: 100%;
            min-height: 90px;
            line-height: 90px;
            border-radius: 0.35rem;
            font-size: 25px;
            font-weight: bold;
            color: #e91e63;
            border-width: 2px;
            border-style: solid;
            border-image: linear-gradient(45deg, #e91e63, #fff) 30;
        }
    }
}
.caledar-data {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .date-range {
        display: flex;
        align-items: center;
        div:nth-child(1) {
            margin-right: 10px;
        }
        .change-date {
            margin-left: 10px;
            button {
                border:none;
                background: #c01950;
                color: #fff;
                border-radius: 0.25rem;
                font-size: 12px;
                outline: none;
                transition: all 200ms linear;
                &:hover, &:active {
                    background: #930e3b;
                }
            }
        }
    }
    .right-item {
        .buttons-group {
            display: flex;
            .btn-item {
                background: #e05080;
                color: #fff;
                padding: 5px 20px;
                min-width: 100px;
                text-align: center;
                transition: all 200ms linear;
                &:nth-last-child(1) {
                    margin-right: 0px;
                    border-top-right-radius: 0.25rem;
                    border-bottom-right-radius: 0.25rem;
                }
                &:nth-child(1) {
                    border-top-left-radius: 0.25rem;
                    border-bottom-left-radius: 0.25rem;
                }
                &.active {
                    background: #b11c4e;
                }
                &:hover{
                    cursor: pointer;
                    background: #b11c4e;
                }
            }
        }
        .free-types {
            margin-top: 10px;
            right: 30px;
            display: flex;
            position: absolute;
            justify-content: flex-end;
            .free-type-btn {
                border: thin solid #ff3573;
                min-width: 56px;
                padding: 0 5px;
                margin-left: 5px;
                text-align: center;
                border-radius: 0.25rem;
                color: #ff3573;
                cursor: pointer;
                transition: all 200ms linear;
                font-size: 12px;
                &:hover, &.active {
                    background: #ff3573;
                    color: #fff;
                }
            }
        }
    }
    .btn-search-item {
        border: none;
        padding: 5px 30px;
        background: #002984;
        color: #fff;
        border-radius: 0.35rem;
        transition: all 200ms linear;
        &.disable {
            display: none;
        }
    }
}
.no-data {
    padding: 20px 50px;
    border-radius: 0.5rem;
    color: #fff;
    font-weight: bold;
    margin: 50px auto;
    font-size: 20px;
    background: #c01950;
    display: inline-block;
}

.single-view {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.70);
    backdrop-filter: blur(3px);
    overflow: hidden;
    .single-box {
        padding: 20px 0;
        border-radius: 0.5rem;
        position: absolute;
        height: 550px;
        min-width: 500px;
        background: #fff;
        left: 50%;
        transform: translate(-50%, 30%);
        .single-view-search {
            padding: 0 20px 10px;
            input {
                border: thin solid #bbb;
                box-shadow: inset 0 0 8px rgba(0,0,0,0.35);
            }
        }
        .single-title {
            padding: 0 20px;
            font-weight: bold;
            padding-bottom: 10px;
            strong {
                color: #c01950;
            }
        }
        .single-view-list {
            padding: 0px 20px;
            height: 450px;
            overflow-y: auto;
            .item-view {
                border-width: 1px;
                border-style: solid;
                border-image: linear-gradient(45deg, #ff3573, #fff) 30;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                flex-direction: column;
                padding: 5px 0;
                &:nth-child(1) {
                    border-top: none;
                }
                &:nth-last-child(1) {
                    border-bottom: none;
                }
                // margin-bottom: 5px;
                span:nth-child(1) {
                    font-weight: bold;
                    color: #c01950;
                }
                span:nth-child(2) {
                    font-size: 12px;
                }
            }
        }
    }
    .single-box-closs {
        position: absolute;
        right: 15px;
        top: 10px;
        i {
            font-size: 25px;
            color: #aaa;
            transition: all 200ms linear;
            &:hover {
                cursor: pointer;
                color: #c01950;
            }
        }
    }
    .only-header-date {
      cursor: pointer;
    }
}

</style>
