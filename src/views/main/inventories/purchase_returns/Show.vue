<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Devolución de compras" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Ver devolución de compra</h5>
                        <div class="row">
                            <div class="col-md-2">
                                <div class="position-relative form-group">
                                    <label for="" class="">Consecutivo</label>
                                    <input type="text" class="form-control" v-model="purchaseReturn.id" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    <label for="" class="">Fecha registro</label>
                                    <input type="text" class="form-control" :value="dateWithHour(purchaseReturn.created_at)" disabled>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="position-relative form-group">
                                    <label for="" class="">Observaciónes</label>
                                    <textarea rows="4" class="form-control" v-model="purchaseReturn.observations" disabled></textarea>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-2">
                                <div class="position-relative form-group">
                                    <label for="" class="">Consecutivo</label>
                                    <input type="text" class="form-control" v-model="purchaseReturn.purchase.id" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    <label for="" class="">Fecha registro</label>
                                    <input type="text" class="form-control" :value="dateWithHour(purchaseReturn.purchase.created_at)" disabled>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="position-relative form-group">
                                    <label for="" class="">Proveedor</label>
                                    <input type="text" class="form-control" 
                                     :value="purchaseReturn.purchase.provider.code ? purchaseReturn.purchase.provider.code + ' - ' + purchaseReturn.purchase.provider.name : ''" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    <label for="" class="">Factura</label>
                                    <input type="text" class="form-control" v-model="purchaseReturn.purchase.bill" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    <label for="" class="">Fecha factura</label>
                                    <input type="date" class="form-control" v-model="purchaseReturn.purchase.date_bill" disabled>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="position-relative form-group">
                                    <label for="" class="">Observaciónes</label>
                                    <textarea rows="4" class="form-control" v-model="purchaseReturn.purchase.observations" disabled></textarea>
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
                                    <th>Cantidad devuelta</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(purchase_return_detail, index) in purchaseReturn.purchase_return_details" :key="'detail-' + index">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ purchase_return_detail.inventory_purchase_detail.product.name }}</td>
                                        <td class="text" nowrap>{{ convertMoney(purchase_return_detail.inventory_purchase_detail.price_unit) }}</td>
                                        <td class="text" nowrap>{{ purchase_return_detail.inventory_purchase_detail.quantity }}</td>
                                        <td class="text" nowrap>{{ purchase_return_detail.quantity }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-purchase-returns.index' })">
                            <i class="fa fa-undo"></i> Atrás
                        </a>
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
        this.getPurchaseReturn()
    },
    data () {
        return {
            purchaseReturn: {
                purchase: {
                    provider: {},
                },
                purchase_return_details: []
            },
            errors: null,
            saving: false
        }
    },
    methods: {
        getPurchaseReturn () {
            this.$http.get(`inventory-purchase-returns/${ this.$route.params.id }`).then( response => {
                console.log(response.data)
                this.purchaseReturn = response.data
            })
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        }
    }
}
</script>