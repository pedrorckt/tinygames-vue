<template>

    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-xl-3">
                <img :src="game.cover" class="img-fluid rounded" alt="">
            </div>
            <div class="col-lg-8 col-xl-9 my-2">
                <h1>Game: {{ game.name }} ({{ game.score }})</h1>
                <p><strong>Year:</strong> {{ game.year }}</p>
                <p> <strong>Description:</strong> {{ game.description }}</p>
                <p class="mb-0">
                    <small class="text-muted">
                        Categories: <span v-for="(category, i) in game.categories">{{ (i != 0) ? ',' : '' }} <router-link :to="'/categories/' + category.id" >{{ category.name }}</router-link></span>
                    </small>
                </p>
                <p>
                    <small class="text-muted">
                        Platforms: <span v-for="(platform, i) in game.platforms">{{ (i != 0) ? ',' : '' }} <router-link :to="'/platforms/' + platform.id" >{{ platform.name }}</router-link></span>
                    </small>
                </p>
            </div>
        </div>

        <hr>

        <div class="row" v-if="auth">
            <div class="col-12">
                <form class="row row-cols-lg-auto g-3 align-items-center" @submit.prevent="addToCollection()">
                    
                    <div class="col-12">
                        <label class="visually-hidden" for="collections">Collection</label>
                        <select class="form-select" id="collections" v-model="current">
                            <option :value="collection.id" v-for="collection in collections">{{ collection.name }}</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Add to collection</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="row" v-else>
            <div class="col-12">
                <p class="text-muted mb-0">You must be logged in to add games to your collections. <router-link to="/login">Login now!</router-link></p>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="col-12 my-2">
                <h2>Images gallery</h2>
                <p>Images of this game</p>
            </div>
            <div class="col-12">

                <div id="gameCarousel" class="carousel slide" v-if="game.images">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img :src="game.images[0].url" class="d-block w-100">
                        </div>
                        <div class="carousel-item" v-for="image in game.images?.slice(1)">
                            <img :src="image.url" class="d-block w-100">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#gameCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#gameCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { Carousel } from 'bootstrap';

export default {
    name: 'Game',
    components: {
    },
    data() {
        return {
            game: {},
            auth: !!sessionStorage.getItem("auth"),
            collections: [],
            current: null,
        }
    },
    methods: {

        getPlatforms() {
            axios.get('http://localhost:8000/api/games/' + this.$route.params.id).then(response => {
                this.game = response.data;
                setTimeout(() => {
                    this.initCarousel();
                }, 100);
            }).catch(error => {
                console.log(error.response?.data);
            });
        },

        getCollections() {
            axios.get('http://localhost:8000/api/collections', {withCredentials: true}).then(response => {
                console.log(response.data);
                this.collections = response.data.collections.data;
                this.current = this.collections[0]?.id;
            }).catch(error => {
                console.log(error.response?.data);
            });
        },

        addToCollection() {
            const data = {
                game_id: this.$route.params.id,
            }
            axios.post('http://localhost:8000/api/collections/' + this.current + '/add', data, {withCredentials: true}).then(response => {
                this.$router.push('/dashboard');
            }).catch(error => {
                console.log(error.response?.data);
            });
        },

        initCarousel() {
            new Carousel(document.getElementById('gameCarousel'), {
                interval: 2000
            });
        }
    },
    mounted() {
        this.getPlatforms();
        if (sessionStorage.getItem("auth")) {
            this.getCollections();
        }
    }
}
</script>

<style lang="scss"></style>