// Modules
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueSession from 'vue-session';

// Components
import App from './App.vue'
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/v-connection/Login';
import SignUp from './components/v-connection/SignUp';
import PageNotFound from './components/404';
import Posts from './components/v-blog/posts';
import Post from './components/v-blog/post';

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueSession);

const routes = [
    {
        path : '/',
        name : 'Home',
        components : {
          navbar : Navbar,
          body : Home,
        } 
    },
    {
        path : '/Login',
        name : 'Login',
        components : { body : Login }
    },
    {
        path : '/CreateAccount',
        name : 'SignUp',
        components : { body : SignUp }
    },
    {
        path : '/posts',
        name : 'Post',
        components : { 
          navbar : Navbar,
          body : Posts
         }
    },
    {
        path : '/posts/:id',
        name : 'Posts',
        components : { 
          navbar : Navbar,
          body : Post
         }
    },
    {
        path: "*", 
        name : "PageNotFound",
        components : {
          navbar : Navbar,
          body : PageNotFound,
        } 
    }
];

const router = new VueRouter({
    routes,
    mode : 'history'
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
