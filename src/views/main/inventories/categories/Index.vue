<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Categorías" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Categorías
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('inventory_categories.store') ? $router.push({ name: 'inventory-categories.create' }) : ''">
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
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(category, index) in categories.data" :key="category.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ category.name }}</td>
                                        <td class="text-center" nowrap>
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
                            </transition-group>
                            <Skeleton v-else/>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <pagination :limit="1" :data="categories" @pagination-change-page="getCategories"></pagination>
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
        this.getCategories()
    },
    data () {
        return {
            categories: {},
            searching: true
        }
    },
    methods: {
        getCategories (page = 1) {
            this.searching = true
            this.$http.get('inventory-categories?page=' + page).then( response => {
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
                this.getCategories()
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