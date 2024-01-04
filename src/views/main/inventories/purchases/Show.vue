<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="main-card mb-3 card">
                        <div class="card-header">
                            <h3 class="card-title">Ver detalle de compra</h3>
                            <div class="card-tools">
                                <button class="active btn btn-danger btn-sm" :disabled="purchase.deleting"
                                    @click="hasPermission('inventory_purchases.delete') ? deletePurchase() : ''">
                                    <div class="spinner-border spinner-border-sm" v-if="purchase.deleting"
                                        role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-trash-alt" v-else></i> Anular
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-danger fade show" role="alert" v-if="errors">
                                <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Consecutivo</label>
                                        <input type="text" class="form-control" v-model="purchase.id" disabled>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Fecha registro</label>
                                        <input type="text" class="form-control" :value="purchase.created_at ? dateWithHour(purchase.created_at) : ''" disabled>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Proveedor</label>
                                        <input type="text" class="form-control" :value="purchase.provider.code ? purchase.provider.code + ' - ' + purchase.provider.name : ''" disabled>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Factura</label>
                                        <input type="text" class="form-control" v-model="purchase.bill" disabled>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Fecha factura</label>
                                        <input type="date" class="form-control" v-model="purchase.date_bill" disabled>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Estado</label>
                                        <input type="text" class="form-control" v-model="purchase.status" disabled>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Observaciónes</label>
                                        <textarea rows="4" class="form-control" v-model="purchase.observations" disabled></textarea>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="table-responsive">
                                <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Subtotal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(detail, index) in purchase.purchase_details" :key="'detail-' + index">
                                            <td nowrap>
                                                <img width="40" 
                                                :src="detail.product.photo ? APP_URL + detail.product.photo : require('../../../../assets/product.png') "
                                                alt="" class="rounded-circle">
                                                {{ detail.product.name }}
                                            </td>
                                            <td nowrap>{{ detail.quantity }}</td>
                                            <td nowrap>{{ convertMoney(detail.price_unit) }}</td>
                                            <td nowrap>{{ convertMoney(detail.quantity * detail.price_unit) }}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><strong>Total</strong></td>
                                            <td>{{ convertMoney(purchase.total) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr>
                            <a href="#" :class="{'mt-1 btn btn-secondary btn-sm mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-purchases.index' })">
                                <i class="fa fa-undo"></i> Atrás
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle.vue'
import formatNum from 'format-num'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
    components: { PageTitle },
    created () {
        this.getPurchase()
    },
    data () {
        return {
            purchase: {
                deleting: false,
                provider: {},
                purchase_details: []
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        getPurchase () {
            this.$http.get(`inventory-purchases/${ this.$route.params.id }`).then( response => {
                this.purchase = response.data
                this.$set(this.purchase, 'deleting', false)
            })
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        deletePurchase () {
            this.purchase.deleting = true
            this.$http.delete(`inventory-purchases/${ this.purchase.id }`).then( response => {
                this.getPurchase()
                this.purchase.deleting = false
                this.$toastr.success('Compra anulada')
            }).catch(error => {
                this.purchase.deleting = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    return this.errors = error.response.data.errors
                }
                if (error.response.status != 403) {
                    this.$toastr.error('El registro no se pudo eliminar o anular')
                }
            })
        },
    },
    computed: {
        ...mapState(['APP_URL']),
    }
}
</script>