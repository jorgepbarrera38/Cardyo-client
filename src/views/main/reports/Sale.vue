<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Reportes" icon="pe-7s-note2" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-3">
                <div class="main-card mb-3 card">
                        <div class="card-header">Reporte de ventas</div>
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
                            <button type="submit" class="btn btn-primary" :disabled="searching" @click="getSales(1, true)">
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
                        Resultados <span> - Total: ${{ convertMoney(totalSales) }}</span>
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('sales.store') ? $router.push({ name: 'sales.create' }) : ''">
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
                                <th>Cliente</th>
                                <th>Estado</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(sale, index) in sales.data" :key="sale.id">
                                    <td class="text"></td>
                                    <td class="text" nowrap>{{ sale.id }}</td>
                                    <td class="text" nowrap>{{ dateWithHour(sale.created_at) }}</td>
                                    <td class="text" nowrap>{{ sale.client.identification + ' - ' + sale.client.full_names }}</td>
                                    <td class="text" nowrap>{{ sale.status }}</td>
                                    <td class="text" nowrap>${{ convertMoney(sale.total) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                      <pagination :limit="1" :data="sales" @pagination-change-page="getSales"></pagination>
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
            sales: {},
            totalSales: '',
            errors: null,
            searching: false,
            saving: false,
        }
    },
    methods: {
        getSales (page = 1, searching = false) {
            this.searching = searching,

            this.$http.get(`reports/get-sales?page=${page}&dateInitial=${this.dates.dateInitial}&dateFinal=${this.dates.dateFinal}&status=${this.dates.status}`)
                .then( response => {
                this.sales = response.data.sales
                this.totalSales = response.data.total
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