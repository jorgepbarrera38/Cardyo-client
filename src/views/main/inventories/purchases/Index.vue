<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Compras</h3>
                            <div class="card-tools">
                                <button class="active btn btn-primary btn-sm" 
                                    @click="hasPermission('inventory_purchases.store') ? $router.push({ name: 'inventory-purchases.create' }) : ''">
                                    <i class="fa fa-plus"></i> Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">

                            <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                                <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getPurchases" placeholder="Consecutivo o factura compra" v-model="search">
                                <div class="input-group-append">
                                    <button class="btn btn-default" @click="getPurchases">
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
                                        <th>Fecha registro</th>
                                        <th>Factura</th>
                                        <th>Fecha factura</th>
                                        <th>Proveedor</th>
                                        <th>Estado</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                            <tr v-for="(purchase, index) in purchases.data" :key="purchase.id">
                                                <td nowrap>{{ purchase.id }}</td>
                                                <td nowrap>{{ dateWithHour(purchase.created_at) }}</td>
                                                <td nowrap>{{ purchase.bill }}</td>
                                                <td nowrap>{{ date(purchase.date_bill) }}</td>
                                                <td nowrap>{{ purchase.provider.code + ' - ' + purchase.provider.name }}</td>
                                                <td nowrap>
                                                    <div :class="{ badge: true, 'badge-danger': purchase.status == 'Anulado', 'badge-success': purchase.status == 'Confirmado' }">{{ purchase.status }}</div>
                                                </td>
                                                <td class="text" nowrap>{{ convertMoney(purchase.total) }}</td>
                                                <td class="text-center">
                                                    <button type="button" 
                                                        title="Ver información"
                                                        @click="hasPermission('inventory_purchases.show') ? $router.push({ name: 'inventory-purchases.show', params: { id: purchase.id } }) : ''"
                                                        class="btn btn-info btn-sm mr-1">
                                                        <i class="fa fa-eye"></i> 
                                                    </button>
                                                </td>
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
            </div>
        </div>
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import Search from '../../components/Search'
import formatNum from 'format-num'
import moment from 'moment'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getPurchases()
    },
    data () {
        return {
            purchases: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getPurchases (page = 1) {
            this.searching = true
            this.$http.get('inventory-purchases?page=' + page + '&search=' + this.search).then( response => {
                this.purchases = response.data
                this.purchases.data.forEach(purchase => {
                    this.$set(purchase, 'deleting', false)
                })
                this.searching = false
            })
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        },
        date (date) {
            return moment(date).format('L')
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        
    }
}
</script>