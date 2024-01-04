<template>
        <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Medidas corporales</h3>
                    <div class="card-tools">
                        <button class="active btn btn-primary btn-sm" @click="hasPermission('client_body_measurements.store') ? $emit('createBodyMeasurement') : ''">
                            <i class="fa fa-plus"></i> Nuevo
                        </button>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive" style="max-height: 250px;">
                        <table class="table table-sm table-hover">
                            <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Medida corporal</th>
                                <th>Valor</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(bodyMeasurement, index) in client.client_body_measurements" :key="bodyMeasurement.id">
                                    <td>{{ bodyMeasurement.date }}</td>
                                    <td>{{ bodyMeasurement.body_measurement.name }}</td>
                                    <td>{{ bodyMeasurement.value }}</td>
                                    
                                    <td class="text-center" nowrap>
                                        <button type="button" 
                                            @click="hasPermission('client_body_measurements.update') ? $emit('editBodyMeasurement', bodyMeasurement.id) : ''" 
                                            title="Editar medidas corporales"
                                            class="btn btn-warning btn-sm mr-1">
                                            <i class="fa fa-edit"></i> 
                                        </button>
                                        <button type="button" 
                                            @click="hasPermission('client_body_measurements.delete') ? deleteBodyMeasurement(bodyMeasurement, index) : ''" 
                                            :disabled="bodyMeasurement.deleting" title="Eliminar medidas corporales"
                                            class="btn btn-danger btn-sm mr-1">
                                            <div class="spinner-border spinner-border-sm" v-if="bodyMeasurement.deleting"
                                                role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            <i class="fa fa-trash-alt" v-else></i> 
                                        </button>
                                    </td>
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
export default {
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            bodyMeasurement: '',
            datasetsChart: [
                {
                    data: [1, 2],
                    smooth: true,
                    fill: true
                }
            ],
            labels: {
                xLabels: [1, 2],
                yLabels: 1
            },
            minDataChart: 1
        }
    },
    methods: {
        deleteBodyMeasurement (bodyMeasurement, index) {
            bodyMeasurement.deleting = true
            this.$http.delete(`client-body-measurements/${ bodyMeasurement.id }/destroy`).then( response => {
                this.$emit('bodyMeasurementDeleted', index)
                this.$toastr.success('Medida corporal eliminada')
            }).catch(error => {
                bodyMeasurement.deleting = false
                this.$toastr.error(error.response.data.errors.message[0])
            })
        },
    },
    watch: {
        bodyMeasurement () {            
            if (this.bodyMeasurement && this.client && this.client.body_measurements && this.client.body_measurements.length > 1) {   
                let months = this.client.body_measurements.map(body_measurement => body_measurement.date)
                this.labels = { xLabels: months, yLabels: 5, yLabelsTextFormatter: val => Math.round(val * 100) / 100 }
    
                let weights = this.client.body_measurements.map(body_measurement => body_measurement[this.bodyMeasurement])
                this.datasetsChart = [{
                                data: weights,
                                smooth: true,
                                fill: true,
                                showPoints: true,
                                className: "curve1"
                            }]
                
                let data =  [...this.client.body_measurements]
                data.sort((a, b) => a[this.bodyMeasurement] - b[this.bodyMeasurement])
                this.minDataChart = data[0][this.bodyMeasurement]
                
            } else {
                this.$toastr.info('Se requieren por lo menos 2 registros para generar la gráfica')
            }
        }
    }
}
</script>
<style>
 .curve1 .stroke {
  stroke: #fbac91;
  stroke-width: 2;
}
 .curve1 .fill {
  fill: #fbac91;
  opacity: 0.05;
}
 .curve1 .point {
  fill: #fbac91;
  stroke: #fbac91;
}
.point {
  stroke-width: 2;
  transition: stroke-width 0.2s;
}
.point.is-active {
  stroke-width: 5;
}
* {
  box-sizing: border-box;
}

strong {
  font-weight: 600;
}

body {
  padding: 0;
  margin: 0;
  font-family: "Source Sans Pro", sans-serif;
  color: #2f4053;
}

 .vtc {
  height: 160;
  font-size: 12px;
}
@media (min-width: 699px) {
   .vtc {
    height: 160px;
  }
}
 .curve1 .stroke {
  stroke: #fbac91;
  stroke-width: 2;
}
 .curve1 .fill {
  fill: #fbac91;
  opacity: 0.05;
}
 .curve1 .point {
  fill: #fbac91;
  stroke: #fbac91;
}
 .tooltip {
  padding: 10px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
.tooltip:not(.is-active) {
  display: none;
}
 .tooltip-data {
  display: flex;
}
 .tooltip-data-item {
  display: flex;
  align-items: center;
}
 .tooltip-data-item:not(:first-child) {
  margin-left: 20px;
}
 .tooltip-data-item:before {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
 .tooltip-data-item--1:before {
  background: #fbac91;
}
 .tooltip-data-item--2:before {
  background: #fbe1b6;
}
 .tooltip-data-item--3:before {
  background: #7fdfd4;
}
</style>