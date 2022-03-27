<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Empresa" icon="pe-7s-clock" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Datos de empresa</h5>
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <form @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Nombre (*)</label>
                                        <input type="text" class="form-control" v-model="company.name">
                                    </div>
                                </div>
                            </div>
                            <button class="mt-1 btn btn-primary" :disabled="saving">
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
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
export default {
    components: { PageTitle },
    created () {
        this.getCompany()
    },
    data () {
        return {
            company: {
                name: '',
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        getCompany () {
            this.$http.get('company').then( response => {
                this.company = response.data ? response.data : {}
            })
        },
        save () {
            this.saving = true
            
            this.$http.post('company', this.company).then( response => {
                this.saving = false
                this.$toastr.success('Datos de empresa actualizados')
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