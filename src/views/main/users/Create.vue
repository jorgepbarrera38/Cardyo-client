<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Nuevo usuario</h3>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-danger fade show" role="alert" v-if="errors">
                                <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                            </div>
                            <form @submit.prevent="save">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="position-relative form-group">
                                            <label for="" class="">Nombres (*)</label>
                                            <input type="text" class="form-control" v-model="user.names">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="position-relative form-group">
                                            <label for="" class="">Nombre de usuario (*)</label>
                                            <input type="text" class="form-control" v-model="user.username">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="position-relative form-group">
                                            <label for="" class="">Contraseña (*)</label>
                                            <input type="text" class="form-control" v-model="user.password">
                                        </div>
                                    </div>
                                </div>
                                <a href="#" :class="{'mt-1 btn btn-secondary btn-sm mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'users.index' })">
                                    <i class="fa fa-undo"></i> Atrás
                                </a>
                                <button class="mt-1 btn btn-primary btn-sm" :disabled="saving">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="saving">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-save" v-else></i> Guardar
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
import PageTitle from '../components/PageTitle.vue'
export default {
    components: { PageTitle },
    data () {
        return {
            user: {
                names: '',
                username: '',
                password: '',
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        save () {
            this.saving = true

            this.$http.post('users', this.user).then( response => {
                this.clearData()
                this.saving = false
                this.$toastr.success('Usuario creado')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        clearData () {
            this.user = {
                names: '',
                username: '',
                password: '',
            }
            this.errors = null
        }
    }
}
</script>