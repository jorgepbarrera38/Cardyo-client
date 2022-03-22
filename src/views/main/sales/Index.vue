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
                            <button class="active btn btn-success" @click="$router.push({ name: 'sales.create' })">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th class="text-center">Hora inicial</th>
                                <th class="text-center">Hora final</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(sale, index) in sales.data" :key="sale.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ sale.name }}</td>
                                        <td class="text-center">{{ sale.time_start }}</td>
                                        <td class="text-center">{{ sale.time_finish }}</td>
                                        <td class="text-center" nowrap>
                                            <button type="button" @click="$router.push({ name: 'sales.edit', params: { id: sale.id } })"
                                                class="btn btn-warning btn-sm mr-1">
                                                <i class="fa fa-edit"></i> 
                                            </button>
                                            <button type="button" @click="deleteSale(sale, index)" :disabled="sale.deleting"
                                                class="btn btn-danger btn-sm">
                                                <div class="spinner-border spinner-border-sm" v-if="sale.deleting"
                                                    role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <i class="fa fa-trash-alt" v-else></i> 
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
import Skeleton from './_partials/Skeleton'
import formatNum from 'format-num'
export default {
    components: { PageTitle, Skeleton },
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
        getSales (page = 1) {
            this.searching = true
            this.$http.get('sales?page=' + page).then( response => {
                this.sales = response.data
                this.sales.data.forEach(sale => {
                    this.$set(sale, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteSale (sale, index) {
            sale.deleting = true
            this.$http.delete(`sales/${ sale.id }`).then( response => {
                this.getSales()
                this.sales.data.splice(index, 1)
                sale.deleting = false
                this.$toastr.success('Saleo eliminado')
            }).catch(error => {
                sale.deleting = false
                this.$toastr.error('El registro no se pudo eliminar')
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    }
}
</script>