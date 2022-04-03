<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Productos" icon="pe-7s-plugin" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Nuevo producto
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <form @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Nombre (*)</label>
                                        <input type="text" class="form-control" v-model="product.name" maxlength="40">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Categoría (*)</label>
                                        <select class="form-control" v-model="product.inventory_category_id">
                                            <option value="">Seleccione opción</option>
                                            <option :value="category.id" v-for="category in categories" :key="category.id">
                                                {{ category.name }}    
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Descripción (*)</label>
                                        <textarea rows="3" class="form-control" v-model="product.description" maxlength="500"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Precio de venta (*)</label>
                                        <input type="number" min="0" max="10000000" class="form-control" v-model="product.price">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Stock mínimo (*)</label>
                                        <input type="number" min="0" max="100000" class="form-control" v-model="product.stock_min">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Stock máximo (*)</label>
                                        <input type="number" min="0" max="100000" class="form-control" v-model="product.stock_max">
                                    </div>
                                </div>


                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Foto</label>
                                        <croppa v-model="myCroppa" 
                                                placeholder="Seleccione imagen"
                                                :placeholder-font-size="14"
                                                :prevent-white-space="true"></croppa>
                                        
                                    </div>
                                </div>
                            </div>
                            <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-products.index' })">
                                <i class="fa fa-undo"></i> Atrás
                            </a>
                            <button class="mt-1 btn btn-primary" :disabled="saving">
                                <div class="spinner-border spinner-border-sm" role="status" v-if="saving">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-save" v-else></i> Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle.vue'
export default {
    components: { PageTitle },
    created () {
        this.getDataToCreateProduct()
    },
    data () {
        return {
            product: {
                name: '',
                inventory_category_id: '',
                description: '',
                price: '',
                stock_min: '',
                stock_max: '',
            },
            categories: [],
            myCroppa: {},
            errors: null,
            saving: false
        }
    },
    methods: {
        getDataToCreateProduct () {
            this.$http.get('inventory-products/get-data-to-create-product').then( response => {
                this.categories = response.data.categories
            })
        },
        save () {
            this.myCroppa.generateBlob(blob => {
                this.saving = true

                let data = new FormData
                data.append('name', this.product.name)
                data.append('inventory_category_id', this.product.inventory_category_id)
                data.append('description', this.product.description)
                data.append('price', this.product.price)
                data.append('stock_min', this.product.stock_min)
                data.append('stock_max', this.product.stock_max)
                data.append('photo', blob)
    
                this.$http.post('inventory-products', data).then( response => {
                    this.clearData()
                    this.saving = false
                    this.$toastr.success('Producto creado')
                }).catch( error => {
                    this.saving = false
                    if (error.response.status == 422) {
                        this.$toastr.error('Verifica los errores de validación')
                        this.errors = error.response.data.errors
                    }
                })
            })
        },
        clearData () {
            this.product = {
                name: '',
                inventory_category_id: '',
                description: '',
                price: '',
                stock_min: '',
                stock_max: '',
            }
            this.errors = null
            this.myCroppa.remove()
        }
    }
}
</script>