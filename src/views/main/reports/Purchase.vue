<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Reportes" icon="pe-7s-note2" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-3">
                <div class="main-card mb-3 card">
                        <div class="card-header">Reporte de compras</div>
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
                                <label for="">Incluír anuladas</label>
                                <input type="checkbox" v-model="dates.status"
                                    class="ml-2" required>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="searching" @click="getPurchases(1, true)">
                                 <div class="spinner-border spinner-border-sm" role="status" v-if="searching">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-search" v-else></i> {{ searching ? 'Buscando' : 'Buscar' }}
                            </button>

                    </div>
                </div>
            </div> 
            <div class="col-md-9">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Resultados - Total registros: {{ purchases.total ? purchases.total : 0 }}
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('purchases.store') ? $router.push({ name: 'purchases.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Consecutivo</th>
                                <th>Fecha</th>
                                <th>Proveedor</th>
                                <th>Estado</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(purchase, index) in purchases.data" :key="purchase.id">
                                    <td class="text"></td>
                                    <td class="text" nowrap>{{ purchase.id }}</td>
                                    <td class="text" nowrap>{{ dateWithHour(purchase.created_at) }}</td>
                                    <td class="text" nowrap>{{ purchase.provider.code + ' - ' + purchase.provider.name }}</td>
                                    <td class="text" nowrap>{{ purchase.status }}</td>
                                    <td class="text" nowrap>${{ convertMoney(purchase.total) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                      <pagination :limit="1" :data="purchases" @pagination-change-page="getPurchases"></pagination>
                    </div>
                </div>
            </div>           
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
import formatNum from 'format-num'
import moment from 'moment'
export default {
    components: { PageTitle },
    data () {
        return {
            dates: {
                dateInitial: '',
                dateFinal: '',
                status: 0
            },
            purchases: {},
            totalPurchases: '',
            errors: null,
            searching: false,
            saving: false,
        }
    },
    methods: {
        getPurchases (page = 1, searching = false) {
            this.searching = searching,

            this.$http.get(`reports/get-purchases?page=${page}&dateInitial=${this.dates.dateInitial}&dateFinal=${this.dates.dateFinal}&status=${this.dates.status}`)
                .then( response => {
                this.purchases = response.data.purchases
                this.errors = null
                this.searching = false
                console.log(response.data);
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
        }
    }
}
</script>