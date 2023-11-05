<template>
    <div class="animated fadeIn">
        <b-card>
            <b-row class="p-2 border-bottom" style="margin-left:25px;">
                <h4>Cancel Reason Stat.</h4>
            </b-row>

            <b-row class="p-1 h-100">


                <div style="margin-left: 45px;">
                    <div>
                        <table>
                            <thead class="table-header">
                                <tr>
                                    <th>Cancel Reason</th>
                                    <th>Total</th>
                                    <th>Cancel Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cancelReasonStatistics" :key="item.reason">
                                    <td>{{ item.reason }}</td>
                                    <td>{{ item.count }}</td>
                                    <td>{{ item.percentage }}</td>
                                </tr>
                                <tr v-if="cancelReasonStatistics.length === 0">
                                    <td colspan="3" style="text-align: center;">No data available.</td>
                                  </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
                
            </b-row>
            <div class="m-3 p-3">
                <b-row class="p-2 border-bottom">
                    <h4>Details AreaWise Reports</h4>
                </b-row>

                <b-row class="p-4 h-100">
                    <b-col style="margin-right: 10px;">
                        <label>Date Range</label>
                        <div class="date-box-container">
                            <p>{{ date_range.start }} : {{ date_range.end }}</p>
                        </div>
                    </b-col>

                    <b-col>
                        <label>Area</label>
                        <b-form-select v-model="AreaDropdownValue">
                            <b-form-select-option v-for="option in areaOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </b-form-select-option>
                        </b-form-select>
                    </b-col>







                    <b-col>
                        <label>Partners</label>
                        <b-form-select v-model="PartnerDropdownValue">
                            <b-form-select-option v-for="option in partnerOptions" :key="option.value"
                                :value="option.value">
                                {{ option.label }}
                            </b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <label>Cancel Reason</label>
                        <b-form-select v-model="CancelReasonDropdownValue">
                            <b-form-select-option v-for="option in cancelReasonOptions" :key="option.value"
                                :value="option.value">
                                {{ option.label }}
                            </b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <b-btn class="center-div btn-block btn-primary" @click="showDetailsReport"
                            style="margin-top: 28px;">Show</b-btn>
                    </b-col>
                </b-row>




                <div class="card">
                    <v-client-table :data="areaWiseReport" :columns="areaWiseColumn" :options="options">

                        <template slot="Actions" slot-scope="{ row }">

                        </template>

                    </v-client-table>
                </div>

            </div>

        </b-card>
    </div>
