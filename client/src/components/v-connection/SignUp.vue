<template>
  <b-container>
    
    <b-row class="justify-content-md-center" style="margin-top:5rem">  
      <b-col cols="5">
        <b-jumbotron header-level="5" border-variant="dark" bg-variant="white" class="pb-3 pt-0">
          
          <template v-slot:header>
            <center><img alt="Vue logo" src="../../assets/logo.png"></center>
            Sign Up
          </template>

          <template v-slot:lead>Already registered? <router-link to="/Login">Sign In</router-link></template>

          <hr class="my-4">

          <b-form-row>
            <b-col cols="6">
              <b-form-group label="First Name" label-for="firstname">
              <b-form-input type="email" id="firstname" v-model="firstname" placeholder="firstname" required />
            </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Last Name" label-for="lastname">
              <b-form-input type="email" id="lolastnamegin" v-model="lastname" placeholder="lastname" required />
            </b-form-group>
            </b-col>
          </b-form-row>
          
          <b-form-group label="Email" label-for="login">
            <b-form-input type="email" id="login" v-model="email" placeholder="xyz@example.com" required />
          </b-form-group>
          
          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" type="password" v-model="password" placeholder="*****" required/>
          </b-form-group>

          <b-form-group label="Confirm password" label-for="confirm-password">
            <b-form-input id="confirm_password" type="password" v-model="confirm_password" placeholder="*****" required/>
          </b-form-group>

          <b-button v-on:click="createAccount()" >Create account</b-button>
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-row class="mb-2 justify-content-md-center">
      <b-col cols="5">
        <b-alert show variant="danger" v-for="(items, index) in msg" :key="index">{{ msg[index] }}</b-alert>
        <center><b-spinner variant="primary" v-if="loading" label="Spinning"></b-spinner></center>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HTTP_services from '../../http_services';

export default {
  name: 'SignUp',
  data() {
    return {
      firstname : '',
      lastname : '',
      email : '',
      password : '',
      confirm_password : '',
      msg : [],
      loading : false
    }
  },
  methods: {
    async createAccount() {
      this.loading = true;
      this.msg = [];
      await HTTP_services.createAccount(this.firstname, this.lastname, this.email, this.password, this.confirm_password, this.$router)
                          .then((data) => { if (data) this.msg = data })
                          .catch((err) => { if(err) this.msg.push(err) });
      this.loading = false;
    }
  }
}
</script>