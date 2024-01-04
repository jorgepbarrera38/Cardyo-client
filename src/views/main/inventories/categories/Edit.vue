<template>
    <div class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Editar categoría</h3>
                    </div>
                    <div class="card-body">
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
                            <a href="#" :class="{'mt-1 btn btn-secondary btn-sm mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-categories.index' })">
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
        this.getCategory()
    },
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
        getCategory () {
            this.$http.get(`inventory-categories/${ this.$route.params.id }/edit`).then( response => {
                this.category.name = response.data.name
            })
        },
        save () {
            this.saving = true

            this.$http.put(`inventory-categories/${ this.$route.params.id }`, this.category).then( response => {
                this.$toastr.success('Categoría actualizada')
                this.$router.push({ name: 'inventory-categories.index' })
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