</template>
    
    
<script>
import Vue from "vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import axios from "axios";
import moment from "moment";
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
    name: "AreaWiseReportDetails",
    data() {
        return {
            AreaDropdownValue: "",
            PartnerDropdownValue: "",
            CancelReasonDropdownValue: "",
             date_range: {
                // start: this.$route.params.dateRange.start,  
                // end: this.$route.params.dateRange.end,      
            },

            areaOptions: [
                { label: "All", value: "All" },
                { label: "Dhaka", value: "Dhaka" },
                { label: "Chittagong", value: "Chittagong" },
                { label: "Adabor", value: "Adabor" },
                { label: "Agargaon", value: "Agargaon" },
                { label: "Azimpur", value: "Azimpur" },
                { label: "Badda", value: "Badda" },
                { label: "Baily Road", value: "Baily Road" },
                { label: "Banani", value: "Banani" },
                { label: "Banani DOHS", value: "Banani DOHS" },
                { label: "Baridhara", value: "Baridhara" },
                { label: "Baridhara DOHS", value: "Baridhara DOHS" },
                { label: "Baridhara J Block", value: "Baridhara J Block" },
                { label: "Bashabo", value: "Bashabo" },
                { label: "Bashundhara", value: "Bashundhara" },
                { label: "Cantonment", value: "Cantonment" },
                { label: "Dhaka University Area", value: "Dhaka University Area" },
                { label: "Dhanmondi", value: "Dhanmondi" },
                { label: "Elephant Road", value: "Elephant Road" },
                { label: "Eskaton", value: "Eskaton" },
                { label: "Farmgate", value: "Farmgate" },
                { label: "Goran", value: "Goran" },
                { label: "Green Road", value: "Green Road" },
                { label: "Gulshan 1", value: "Gulshan 1" },
                { label: "Gulshan 2", value: "Gulshan 2" },
                { label: "Hatirpool Residential Area", value: "Hatirpool Residential Area" },
                { label: "Indira Road", value: "Indira Road" },
                { label: "Jatrabari", value: "Jatrabari" },
                { label: "Kafrul", value: "Kafrul" },
                { label: "Kakrail", value: "Kakrail" },
                { label: "Kalabagan", value: "Kalabagan" },
                { label: "Kallyanpur", value: "Kallyanpur" },
                { label: "Kamalapur", value: "Kamalapur" },
                { label: "Katabon", value: "Katabon" },
                { label: "Karwan Bazar", value: "Karwan Bazar" },
                { label: "Khilgaon", value: "Khilgaon" },
                { label: "Khilgaon-Taltola", value: "Khilgaon-Taltola" },
                { label: "Khilkhet", value: "Khilkhet" },
                { label: "Lalbagh", value: "Lalbagh" },
                { label: "Lalmatia", value: "Lalmatia" },
                { label: "Luxmibazar", value: "Luxmibazar" },
                { label: "Moghbazar", value: "Moghbazar" },
                { label: "Malibagh", value: "Malibagh" },
                { label: "Mirpur DOHS", value: "Mirpur DOHS" },
                { label: "Mirpur-1", value: "Mirpur-1" },
                { label: "Mirpur-10", value: "Mirpur-10" },
                { label: "Mirpur-11", value: "Mirpur-11" },
                { label: "Mirpur-12", value: "Mirpur-12" },
                { label: "Mirpur-13", value: "Mirpur-13" },
                { label: "Mirpur-14", value: "Mirpur-14" },
                { label: "Mirpur-2", value: "Mirpur-2" },
                { label: "Mirpur-6", value: "Mirpur-6" },
                { label: "Mirpur-7", value: "Mirpur-7" },
                { label: "Pallabi", value: "Pallabi" },
                { label: "Mohakhali", value: "Mohakhali" },
                { label: "Mohakhali DOHS", value: "Mohakhali DOHS" },
                { label: "Mohammadpur", value: "Mohammadpur" },
                { label: "Monipuripara", value: "Monipuripara" },
                { label: "Motijheel", value: "Motijheel" },
                { label: "Niketan", value: "Niketan" },
                { label: "Nikunja", value: "Nikunja" },
                { label: "Panthapath", value: "Panthapath" },
                { label: "Paribagh", value: "Paribagh" },
                { label: "Rampura-Banasree", value: "Rampura-Banasree" },
                { label: "Rayer Bazar", value: "Rayer Bazar" },
                { label: "Segunbagicha", value: "Segunbagicha" },
                { label: "Shahjahanpur", value: "Shahjahanpur" },
                { label: "Shantinagar", value: "Shantinagar" },
                { label: "Shyamoli", value: "Shyamoli" },
                { label: "Siddeshwari", value: "Siddeshwari" },
                { label: "Tejgaon", value: "Tejgaon" },
                { label: "Uttara", value: "Uttara" },
                { label: "Wari", value: "Wari" },
                { label: "Tongi", value: "Tongi" },
                { label: "Savar", value: "Savar" },
                { label: "Gazipur", value: "Gazipur" },
                { label: "Agrabad", value: "Agrabad" },
                { label: "Anandabazar", value: "Anandabazar" },
                { label: "Andar Killa", value: "Andar Killa" },
                { label: "Bahaddarhat", value: "Bahaddarhat" },
                { label: "Bakalia", value: "Bakalia" },
                { label: "Bayezid Bostami", value: "Bayezid Bostami" },
                { label: "Bow Bazar", value: "Bow Bazar" },
                { label: "CDA", value: "CDA" },
                { label: "Chandgaon", value: "Chandgaon" },
                { label: "Chittagong Cantonment", value: "Chittagong Cantonment" },
                { label: "Chittagong Polytechnic Institute", value: "Chittagong Polytechnic Institute" },
                { label: "Chittagong Sailors Colony", value: "Chittagong Sailors Colony" },
                { label: "Chittagong Airport", value: "Chittagong Airport" },
                { label: "Chittagong Bandar", value: "Chittagong Bandar" },
                { label: "Chittagong GPO", value: "Chittagong GPO" },
                { label: "Dampara", value: "Dampara" },
                { label: "Faujdarhat", value: "Faujdarhat" },
                { label: "Firozshah", value: "Firozshah" },
                { label: "GEC circle", value: "GEC circle" },
                { label: "Halishahar", value: "Halishahar" },
                { label: "Jalalabad", value: "Jalalabad" },
                { label: "Jaldia Marine Academy", value: "Jaldia Marine Academy" },
                { label: "Khulsi", value: "Khulsi" },
                { label: "Mehedibag", value: "Mehedibag" },
                { label: "Middle Patenga", value: "Middle Patenga" },
                { label: "Mofizur Rahaman Housing society", value: "Mofizur Rahaman Housing society" },
                { label: "Mohard", value: "Mohard" },
                { label: "Muradpu", value: "Muradpu" },
                { label: "Nasirabad", value: "Nasirabad" },
                { label: "North Halishahar", value: "North Halishahar" },
                { label: "North Kattali", value: "North Kattali" },
                { label: "Pahartoli", value: "Pahartoli" },
                { label: "Panchlaish", value: "Panchlaish" },
                { label: "Patenga", value: "Patenga" },
                { label: "Purbo Bakalia", value: "Purbo Bakalia" },
                { label: "Rampura TSO", value: "Rampura TSO" },
                { label: "Shadhinota Complex", value: "Shadhinota Complex" },
                { label: "Sholokbazar", value: "Sholokbazar" },
                { label: "Sholoshohor", value: "Sholoshohor" },
                { label: "Sobujbag", value: "Sobujbag" },
                { label: "South Middle Halishahar", value: "South Middle Halishahar" },
                { label: "Terry Bazar", value: "Terry Bazar" },
                { label: "Uttar Lalkhan", value: "Uttar Lalkhan" },
                { label: "Wazedia", value: "Wazedia" },
                { label: "Sayedabaad", value: "Sayedabaad" },
                { label: "Kotbari", value: "Kotbari" },
                { label: "Faydabad", value: "Faydabad" },
                { label: "Dhaka Uddan", value: "Dhaka Uddan" },
                { label: "Dholpur", value: "Dholpur" },
                { label: "Gopibag", value: "Gopibag" },
                { label: "Golapbag", value: "Golapbag" },
                { label: "Forashganj", value: "Forashganj" },
                { label: "Gendaria", value: "Gendaria" },
                { label: "Bongshal", value: "Bongshal" },
                { label: "Tikatuli", value: "Tikatuli" },
                { label: "Bosila", value: "Bosila" },
                { label: "Modhubag (dhanmondi)", value: "Modhubag (dhanmondi)" },
                { label: "Hajaribag", value: "Hajaribag" },
                { label: "Jafrabad", value: "Jafrabad" },
                { label: "Ring road", value: "Ring road" },
                { label: "Fokirapool", value: "Fokirapool" },
                { label: "Bangshal", value: "Bangshal" },
                { label: "Nazimuddin Road", value: "Nazimuddin Road" },
                { label: "Mugda", value: "Mugda" },
                { label: "Manda", value: "Manda" },
                { label: "Shahjadpur", value: "Shahjadpur" },
                { label: "100 Feet", value: "100 Feet" },
                { label: "Madani Avenue", value: "Madani Avenue" },
                { label: "Gudaraghat", value: "Gudaraghat" },
                { label: "Notun Bazar", value: "Notun Bazar" },
                { label: "Kochukhet", value: "Kochukhet" },
                { label: "Uttar Badda", value: "Uttar Badda" },
                { label: "Merul Badda", value: "Merul Badda" },
                { label: "Mohanogor Project", value: "Mohanogor Project" },
                { label: "Modhubag (Hatirjheel)", value: "Modhubag (Hatirjheel)" },
                { label: "Satarkul", value: "Satarkul" },
                { label: "Rajarbag", value: "Rajarbag" },
                { label: "Matikata", value: "Matikata" },
                { label: "Vasantek", value: "Vasantek" },
                { label: "Nakhalpara", value: "Nakhalpara" },
                { label: "Shantibag", value: "Shantibag" },
                { label: "Progoti Sarani", value: "Progoti Sarani" },
                { label: "Manik Mia Avenue", value: "Manik Mia Avenue" },
                { label: "Chawkbazar", value: "Chawkbazar" },
                { label: "Bangabazar", value: "Bangabazar" },
                { label: "Najirabazar", value: "Najirabazar" },
                { label: "Sutrapur", value: "Sutrapur" },
                { label: "Paltan", value: "Paltan" },
                { label: "Kazi para", value: "Kazi para" },
                { label: "Shewrapara", value: "Shewrapara" },
                { label: "Chankarpool", value: "Chankarpool" },
                { label: "Aftabnagar", value: "Aftabnagar" },
                { label: "Kawran bazar", value: "Kawran bazar" },
                { label: "Chowdhury para", value: "Chowdhury para" }

            ],

            partnerOptions: [
                { label: "All", value: "All" },
                { label: "Inhouse", value: "Inhouse" },
                { label: "Freelancer", value: "Freelancer" },
                { label: "Romoni_Parven", value: "Romoni_Parven" },
                { label: "Romoni_Roksana", value: "Romoni_Roksana" },
                { label: "Romoni_Ruma", value: "Romoni_Ruma" },
                { label: "Romoni_Borsha", value: "Romoni_Borsha" },
                { label: "Romoni_Sonia Akter", value: "Romoni_Sonia Akter" },
                { label: "Romoni_Brishty", value: "Romoni_Brishty" },
                { label: "Romoni_Selina", value: "Romoni_Selina" },
                { label: "Romoni_Sharmin", value: "Romoni_Sharmin" },
                { label: "Romoni_Lucky", value: "Romoni_Lucky" },
                { label: "Romoni_Lolona", value: "Romoni_Lolona" },
                { label: "Romoni_Shammi", value: "Romoni_Shammi" },
                { label: "Romoni_Sonia Ukil", value: "Romoni_Sonia Ukil" },
                { label: "Romoni_Munia", value: "Romoni_Munia" },
                { label: "Romoni_Nipa", value: "Romoni_Nipa" },
                { label: "Romoni_Anonna", value: "Romoni_Anonna" },
                { label: "Romoni_Mishu", value: "Romoni_Mishu" },
                { label: "Romoni_Shiuli", value: "Romoni_Shiuli" },
                { label: "Romoni_Lima", value: "Romoni_Lima" },
                { label: "FR_Sporshi", value: "FR_Sporshi" },
                { label: "FR_Arika", value: "FR_Arika" },
                { label: "FR_Happy", value: "FR_Happy" },
                { label: "FR_Shahana", value: "FR_Shahana" },
                { label: "FR_Mun", value: "FR_Mun" },
                { label: "FR_Adite", value: "FR_Adite" },
                { label: "FR_Tasmeah", value: "FR_Tasmeah" },
                { label: "FR_Ira", value: "FR_Ira" },
                { label: "FR_Rotna", value: "FR_Rotna" },
                { label: "FR_Female", value: "FR_Female" },
                { label: "FR_Jannat", value: "FR_Jannat" },



            ],
            cancelReasonOptions: [
                { label: "All", value: "All" },
                { label: "Cus Unreachable", value: "Cus Unreachable" },
                { label: "Cus Denied", value: "Cus Denied" },
                { label: "SP Unreachable", value: "SP Unreachable" },
                { label: "SP Denied", value: "SP Denied" },
                { label: "SP Unavailable", value: "SP Unavailable" },
                { label: "OPS Unreachable", value: "OPS Unreachable" },
                { label: "SP Time Management Issue", value: "SP Time Management Issue" },
                { label: "Location Prob", value: "Location Prob" },
            ],
            areaWiseReport: [],
            cancelState : [],


            areaWiseColumn: [
                "AreaName",
                "OrderId",
                "UserName",
                "PartnerName",
                "Amount",
                "CancellationReason"

            ],

            CancelReasonTableColumn: [
                "CancelReason",
                "Total",
                "CancelPercentage"
            ],

            options: {
                pagination: { nav: "fixed" },
                filterByColumn: true,
                toMomentFormat: "YYYY-MM-DD",
                sortIcon: {
                    base: "fa fa-sort",
                    up: "fa fa-sort-up",
                    down: "fa fa-sort-down",
                    is: "fa fa-sort"
                }
            },

           
        };
    },
   computed: {
    cancelReasonStatistics() {
        return this.cancelReasonStats();
    }
   },
    created() {
        this.from = this.$route.params.from;
        this.to = this.$route.params.to;
        this.areaName = this.$route.params.areaName;
        this.date_range.start = this.from;
        this.date_range.end = this.to;
        this.AreaDropdownValue = this.areaName;

        this.showDetailsReport();
    },


    methods: {
        getDateModal(report) {
            this.$modal.show("date-picker-modal");
        },
        closeModal() {
            this.$modal.hide("date-picker-modal");
        },



        showDetailsReport() {
            this.cancelState = []; // Clear the cancelState array
            let location_request;
            if (this.AreaDropdownValue) {
                location_request = this.AreaDropdownValue;
            } else {
                location_request = this.areaName;
            }
            axios
                .post(`${ADMIN_URL}/area-wise-filtered-report`, {
                    from: this.from,
                    to: this.to,
                    location_request: location_request,
                    partner_request: this.PartnerDropdownValue,
                    cancel_reason_request: this.CancelReasonDropdownValue

                })
                .then((response) => {
                    this.areaWiseReport = response.data.data;
 
                    response.data.data.map((data) => {
                        this.cancelState.push(data.CancellationReason);
                    });
                  //  console.log(this.cancelState.length);

                    const stats = this.cancelReasonStats();


                })


                .catch((error) => {
                    console.error('Error fetching data: ', error);
                });
        },


        cancelReasonStats() {
    if (this.cancelState.length === 0) {
         return [];
    }
    //console.log(this.cancelState);
     const cancelReasonCounts = {};
    this.cancelState.forEach((reason) => {
        if (reason in cancelReasonCounts) {
            cancelReasonCounts[reason]++;
        } else {
            cancelReasonCounts[reason] = 1;
        }
    });

    const totalCancelReasons = this.cancelState.length;
   

    const stats = Object.keys(cancelReasonCounts).map((reason) => {
        const count = cancelReasonCounts[reason];
        const percentage = ((count / totalCancelReasons) * 100).toFixed(2);  
        return {
            reason,
            count,
            percentage,
        };
    });

   // console.log(stats);
    return stats;
}




    }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
