<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Ver detalle de venta</h3>
                            <div class="card-tools">
                                <button class="active btn btn-danger btn-sm" :disabled="sale.deleting"
                                    @click="hasPermission('sales.delete') ? deleteSale() : ''">
                                    <div class="spinner-border spinner-border-sm" v-if="sale.deleting"
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
                                        <input type="text" class="form-control" v-model="sale.id" disabled>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Fecha registro</label>
                                        <input type="text" class="form-control" disabled 
                                            :value="sale.created_at ? dateWithHour(sale.created_at) : ''">                                    
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Cliente</label>
                                        <input type="text" class="form-control" disabled 
                                            :value="sale.client.identification ? sale.client.identification + ' - ' + sale.client.full_names : ''">                                    
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Estado</label>
                                        <input type="text" class="form-control" v-model="sale.status" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
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
                                                    <tr v-for="(detail, index) in sale.sale_details" :key="detail.id">
                                                        <td class="text" nowrap>
                                                            <img width="40" 
                                                                :src="detail.product.photo ? APP_URL + detail.product.photo : require('../../../assets/product.png') "
                                                                alt="" class="rounded-circle">
                                                            {{ detail.product.name }}                                                            
                                                        </td>
                                                        <td>{{ detail.quantity }}</td>
                                                        <td>${{ convertMoney(detail.price_unit) }}</td>
                                                        <td>${{ convertMoney(detail.price_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td><strong>Total</strong></td>
                                                        <td>${{ convertMoney(sale.total) }}</td>
                                                    </tr>
                                                </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <a href="#" class="mt-1 btn btn-secondary btn-sm mr-1" @click.prevent="$router.push({ name: 'sales.index' })">
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
import PageTitle from '../components/PageTitle.vue'
import formatNum from 'format-num'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
    components: { PageTitle },
    created () {
        this.getSale()
    },
    data () {
        return {
            sale: {
                client: {}
            },
            errors: null
        }
    },
    methods: {
        getSale () {
            this.$http.get(`sales/${this.$route.params.id}`).then( response => {
                this.sale = response.data
                this.$set(this.sale, 'deleting', false)
            })
        },
        convertMoney (value) {
            return formatNum(value)
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        deleteSale () {
            this.sale.deleting = true
            this.$http.delete(`sales/${ this.sale.id }`).then( response => {
                this.getSale()
                this.sale.deleting = false
                this.$toastr.success('Venta anulada')
            }).catch(error => {
                this.sale.deleting = false
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