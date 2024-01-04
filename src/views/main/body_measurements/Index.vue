<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Medidas corporales</h3>
                            <div class="card-tools">
                                <button class="active btn btn-primary btn-sm" @click="hasPermission('body_measurements.store') ? $router.push({ name: 'body-measurements.create' }) : ''">
                                    <i class="fa fa-plus"></i> Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">

                            <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                                <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getBodyMeasurement" placeholder="Nombre medida corporal" v-model="search">
                                <div class="input-group-append">
                                    <button class="btn btn-default" @click="getBodyMeasurement">
                                    <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>

                            <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="searching"></vue-loading>    
                            <div class="table-responsive" v-else>

                                <table class="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(bodyMeasurement, index) in bodyMeasurements.data" :key="bodyMeasurement.id">
                                            <td nowrap>{{ bodyMeasurement.name }}</td>
                                            <td nowrap>
                                                <button type="button" @click="hasPermission('body_measurements.update') ? $router.push({ name: 'body-measurements.edit', params: { id: bodyMeasurement.id } }) : ''"
                                                    title="Editar"
                                                    class="btn btn-warning btn-sm mr-1">
                                                    <i class="fa fa-edit"></i> 
                                                </button>
                                                <button type="button" @click="hasPermission('body_measurements.delete') ? deleteBodyMeasurement(bodyMeasurement, index) : ''" :disabled="bodyMeasurement.deleting"
                                                    title="Eliminar"
                                                    class="btn btn-danger btn-sm">
                                                    <div class="spinner-border spinner-border-sm" v-if="bodyMeasurement.deleting"
                                                        role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                    <i class="fa fa-trash-alt" v-else></i> 
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-block text-center card-footer">
                                <pagination :limit="1" :data="bodyMeasurements" @pagination-change-page="getBodyMeasurement"></pagination>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        <!--Fin contenido-->
        </div>
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle'
import Search from '../components/Search'
import formatNum from 'format-num'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getBodyMeasurement()
    },
    data () {
        return {
            bodyMeasurements: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getBodyMeasurement (page = 1) {
            this.searching = true
            this.$http.get('body-measurements?page=' + page + '&search=' + this.search).then( response => {
                this.bodyMeasurements = response.data
                this.bodyMeasurements.data.forEach(bodyMeasurement => {
                    this.$set(bodyMeasurement, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteBodyMeasurement (bodyMeasurement, index) {
            bodyMeasurement.deleting = true
            this.$http.delete(`body-measurements/${ bodyMeasurement.id }`).then( response => {
                this.getBodyMeasurement(this.bodyMeasurements.current_page, false)
                //this.bodyMeasurements.data.splice(index, 1)
                bodyMeasurement.deleting = false
                this.$toastr.success('Medida corporal eliminada')
            }).catch(error => {
                bodyMeasurement.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('La medida corporal no se pudo eliminar')
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    }
}
</script>