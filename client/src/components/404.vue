<template>
    <b-container>
        <b-row class="justify-content-md-center">
            <b-col cols="5">
                <b-jumbotron header-level="5" border-variant="dark">
            
                    <template v-slot:header>ERROR 404</template>
                    <template v-slot:lead>This page is not found, try again.</template>
                
                </b-jumbotron>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name : "PageNotFound"
}
</script>