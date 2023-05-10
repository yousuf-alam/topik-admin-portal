<template>
  <div>
    <td>{{ result.scheduled_date }}</td>
    <td>{{ result.day_of_week }}</td>
    <td>{{ result.name }}</td>
    <td>{{ result.admin_count }}</td>
  </div>
</template>

<script>
export default  {
  name: "Table Column",
  props: ['item', 'main-data'],
  data: () => ({

  }),
  computed: {
    mainJson() {
      return this.mainData;
    },
    itemData() {
      return this.item;
    },
    result() {
      let result = this.mainJson.find(item => item.id === this.itemData.id);
      return result;
    }
  }
}
</script>
