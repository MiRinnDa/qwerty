<template>
  <div id="app">
    <Nav />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Nav from './components/nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8fafc;
  color: #334155;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  min-height: 100vh;
}

.main-content {
  width: 100%;
  min-height: calc(100vh - 70px);
}
</style>