<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Editar proveedor</h3>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-danger fade show" role="alert" v-if="errors">
                                <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                            </div>
                            <form @submit.prevent="save">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="position-relative form-group">
                                            <label for="" class="">Código (*)</label>
                                            <input type="text" class="form-control" v-model="provider.code" maxlength="30">
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="position-relative form-group">
                                            <label for="" class="">Nombre (*)</label>
                                            <input type="text" class="form-control" v-model="provider.name" maxlength="90">
                                        </div>
                                    </div>
                                </div>
                                <a href="#" :class="{'mt-1 btn btn-secondary btn-sm mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-providers.index' })">
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
import PageTitle from '../../components/PageTitle.vue'
export default {
    components: { PageTitle },
    created () {
        this.getProvider()
    },
    data () {
        return {
            provider: {
                code: '',
                name: '',
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        getProvider () {
            this.$http.get(`inventory-providers/${ this.$route.params.id }/edit`).then( response => {
                this.provider.code = response.data.code
                this.provider.name = response.data.name
            })
        },
        save () {
            this.saving = true

            this.$http.put(`inventory-providers/${ this.$route.params.id }`, this.provider).then( response => {
                this.$toastr.success('Proveedor actualizado')
                this.$router.push({ name: 'inventory-providers.index' })
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