<template>
    <div class="mb-5">
        <!-- Image and text -->

        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Vue JS Application</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="/posts">Blog</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
                
                
                <b-nav-item-dropdown right v-if="islog">
                    
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <b-avatar v-if="user" :text="user.lastname[0].toUpperCase() + user.firstname[0].toUpperCase() "></b-avatar>
                        <b-avatar v-else variant="danger"></b-avatar>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="logout()">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/Login" v-else>Sign in</b-nav-item>
            </b-navbar-nav>
            
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import HTTP_services from '../http_services'

export default {
    name : "navbar",
    data() {
        return {
            user : this.$session.get('user'),
            islog : false,
        }
    },
    created() {
        if(this.$session.exists()) this.islog = true;
        else this.islog = false
    },
    methods : {
        async logout() {
            await HTTP_services.logOut(this.$router, this.$session);
        }
    }
}
</script>
