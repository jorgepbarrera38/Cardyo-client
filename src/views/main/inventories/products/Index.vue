<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Inventarios" icon="pe-7s-box1" subtitle=""/>  
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Productos
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('inventory_products.store') ? $router.push({ name: 'inventory-products.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <Search placeholder="Nombre producto" @search="search"></Search>
                    </div>
                     <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th>Producto</th>
                                <th class="text-center">Precio</th>
                                <th class="text-center">Stock</th>
                                <th class="text-center">Stock mínimo</th>
                                <th class="text-center">Stock máximo</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(product, index) in products.data" :key="product.id" :title="product.description">
                                        <td class="text-center text-muted"></td>
                                        <td>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">
                                                    <div class="widget-content-left mr-3">
                                                        <div class="widget-content-left">
                                                            <img width="40" class="rounded-circle" 
                                                                :src="product.photo ? APP_URL + product.photo : require('../../../../assets/product.png') "
                                                            alt="">
                                                        </div>
                                                    </div>
                                                    <div class="widget-content-left flex2">
                                                        <div class="widget-heading">{{ product.name }}</div>
                                                        <div class="widget-subheading opacity-7">{{ product.category.name }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">{{ convertMoney(product.price) }}</td>
                                        <td class="text-center">{{ product.stock }}</td>
                                        <td class="text-center">{{ product.stock_min }}</td>
                                        <td class="text-center">{{ product.stock_max }}</td>
                                        <td class="text-center" nowrap>
                                            
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
                            </transition-group>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <pagination :limit="1" :data="products" @pagination-change-page="getProducts"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle.vue'
import Search from '../../components/Search'
import formatNum from 'format-num'
import { mapState } from 'vuex'
export default {
    components: { PageTitle, Search },
    created () {
        this.getProducts()
    },
    data () {
        return {
            products: {},
            searchBody: '',
            searching: true
        }
    },
    methods: {
        search (search) {
            this.searchBody = search
            this.getProducts()
        },
        getProducts (page = 1, searching = true) {
            this.searching = searching
            this.$http.get('inventory-products?page=' + page + '&search=' + this.searchBody).then( response => {
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