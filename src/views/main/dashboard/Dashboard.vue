<template>
    <div class="app-main__inner">
                        <div class="app-page-title">
                            <div class="page-title-wrapper">
                                <div class="page-title-heading">
                                    <div class="page-title-icon">
                                        <i class="pe-7s-gym icon-gradient bg-mean-fruit">
                                        </i>
                                    </div>
                                    <div>
                                        <span v-if="company.name">
                                            <b>{{ company.name }}</b> - 
                                        </span>
                                        Dashboard
                                        <!--<div class="page-title-subheading">This is an example dashboard created using build-in elements and components.
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!---->
                        <div class="row">
                            <div class="col-md-6 col-xl-4">
                                <div class="card mb-3 widget-content">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Asistencias esperadas hoy</div>
                                                <div class="widget-subheading">Asistencias que se esperan durante el día</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-success">{{ attendanceExpectedToday }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-4">
                                <div class="card mb-3 widget-content">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Total asistencias hoy</div>
                                                <div class="widget-subheading">Asistencias registradas hasta el momento</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-success">{{ totalAssistsToday }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-4">
                                <div class="card mb-3 widget-content">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Total ventas hoy</div>
                                                <div class="widget-subheading">Ventas realizadas hasta el momento</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-success">${{ convertMoney(totalSalesToday) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="main-card mb-3 card">
                                    <div class="card-body"><h5 class="card-title">Productos con poco stock</h5>
                                        <div class="table-responsive" style="max-height:250px;overflow:auto">
                                            <table class="mb-0 table table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Producto</th>
                                                    <th>Stock mínimo</th>
                                                    <th>Stock actual</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(product, index) in productsWithStockBelowStockmin" :key="product.id">
                                                        <th scope="row">{{ index + 1 }}</th>
                                                        <td>{{ product.name }}</td>
                                                        <td>{{ product.stock_min }}</td>
                                                        <td>{{ product.stock }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="main-card mb-3 card">
                                    <div class="card-body"><h5 class="card-title">Productos con demasiado stock</h5>
                                        <div class="table-responsive" style="max-height:250px;overflow:auto">
                                            <table class="mb-0 table table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Producto</th>
                                                    <th>Stock máximo</th>
                                                    <th>Stock actual</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(product, index) in productsWithStockOverStockmax" :key="product.id">
                                                        <th scope="row">{{ index + 1 }}</th>
                                                        <td>{{ product.name }}</td>
                                                        <td>{{ product.stock_max }}</td>
                                                        <td>{{ product.stock }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import formatNum from 'format-num'
export default {
    created () {
        this.getData()
    },
    data () {
        return {
        }
    },
    methods: {
        ...mapMutations(['setCompany', 'setAttendanceExpectedToday', 'setTotalAssistsToday', 'setProductsWithStockBelowStockmin', 'setProductsWithStockOverStockmin', 'setTotalSalesToday']),
        getData () {
            this.$http.get('dashboard/get-data').then( response => {
                console.log(response.data.totalSalesToday);
                this.setCompany(response.data.company ? response.data.company : {})
                this.setAttendanceExpectedToday(response.data.attendanceExpectedToday)
                this.setTotalAssistsToday(response.data.totalAssistsToday)
                this.setProductsWithStockBelowStockmin(response.data.productsWithStockBelowStockmin ? response.data.productsWithStockBelowStockmin : [])
                this.setProductsWithStockOverStockmin(response.data.productsWithStockOverStockmax ? response.data.productsWithStockOverStockmax : [])
                this.setTotalSalesToday(response.data.totalSalesToday ? response.data.totalSalesToday : [])
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    },
    computed: {
        ...mapState(['company', 'attendanceExpectedToday', 'totalAssistsToday', 'productsWithStockBelowStockmin', 'productsWithStockOverStockmax', 'totalSalesToday'])
    }

}
</script>