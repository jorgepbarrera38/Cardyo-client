<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Devolución de compras" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Nueva devolución de compra</h5>
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="position-relative form-group">
                                    <label for="" class="">Compra (*)</label>
                                    <v-select :options="purchases" label="description"
                                        :reduce="purchase => purchase.id"
                                        v-model="purchaseReturn.inventory_purchase_id"></v-select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="position-relative form-group">
                                    <label for="" class="">Observaciónes (*)</label>
                                    <textarea rows="3" class="form-control" v-model="purchaseReturn.observations"></textarea>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="table-responsive">
                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Producto</th>
                                    <th>Precio unitario</th>
                                    <th>Cantidad compra</th>
                                    <th>Total devuelto</th>
                                    <th>Disponible para devolver</th>
                                    <th>Cantidad a devolver</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detail, index) in purchaseReturn.details" :key="'detail-' + index">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ detail.productName }}</td>
                                        <td class="text" nowrap>{{ convertMoney(detail.price_unit) }}</td>
                                        <td class="text" nowrap>{{ detail.quantity_purchase }}</td>
                                        <td class="text" nowrap>{{ getTotalReturned(detail.purchase_return_details) }}</td>
                                        <td class="text" nowrap>{{ detail.quantity_purchase - getTotalReturned(detail.purchase_return_details) }}</td>
                                        <td class="text" nowrap>
                                            <input type="number" class="form-control" v-model="detail.quantity">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-purchase-returns.index' })">
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
import moment from 'moment'
export default {
    components: { PageTitle },
    created () {
        this.getDataToCreatePurchase()
    },
    data () {
        return {
            purchaseReturn: {
                inventory_purchase_id: '',
                observations: '',
                details: []
            },
            purchases: [],
            errors: null,
            saving: false
        }
    },
    methods: {
        getDataToCreatePurchase () {
            this.$http.get('inventory-purchase-returns/get-data-to-create-purchase-return').then( response => {
                this.purchases = response.data.inventoryPurchases
                this.purchases.forEach(purchase => {
                    this.$set(purchase, 'description', `${purchase.id} - ${this.dateWithHour(purchase.created_at)} | 
                                                        ${purchase.bill} - ${this.date(purchase.date_bill)}`)
                })
            })
        },
        save () {

            let purchaseReturn = {
                inventory_purchase_id: this.purchaseReturn.inventory_purchase_id,
                observations: this.purchaseReturn.observations,
                details: [],
            }

            let details = this.purchaseReturn.details.filter(detail => {
                return detail.quantity > 0
            })

            purchaseReturn.details = details

            if (!purchaseReturn.details.length) {
                return this.$toastr.error('No hay productos con cantidades para devolver')
            }

            this.saving = true

            this.$http.post('inventory-purchase-returns', purchaseReturn).then( response => {
                this.saving = false
                this.clearData()
                this.$toastr.success('Devolución de compra registrada')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        clearData () {
            this.purchaseReturn = {
                inventory_purchase_id: '',
                observations: '',
                details: []
            },
            this.errors = null
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        },
        date (date) {
            return moment(date).format('L')
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        getTotalReturned (purchase_return_details) {
            let total = 0
            purchase_return_details.forEach(purchase_return_detail => {
                total += purchase_return_detail.quantity
            });

            return total;
        }
    },
    watch: {
        'purchaseReturn.inventory_purchase_id' () {
            if (this.purchaseReturn.inventory_purchase_id) {
                let detailsFromPurchase = this.purchases.find(purchase => purchase.id == this.purchaseReturn.inventory_purchase_id).purchase_details
                this.purchaseReturn.details = detailsFromPurchase.map(detailFromPurchase => {
                    return {
                        inv_purchase_detail_id: detailFromPurchase.id,
                        productName: detailFromPurchase.product.name,
                        quantity_purchase: detailFromPurchase.quantity,
                        price_unit: detailFromPurchase.price_unit,
                        purchase_return_details: detailFromPurchase.purchase_return_details,
                        quantity: 0
                    }
                })
            } else {
                this.purchaseReturn.details = []
            }
        }
    }
}
</script>