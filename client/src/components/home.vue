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
            
            <b-button variant="danger" to="/Logout" class="mr-2">Disconnect</b-button>
            <b-button variant="success" v-on:click="logout()">See the blog</b-button>
        </b-jumbotron>
    </b-container>
</template>

<script>

import HTTP_services from '../http_services'

export default {
    name : "Home",
    methods : {
        async logout() {
            await HTTP_services.logOut(this.$router, this.$session);
        }
    }
}
</script>