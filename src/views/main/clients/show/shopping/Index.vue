<template>
        <div class="main-card mb-3 card">
                <div class="card-header">
                    Compras realizadas
                    <!--<div class="btn-actions-pane-right">
                        <button class="active btn btn-success" @click="$emit('createBodyMeasurement')">
                            <i class="fa fa-plus"></i> Nuevo
                        </button>
                    </div>-->
                </div>
                <div class="table-responsive">
                    <table class="table table-borderless table-striped table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Consecutivo compra</th>
                            <th class="text-center">Fecha</th>
                            <th class="text-center">Producto</th>
                            <th class="text-center">Cantidad</th>
                            <th class="text-center">Precio unitario</th>
                            <th class="text-center">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(detail, index) in salesFormatted" :key="detail.id_sale">
                                <td class="text"></td>
                                <td class="text">{{ detail.id_sale }}</td>
                                <td class="text-center">{{ dateWithHour(detail.created_at) }}</td>
                                <td class="text-center" nowrap>{{ detail.product_name }}</td>
                                <td class="text-center">{{ detail.quantity }}</td>
                                <td class="text-center">{{ convertMoney(detail.price_unit) }}</td>
                                <td class="text-center">{{ convertMoney(detail.price_total) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-block text-center card-footer">
                    
                </div>
        </div>
</template>
<script>
import formatNum from 'format-num'
import moment from 'moment'
export default {
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
        }
    },
    methods: {
        deleteBodyMeasurement (bodyMeasurement, index) {
            bodyMeasurement.deleting = true
            this.$http.delete(`client-body-measurements/${ bodyMeasurement.id }/destroy`).then( response => {
                this.$emit('bodyMeasurementDeleted', index)
                this.$toastr.success('Medida corporal eliminada')
            }).catch(error => {
                membership.deleting = false
                this.$toastr.error(error.response.data.errors.message[0])
            })
        },
        dateWithHour (date) {
            return moment(date).format('lll')
        },
        convertMoney (value) {
            return `$${formatNum(value)}`
        },
    },
    computed: {
        salesFormatted () {
            let data = []
            if (this.client.sales) {
                this.client.sales.forEach(sale => {
                    sale.sale_details.forEach(detail => {  
                        data.push({
                            id_sale: sale.id,
                            created_at: sale.created_at,
                            product_name: detail.product_name,
                            quantity: detail.quantity,
                            price_unit: detail.price_unit,
                            price_total: detail.price_total,
                        })
                    })
                })

            }

            return data
        }
    }
}
</script>