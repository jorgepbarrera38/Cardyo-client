<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Ajustes de inventario" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Nuevo ajuste de inventario
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="position-relative form-group">
                                    <label for="" class="">Tipo (*)</label>
                                    <select class="form-control" v-model="inventoryTweak.type">
                                        <option value="">Seleccione tipo</option>
                                        <option value="Entrada">Entrada</option>
                                        <option value="Salida">Salida</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="position-relative form-group">
                                    <label for="" class="">Observaciónes (*)</label>
                                    <textarea rows="3" class="form-control" v-model="inventoryTweak.observations"></textarea>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="position-relative form-group">
                                    <label for="" class="">Producto (*)</label>
                                    <v-select :options="products" label="name" v-model="productToAdd.product"></v-select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="position-relative form-group">
                                    <label for="" class="">Cantidad (*)</label>
                                    <input type="number" class="form-control" v-model="productToAdd.quantity">
                                </div>
                            </div>
                        </div>
                        <button class="mt-1 btn btn-success" @click="addProductToDetail">
                            <i class="fa fa-plus"></i> Agregar
                        </button>
                        <hr>
                        <div class="table-responsive">
                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th class="text-center"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detail, index) in inventoryTweak.details" :key="'detail-' + index">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ detail.inventory_product_name }}</td>
                                        <td class="text" nowrap>
                                            <input type="number" class="form-control" v-model="detail.quantity">
                                        </td>
                                        <td class="text-center" nowrap>
                                            <button type="button" @click="deleteProductFromDetail(index)" class="btn btn-danger btn-sm">
                                                <i class="fa fa-trash-alt"></i> 
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-tweaks.index' })">
                            <i class="fa fa-undo"></i> Atrás
                        </a>
                        <button class="mt-1 btn btn-primary" :disabled="saving" @click="save">
                            <div class="spinner-border spinner-border-sm" role="status" v-if="saving">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <i class="fa fa-save" v-else></i> Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle.vue'
import formatNum from 'format-num'
export default {
    components: { PageTitle },
    created () {
        this.getDataToCreateInventoryTweak()
    },
    data () {
        return {
            inventoryTweak: {
                type: '',
                observations: '',
                details: []
            },
            products: [],
            productToAdd: {
                product: {},
                quantity: '',
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        getDataToCreateInventoryTweak () {
            this.$http.get('inventory-tweaks/get-data-to-create-inventory-tweak').then( response => {
                this.products = response.data.inventoryProducts
            })
        },
        addProductToDetail () {

            if (!this.productToAdd.product.id) {
                return this.$toastr.error('Seleccione el producto')
            }

            if (this.productToAdd.quantity < 1 ) {
                return this.$toastr.error('La cantidad debe ser por lo menos 1')
            }

            if (this.productToAdd.quantity > 1000000) {
                return this.$toastr.error('La cantidad no debe ser superior a 1.000.000')
            }

            let productNowIsInDetails = this.inventoryTweak.details.find(detail => detail.inventory_product_id === this.productToAdd.product.id)

            if (productNowIsInDetails) {
                return this.$toastr.error('El producto ya se encuentra en la lista')
            }

            this.inventoryTweak.details.push({
                inventory_product_id: this.productToAdd.product.id,
                inventory_product_name: this.productToAdd.product.name,
                quantity: this.productToAdd.quantity,
            })
            
            this.productToAdd = {
                product: {},
                quantity: '',
            }
        },
        deleteProductFromDetail (index) {
            this.inventoryTweak.details.splice(index, 1)
        },
        save () {

            if (!this.inventoryTweak.details.length) {
                return this.$toastr.error('No ha agregado productos')
            }

            this.saving = true

            this.$http.post('inventory-tweaks', this.inventoryTweak).then( response => {
                this.clearData()
                this.saving = false
                this.$toastr.success('Ajuste de inventario registrado')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        clearData () {
            this.inventoryTweak = {
                type: '',
                observations: '',
                details: []
            },
            this.errors = null
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        }
    },
}
</script>