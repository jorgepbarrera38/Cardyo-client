<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="text-center">Iniciar sesión</h5>
                            <!--<div class="alert alert-danger fade show" role="alert" v-if="errors">
                                <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                            </div>-->
                            <form @submit.prevent="login">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div >
                                            <center v-if="showSkeleton">
                                                <vue-skeleton-loader
                                                    type="rect"
                                                    :width="200"
                                                    :height="200"
                                                    animation="fade"
                                                />
                                            </center>
                                            <img width="200" :src="APP_URL + LOGO_COMPANY" @load="loadImage" v-show="!showSkeleton"
                                                class="img img-thumbnail"
                                                style="display:block;margin:auto;">
                                        </div>
                                    </div>
                                </div>
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
                                            <input type="password" class="form-control" v-model="user.password" required>
                                        </div>
                                    </div>
                                </div>
                                <button class="mt-1 btn btn-primary" :disabled="logining">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="logining">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-sign-in-alt" v-else></i> Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            user: {
                username: '',
                password: ''
            },
            errors: null,
            logining: false,
            showSkeleton: true,
        }
    },
    methods: {
        loadImage () {
            this.showSkeleton = false
        },
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
    },
    computed: {
        ...mapState(['APP_URL', 'LOGO_COMPANY'])
    }
}
</script>