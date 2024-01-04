<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Reporte de compras</h3>
                        </div>
                        <div class="card-body">
                                <div class="alert alert-danger fade show" role="alert" v-if="errors">
                                    <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                                </div>
                                <div class="form-group">
                                    <label for="">Fecha inicial</label>
                                    <input type="date" v-model="dates.dateInitial"
                                        class="mr-2 form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Fecha final</label>
                                    <input type="date" v-model="dates.dateFinal"
                                        class="mr-2 form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Tipo</label>
                                    <select class="form-control" v-model="dates.type">
                                        <option value="summarized">Resumido</option>
                                        <option value="detailed">Detallado</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Incluír anuladas</label>
                                    <input type="checkbox" v-model="dates.status"
                                        class="ml-2" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-sm" :disabled="searching" @click="getPurchases(1, true)">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="searching">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-search" v-else></i> {{ searching ? 'Buscando' : 'Buscar' }}
                                </button>

                        </div>
                    </div>
                </div> 
                <div class="col-md-9">
                    <div class="card" v-if="dates2.type == 'summarized'">
                        <div class="card-header">
                            <h3 class="card-title">Resultados - Total registros: {{ purchases.total ? purchases.total : 0 }}</h3>
                            <div class="card-tools">
                                <button class="active btn btn-success btn-sm" :disabled="exporting ||  !purchases.total"
                                    @click="exportInExcel">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="exporting">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-file-excel" v-else></i> Exportar
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-sm table-hover">
                                    <thead>
                                    <tr>
                                        <th>Consecutivo</th>
                                        <th>Fecha</th>
                                        <th>Proveedor</th>
                                        <th>Estado</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(purchase, index) in purchases.data" :key="purchase.id">
                                            <td nowrap>{{ purchase.id }}</td>
                                            <td nowrap>{{ dateWithHour(purchase.created_at) }}</td>
                                            <td nowrap>{{ purchase.provider.code + ' - ' + purchase.provider.name }}</td>
                                            <td nowrap>{{ purchase.status }}</td>
                                            <td nowrap>${{ convertMoney(purchase.total) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-block text-center card-footer">
                                <pagination :limit="1" :data="purchases" @pagination-change-page="getPurchases"></pagination>
                            </div>
                        </div>
                    </div>
                    <div class="card" v-else>
                        <div class="card-header">
                            <h3 class="card-title">Resultados - Total registros: {{ purchases.total ? purchases.total : 0 }}</h3>
                            <div class="card-tools">
                                <button class="active btn btn-success btn-sm" :disabled="exporting ||  !purchases.total"
                                    @click="exportInExcel">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="exporting">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-file-excel" v-else></i> Exportar
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-sm table-hover">
                                    <thead>
                                    <tr>
                                        <th>Consecutivo</th>
                                        <th>Fecha</th>
                                        <th>Proveedor</th>
                                        <th>Estado</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="purchase in purchases.data">
                                            <tr v-for="purchaseDetail in purchase.purchase_details" :key="purchase.id">
                                                <td nowrap>{{ purchase.id }}</td>
                                                <td nowrap>{{ dateWithHour(purchase.created_at) }}</td>
                                                <td nowrap>{{ purchase.provider.code + ' - ' + purchase.provider.name }}</td>
                                                <td nowrap>{{ purchase.status }}</td>
                                                <td nowrap>{{ purchaseDetail.product.name }}</td>
                                                <td nowrap>{{ purchaseDetail.quantity }}</td>
                                                <td nowrap>{{ convertMoney(purchaseDetail.price_unit) }}</td>
                                                <td nowrap>{{ convertMoney(purchaseDetail.price_total) }}</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-block text-center card-footer">
                               <pagination :limit="1" :data="purchases" @pagination-change-page="getPurchases"></pagination>
                            </div>
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
import downloadJs from 'downloadjs'
export default {
    components: { PageTitle },
    data () {
        return {
            dates: {
                dateInitial: '',
                dateFinal: '',
                type: 'summarized',
                status: 0
            },
            dates2: {
                dateInitial: '',
                dateFinal: '',
                type: 'summarized',
                status: 0
            },
            purchases: {},
            totalPurchases: '',
            errors: null,
            searching: false,
            saving: false,
            exporting: false,
        }
    },
    methods: {
        getPurchases (page = 1, searching = false) {
            this.searching = searching,

            this.$http.get(`reports/get-purchases?page=${page}&dateInitial=${this.dates.dateInitial}&dateFinal=${this.dates.dateFinal}&type=${this.dates.type}&status=${this.dates.status}`)
                .then( response => {
                this.dates2 = {...this.dates}
                this.purchases = response.data.purchases
                this.errors = null
                this.searching = false
                if (response.data.purchases.total == 0) {
                    this.$toastr.info('No se encontraron registros')
                }
            }).catch( error => {
                this.searching = false
                if (error.response.status == 422) {
                    this.errors = error.response.data.errors
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        exportInExcel () {
            this.exporting = true
            this.$http.get(`reports/get-purchases-in-excel?dateInitial=${this.dates2.dateInitial}&dateFinal=${this.dates2.dateFinal}&type=${this.dates2.type}&status=${this.dates2.status}`, { responseType: 'blob' })
                .then( response => {
                    this.exporting = false
                    downloadJs(response.data)
            }).catch( error => {
                this.exporting = false
            })
        },
    }
}
</script>