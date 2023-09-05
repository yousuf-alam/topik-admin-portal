<template>
  <div class="table-container">
    <h1>Partner Leave Summary</h1>
    <table class="th-st my-table" border="1" style="margin-right: 20px">
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
    axios.get(`${ADMIN_URL}/partner-leave-summary`).then((response) => {
      this.leaveSummary = response.data.data;
    });
  }
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

  height: 300px;
  overflow-y: auto;
  margin-left: 30px;
}

.my-table {
  width: 100%;
  border-collapse: collapse;
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
</style>
  