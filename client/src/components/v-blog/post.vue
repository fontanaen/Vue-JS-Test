<template>
    <b-container>
        <b-row>
            <b-col>
                <b-row  class="justify-content-md-center">
                    <b-col cols="7">
                        <b-jumbotron header-level="5" border-variant="dark" bg-variant="white" class="pt-2 pb-3">
                            <h3>EDIT POST</h3>
                            <b-form-group label="Title" for="title">
                                <b-form-input type="text" name="title" id="title" v-model="title" />
                            </b-form-group>
                            
                            <b-form-group label="Content" for="body">
                                <b-form-textarea type="text" name="body" id="body" v-model="content" />
                            </b-form-group>

                            <b-button v-on:click="editPost()" >Update post</b-button>
                        </b-jumbotron>
                    </b-col>
                </b-row>
                <b-alert variant="success" show v-if="success">{{ success }}</b-alert>
                <b-alert variant="danger" show v-if="error">{{ error }}</b-alert>
                <center><b-spinner variant="primary" v-if="loading" label="Spinning"></b-spinner></center>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import HTTP_services from '../../http_services'


export default {
    name : 'post',
    data() {
        return {
            id : this.$router.history.current.params.id,
            title : '',
            content : '',
            error : '',
            success : '',
            loading : false
        }
    },
    async mounted() {
        this.loading = true;
        await HTTP_services.getPostById(this.$router.history.current.params.id)
            .then((data) => {
                this.title = data.title;
                this.content = data.content;
            })
            .catch((err) => this.error = err);
        this.loading = false;
    },
    methods : {
        async editPost() {
            this.loading = true;
            await HTTP_services.editPost(this.id, this.title, this.content)
                .then((data) => {
                    this.title = data.title;
                    this.content = data.content;
                    this.success = 'Post has been updated'
                })
                .catch((err) => this.error = err);
            this.loading = false;
        }
    }
}
</script>