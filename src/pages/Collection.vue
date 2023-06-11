<template>

    <div class="d-flex align-items-center py-4">
        <main class="form-signin w-100 m-auto">
            <form @submit.prevent="create()">
                
                <h1 class="h3 mb-3 fw-normal">New collection</h1>
                
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" v-model="name" placeholder="My game collection">
                    <label for="name">Name</label>
                </div>
                
                <button class="btn btn-primary w-100 py-2" type="submit">Create</button>

                <p class="text-danger my-2" v-if="error">{{ error }}</p>

            </form>
        </main>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Collection',
    components: {
    },
    data() {
        return {
            name: '',
            error: '',
        }
    },
    methods: {
        create() {
            axios.post('http://localhost:8000/api/collections', {
                name: this.name,
            }, {withCredentials: true}).then(response => {
                this.$router.push('/dashboard');
            }).catch(error => {
                this.error = error.response.data?.message;
            });
        }
    }
}
</script>

<style lang="scss">
.form-signin {
    max-width: 350px;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>