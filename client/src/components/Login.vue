<template>
  <div class="container">
    <h1>Connection</h1>
    <label for="login">Email : </label>
    <input type="text" name="" id="login" v-model="login"><br>
    <label for="password">Password : </label>
    <input type="password" name="" id="password" v-model="password"><br>
    <button v-on:click="log()" >Connect</button>  
    <div>
      <div v-if="msg">{{ msg }}</div>
      <div v-if="users">{{users}}</div>
      <div v-for="(user, index) in users"
           v-bind:item="user"
           v-bind:index="index"
           v-bind:key="user._id"
      >
      {{ `${user}` }}
      
      </div>
      {{ `array : ${array}` }}
    </div>
  </div>
</template>

<script>
import HTTP_services from '../http_services';

export default {
  name: 'Login',
  data() {
    return {
      users : [],
      login : '',
      password : '',
      msg : '',
      array : []
    }
  },
  async created() {
    try {
      this.users = await HTTP_services.getUsers();
    } catch (err) {
      this.msg = err.message;
    }
  },
  methods: {
    async log() {
      if (this.login.length > 0 && this.password.length > 0) {
        this.array = await HTTP_services.logIn(this.login, this.password)
      } else {
        this.msg = 'Please enter login and password';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
