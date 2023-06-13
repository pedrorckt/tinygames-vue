<template>

    <div class="row">
        <div class="col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-start">
            <p class="mb-0 text-black-50"><small>Current page: {{ page }}</small></p>
        </div>
        <div class="col-lg-6">
            <nav>
                <ul class="pagination my-3 justify-content-center">
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
        <div class="col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-end">
            <p class="mb-0 text-black-50"><small>Last page: {{ last_page }}, total items: {{ total }}</small></p>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Pagination',
    props: ['page', 'last_page', 'total'],
    methods: {
        firstPage() {
            this.$emit('pagechanged', 1);
        },
        lastPage() {
            this.$emit('pagechanged', this.last_page);
        },
    },
    watch: {
        page() {
            this.$emit('pagechanged', this.page);
        },
    },
};  
</script>