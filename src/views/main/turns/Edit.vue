<template>
    <div class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Editar turno</h3>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <form @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Nombre (*)</label>
                                        <input type="text" class="form-control" v-model="turn.name" maxlength="50">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Hora incial (*)</label>
                                        <input type="time" class="form-control" v-model="turn.time_start">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Hora final (*)</label>
                                        <input type="time" class="form-control" v-model="turn.time_finish">
                                    </div>
                                </div>
                            </div>
                            <a href="#" :class="{'mt-1 btn btn-secondary btn-sm mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'turns.index' })">
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
        this.getTurn()
    },
    data () {
        return {
            turn: {
                name: '',
                time_start: '',
                time_finish: '',
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        getTurn () {
            this.$http.get(`turns/${ this.$route.params.id }/edit`).then( response => {
                this.turn.name = response.data.name
                this.turn.time_start = response.data.time_start
                this.turn.time_finish = response.data.time_finish
            })
        },
        save () {
            this.saving = true

            this.$http.put(`turns/${ this.$route.params.id }`, this.turn).then( response => {
                this.$toastr.success('Turno actualizado')
                this.$router.push({ name: 'turns.index' })
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