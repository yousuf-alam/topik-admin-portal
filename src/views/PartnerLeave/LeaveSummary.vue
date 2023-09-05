<template>
    <div>
      <h1>Partner Leave Summary</h1>
      <table class="leave-table">
        <thead>
          <tr>
            <th>Partner Name</th>
            <th>Leave Consumed</th>
            <th>Sick/Casual Leave</th>
            <th>Unpaid Leave </th>
            <th>Leave Remained</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="partner in leaveSummary" :key="partner.partner_name">
            <td>{{ partner.partner_name }}</td>
            <td>{{ partner.leave_consumed }}</td>
            <td>{{ partner.sick_or_casual_leave_count }}</td>
            <td>{{ partner.unpaid_leave_count }}</td>
            <td>{{ partner.leave_remained }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    data() {
      return {
        leaveSummary: []
      };
    },
    mounted() {
      // Make an API request to get the partner leave summary
      // Replace with your actual API endpoint
      axios.get(`${ADMIN_URL}/partner-leave-summary`).then((response) => {
        this.leaveSummary = response.data.data;
      });
    }
  };
  </script>
  
  <style scoped>
  .leave-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .leave-table th, .leave-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .leave-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  /* Add more CSS styles as needed */
  </style>
  