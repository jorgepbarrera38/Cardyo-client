<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Empresa" icon="pe-7s-clock" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Datos de empresa
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
                                        <input type="text" class="form-control" v-model="company.name">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Logo</label> <br>
                                        <img v-if="company.photo" class="img img-thumbnail" width="200"  alt="" :src="APP_URL + company.photo">
                                        <croppa v-model="myCroppa" 
                                                placeholder="Seleccione imagen"
                                                :placeholder-font-size="14"
                                                :prevent-white-space="true"></croppa>
                                        
                                        
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
import { mapState } from 'vuex'
export default {
    components: { PageTitle },
    created () {
        this.getCompany()
    },
    data () {
        return {
            company: {
                name: '',
                photo: '',
            },
            myCroppa: {},
            errors: null,
            saving: false
        }
    },
    methods: {
        getCompany () {
            this.$http.get('company').then( response => {
                this.company = response.data ? response.data : { name: '', photo: '', }
            })
        },
        save () {
            this.myCroppa.generateBlob(blob => {

                this.saving = true

                let data = new FormData()

                data.append('photo', blob)
                data.append('name', this.company.name)                
                
                this.$http.post('company', data).then( response => {
                    this.getCompany()
                    this.saving = false
                    this.errors = null
                    this.$toastr.success('Datos de empresa actualizados')
                }).catch( error => {
                    this.saving = false
                    if (error.response.status == 422) {
                        this.$toastr.error('Verifica los errores de validación')
                        this.errors = error.response.data.errors
                    }
                })
            })
        },
    },
    computed: {
        ...mapState(['APP_URL'])
    }
}
</script>