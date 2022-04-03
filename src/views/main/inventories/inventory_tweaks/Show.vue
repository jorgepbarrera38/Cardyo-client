<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Ajustes de inventario" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Ver detalle de ajuste de inventario
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <div class="position-relative form-group">
                                    <label for="" class="">Consecutivo</label>
                                    <input type="text" class="form-control" v-model="inventoryTweak.id" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    <label for="" class="">Fecha registro</label>
                                    <input type="text" class="form-control" :value="inventoryTweak.created_at ? dateWithHour(inventoryTweak.created_at) : ''" disabled>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="position-relative form-group">
                                    <label for="" class="">Tipo</label>
                                    <input type="text" class="form-control" disabled v-model="inventoryTweak.type">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="position-relative form-group">
                                    <label for="" class="">Observaciónes</label>
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
                                        <td class="text" nowrap>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">
                                                    <div class="widget-content-left mr-3">
                                                        <div class="widget-content-left">
                                                            <img width="40" 
                                                            :src="detail.product.photo ? APP_URL + detail.product.photo : require('../../../../assets/product.png') "
                                                            alt="" class="rounded-circle">
                                                        </div>
                                                    </div>
                                                    <div class="widget-content-left flex2">
                                                        <div class="">{{ detail.product.name }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
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
import moment from 'moment'
import { mapState } from 'vuex'
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
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        }
    },
    computed: {
        ...mapState(['APP_URL']),
    }
}
</script>