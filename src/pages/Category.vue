<template>

<div class="container">
        <div class="row">
            <div class="col">
                <h1>Category: {{ category.name }}</h1>
                <p>Games in this category:</p>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-lg-6 mb-2" v-for="game in category.games?.data" :key="game.id">
                <router-link :to="{ name: 'game', params: { id: game.id } }">#{{ game.id }} - {{ game.name }}</router-link>
                <p>{{ game.description }}</p>
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

    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Platform',
    components: {
    },
    data() {
        return {
            category: {},
            page: 1,
            last_page: 1,
        }
    },
    methods: {
        getCategory() {
            axios.get('http://localhost:8000/api/categories/' + this.$route.params.id + '?page=' + this.page).then(response => {
                this.category = response.data;
                this.last_page = response.data.games.last_page || 1;
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