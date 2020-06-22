<template>
  <div id="app">
    <router-view name="navbar"></router-view>
    <router-view name="body"></router-view>
  </div>
</template>

<script>

//import Navbar from './components/navbar';


export default {
  name: 'App',
  components: {
    //Navbar
  },
  data() {
    return {
      navbar : true,
      component : 'Login'
    }
  },
  created() {    
    if (this.component == 'Login') this.navbar = false;
  },
  methods : {
    toogle(value) {
      if(value) this.component = value;
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  }
}
</script>

<style>
</style>
