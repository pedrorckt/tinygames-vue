<template>

    <div class="container">
        <div class="row">
            <div class="col-6 my-2">
                <h1>My collections</h1>
            </div>
            <div class="col-6 d-flex align-items-end justify-content-end my-2">
                <router-link class="btn btn-primary" to="/collection"><i class="bi bi-folder-plus"></i> Create collection</router-link>
            </div>
        </div>

        <hr>

        <div class="row mb-2" v-for="collection in collections" :key="collection.id">
            <div class="col-8">
                <h3>#{{ collection.id }} - {{ collection.name }}</h3>
            </div>
            <div class="col-4 d-flex justify-content-end mb-2">
                <button class="btn btn-outline-danger" @click="deleteCollection(collection.id)"><i class="bi-trash"></i> Delete</button>
            </div>
            <div class="col-lg-3 mb-3" v-for="game in collection.games" :key="game.id">
                <Game :game="game" @removeFromCollection="removeFromCollection"></Game>
            </div>
            
        </div>

        <p class="my-3" v-if="!collections.length">You don't have any collections yet.</p>

    </div>

</template>

<script>
import axios from 'axios';
import Game from '../components/Game.vue';

export default {
    name: 'Dashboard',
    components: {
        Game,
    },
    data() {
        return {
            user: [],
            collections: [],
        }
    },
    methods: {

        getMe() {
            axios.get('https://api.tinygames.rckt.com.br/api/me', {withCredentials: true}).then(response => {
                this.user = response.data;
                this.collections = response.data.collections.data;
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        deleteCollection(id) {
            if (!confirm('Are you sure you want to delete this collection?')) return;
            axios.delete('https://api.tinygames.rckt.com.br/api/collections/' + id, {withCredentials: true}).then(response => {
                this.getMe();
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        removeFromCollection(pivot) {
            if (!confirm('Are you sure you want to remove this game from this collection?')) return;
            axios.delete('https://api.tinygames.rckt.com.br/api/collections/' + pivot.collection_id + '/games/' + pivot.game_id, {withCredentials: true}).then(response => {
                this.getMe();
            }).catch(error => {
                console.log(error.response.data);
            });
        },

    },
    mounted() {
        this.getMe();
    }
}
</script>

<style lang="scss"></style>