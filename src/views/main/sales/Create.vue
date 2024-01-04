<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Nueva venta</h3>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-danger fade show" role="alert" v-if="errors">
                                <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Cliente (*)</label>
                                        <v-select :options="clients" label="identificationAndNames" 
                                            :reduce="client => client.id"
                                            v-model="sale.client_id"></v-select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Producto (*)</label>
                                        <v-select :options="products" label="name" 
                                            v-model="productSelected"></v-select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <button class="btn btn-primary btn-sm" @click="addProductSaleDetails">
                                            <i class="fa fa-plus"></i> Agregar
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Precio unitario</th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                                <tbody>
                                                    <tr v-for="(detail, index) in sale.details" :key="detail.id">
                                                        <td nowrap>
                                                            <img width="40" 
                                                            :src="detail.product_photo ? APP_URL + detail.product_photo : require('../../../assets/product.png') "
                                                            alt="" class="rounded-circle">
                                                            {{ detail.product_name }}
                                                        </td>
                                                        <td>${{ convertMoney(detail.price_unit) }}</td>
                                                        <td>
                                                            <input type="number" class="form-control" v-model="detail.quantity">
                                                        </td>
                                                        <td>${{ convertMoney(detail.quantity * detail.price_unit) }}</td>
                                                        <td nowrap>
                                                            <button type="button" @click="deleteProductSaleDetails(index)"
                                                                class="btn btn-danger btn-sm">
                                                                <i class="fa fa-trash-alt"></i> 
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td nowrap></td>
                                                        <td><strong>Total</strong></td>
                                                        <td>${{ total }}</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <a href="#" :class="{'mt-1 btn btn-secondary btn-sm mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'sales.index' })">
                                <i class="fa fa-undo"></i> Atrás
                            </a>
                            <button class="mt-1 btn btn-primary btn-sm" :disabled="saving" @click="save">
                                <div class="spinner-border spinner-border-sm" role="status" v-if="saving">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-save" v-else></i> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
import formatNum from 'format-num'
import { mapState } from 'vuex'
export default {
    components: { PageTitle },
    created () {
        this.getDataToRegisterSale()
    },
    data () {
        return {
            sale: {
                client_id: '',
                total: '',
                details: []
            },
            clients: [],
            products: [],
            productSelected: null,
            errors: null,
            saving: false
        }
    },
    methods: {
        getDataToRegisterSale () {
            this.$http.get('sales/get-data-to-register-sale').then( response => {
                this.clients = response.data.clients

                this.clients.forEach(client => {
                    this.$set(client, 'identificationAndNames', client.identification + ' - ' + client.full_names)
                })

                this.products = response.data.products
            })
        },
        addProductSaleDetails () {
            if (!this.productSelected) {
                return this.$toastr.error('Seleccione producto')
            }

            let productExistsInTheList = this.sale.details.find(detail => detail.product_id == this.productSelected.id)

            if (productExistsInTheList) {
                return this.$toastr.error('El producto ya se encuentra en la lista')
            }

            this.sale.details.push({
                product_id: this.productSelected.id,
                product_name: this.productSelected.name,
                product_photo: this.productSelected.photo,
                price_unit: this.productSelected.price,
                quantity: '',
            })

            this.productSelected = null
        },
        deleteProductSaleDetails (index) {
            this.sale.details.splice(index, 1)
        },
        save () {

            //Verificar que haya productos en la lista
            if (!this.sale.details.length) {
                return this.$toastr.error('No ha ingresado productos')
            }
            //Verificar productos con cantidades en 0
            let productWithQuantityOutOfRange = this.sale.details.find(detail => {
                return detail.quantity < 1 || detail.quantity > 1000 || detail.quantity == null || detail.quantity == ''
            })

            if (productWithQuantityOutOfRange) {
                return this.$toastr.error(`La cantidad del producto "${productWithQuantityOutOfRange.product_name}" debe estar entre 1 y 1.000`)
            }


            this.saving = true

            this.$http.post('sales', this.sale).then( response => {
                this.clearData()
                this.saving = false
                this.$toastr.success('Venta registrada')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        clearData () {
            this.sale = {
                client_id: '',
                total: '',
                details: []
            },
            this.productSelected = null,
            this.errors = null
        },
        convertMoney (value) {
            return formatNum(value)
        }
    },
    computed: {
        ...mapState(['APP_URL']),
        total () {
            let total = 0
            this.sale.details.forEach(detail => {
                total += detail.quantity * detail.price_unit
            })

            return this.convertMoney(total)
        }
    }
}
</script>