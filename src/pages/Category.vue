<template>

    <div class="container">
        <div class="row">
            <div class="col my-2">
                <h1>Category: {{ category.name }}</h1>
                <p>Games in this category:</p>
            </div>
        </div>

        <hr>

        <div class="row mb-2">
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
    name: 'Platform',
    components: {
        Game,
        Pagination
    },
    data() {
        return {
            category: {},
            games: [],
            page: 1,
            last_page: 1,
            total: 0,
        }
    },
    methods: {
        getCategory() {
            axios.get('https://api.tinygames.rckt.com.br/api/categories/' + this.$route.params.id + '?page=' + this.page).then(response => {
                this.category = response.data;
                this.games = response.data.games?.data;
                this.last_page = response.data.games?.last_page || 1;
                this.total = response.data.games?.total;
            }).catch(error => {
                console.log(error.response.data);
            });
        },
        pagechanged(page) {
            this.page = page;
        },
    },
    mounted() {
        this.getCategory();
    },
    watch: {
        page() {
            this.getCategory();
        }
    }
}
</script>

<style lang="scss"></style>