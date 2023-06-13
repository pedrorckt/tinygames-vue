<template>

    <div class="d-flex align-items-center py-4">
        <main class="form-register w-100 m-auto">
            <form @submit.prevent="register">
                
                <img class="rounded mb-4" src="https://storage.googleapis.com/tinygames/images/tinygames.svg?a" alt="TinyGames" width="128" height="128">
                
                <h1 class="h3 mb-3 fw-normal">Create your account</h1>
                
                <div class="mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="name" v-model="name" placeholder="John Doe">
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="name@example.com">
                        <label for="email">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
                        <label for="password">Password</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="password_confirmation" v-model="password_confirmation" placeholder="Password confirmation">
                        <label for="password_confirmation">Password confirmation</label>
                    </div>
                </div>

                <button class="btn btn-primary w-100 py-2" type="submit"><i class="bi bi-door-closed"></i> Register</button>

                <p class="text-danger my-2" v-if="error">{{ error }}</p>

                <div>
                    <p class="my-2 text-body-secondary">Already have an account? <router-link to="/login">Login</router-link></p>
                </div>

            </form>
        </main>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    components: {
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: '',
        }
    },
    methods: {
        register() {
            axios.post('https://api.tinygames.rckt.com.br/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            }, {withCredentials: true}).then(response => {
                window.location.href = '/#/dashboard';
            }).catch(error => {
                this.error = error.response.data?.message;
            });
        }
    }
}
</script>

<style lang="scss">
.form-register {
    max-width: 350px;
}
.form-register input {
  margin-bottom: -1px;
  border-radius: 0;
}
.form-register .form-floating:first-child input {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.form-register .form-floating:last-child input {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>