table {
    margin: 0 auto;
}

table {
    color: #333;
    background: white;
    border: 1px solid grey;
    font-size: 12pt;
    border-collapse: collapse;
}

table thead th,
table tfoot th {
    color: #777;
    background: rgba(0, 0, 0, .1);
}

table caption {
    padding: .5em;
}

table th,
table td {
    padding: .5em;
    border: 1px solid lightgrey;
}

[data-table-theme*=zebra] tbody tr:nth-of-type(odd) {
    background: rgba(0, 0, 0, .05);
}

[data-table-theme*=zebra][data-table-theme*=dark] tbody tr:nth-of-type(odd) {
    background: rgba(255, 255, 255, .05);
}

[data-table-theme*=dark] {
    color: #ddd;
    background: #333;
    font-size: 12pt;
    border-collapse: collapse;
}

[data-table-theme*=dark] thead th,
[data-table-theme*=dark] tfoot th {
    color: #aaa;
    background: rgba(0255, 255, 255, .15);
}

[data-table-theme*=dark] caption {
    padding: .5em;
}

[data-table-theme*=dark] th,
[data-table-theme*=dark] td {
    padding: .5em;
    border: 1px solid grey;
}

 

.table-header {
    position: sticky;
    top: 0;
    background-color: #fff;
}


.date-box-container {
    margin-left: -6px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 3px;
    max-width: 1000px;
    max-height: 35px;

}
</style>

    