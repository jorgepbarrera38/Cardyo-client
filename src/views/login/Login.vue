<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Iniciar sesión</h5>
                        <!--<div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>-->
                        <form @submit.prevent="login">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Nombre de usuario (*)</label>
                                        <input type="text" class="form-control" v-model="user.username" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Contraseña (*)</label>
                                        <input type="text" class="form-control" v-model="user.password" required>
                                    </div>
                                </div>
                            </div>
                            <button class="mt-1 btn btn-primary" :disabled="logining">
                                <div class="spinner-border spinner-border-sm" role="status" v-if="logining">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-save" v-else></i> Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    data () {
        return {
            user: {
                username: 'admin',
                password: '123'
            },
            errors: null,
            logining: false
        }
    },
    methods: {
        ...mapMutations(['changeStateAuthUser', 'setNamesUser', 'setPermissionsUser']),
        login () {
            this.logining = true

            this.$http.post('auth/login', this.user).then( response => {
                let namesUser = response.data.namesUser
                localStorage.setItem('namesUser', namesUser)

                let permissionsUser = response.data.permissionsUser
                localStorage.setItem('permissionsUser', JSON.stringify(permissionsUser))

                let token = response.data.access_token
                localStorage.setItem('access_token', token)

                axios.defaults.headers.common['Authorization'] = `bearer ${token}`

                this.setNamesUser(namesUser)
                this.setPermissionsUser(permissionsUser)
                this.changeStateAuthUser(true)

                this.$router.push({ name: 'dashboard.index' })
            }).catch( error => {
                this.logining = false
                if (error.response.status == 401) {
                    this.$toastr.error('Credenciales no válidas')
                }
            })
        },
    }
}
</script>