<template>
  <div> Counter: {{ getCounter }}
    <br>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Frontend',
    methods: {
      increment () {
        this.$store.commit('increment')
      },
      decrement () {
        this.$store.commit('decrement')
      }
    },
    computed: {
      getCounter () {
        return this.$store.getters.getValue
      }
    }
  }
</script>
