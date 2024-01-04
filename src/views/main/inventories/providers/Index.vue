<template>
    <div class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Proveedores</h3>
                        <div class="card-tools">
                            <button class="active btn btn-primary btn-sm" 
                                @click="hasPermission('inventory_providers.store') ? $router.push({ name: 'inventory-providers.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body p-0">

                        <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                            <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getProviders" placeholder="Código o nombre proveedor" v-model="search">
                            <div class="input-group-append">
                                <button class="btn btn-default" @click="getProviders">
                                <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    
                        <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="searching"></vue-loading>    
                        <div class="table-responsive" v-else>
                            <table class="table table-sm table-hover">
                                <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="(provider, index) in providers.data" :key="provider.id">
                                            <td nowrap>{{ provider.code }}</td>
                                            <td nowrap>{{ provider.name }}</td>
                                            <td nowrap>
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
                                </tbody>
                            </table>
                        </div>
                    <div class="d-block text-center card-footer">
                        <pagination :limit="1" :data="providers" @pagination-change-page="getProviders"></pagination>
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
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getProviders()
    },
    data () {
        return {
            providers: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getProviders (page = 1) {
            this.searching = true
            this.$http.get('inventory-providers?page=' + page + '&search=' + this.search).then( response => {
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
                this.getProviders(this.providers.current_page, false)
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