<template>
    <div class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Productos</h3>
                        <div class="card-tools">
                            <button class="active btn btn-primary btn-sm" 
                                @click="hasPermission('inventory_products.store') ? $router.push({ name: 'inventory-products.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                            <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getProducts" placeholder="Nombre producto" v-model="search">
                            <div class="input-group-append">
                                <button class="btn btn-default" @click="getProducts">
                                <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    
                        <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="searching"></vue-loading>    
                        <div class="table-responsive" v-else>
                            <table class="table table-sm table-hover">
                                <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Stock mínimo</th>
                                    <th>Stock máximo</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="(product, index) in products.data" :key="product.id" :title="product.description">
                                            <td>
                                               
                                                                <img width="40" class="rounded-circle" 
                                                                    :src="product.photo ? APP_URL + product.photo : require('../../../../assets/product.png') "
                                                                alt="">
                                                                    {{ product.name }} - {{ product.category.name }}
                                                  
                                            </td>
                                            <td>{{ convertMoney(product.price) }}</td>
                                            <td>{{ product.stock }}</td>
                                            <td>{{ product.stock_min }}</td>
                                            <td>{{ product.stock_max }}</td>
                                            <td nowrap>
                                                
                                                <button type="button" 
                                                    @click="hasPermission('inventory_products.update') ? $router.push({ name: 'inventory-products.edit', params: { id: product.id } }) : ''"
                                                    title="Editar"
                                                    class="btn btn-warning btn-sm mr-1">
                                                    <i class="fa fa-edit"></i> 
                                                </button>
                                                <button type="button" 
                                                    @click="hasPermission('inventory_products.delete') ? deleteProduct(product, index) : ''" 
                                                    title="Eliminar"
                                                    :disabled="product.deleting"
                                                    class="btn btn-danger btn-sm">
                                                    <div class="spinner-border spinner-border-sm" v-if="product.deleting"
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
                            <pagination :limit="1" :data="products" @pagination-change-page="getProducts"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle.vue'
import Search from '../../components/Search'
import formatNum from 'format-num'
import { mapState } from 'vuex'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getProducts()
    },
    data () {
        return {
            products: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getProducts (page = 1) {
            this.searching = true
            this.$http.get('inventory-products?page=' + page + '&search=' + this.search).then( response => {
                this.products = response.data
                this.products.data.forEach(product => {
                    this.$set(product, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteProduct (product, index) {
            product.deleting = true
            this.$http.delete(`inventory-products/${ product.id }`).then( response => {
                this.getProducts(this.products.current_page, false)
                this.products.data.splice(index, 1)
                product.deleting = false
                this.$toastr.success('Producto eliminado')
            }).catch(error => {
                product.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('El producto no se pudo eliminar')
                }
            })
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        }
    },
    computed: {
        ...mapState(['APP_URL'])
    }
}
</script>