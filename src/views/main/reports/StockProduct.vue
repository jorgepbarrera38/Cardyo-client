<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Reporte de stock de productos</h3>
                        </div>
                        <div class="card-body">
                                <div class="alert alert-danger fade show" role="alert" v-if="errors">
                                    <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                                </div>
                                <div class="form-group">
                                    <label for="">Tipo de consulta</label>
                                    <select class="form-control" v-model="type">
                                        <option value="">Seleccione opción</option>
                                        <option value="productsWithLittleStock">Productos con poco stock</option>
                                        <option value="productsWithTooMuchStock">Productos con demasiado stock</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary btn-sm" :disabled="searching" @click="getProducts(1, true)">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="searching">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-search" v-else></i> {{ searching ? 'Buscando' : 'Buscar' }}
                                </button>

                        </div>
                    </div>
                </div> 
                <div class="col-md-9">
                    <div class="card" v-if="type2 == 'productsWithLittleStock' || type2 == ''">
                        <div class="card-header">
                            <h3 class="card-title">
                                Resultados - Total registros: {{ products.total ? products.total : 0 }}
                            </h3>
                            <div class="card-tools">
                                <button class="active btn btn-success btn-sm" :disabled="exporting ||  !products.total"
                                    @click="exportInExcel">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="exporting">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-file-excel" v-else></i> Exportar
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Stock mínimo</th>
                                            <th>Stock actual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(product, index) in products.data" :key="product.id">
                                            <td nowrap>{{ product.name }}</td>
                                            <td nowrap>{{ product.stock_min }}</td>
                                            <td nowrap>{{ product.stock }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-block text-center card-footer">
                                <pagination :limit="1" :data="products" @pagination-change-page="getProducts"></pagination>
                            </div>
                        </div>
                    </div>
                    <div class="card" v-else>
                        <div class="card-header">
                            <h3 class="card-title">Resultados - Total registros: {{ products.total ? products.total : 0 }}</h3>
                            <div class="card-tools">
                                <button class="active btn btn-success btn-sm" :disabled="exporting ||  !products.total"
                                    @click="exportInExcel">
                                    <div class="spinner-border spinner-border-sm" role="status" v-if="exporting">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <i class="fa fa-file-excel" v-else></i> Exportar
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-sm table-hover">
                                    <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Stock máximo</th>
                                        <th>Stock actual</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(product, index) in products.data" :key="product.id">
                                            <td nowrap>{{ product.name }}</td>
                                            <td nowrap>{{ product.stock_max }}</td>
                                            <td nowrap>{{ product.stock }}</td>
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
import PageTitle from '../components/PageTitle.vue'
import formatNum from 'format-num'
import moment from 'moment'
import downloadJs from 'downloadjs'
export default {
    components: { PageTitle },
    data () {
        return {
            type: 'productsWithLittleStock',
            type2: 'productsWithLittleStock',
            products: {},
            totalRows: '',
            errors: null,
            searching: false,
            saving: false,
            exporting: false,
        }
    },
    methods: {
        getProducts (page = 1, searching = false) {
            this.searching = searching,

            this.$http.get(`reports/get-stock-products?page=${page}&type=${this.type}`)
                .then( response => {
                this.type2 = this.type
                this.products = response.data.products
                this.errors = null
                this.searching = false
                if (response.data.products.total == 0) {
                    this.$toastr.info('No se encontraron registros')
                }
            }).catch( error => {
                this.searching = false
                if (error.response.status == 422) {
                    this.errors = error.response.data.errors
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        exportInExcel () {
            this.exporting = true
            this.$http.get(`reports/get-stock-products-in-excel?type=${this.type2}`, { responseType: 'blob' })
                .then( response => {
                    this.exporting = false
                    downloadJs(response.data)
            }).catch( error => {
                this.exporting = false
            })
        },
    },
    watch: {
        type () {
            
        }
    }
}
</script>