<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Categorías" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Nueva categoría</h5>
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <form @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Nombre (*)</label>
                                        <input type="text" class="form-control" v-model="category.name" maxlength="30">
                                    </div>
                                </div>
                            </div>
                            <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-categories.index' })">
                                <i class="fa fa-undo"></i> Atrás
                            </a>
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
import PageTitle from '../../components/PageTitle.vue'
export default {
    components: { PageTitle },
    data () {
        return {
            category: {
                name: '',
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        save () {
            this.saving = true

            this.$http.post('inventory-categories', this.category).then( response => {
                this.clearData()
                this.saving = false
                this.$toastr.success('Categoría creada')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        clearData () {
            this.category = {
                name: '',
            }
            this.errors = null
        }
    }
}
</script>