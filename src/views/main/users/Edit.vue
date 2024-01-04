<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Editar usuario</h3>
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
                                            <label for="" class="">Contraseña</label>
                                            <input type="text" class="form-control" v-model="user.password">
                                            <em>Si no desea actualizar la contraseña, no diligenciar este campo.</em>
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
    created () {
        this.getUser();
    },
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
        getUser () {
            this.$http.get(`users/${this.$route.params.id}`, this.user).then( response => {
                this.user = response.data
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        save () {
            this.saving = true

            this.$http.put(`users/${this.$route.params.id}`, this.user).then( response => {
                this.saving = false
                this.$toastr.success('Usuario actualizado')
                this.$router.push({ name: 'users.index' })
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
    }
}
</script>