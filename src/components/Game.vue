<template>

    <div class="card h-100">
        <img :src="game.cover" class="card-img-top">
        <div class="card-body d-flex flex-column justify-content-between">

            <div class="mb-2">

                <h5 class="card-title mb-2"><router-link :to="'/games/' + game.id">{{ game.name }}</router-link></h5>

                <p class="card-text text-muted mb-0">Score: {{ game.score }}</p>
                <p class="card-text text-muted mb-2">Year: {{ game.year }}</p>

                <p class="card-text">{{ game.description }}</p>

            </div>

            <div class="mb-2">
                <p class="card-text mb-0">
                    <small class="text-muted">
                        Categories: <span v-for="(category, i) in game.categories">{{ (i != 0) ? ',' : '' }} <router-link :to="'/categories/' + category.id" >{{ category.name }}</router-link></span>
                    </small>
                </p>
                <p class="card-text">
                    <small class="text-muted mb-2">
                        Platforms: <span v-for="(platform, i) in game.platforms">{{ (i != 0) ? ',' : '' }} <router-link :to="'/platforms/' + platform.id" >{{ platform.name }}</router-link></span>
                    </small>
                </p>
                <p class="card-text" v-if="game.pivot?.collection_id">
                    <button class="btn btn-link text-danger p-0" @click="removeFromCollection(game.pivot)"><i class="bi-trash"></i> Remove from this collection </button>
                </p>
            </div>

        </div>
    </div>

</template>

<script>
export default {
    name: 'Game',
    props: ['game'],
    methods: {
        removeFromCollection(pivot) {
            this.$emit('removeFromCollection', pivot);
        }
    },
}
</script>