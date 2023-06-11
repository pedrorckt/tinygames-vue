<template>

<div class="container">
        <div class="row">
            <div class="col">
                <h1>Game: {{ game.name }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <img :src="game.cover" class="img-fluid rounded" alt="">
            </div>
            <div class="col-lg-9">
                <p><strong>Year:</strong> {{ game.year }}</p>
                <p><strong>Description:</strong> {{ game.description }}</p>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Game',
    components: {
    },
    data() {
        return {
            game: {},
        }
    },
    methods: {
        getPlatforms() {
            axios.get('http://localhost:8000/api/games/' + this.$route.params.id).then(response => {
                this.game = response.data;
            }).catch(error => {
                console.log(error.response.data);
            });
        }
    },
    mounted() {
        this.getPlatforms();
    }
}
</script>

<style lang="scss"></style>