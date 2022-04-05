<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Reportes" icon="pe-7s-news-paper" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-3">
                <div class="main-card mb-3 card">
                        <div class="card-header">Reporte de stock de productos</div>
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
                            <button type="submit" class="btn btn-primary" :disabled="searching" @click="getProducts(1, true)">
                                 <div class="spinner-border spinner-border-sm" role="status" v-if="searching">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-search" v-else></i> {{ searching ? 'Buscando' : 'Buscar' }}
                            </button>

                    </div>
                </div>
            </div> 
            <div class="col-md-9">
                <div class="main-card mb-3 card" v-if="type2 == 'productsWithLittleStock' || type2 == ''">
                    <div class="card-header">
                        Resultados - Total registros: {{ products.total ? products.total : 0 }}
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" :disabled="exporting ||  !products.total"
                                @click="exportInExcel">
                                <div class="spinner-border spinner-border-sm" role="status" v-if="exporting">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-file-excel" v-else></i> Exportar
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Producto</th>
                                <th>Stock mínimo</th>
                                <th>Stock actual</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products.data" :key="product.id">
                                    <td class="text"></td>
                                    <td class="text" nowrap>{{ product.name }}</td>
                                    <td class="text" nowrap>{{ product.stock_min }}</td>
                                    <td class="text" nowrap>{{ product.stock }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                      <pagination :limit="1" :data="products" @pagination-change-page="getProducts"></pagination>
                    </div>
                </div>
                <div class="main-card mb-3 card" v-else>
                    <div class="card-header">
                        Resultados - Total registros: {{ products.total ? products.total : 0 }}
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" :disabled="exporting ||  !products.total"
                                @click="exportInExcel">
                                <div class="spinner-border spinner-border-sm" role="status" v-if="exporting">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-file-excel" v-else></i> Exportar
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Producto</th>
                                <th>Stock máximo</th>
                                <th>Stock actual</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products.data" :key="product.id">
                                    <td class="text"></td>
                                    <td class="text" nowrap>{{ product.name }}</td>
                                    <td class="text" nowrap>{{ product.stock_max }}</td>
                                    <td class="text" nowrap>{{ product.stock }}</td>
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
        <!--Fin contenido-->
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