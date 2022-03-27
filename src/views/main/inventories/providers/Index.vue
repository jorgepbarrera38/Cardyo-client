<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Proveedores" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Proveedores
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('inventory_providers.store') ? $router.push({ name: 'inventory-providers.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(provider, index) in providers.data" :key="provider.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ provider.code }}</td>
                                        <td class="text" nowrap>{{ provider.name }}</td>
                                        <td class="text-center" nowrap>
                                            <button type="button"
                                                @click="hasPermission('inventory_providers.update') ? $router.push({ name: 'inventory-providers.edit', params: { id: provider.id } }) : ''"
                                                title="Editar"
                                                class="btn btn-warning btn-sm mr-1">
                                                <i class="fa fa-edit"></i> 
                                            </button>
                                            <button type="button" 
                                                @click="hasPermission('inventory_providers.delete') ? deleteProvider(provider, index) : ''" :disabled="provider.deleting"
                                                title="Eliminar"
                                                class="btn btn-danger btn-sm">
                                                <div class="spinner-border spinner-border-sm" v-if="provider.deleting"
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
                        <pagination :limit="1" :data="providers" @pagination-change-page="getProviders"></pagination>
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
export default {
    components: { PageTitle, Skeleton },
    created () {
        this.getProviders()
    },
    data () {
        return {
            providers: {},
            searching: true
        }
    },
    methods: {
        getProviders (page = 1) {
            this.searching = true
            this.$http.get('inventory-providers?page=' + page).then( response => {
                this.providers = response.data
                this.providers.data.forEach(provider => {
                    this.$set(provider, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteProvider (provider, index) {
            provider.deleting = true
            this.$http.delete(`inventory-providers/${ provider.id }`).then( response => {
                this.getProviders()
                this.providers.data.splice(index, 1)
                provider.deleting = false
                this.$toastr.success('Proveedor eliminado')
            }).catch(error => {
                provider.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('El proveedor no se pudo eliminar')
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    }
}
</script>