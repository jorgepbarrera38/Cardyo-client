<template>
    <div class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Categorías</h3>
                        <div class="card-tools">
                            <button class="active btn btn-primary btn-sm" 
                                @click="hasPermission('inventory_categories.store') ? $router.push({ name: 'inventory-categories.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body p-0">

                        <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                            <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getCategories" placeholder="Nombre categoría" v-model="search">
                            <div class="input-group-append">
                                <button class="btn btn-default" @click="getCategories">
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
                                        <tr v-for="(category, index) in categories.data" :key="category.id">
                                            <td nowrap>{{ category.name }}</td>
                                            <td nowrap>
                                                <button type="button" 
                                                    @click="hasPermission('inventory_categories.update') ? $router.push({ name: 'inventory-categories.edit', params: { id: category.id } }) : ''"
                                                    title="Editar"
                                                    class="btn btn-warning btn-sm mr-1">
                                                    <i class="fa fa-edit"></i> 
                                                </button>
                                                <button type="button" 
                                                    @click="hasPermission('inventory_categories.delete') ? deleteCategory(category, index) : ''" :disabled="category.deleting"
                                                    title="Eliminar"
                                                    class="btn btn-danger btn-sm">
                                                    <div class="spinner-border spinner-border-sm" v-if="category.deleting"
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
                            <pagination :limit="1" :data="categories" @pagination-change-page="getCategories"></pagination>
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
        this.getCategories()
    },
    data () {
        return {
            categories: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getCategories (page = 1) {
            this.searching = true
            this.$http.get('inventory-categories?page=' + page + '&search=' + this.search).then( response => {
                this.categories = response.data
                this.categories.data.forEach(category => {
                    this.$set(category, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteCategory (category, index) {
            category.deleting = true
            this.$http.delete(`inventory-categories/${ category.id }`).then( response => {
                this.getCategories(this.categories.current_page, false)
                this.categories.data.splice(index, 1)
                category.deleting = false
                this.$toastr.success('Categoría eliminada')
            }).catch(error => {
                category.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('La categoría no se pudo eliminar')
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    }
}
</script>