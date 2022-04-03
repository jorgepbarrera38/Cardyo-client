<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Compras" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Nueva compra
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
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
                            <div class="col-md-2">
                                <div class="position-relative form-group">
                                    <label for="" class="">Precio unitario (*)</label>
                                    <input type="number" class="form-control" v-model="productToAdd.price_unit">
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
                                    <th>Precio unitario</th>
                                    <th>Total</th>
                                    <th class="text-center"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detail, index) in purchase.details" :key="'detail-' + index">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ detail.inventory_product_name }}</td>
                                        <td class="text" nowrap>
                                            <input type="number" class="form-control" v-model="detail.quantity">
                                        </td>
                                        <td class="text" nowrap>
                                            <input type="number" class="form-control" v-model="detail.price_unit">
                                        </td>
                                        <td class="text" nowrap>{{ convertMoney(detail.quantity * detail.price_unit) }}</td>
                                        <td class="text-center" nowrap>
                                            <button type="button" @click="deleteProductFromDetail(index)" class="btn btn-danger btn-sm">
                                                <i class="fa fa-trash-alt"></i> 
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text"></td>
                                        <td class="text" nowrap></td>
                                        <td class="text-center"></td>
                                        <td class="text-center"><strong>Total</strong></td>
                                        <td class="text-center">{{ total }}</td>
                                        <td class="text-center" nowrap>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-purchases.index' })">
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
            products: [],
            productToAdd: {
                product: {},
                quantity: '',
                price_unit: '',
            },
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
                })

                this.products = response.data.inventoryProducts
                this.products.forEach(product => {
                    //this.$set(provider, 'fullName', `${provider.code} - ${provider.name}`)
                });
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

            if (this.productToAdd.price_unit < 1 ) {
                return this.$toastr.error('El precio unitario debe ser por lo menos 1')
            }

            if (this.productToAdd.price_unit > 100000000) {
                return this.$toastr.error('El precio unitario no debe ser superior a 100.000.000')
            }

            let productNowIsInDetails = this.purchase.details.find(detail => detail.inventory_product_id === this.productToAdd.product.id)

            if (productNowIsInDetails) {
                return this.$toastr.error('El producto ya se encuentra en la lista')
            }

            this.purchase.details.push({
                inventory_product_id: this.productToAdd.product.id,
                inventory_product_name: this.productToAdd.product.name,
                quantity: this.productToAdd.quantity,
                price_unit: this.productToAdd.price_unit,
            })
            
            this.productToAdd = {
                product: {},
                quantity: '',
                price_unit: '',
            }
        },
        deleteProductFromDetail (index) {
            this.purchase.details.splice(index, 1)
        },
        save () {

            if (!this.purchase.details.length) {
                return this.$toastr.error('No ha agregado productos')
            }

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
                inventory_provider_id: '',
                bill: '',
                date_bill: '',
                observations: '',
                details: [],
            },
            this.errors = null
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        }
    },
    computed: {
        total () {
            let total = 0
            this.purchase.details.forEach(detail => {
                total += detail.quantity * detail.price_unit
            })

            return this.convertMoney(total)
        }
    }
}
</script>