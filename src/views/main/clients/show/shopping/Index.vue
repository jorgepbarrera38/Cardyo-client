<template>
        <div class="main-card mb-3 card">
                <div class="card-header">
                    <h3 class="card-title">Compras realizadas</h3>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive" style="max-height: 250px;">
                        <table class="table table-sm table-hover">
                            <thead>
                            <tr>
                                <th>Consecutivo compra</th>
                                <th>Fecha</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio unitario</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(detail, index) in salesFormatted" :key="detail.id_sale">
                                    <td>{{ detail.id_sale }}</td>
                                    <td>{{ dateWithHour(detail.created_at) }}</td>
                                    <td nowrap>{{ detail.product_name }}</td>
                                    <td>{{ detail.quantity }}</td>
                                    <td>{{ convertMoney(detail.price_unit) }}</td>
                                    <td>{{ convertMoney(detail.price_total) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        
                    </div>
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