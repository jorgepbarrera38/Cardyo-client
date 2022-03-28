<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Ajustes de inventario" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Ajustes de inventario
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('inventory_tweaks.store') ? $router.push({ name: 'inventory-tweaks.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <Search placeholder="Consecutivo ajuste" @search="search"></Search>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Consecutivo</th>
                                <th>Fecha registro</th>
                                <th>Tipo</th>
                                <th></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(inventoryTweak, index) in inventoryTweaks.data" :key="inventoryTweak.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ inventoryTweak.id }}</td>
                                        <td class="text" nowrap>{{ dateWithHour(inventoryTweak.created_at) }}</td>
                                        <td class="text" nowrap>{{ inventoryTweak.type }}</td>
                                        <td class="text-center">
                                            <button type="button" 
                                                @click="hasPermission('inventory_tweaks.show') ? $router.push({ name: 'inventory-tweaks.show', params: { id: inventoryTweak.id } }) : ''"
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
                        <pagination :limit="1" :data="inventoryTweaks" @pagination-change-page="getInventoryTweaks"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import Skeleton from './_partials/Skeleton'
import formatNum from 'format-num'
import moment from 'moment'
import Search from '../../components/Search'
export default {
    components: { PageTitle, Skeleton, Search },
    created () {
        this.getInventoryTweaks()
    },
    data () {
        return {
            inventoryTweaks: {},
            searching: true
        }
    },
    methods: {
        search (search) {
            this.getInventoryTweaks(1, search)
        },
        getInventoryTweaks (page = 1, search = '') {
            this.searching = true
            this.$http.get('inventory-tweaks?page=' + page + '&search=' + search).then( response => {
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