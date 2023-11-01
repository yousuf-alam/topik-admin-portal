<template>
    <div class="animated fadeIn">
        <b-card >
            <b-row class="p-2 border-bottom" style="margin-left:25px;">
                <h4>Cancel Reason Stat.</h4>
            </b-row>
            <b-row class="p-5 h-100">
                <div class="card" >
                    <v-client-table :data="cancelReasonData" :columns="CancelReasonTableColumn" :options="options">

                        <template slot="Actions" slot-scope="{ row }">
                             
                        </template>

                    </v-client-table>
                </div>
            </b-row>
                 <div class="m-3 p-3">
                    <b-row class="p-2 border-bottom">
                        <h4>Details AreaWise Reports</h4>
                    </b-row>

                    <b-row class="p-5 h-100">
                         <b-col>
                            <label>Area</label>
                            <b-form-select v-model="AreaDropdownValue">
                                 <b-form-select-option v-for="option in areaOptions" :key="option.value"
                                    :value="option.value">
                                    {{ option.label }}
                                </b-form-select-option>
                            </b-form-select>
                        </b-col>

                        <b-col>
                            <label>Date Range</label>
                            <div class="date-box">
                                <p>{{ date_range.start }} : {{ date_range.end }}</p>
                            </div>
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
                            <b-btn class="center-div btn-block btn-primary" @click="showReport">Show</b-btn>
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
                { label: "Chawkbazar", value: "Chawkbazar" },
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
                { label: "Katabon", value: "Katabon" },
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
                { label: "Romoni_Parven", value: "RomoniParven" },
                { label: "Romoni_Roksana", value: "RomoniRoksana" },
                { label: "Romoni_Ruma", value: "RomoniRuma" },
                { label: "Romoni_Borsha", value: "RomoniBorsha" },
                { label: "Romoni_Sonia Akter", value: "RomoniSoniaAkter" },
                { label: "Romoni_Brishty", value: "RomoniBrishty" },
                { label: "Romoni_Selina", value: "RomoniSelina" },
                { label: "Romoni_Sharmin", value: "RomoniSharmin" },
                { label: "Romoni_Lucky", value: "RomoniLucky" },
                { label: "Romoni_Lolona", value: "RomoniLolona" },
                { label: "Romoni_Shammi", value: "RomoniShammi" },
                { label: "Romoni_Sonia Ukil", value: "RomoniSoniaUkil" },
                { label: "Romoni_Munia", value: "RomoniMunia" },
                { label: "Romoni_Nipa", value: "RomoniNipa" },
                { label: "Romoni_Anonna", value: "RomoniAnonna" },
                { label: "Romoni_Mishu", value: "RomoniMishu" },
                { label: "Romoni_Shiuli", value: "RomoniShiuli" },
                { label: "Romoni_Lima", value: "RomoniLima" },
                { label: "FR_Sporshi", value: "FR_Sporshi" },
                { label: "FR_Arika", value: "FR_Arika" },
                { label: "FR_Happy", value: "FR_Happy" },
                { label: "FR_Shahana", value: "FR_Shahana" },
                { label: "FR_Ira", value: "FR_Ira" },
                { label: "FR_Mun", value: "FR_Mun" },
                { label: "FR_Adite", value: "FR_Adite" },
                { label: "FR_Tasmeah", value: "FR_Tasmeah" },
                { label: "FR_Ira", value: "FR_Ira" },
                { label: "FR_Rotna", value: "FR_Rotna" },
                { label: "FR_Female", value: "FR_Female" },
                { label: "FR_Jannat", value: "FR_Jannat" },
                { label: "FR_Shahana", value: "FR_Shahana" },



            ],
            cancelReasonOptions: [
                { label: "All", value: "All" },
                { label: "Cus Unreachable", value: "CusUnreachable" },
                { label: "Cus Denied", value: "CusDenied" },
                { label: "SP Unreachable", value: "SPUnreachable" },
                { label: "SP Denied", value: "SPDenied" },
                { label: "SP Unavailable", value: "SPUnavailable" },
                { label: "OPS Unavailable", value: "OPSUnreachable" },
                { label: "SP Time Management Issue", value: "SPTimeManagementIssue" },
                { label: "Location Prob", value: "LocationProb" },
            ],
            areaWiseReport: [],
            cancelReasonData:[],



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
                "Percentage"
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
            }
        };
    },
    created() {

    },
    methods: {
        getDateModal(report) {
            this.$modal.show("date-picker-modal");
        },
        closeModal() {
            this.$modal.hide("date-picker-modal");
        },



        showReport() {

            if (!this.date_range.start || !this.date_range.end) {
                this.$swal("Error", "Please select a date range.", "error");
                return;
            }
            axios
                .post(`${ADMIN_URL}/area-wise-report`, {
                    from: this.date_range.start,
                    to: this.date_range.end
                })
                .then((response) => {
                    this.reportShow = true;
                    this.areaWiseReport = response.data.data;

                })


                .catch((error) => {
                    console.error('Error fetching data: ', error);
                });
        },


        exportReport() {
            this.exporting = true;
            if (!this.date_range.start || !this.date_range.end) {
                this.$swal("Error", "Please select a date range.", "error");
                this.exporting = false;
                return;
            }
            axios({
                method: "post",
                url: `${ADMIN_URL}/export-area-wise-report`,
                responseType: "blob",
                data: {
                    date_range: this.date_range,
                    from: this.date_range.start,
                    to: this.date_range.end,

                }
            })
                .then(response => {
                    console.log(response.data);
                    this.exporting = false;
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                        "download",
                        moment(this.date_range.start).format("YYYY-MM-DD") +
                        "~" +
                        moment(this.date_range.end).format("YYYY-MM-DD") +
                        ".xlsx"
                    );
                    document.body.appendChild(link);
                    link.click();
                    this.$swal("Report Exported Successfully", "", "success");
                    this.closeModal();
                })
                .catch(e => {
                    this.exporting = false;
                    console.log("error occurs", e);
                    this.$swal("Error", "Something Went Wrong", "error");
                });
        }
    }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
}

.test-modal .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
}
</style>
    