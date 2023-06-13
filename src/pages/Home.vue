<template>

    <div class="container">
        <div class="row">
            <div class="col my-2">
                <h1>TinyGames</h1>
                <p>Make your own game collection!</p>
            </div>
        </div>

        <hr>

        <div class="text-bg-light rounded p-3 mb-3">

            <div class="row">
                <div class="col">
                    <div class="form-floating">
                        <input type="number" class="form-control form-control-sm" id="startYear" v-model="startYear" placeholder="1999">
                        <label for="startYear">From year:</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input type="number" class="form-control form-control-sm" id="endYear" v-model="endYear" placeholder="2020">
                        <label for="endYear">Until year:</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input type="number" class="form-control form-control-sm" id="minScore" v-model="minScore" placeholder="1999">
                        <label for="minScore">Min score:</label>
                    </div>
                </div>
                <div class="col d-flex align-items-center justify-content-end">
                    <button class="btn btn-primary" @click="filter"><i class="bi bi-search"></i> Filter</button>
                </div>
            </div>

        </div>
        

        <div class="row my-2">
            <div class="col-md-6 col-lg-3 mb-3" v-for="game in games" :key="game.id">
                <Game :game="game"></Game>
            </div>
        </div>

        <Pagination :page="page" :last_page="last_page" :total="total" @pagechanged="pagechanged"></Pagination>

    </div>

</template>

<script>
import axios from 'axios';
import Game from '../components/Game.vue';
import Pagination from '../components/Pagination.vue';

export default {
    name: 'Home',
    components: {
        Game,
        Pagination,
    },
    data() {
        return {
            games: [],
            page: 1,
            last_page: 1,
            total: 0,
            startYear: 1999,
            endYear: 2020,
            minScore: 50,
            filtered: false,
        }
    },
    methods: {

        getGames() {
            let url = 'http://localhost:8000/api/games/search';
            url += '?page=' + this.page;
            if (this.filtered) {
                url += '&startYear=' + this.startYear + '&endYear=' + this.endYear + '&minScore=' + this.minScore;
            } 
            axios.get(url).then(response => {
                this.games = response.data.data;
                this.last_page = response.data.last_page;
                this.total = response.data.total;
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        pagechanged(page) {
            this.page = page;
        },

        filter() {
            this.filtered = true;
            this.page = 1;
            this.getGames();
        }

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