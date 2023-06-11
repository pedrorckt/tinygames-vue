<template>

    <div class="container">
        <div class="row">
            <div class="col-6 my-2">
                <h1>My collections</h1>
            </div>
            <div class="col-6 d-flex align-items-end justify-content-end my-2">
                <router-link class="btn btn-primary" to="/collection">Create collection</router-link>
            </div>
        </div>

        <hr>

        <div class="row" v-for="collection in collections" :key="collection.id">
            <div class="col-12 mb-1">
                <h3>#{{ collection.id }} - {{ collection.name }}</h3>
            </div>
            <div class="col-3 mb-3" v-for="game in collection.games" :key="game.id">
                <div class="card h-100">
                    <img :src="game.cover" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ game.name }}</h5>
                        <p class="card-text">{{ game.description }}</p>
                        <p class="card-text">
                            <small class="text-muted">
                                Platforms: {{ game.platforms.map(p => p.name).join(", ") }} &mdash; 
                                Categories: {{ game.categories.map(c => c.name).join(", ") }} 
                            </small>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>

        <p class="my-3" v-if="!collections.length">You don't have any collections yet.</p>

    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Dashboard',
    components: {
    },
    data() {
        return {
            user: [],
            collections: [],
        }
    },
    methods: {
        getMe() {
            axios.get('http://localhost:8000/api/me', {withCredentials: true}).then(response => {
                console.log(response.data);
                this.user = response.data;
                this.collections = response.data.collections.data;
            }).catch(error => {
                console.log(error.response.data);
            });
        }
    },
    mounted() {
        this.getMe();
    }
}
</script>

<style lang="scss"></style>