<template>
    <b-container>
        <b-jumbotron>
            <template v-slot:header>Home</template>

            <template v-slot:lead>
            This is a simple Vue js application, coupled with Node Js in backend.
            </template>

            <hr class="my-4">

            <p>
            It uses authentication to get all content, you can create an account or see the blog.
            </p>
            
            <b-button variant="danger" href="#" class="mr-2">Disconnect</b-button>
            <b-button variant="success" href="#">See the blog</b-button>
        </b-jumbotron>
    </b-container>
</template>

<script>
export default {
    name : "Home",
    data() {
      return {
        toastCount: 0
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push({ name : 'Login', params : { title : 'Access forgiven', type : 'danger', msg : 'You must be connected to check this page'}});
      }
    },
    mounted() {
      let title = this.$router.history.current.params.title;
      let type = this.$router.history.current.params.type;
      let message = this.$router.history.current.params.msg;
      
      this.makeToast(null, title, type, message);
    },
    methods: {
      makeToast(append = false, title, type, message) {
        if (message) {
          this.toastCount++
          this.$bvToast.toast(message, {
            title: title,
            variant : type,
            solid : true,
            autoHideDelay: 5000,
            appendToast: append
          })
        }
      }
    }
}
</script>