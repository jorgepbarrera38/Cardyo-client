<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Reportes" icon="pe-7s-news-paper" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-3">
                <div class="main-card mb-3 card">
                        <div class="card-header">Reporte de membresías pagadas</div>
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
                            <button type="submit" class="btn btn-primary" :disabled="searching" @click="getMembershipsPayed(1, true)">
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
                        Resultados - Total registros: {{ membershipsPayed.total ? membershipsPayed.total : 0 }}
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" :disabled="exporting ||  !membershipsPayed.total"
                                @click="exportInExcel">
                                <div class="spinner-border spinner-border-sm" role="status" v-if="exporting">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-file-excel" v-else></i> Exportar
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Turno</th>
                                <th>Membresía</th>
                                <th>Cantidad</th>
                                <th>Tipo</th>
                                <th>Fecha inicio</th>
                                <th>Fecha fin</th>
                                <th>Precio unitario</th>
                                <th>Precio Total</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(membershipPayed, index) in membershipsPayed.data" :key="membershipPayed.id">
                                    <td class="text"></td>
                                    <td class="text" nowrap>{{ dateWithHour(membershipPayed.created_at) }}</td>
                                    <td class="text" nowrap>{{ membershipPayed.client.identification + ' - ' + membershipPayed.client.full_names }}</td>
                                    <td class="text" nowrap>{{ membershipPayed.turn.name + ' - ' + membershipPayed.turn.time_start + ' ' + membershipPayed.turn.time_finish }}</td>
                                    <td class="text" nowrap>{{ membershipPayed.membership_type.name }}</td>
                                    <td class="text" nowrap>{{ membershipPayed.quantity }}</td>
                                    <td class="text" nowrap>{{ membershipPayed.membership_type.type }}</td>
                                    <td class="text" nowrap>{{ membershipPayed.date_start }}</td>
                                    <td class="text" nowrap>{{ membershipPayed.date_finish }}</td>
                                    <td class="text" nowrap>${{ convertMoney(membershipPayed.price) }}</td>
                                    <td class="text" nowrap>${{ convertMoney(membershipPayed.total_price) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                      <pagination :limit="1" :data="membershipsPayed" @pagination-change-page="getMembershipsPayed"></pagination>
                    </div>
                </div>
            </div>           
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
import downloadJs from 'downloadjs'
import moment from 'moment'
import formatNum from 'format-num'
export default {
    components: { PageTitle },
    data () {
        return {
            dates: {
                dateInitial: '',
                dateFinal: ''
            },
            dates2: {
                dateInitial: '',
                dateFinal: ''
            },
            membershipsPayed: {},
            totalRows: 0,
            errors: null,
            searching: false,
            saving: false,
            exporting: false,
        }
    },
    methods: {
        getMembershipsPayed (page = 1, searching = false) {
            this.searching = searching,

            this.$http.get(`reports/get-memberships-payed?page=${page}&dateInitial=${this.dates.dateInitial}&dateFinal=${this.dates.dateFinal}`)
                .then( response => {
                this.dates2 = { ...this.dates }
                this.membershipsPayed = response.data
                this.errors = null
                this.searching = false
                if (response.data.total == 0) {
                    this.$toastr.info('No se encontraron registros')
                }
            }).catch( error => {
                this.searching = false
                if (error.response.status == 422) {
                    this.errors = error.response.data.errors
                }
            })
        },
        exportInExcel () {
            this.exporting = true
            this.$http.get(`reports/get-memberships-payed-in-excel?dateInitial=${this.dates2.dateInitial}&dateFinal=${this.dates2.dateFinal}`, { responseType: 'blob' })
                .then( response => {
                    this.exporting = false
                    downloadJs(response.data)
            }).catch( error => {
                this.exporting = false
            })
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        convertMoney (value) {
            return formatNum(value)
        },
    }
}
</script>