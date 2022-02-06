<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Productos" icon="pe-7s-plugin" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Editar producto</h5>
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
        this.getProduct()
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
        getProduct () {
            this.$http.get(`inventory-products/${ this.$route.params.id }/edit`).then( response => {
                this.product.name = response.data.name
                this.product.inventory_category_id = response.data.inventory_category_id
                this.product.description = response.data.description
                this.product.price = response.data.price
                this.product.stock_min = response.data.stock_min
                this.product.stock_max = response.data.stock_max
            })
        },
        save () {
            this.saving = true

            this.myCroppa.generateBlob(blob => {

                let data = new FormData
                data.append('name', this.product.name)
                data.append('inventory_category_id', this.product.inventory_category_id)
                data.append('description', this.product.description)
                data.append('price', this.product.price)
                data.append('stock_min', this.product.stock_min)
                data.append('stock_max', this.product.stock_max)
                data.append('photo', blob)
                data.append('_method', 'put')


                this.$http.post(`inventory-products/${ this.$route.params.id }`, data).then( response => {
                    this.$toastr.success('Producto actualizado')
                    this.$router.push({ name: 'inventory-products.index' })
                }).catch( error => {
                    this.saving = false
                    if (error.response.status == 422) {
                        this.$toastr.error('Verifica los errores de validación')
                        this.errors = error.response.data.errors
                    }
                })
            })

        },
    }
}
</script>