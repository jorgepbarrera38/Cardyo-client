<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Ventas</h3>
                            <div class="card-tools">
                                <button class="active btn btn-primary btn-sm" 
                                    @click="hasPermission('sales.store') ? $router.push({ name: 'sales.create' }) : ''">
                                    <i class="fa fa-plus"></i> Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">

                            <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                                <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getSales" placeholder="Consecutivo venta" v-model="search">
                                <div class="input-group-append">
                                    <button class="btn btn-default" @click="getSales">
                                    <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        
                            <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="searching"></vue-loading>
                            <div class="table-responsive" v-else>
                                <table class="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th>Consecutivo</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr v-for="(sale, index) in sales.data" :key="sale.id">
                                                <td nowrap>{{ sale.id }}</td>
                                                <td nowrap>{{ dateWithHour(sale.created_at) }}</td>
                                                <td nowrap>
                                                    <div :class="{ badge: true, 'badge-danger': sale.status == 'Anulado', 'badge-success': sale.status == 'Confirmado' }">{{ sale.status }}</div>
                                                </td>
                                                <td>${{ convertMoney(sale.total) }}</td>
                                                <td nowrap>
                                                    <button type="button" 
                                                        @click="hasPermission('sales.show') ? $router.push({ name: 'sales.show', params: { id: sale.id } }) : ''"
                                                        title="Ver información"
                                                        class="btn btn-info btn-sm mr-1">
                                                        <i class="fa fa-eye"></i> 
                                                    </button>
                                                </td>
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
            </div>
        </div>
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle'
import Search from '../components/Search'
import formatNum from 'format-num'
import moment from 'moment'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getSales()
    },
    data () {
        return {
            sales: {},
            search: '',
            searching: true
        }
    },
    methods: {
        search (search) {
            this.searchBody = search
            this.getSales()
        },
        getSales (page = 1) {
            this.searching = true
            this.$http.get('sales?page=' + page + '&search=' + this.search).then( response => {
                this.sales = response.data
                this.sales.data.forEach(sale => {
                    this.$set(sale, 'deleting', false)
                })
                this.searching = false
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