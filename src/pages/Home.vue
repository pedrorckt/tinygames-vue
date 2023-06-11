<template>

    <div class="container">
        <div class="row">
            <div class="col my-3">
                <h1>TinyGames</h1>
                <p>Make your own game collection!</p>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-3 mb-3" v-for="game in games" :key="game.id">
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
    </div>

    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled': page === 1}">
                <button class="page-link" @click.prevent="firstPage()" :disabled="page === 1">First</button>
            </li>
            <li class="page-item" v-if="page > 3">
                <span class="page-link">[...]</span>
            </li>
            <li class="page-item" v-if="page > 2">
                <button class="page-link" @click.prevent="page-=2">{{ page - 2 }}</button>
            </li>
            <li class="page-item" v-if="page > 1">
                <button class="page-link" @click.prevent="page-=1">{{ page - 1 }}</button>
            </li>
            <li class="page-item disabled">
                <button class="page-link " disabled="disabled">{{ page }}</button>
            </li>
            <li class="page-item" v-if="page < last_page">
                <button class="page-link" @click.prevent="page+=1">{{ page + 1 }}</button>
            </li>
            <li class="page-item" v-if="page < last_page - 1">
                <button class="page-link" @click.prevent="page+=2">{{ page + 2 }}</button>
            </li>
            <li class="page-item" v-if="page < last_page - 2">
                <span class="page-link">[...]</span>
            </li>
            <li class="page-item" :class="{'disabled': page >= last_page}">
                <button class="page-link" @click.prevent="lastPage()" :disabled="page >= last_page">Last</button>
            </li>
        </ul>
    </nav>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    components: {
    },
    data() {
        return {
            games: [],
            page: 1,
            last_page: 1,
        }
    },
    methods: {
        getGames() {
            axios.get('http://localhost:8000/api/games?page=' + this.page).then(response => {
                this.games = response.data.data;
                this.last_page = response.data.last_page;
            }).catch(error => {
                console.log(error.response.data);
            });
        },
        firstPage() {
            this.page = 1;
        },
        lastPage() {
            this.page = this.last_page;
        },
    },
    mounted() {
        this.getGames();
    },
    watch: {
        page() {
            this.getGames();
        }
    }
}
</script>

<style lang="scss"></style>