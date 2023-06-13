<template>

    <div class="d-flex align-items-center py-4">
        <main class="form-signin w-100 m-auto">
            <form @submit.prevent="login()">
                
                <img class="rounded mb-4" src="https://storage.googleapis.com/tinygames/images/tinygames.svg?a" alt="TinyGames" width="128" height="128">
                
                <h1 class="h3 mb-3 fw-normal">Please log</h1>
                
                <div class="form-floating">
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                
                <div class="form-floating">
                    <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                
                <button class="btn btn-primary w-100 py-2" type="submit"><i class="bi bi-box-arrow-in-right"></i> Login</button>

                <p class="text-danger my-2" v-if="error">{{ error }}</p>

                <div class="my-2">
                    <!-- <router-link to="/forgot-password">Forgot password?</router-link> -->
                    <p class="text-body-secondary">Don't have an account? <router-link to="/register">Register</router-link></p>
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
            email: '',
            password: '',
            error: '',
        }
    },
    methods: {
        login() {
            axios.get('https://api.tinygames.rckt.com.br/sanctum/csrf-cookie');
            axios.post('https://api.tinygames.rckt.com.br/login', {
                email: this.email,
                password: this.password,
            }, {withCredentials: true}).then(response => {
                localStorage.setItem("auth", "logged");
                window.location.href = '/#/dashboard';
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