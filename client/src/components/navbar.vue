<template>
    <div class="mb-5">
        <!-- Image and text -->

        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Vue JS Application</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#"><router-link to="/Login">Link</router-link></b-nav-item>
                <b-nav-item href="" >Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
                
                <b-img src="avatar.png" rounded="circle" alt="Circle image" width="40%" style="margin-left:15px"></b-img>
                
                <b-nav-item-dropdown right v-if="islog">
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>{{ `${user.lastname} ${user.firstname}` }}</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="logout()">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item v-else><router-link to="/Login">Sign in</router-link></b-nav-item>
            </b-navbar-nav>
            
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name : "navbar",
    data() {
        return {
            user : this.$session.get('user'),
            islog : false
        }
    },
    created() {
        if(this.$session.exists()) this.islog = true;
        else this.islog = false
    },
    methods : {
        logout() {
            this.$session.destroy();
            this.$router.push('/Login');
        }
    }
}
</script>

<style scoped>
a {
    list-style-type: none;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
}
    a :hover {
        color: rgba(255, 255, 255, 1);
    }
</style>