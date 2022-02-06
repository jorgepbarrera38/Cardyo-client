<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Compras" icon="pe-7s-ticket" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Compras
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" @click="$router.push({ name: 'inventory-purchases.create' })">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Fecha registro</th>
                                <th>Factura</th>
                                <th>Fecha factura</th>
                                <th>Proveedor</th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(purchase, index) in purchases.data" :key="purchase.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ purchase.created_at }}</td>
                                        <td class="text" nowrap>{{ purchase.bill }}</td>
                                        <td class="text" nowrap>{{ purchase.date_bill }}</td>
                                        <td class="text" nowrap>{{ purchase.provider.name }}</td>
                                    </tr>
                            </transition-group>
                            <Skeleton v-else/>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <pagination :limit="1" :data="purchases" @pagination-change-page="getPurchases"></pagination>
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
        this.getPurchases()
    },
    data () {
        return {
            purchases: {},
            searching: true
        }
    },
    methods: {
        getPurchases (page = 1) {
            this.searching = true
            this.$http.get('inventory-purchases?page=' + page).then( response => {
                this.purchases = response.data
                this.searching = false
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    }
}
</script>