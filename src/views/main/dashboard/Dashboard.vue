<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                
                <div class="col-md-6 col-xl-4">
                    <div class="small-box bg-secondary">
                        <div class="inner">
                            <h3>{{ attendanceExpectedToday }}</h3>
                            <p>Asistencias esperadas hoy</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-calendar-check"></i>
                        </div>
                        <a href="#" class="small-box-footer">Asistencias que se esperan durante el día <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <div class="col-md-6 col-xl-4">
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>{{ totalAssistsToday }}</h3>
                            <p>Total asistencias hoy</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-calendar-check"></i>
                        </div>
                        <a href="#" class="small-box-footer">Asistencias registradas hasta el momento<i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <div class="col-md-6 col-xl-4">
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>${{ convertMoney(totalSalesToday) }}</h3>
                            <p>Total ventas hoy</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-piggy-bank"></i>
                        </div>
                        <a href="#" class="small-box-footer">Ventas realizadas hasta el momento<i class="fas fa-arrow-circle-right"></i></a>
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