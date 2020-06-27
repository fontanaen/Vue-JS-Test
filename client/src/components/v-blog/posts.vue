<template>
    <b-container>
        <b-row>
            <b-col>
                <b-row  class="justify-content-md-center">
                    <b-col cols="7">
                        <b-jumbotron header-level="5" border-variant="dark" bg-variant="white" class="pt-2 pb-3">
                            <h3>New post</h3>
                            <b-form-group label="Title" for="title">
                                <b-form-input type="text" name="title" id="title" v-model="title" />
                            </b-form-group>
                            
                            <b-form-group label="Content" for="body">
                                <b-form-textarea type="text" name="body" id="body" v-model="content" />
                            </b-form-group>

                            <b-button v-on:click="addPosts()" >Add a post</b-button>
                        </b-jumbotron>
                    </b-col>
                </b-row>
                <b-alert variant="danger" show v-if="msg">{{ msg }}</b-alert>
                <center><b-spinner variant="primary" v-if="loading" label="Spinning"></b-spinner></center>
                <b-card v-for="(items, index) in posts" :key="index" class="mt-3 mb-3 ">
                    <b-media >
                        <b-row>
                            <b-col>
                                <h5 class="mt-0">
                                    {{ items.title }}
                                </h5>                                
                            </b-col>
                            <b-col cols="2" class="text-right pr-0">
                                <b-nav align="right">
                                    <b-nav-item v-on:click="deletePost(items._id)">
                                        <b-icon-trash />
                                    </b-nav-item>
                                    <b-nav-item :to="`/posts/${items._id}`">
                                        <b-icon-pencil-square />
                                    </b-nav-item>
                                </b-nav>
                            </b-col>
                        </b-row>
                        
                        
                        <hr>
                        <p>
                            {{ items.content}}
                        </p>
                    </b-media>
                </b-card>
                <b-alert variant="secondary" show v-if="posts.length == 0"><h5>Any post to display</h5></b-alert>
                
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import HTTP_services from '../../http_services';

export default {
    name : 'Posts',
    data() {
        return {
            title : '',
            content : '',
            posts : [],
            loading : false,
            msg : ''
        }
    },
    async mounted() {
        await HTTP_services.getPosts()
            .then((data) => data.forEach(element => {
                this.posts.push(element);
            }))
            .catch((err) => this.msg = err)
    },
    methods : {
        async addPosts() {
            if (this.title && this.content) {
                this.loading = true;
                await HTTP_services.addPosts(this.title, this.content, Date.now())
                    .then((data) => {
                        this.posts = [];
                        data.forEach(element => this.posts.push(element));
                    })
                    .catch((err) => this.msg = err);
                console.log(this.posts);
                this.loading = false;
            } else this.msg = 'Please, complete all fields';
        },
        async deletePost(id) {
            console.log('here')
            this.loading = true;
            await HTTP_services.deletePost(id)
                .then((data) => {
                    this.posts = [];
                    data.forEach(element => this.posts.push(element));
                })
                .catch((err) => this.msg = err);
             this.loading = false;
        }
    }

}
</script>