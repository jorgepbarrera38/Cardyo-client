<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Ajustes de inventario" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Ver ajuste de inventario</h5>
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="position-relative form-group">
                                    <label for="" class="">Tipo (*)</label>
                                    <input type="text" class="form-control" disabled v-model="inventoryTweak.type">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="position-relative form-group">
                                    <label for="" class="">Observaciónes (*)</label>
                                    <textarea rows="3" class="form-control" disabled v-model="inventoryTweak.observations"></textarea>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="table-responsive">
                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detail, index) in inventoryTweak.tweak_details" :key="'detail-' + index">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ detail.product.name }}</td>
                                        <td class="text" nowrap>{{ detail.quantity }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'inventory-tweaks.index' })">
                            <i class="fa fa-undo"></i> Atrás
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle.vue'
import formatNum from 'format-num'
export default {
    components: { PageTitle },
    created () {
        this.getInvetoryTweak()
    },
    data () {
        return {
            inventoryTweak: {},
            errors: null,
            saving: false
        }
    },
    methods: {
        getInvetoryTweak () {
            this.$http.get(`inventory-tweaks/${this.$route.params.id}`).then( response => {
                this.inventoryTweak = response.data
            })
        }
    },
}
</script>