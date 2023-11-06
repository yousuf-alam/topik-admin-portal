<template>
  <div class="table-container">
    <div class="year-dropdown">
      <label for="year">Year</label>
      <select v-model="selectedYear" @change="loadLeaveSummary" class="dropdown-select">
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div class="table-content">
      
   
      <div v-if="leaveSummary.length > 0"> 
      <table class="th-st my-table" border="1">
        <thead>
          <tr>
            <th>Joining Date</th>
            <th>Partner Name</th>       
            <th>Sick/Casual Leave</th>
            <th>Unpaid Leave</th>
            <th>Leave Consumed</th>
            <th>Leave Remained</th>
          </tr>
        </thead>
     
         <tbody>
         
          <tr v-for="partner in leaveSummary" :key="partner.partner_name">
 
            <td>{{partner.joining_date}}</td>
            <td>{{ partner.partner_name }}</td>
            <td>{{ partner.sick_or_casual_leave_count }}</td>
            <td>{{ partner.unpaid_leave_count }}</td>
            <td>{{ partner.leave_consumed }}</td>
            <td>{{ partner.leave_remained }}</td>
          </tr>
           
        

        </tbody>
  
      
      </table>
    </div>
      <div v-else >
        <p class="no-data-message">No data found for this Year</p>
       </div>
       
    
  
    </div>
  </div>
</template>

  
<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  data() {
    return {
      leaveSummary: [],
      selectedYear: new Date().getFullYear(), // Default to current year
      availableYears: [],
    };
  },
  methods: {
    loadLeaveSummary() {
  
      axios.post(`${ADMIN_URL}/partner-leave-summary?year=${this.selectedYear}`).then((response) => {
        this.leaveSummary = response.data.data;
       });
    },
    fetchAvailableYears() {
      
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = 2023; year <= 2028; year++) {
        years.push(year);
      }
      this.availableYears = years;
    },
  },
  mounted() {
    this.fetchAvailableYears(); 
    this.loadLeaveSummary(); 
  },
};
</script>
  
<style scoped>
.th-st {

  tr {
    th {
      white-space: nowrap;
      padding: 5px 5px;
      text-align: center;
    }

    td {
      padding: 5px 5px;
      text-align: center;
      min-width: 190px;
      height: 60px;

    }

  }
}

.table-container {

  height: 500px;
  overflow-y: auto;
  margin-left: 30px;
}

.my-table {
  width: 100%;
  border-collapse: collapse;
}
label{

  margin-right: 5px;
}

.my-table th,
.my-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.my-table thead {
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  z-index: 1;
}

.table-container {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.year-dropdown {
  margin-bottom: 20px;
   
}



.dropdown-select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 150px;
}

/* Add styling for dropdown arrow (optional) */
.dropdown-select::after {
  content: "\25BC"; /* Unicode character for down arrow */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}

.no-data-message {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 200px;
  font-weight: bold;
  font-size: large;
}

</style>
  