<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Reporte de ajustes de inventario</h3>
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
                                <button type="submit" class="btn btn-primary btn-sm" :disabled="searching" @click="getInventoryTweaks(1, true)">
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
                            <h3 class="card-title">Resultados - Total registros: {{ inventoryTweaks.total ? inventoryTweaks.total : 0 }}</h3>
                            <div class="card-tools">
                                <button class="active btn btn-success btn-sm" :disabled="exporting ||  !inventoryTweaks.total"
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
                                        <th>Tipo</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inventoryTweak, index) in inventoryTweaks.data" :key="inventoryTweak.id">
                                            <td nowrap>{{ inventoryTweak.id }}</td>
                                            <td nowrap>{{ dateWithHour(inventoryTweak.created_at) }}</td>
                                            <td nowrap>{{ inventoryTweak.type }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-block text-center card-footer">
                                <pagination :limit="1" :data="inventoryTweaks" @pagination-change-page="getInventoryTweaks"></pagination>
                            </div>
                        </div>
                    </div>
                    <div class="card" v-else>
                        <div class="card-header">
                            <h3 class="card-title">Resultados - Total registros: {{ inventoryTweaks.total ? inventoryTweaks.total : 0 }}</h3>
                            <div class="card-tools">
                                <button class="active btn btn-success btn-sm" :disabled="exporting ||  !inventoryTweaks.total"
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
                                        <th>Tipo</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="inventoryTweak in inventoryTweaks.data">
                                            <tr v-for="inventoryTweakDetail in inventoryTweak.tweak_details" :key="inventoryTweakDetail.id">
                                                <td nowrap>{{ inventoryTweak.id }}</td>
                                                <td nowrap>{{ dateWithHour(inventoryTweak.created_at) }}</td>
                                                <td nowrap>{{ inventoryTweak.type }}</td>
                                                <td nowrap>{{ inventoryTweakDetail.product.name }}</td>
                                                <td nowrap>{{ inventoryTweakDetail.quantity }}</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-block text-center card-footer">
                                <pagination :limit="1" :data="inventoryTweaks" @pagination-change-page="getInventoryTweaks"></pagination>
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
            },
            dates2: {
                dateInitial: '',
                dateFinal: '',
                type: 'summarized',
            },
            inventoryTweaks: {},
            totalInventoryTweaks: '',
            errors: null,
            searching: false,
            saving: false,
            exporting: false,
        }
    },
    methods: {
        getInventoryTweaks (page = 1, searching = false) {
            this.searching = searching,

            this.$http.get(`reports/get-inventory-tweaks?page=${page}&dateInitial=${this.dates.dateInitial}&dateFinal=${this.dates.dateFinal}&type=${this.dates.type}`)
                .then( response => {
                this.dates2 = { ...this.dates }
                this.inventoryTweaks = response.data
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
        convertMoney (value) {
            return formatNum(value)
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        exportInExcel () {
            this.exporting = true
            this.$http.get(`reports/get-inventory-tweaks-in-excel?dateInitial=${this.dates2.dateInitial}&dateFinal=${this.dates2.dateFinal}&type=${this.dates2.type}`, { responseType: 'blob' })
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