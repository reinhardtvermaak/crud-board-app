<template>
  <div id="app">
    <thing-list></thing-list>
  </div>
</template>

<script>
import ThingList from './components/ThingList'

export default {
  name: 'App',
  components: {
    ThingList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
