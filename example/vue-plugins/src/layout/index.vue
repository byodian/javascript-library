<template>
  <div id="app">
    <div
      id="nav"
      class="nav"
    >
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      routes: this.$router.options.routes[0].children
    }
  },
  created () {
    console.log(this.$router.options.routes[0].children)
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  display: flex;
  column-gap: 2rem;
  justify-content: center;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }

  .router-link-exact-active {
    color: #42b983;
  }
}
</style>
