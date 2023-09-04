<template>
    <div>
      <FullCalendar :options="calendarOptions" ref="calendar" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import FullCalendar from '@fullcalendar/vue';
  import dayGridPlugin from '@fullcalendar/daygrid';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          weekends: true,
        },
      };
    },
    mounted() {
      this.loadLeaveData();
    },
    methods: {
      loadLeaveData() {
        // Fetch the leave data from your backend API
        axios
          .get(`${ADMIN_URL}/datewise-partners-leave`)
          .then((response) => {
            const leaveEvents = response.data.data.map((item) => ({
              title: item.admin_name,
              start: item.leave_date,
            }));
  
            // Initialize the calendar
            const calendar = this.$refs.calendar.getApi();
  
            // Clear existing events on the calendar
            calendar.removeAllEvents();
  
            // Add the loaded leave events to the calendar
            calendar.addEventSource(leaveEvents);
          })
          .catch((error) => {
            console.error('Error fetching leave data:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  