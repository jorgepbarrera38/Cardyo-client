<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Compras" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Ver compra</h5>
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
                                    <th></th>
                                    <th>Producto</th>
                                    <th>Cantidad inicial</th>
                                    <th>Precio unitario</th>
                                    <th>Total</th>
                                    <th>Cantidades devueltas</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detail, index) in purchase.purchase_details" :key="'detail-' + index">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ detail.product.name }}</td>
                                        <td class="text" nowrap>{{ detail.quantity }}</td>
                                        <td class="text" nowrap>{{ convertMoney(detail.price_unit) }}</td>
                                        <td class="text" nowrap>{{ convertMoney(detail.quantity * detail.price_unit) }}</td>
                                        <td class="text" nowrap>
                                            <li v-for="purchase_return_detail in detail.purchase_return_details" 
                                                :key="`purchase-return-detail-${purchase_return_detail.id}`">
                                                {{ `Devolución de compra: ${purchase_return_detail.inventory_purchase_return.id}, cantidad: ${purchase_return_detail.quantity}` }}
                                            </li>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-purchases.index' })">
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
        this.getPurchase()
    },
    data () {
        return {
            purchase: {
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