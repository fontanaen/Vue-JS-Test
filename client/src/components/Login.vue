<template>
  <div class="container">
    <h1>Connection</h1>
    <form  method="post">
      <label for="login">Email : </label>
      <input type="text" name="" id="login"><br>
      <label for="password">Password : </label>
      <input type="password" name="" id="password"><br>
      <input type="submit" value="Connection">
    </form>
    <div>
      <div v-if="msg">{{ msg }}</div>
      <div v-for="(user, index) in users"
           v-bind:item="user"
           v-bind:index="index"
           v-bind:key="user._id"
      >
      {{ `${user.lastname} : ${user.email} | ${user.password}` }}
      </div>
    </div>
  </div>
</template>

<script>
import HTTP_services from '../http_services'

export default {
  name: 'Login',
  data() {
    return {
      users : [],
      msg : '' 
    }
  },
  async logIn() {
    try {
      this.users = await HTTP_services.getUsers();
    } catch (err) {
      this.msg = err.message;
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
