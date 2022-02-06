<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Compras" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Nueva compra</h5>
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <form @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Proveedor (*)</label>
                                        <v-select :options="providers" label="fullName" 
                                            :reduce="provider => provider.id"
                                            v-model="purchase.inventory_provider_id"></v-select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Factura (*)</label>
                                        <input type="text" class="form-control" v-model="purchase.bill" maxlength="30">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Fecha factura (*)</label>
                                        <input type="date" class="form-control" v-model="purchase.date_bill">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Observaciónes (*)</label>
                                        <textarea rows="3" class="form-control" v-model="purchase.observations"></textarea>
                                    </div>
                                </div>
                            </div>
                            <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-purchases.index' })">
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
    created () {
        this.getDataToCreatePurchase()
    },
    data () {
        return {
            purchase: {
                inventory_provider_id: '',
                bill: '',
                date_bill: '',
                observations: '',
                details: []
            },
            providers: [],
            errors: null,
            saving: false
        }
    },
    methods: {
        getDataToCreatePurchase () {
            this.$http.get('inventory-purchases/get-data-to-create-purchase').then( response => {
                this.providers = response.data.inventoryProviders
                this.providers.forEach(provider => {
                    this.$set(provider, 'fullName', `${provider.code} - ${provider.name}`)
                });
            })
        },
        save () {
            this.saving = true

            this.$http.post('inventory-purchases', this.purchase).then( response => {
                this.clearData()
                this.saving = false
                this.$toastr.success('Compra registrada')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        clearData () {
            this.purchase = {
                name: '',
            }
            this.errors = null
        }
    }
}
</script>