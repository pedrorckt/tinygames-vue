<template>

    <div class="container">
        
        <div class="row">
            <div class="col">
                <h1>Categories</h1>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <ul>
                    <li v-for="category in categories" :key="category.id">
                        <router-link :to="{ name: 'category', params: { id: category.id } }">{{ category.name }}</router-link>
                    </li>
                </ul>
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
    name: 'Categories',
    components: {
    },
    data() {
        return {
            categories: [],
            page: 1,
            last_page: 1,
        }
    },
    methods: {
        getCategories() {
            axios.get('http://localhost:8000/api/categories?page=' + this.page).then(response => {
                this.categories = response.data.data;
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
        this.getCategories();
    },
    watch: {
        page() {
            this.getCategories();
        }
    }
}
</script>

<style lang="scss"></style>