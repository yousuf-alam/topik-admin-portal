<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Salary Disbursement</span></h4>
      <div class="">
        <h1 class="my-auto tableName">
          <div class="d-flex justify-content-between gap-5">
            <div class="cursor-pointer ml-2 disburse-checked" @click="disburseChecked">Disburse checked</div>

            <select class="form-control" @change="getSalaryDisburseData" v-model="year" style="width: 180px;background: #4dbd74;color: white">
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>

            <select class="form-control" @change="getSalaryDisburseData" v-model="month" style="width: 180px;background: #4dbd74;color: white">
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>


          </div>

        </h1>
      </div>
    </div>
<!--    <div>-->
<!--      <div>-->
<!--        <p v-if="selectedData.length === 0">No data selected.</p>-->
<!--        <ul v-else>-->
<!--          <li v-for="data in selectedData" :key="data.id">-->
<!--            ID: {{ data.partner_id }}, Payable Amount: {{ data.payable_amount }},Paid Amount: {{ data.paid_amount }},-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
    <b-row>
      <div class="salary-table">
        <div>
            <div class="payment-row">
              <div class="salary-data"> <BCheckbox v-model="selectAll" @change="toggleSelectAll" />  All</div>
              <div class="salary-data"> Partner Id</div>
              <div class="salary-data"> Name</div>
              <div class="salary-data">Basic Salary</div>
              <div class="salary-data">Total Salary</div>
              <div class="salary-data">Now Pay</div>
              <div class="salary-data">Status</div>
            </div>
           <div v-for="salary in salaries" :key="salary.id" class="payment-row shadow-md">
             <div class="salary-data">

               <span class="date-btn " v-if="salary.salary_disbursement==='Paid'"> {{ salary.disbursement_date }}</span>
               <BCheckbox v-else v-model="salary.selected" @change="toggleCheckbox(salary)" />

             </div>
             <div class="salary-data"> {{salary.partner_id}}</div>
             <div class="salary-data"> {{salary.name}}</div>
             <div class="salary-data">{{salary.basic_salary}}</div>
             <div class="salary-data">{{salary.payable_amount}}</div>
             <div class="salary-data"><input v-model="salary.paid_amount" /></div>
             <div class="salary-data">
               <div class="payment-btn-paid  " v-if="salary.salary_disbursement==='Paid'"> Paid</div>
               <div class="payment-btn-paid  " v-if="salary.salary_disbursement==='Paid'" @click="downloadInvoice(salary)"> Invoice</div>

               <div class="payment-btn  " v-else @click="pay" >Disburse</div>

             </div>



           </div>
        </div>
      </div>
    </b-row>


  </div>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL  = process.env.VUE_APP_BASE_URL;
