<template>
  <div id="app">
    <Header></Header>
    <Footer></Footer>
    <!-- <button @click.prevent="GetApi"></button>
    <button @click.prevent="PostApi"></button> -->
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    Header, Footer
  },
}
</script>
