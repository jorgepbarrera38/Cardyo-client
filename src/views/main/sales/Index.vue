<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Ventas" icon="pe-7s-clock" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Ventas
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('sales.store') ? $router.push({ name: 'sales.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <Search placeholder="Consecutivo venta" @search="search"></Search>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Consecutivo</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th class="text-center">Total</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(sale, index) in sales.data" :key="sale.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ sale.id }}</td>
                                        <td class="text" nowrap>{{ dateWithHour(sale.created_at) }}</td>
                                        <td class="text" nowrap>
                                            <div :class="{ badge: true, 'badge-danger': sale.status == 'Anulado', 'badge-success': sale.status == 'Confirmado' }">{{ sale.status }}</div>
                                        </td>
                                        <td class="text-center">${{ convertMoney(sale.total) }}</td>
                                        <td class="text-center" nowrap>
                                            <button type="button" 
                                                @click="hasPermission('sales.show') ? $router.push({ name: 'sales.show', params: { id: sale.id } }) : ''"
                                                title="Ver información"
                                                class="btn btn-info btn-sm mr-1">
                                                <i class="fa fa-eye"></i> 
                                            </button>
                                        </td>
                                    </tr>
                            </transition-group>
                            <Skeleton v-else/>
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
import PageTitle from '../components/PageTitle'
import Search from '../components/Search'
import Skeleton from './_partials/Skeleton'
import formatNum from 'format-num'
import moment from 'moment'
export default {
    components: { PageTitle, Skeleton, Search },
    created () {
        this.getSales()
    },
    data () {
        return {
            sales: {},
            searching: true
        }
    },
    methods: {
        search (search) {
            this.getSales(1, search)
        },
        getSales (page = 1, search = '') {
            this.searching = true
            this.$http.get('sales?page=' + page + '&search=' + search).then( response => {
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