export default {
  name: "SalaryDisbursement",

  data() {
    return {
      salaries : [],
      key:'this_month',
      selectedData: [],
      selectAll: false,
      columns: [
        'id', 'partner_id', 'name','basic_salary', 'salary_disbursement','action'
      ],
      salary_id:'',
      BASE_URL: BASE_URL,
      month: '',
      year: '',
      src_image : 'images/social/',
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },
  created(){
    this.getSalaryDisburseData();
  },
  computed:{
    elementHasPermission(permission_name) {
      return (permission_name) => {
        return !!this.$store.getters['auth/hasPermission'](permission_name);
      }
    },
  },

  mounted() {
    const currentDate = new Date();
    this.month = currentDate.getMonth() + 1;
    this.year = currentDate.getFullYear();
    this.getSalaryDisburseData();

  },
  methods: {
    handleOptionChange() {
      console.log("key",this.key)
      this.getUnApproveData();
    },

    toggleSelectAll() {
      this.salaries.forEach(salary => {
        salary.selected = this.selectAll;
      });
      this.updateSelectedData();
    },

    updateSelectedData() {
      this.selectedData = this.salaries
        .filter(salary => salary.selected)
        .map(salary => ({
          id: salary.id,
          partner_id: salary.partner_id,
          payable_amount: salary.payable_amount,
          paid_amount: salary.paid_amount
        }));
    },

    toggleCheckbox(salary) {
      if (salary.salary_disbursement !== 'Paid') {
        this.updateSelectedData();
      }
    },
    pay() {
      if (this.selectedData.length === 0) {
        alert('Please select at least one checkbox before paying.');
      }
      if (this.selectedData.length >1) {
        alert('Please select disburse checked button');
      }
      if(this.selectedData.length === 1) {
        this.approveDisburseModal()
      }
    },
    disburseChecked() {
      if (this.selectedData.length === 0) {
        alert('Please select at least one checkbox before paying.');
      }
      if (this.selectedData.length >0) {
        this.approveDisburseModal()
      }

    },

    getSalaryDisburseData(){
      let formData = {
        month: this.month,
        year: this.year,

      }
      this.selectedData=[];
      axios.post(`${ADMIN_URL}/salary-disbursement-data`,formData)
        .then(response => {
          console.log('response',response);
          this.salaries = response.data.data;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },

    approveDisburseModal() {

      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes disburse it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.confirmDisbursement();
        } else {
          //this.$swal('Cancelled', 'Your file is still intact', 'info')
        }
      });
      console.log("hello id",id);



    },




    confirmDisbursement() {
      let formData=this.selectedData
      axios.post(`${ADMIN_URL}/disburse-salary-in-house`,formData)
        .then(response => {
          this.$swal('Approve Disbursement', '', 'success');
          setTimeout(()=>{
            window.location.href='/salary-disbursement';
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });
    },
    downloadInvoice(salary) {

      axios({
        method: 'post',
        url: `${ADMIN_URL}/download-salary-invoice`,
        responseType: 'arraybuffer',
        data:salary
      })
        .then(response => {
          // Check if the response is a valid PDF
          if (response.headers['content-type'] === 'application/pdf') {
            // Create a Blob from the PDF data
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'invoice.pdf';

            // Append the link to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            this.$swal('Successfully downloaded', '', 'success');
          } else {
            console.error('Invalid content type. Expected application/pdf.');
            this.$swal('Error downloading invoice', 'Invalid content type', 'error');
          }
        })
        .catch(error => {
          console.error('Error occurs', error);
          this.$swal('Error downloading invoice', 'An error occurred', 'error');
        });
    },




  },
}
</script>

<style lang="scss">
.payment-btn{
  background: #4dbd74;
  color: white;
  border: 1px solid #4dbd74;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  padding: 5px;
  height: 30px;
  //margin-left: 100px;
 cursor: pointer;

}
.payment-btn-paid{
  background:#930e3b;
  color: white;
  border: 1px solid #930e3b;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  padding: 5px;
  height: 30px;
  //margin-left: 100px;
  cursor: pointer;

}

.date-btn{
  background:#930e3b;
  color: white;
  border: 1px solid #930e3b;
  border-radius: 8px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  height: 30px;
  //margin-left: 100px;
  cursor: pointer;
}
.salary-table {
  width: 96%;
  margin: 0 auto;
}

table {

  border-collapse: collapse;
}

.payment-row {
  display: grid;
  grid-template-columns: 5rem repeat(6, 1fr);
  align-items: center;
  margin-bottom: 10px;
  gap: 0.25rem;
  height: 45px;
  background: white;
  //width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  //overflow: hidden;

  .salary-data {
    display: flex;
    justify-content: flex-start; /* align horizontally to the left */
    align-items: center;
    gap: 0.5rem;
    padding-left: 10px;
  }
}

.disburse-checked {
  border-radius: 8px;
  background: #00badd;
  font-size: 16px;
  font-weight: 500;
  margin-right: 6px;
  border: 1px solid #00badd;
  color: white;
  padding: 5px;
  cursor: pointer;
}

</style>
