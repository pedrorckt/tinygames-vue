<template>

<div class="container">
        <div class="row">
            <div class="col my-2">
                <h1>Platforms</h1>
                <p>Here you can find all game platforms.</p>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="col">
                <ul>
                    <li v-for="platform in platforms" :key="platform.id">
                        <router-link :to="{ name: 'platform', params: { id: platform.id } }">{{ platform.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Platforms',
    components: {
    },
    data() {
        return {
            platforms: [],
        }
    },
    methods: {
        getPlatforms() {
            axios.get('http://localhost:8000/api/platforms').then(response => {
                this.platforms = response.data.data;
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