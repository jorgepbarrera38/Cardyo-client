<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Ajustes de inventario</h3>
                            <div class="card-tools">
                                <button class="active btn btn-primary btn-sm" 
                                    @click="hasPermission('inventory_tweaks.store') ? $router.push({ name: 'inventory-tweaks.create' }) : ''">
                                    <i class="fa fa-plus"></i> Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">

                            <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                                <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getInventoryTweaks" placeholder="Consecutivo ajuste" v-model="search">
                                <div class="input-group-append">
                                    <button class="btn btn-default" @click="getInventoryTweaks">
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
                                            <th>Tipo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody tag="tbody" name="fade" v-if="!searching">
                                            <tr v-for="(inventoryTweak, index) in inventoryTweaks.data" :key="inventoryTweak.id">
                                                <td nowrap>{{ inventoryTweak.id }}</td>
                                                <td nowrap>{{ dateWithHour(inventoryTweak.created_at) }}</td>
                                                <td nowrap>{{ inventoryTweak.type }}</td>
                                                <td>
                                                    <button type="button" 
                                                        @click="hasPermission('inventory_tweaks.show') ? $router.push({ name: 'inventory-tweaks.show', params: { id: inventoryTweak.id } }) : ''"
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
import PageTitle from '../../components/PageTitle'
import formatNum from 'format-num'
import moment from 'moment'
import Search from '../../components/Search'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getInventoryTweaks()
    },
    data () {
        return {
            inventoryTweaks: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getInventoryTweaks (page = 1) {
            this.searching = true
            this.$http.get('inventory-tweaks?page=' + page + '&search=' + this.search).then( response => {
                this.inventoryTweaks = response.data
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
        }
    }
}
</script>