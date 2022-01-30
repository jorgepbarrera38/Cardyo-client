<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Tipos de membresías" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Editar tipo de membresía {{ membershipTypeUsed }}</h5>
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <form @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Nombre (*)</label>
                                        <input type="text" class="form-control" v-model="membershipType.name" maxlength="60" :disabled="membershipTypeUsed">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Tipo (*)</label>
                                        <select class="form-control" v-model="membershipType.type" :disabled="membershipTypeUsed">
                                            <option value="">Seleccione opción</option>
                                            <option value="Meses">Meses</option>
                                            <option value="Días">Días</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Cantidad (*)</label>
                                        <input type="number" class="form-control" v-model="membershipType.quantity" min="1" max="1000" :disabled="membershipTypeUsed">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Precio (*)</label>
                                        <input type="number" class="form-control" v-model="membershipType.price" min="1" max="10000000">
                                    </div>
                                </div>
                            </div>
                            <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'membership_types.index' })">
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
import PageTitle from '../components/PageTitle.vue'
export default {
    components: { PageTitle },
    created () {
        this.getMembershipType()
    },
    data () {
        return {
            membershipType: {
                name: '',
                type: '',
                quantity: '',
                price: '',
            },
            membershipTypeUsed: false,
            errors: null,
            saving: false
        }
    },
    methods: {
        getMembershipType () {
            this.$http.get(`membership-types/${ this.$route.params.id }/edit`).then( response => {
                this.membershipType.name = response.data.membership_type.name
                this.membershipType.type = response.data.membership_type.type
                this.membershipType.quantity = response.data.membership_type.quantity
                this.membershipType.price = response.data.membership_type.price
                this.membershipTypeUsed = response.data.membershipTypeUsed
            })
        },
        save () {
            this.saving = true

            this.$http.put(`membership-types/${ this.$route.params.id }`, this.membershipType).then( response => {
                this.$toastr.success('Tipo de membresía actualizada')
                this.$router.push({ name: 'membership_types.index' })
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