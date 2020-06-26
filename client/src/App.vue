<template>
  <div id="app">
    <router-view name="navbar"></router-view>
    <router-view name="body"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.checkConnection();
  },
  mounted() {
    this.makeToast(null);
  },
  updated() {
    this.checkConnection();
    this.makeToast(true);
  },
  methods : {
    makeToast(append = false) {
      if (this.$router.history.current.params.msg) {
        this.toastCount++
        this.$bvToast.toast(this.$router.history.current.params.msg, {
          title: this.$router.history.current.params.title,
          variant : this.$router.history.current.params.type,
          solid : true,
          autoHideDelay: 5000,
          appendToast: append
        })
      }
    },
    async checkConnection() {
      const session = await this.$session;
      const name = await this.$router.history.current.name;
      // Session is running
      if (this.$session.exists()) {
        // User data doesn't exist
        if (!session.get('user')) {
          session.destroy();
          this.$router.push({ name : 'Login', params : { title : 'Loading data error', type : 'danger', msg : 'You have been disconnect because your data can not be loading. This is a security measure'}});
        } else if (session.get('user') && (name == 'Login' || name == 'SignUp' )) { // User is already connected
          return this.$router.push({ name : 'Home', params : { title : 'Keep connected', type : 'success', msg : `${this.$session.get('user').firstname}, you were already connected!`}});
        }
      } else if (!this.$session.exists() && (name != 'Login' && name != 'SignUp')) { // User type app url but he is not connected
          return this.$router.push({ name : 'Login', params : { title : 'Access forgiven', type : 'danger', msg : 'You must be connected to check app content'}});
      }
    }
  }
}
</script>

<style>
</style>
