<template>
  <b-container>
    
    <b-row class="justify-content-md-center" style="margin-top:5rem">  
      <b-col cols="5">
        <b-jumbotron header-level="5" border-variant="dark" bg-variant="white" style="padding-top:0">
          
          <template v-slot:header>
            <center><img alt="Vue logo" src="../../assets/logo.png"></center>
            Sign In
          </template>
          <template v-slot:lead>Doesn't have an account? <router-link to="/CreateAccount">Sign up</router-link></template>
          <hr class="my-4">
          <b-form-group label="Email" label-for="login">
            <b-form-input type="text" id="login" v-model="login" placeholder="xyz@example.com" required />
          </b-form-group>
          
          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" type="password" v-model="password" placeholder="*****" required/>
          </b-form-group>

          <b-button v-on:click="log()" >Connect</b-button>
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-row class="mb-2 justify-content-md-center">
      <b-col cols="5">
        <b-alert show variant="danger" v-if="msg.length != 0">{{ msg }}</b-alert>
        <center><b-spinner variant="primary" v-if="loading" label="Spinning"></b-spinner></center>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HTTP_services from '../../http_services';

export default {
  name: 'Login',
  data() {
    return {
      login : '',
      password : '',
      msg : [],
      islog : Boolean,
      loading : false
    }
  },
  methods: {
    async log() {
      if (this.login && this.password) {
        this.loading = true;
        
        await HTTP_services.logIn(this.login, this.password, this.$router, this.$session)
                           .then((data) => { if (data) this.msg = data })
                           .catch((err) => { if(err) this.msg = err });
        
        this.loading = false;
      } else {
        this.msg = 'Please enter login and password.';
      }
    }
  }
}
</script>

