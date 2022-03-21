<template>
        <div class="main-card mb-3 card">
                <div class="card-header">
                    Medidas corporales
                    <div class="btn-actions-pane-right">
                        <button class="active btn btn-success" @click="$emit('createBodyMeasurement')">
                            <i class="fa fa-plus"></i> Nuevo
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-borderless table-striped table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Fecha</th>
                            <th class="text-center">Altura</th>
                            <th class="text-center">Peso</th>
                            <th class="text-center">Bíceps</th>
                            <th class="text-center">Antebrazos</th>
                            <th class="text-center">Hombros</th>
                            <th class="text-center">Pecho</th>
                            <th class="text-center">Anchura cintura</th>
                            <th class="text-center">Anchura a nivel del ombligo</th>
                            <th class="text-center">Glúteos o cadera</th>
                            <th class="text-center">Muslo</th>
                            <th class="text-center">Pantorrillas</th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(bodyMeasurement, index) in client.body_measurements" :key="bodyMeasurement.id">
                                <td class="text"></td>
                                <td class="text">{{ bodyMeasurement.date }}</td>
                                <td class="text-center">{{ bodyMeasurement.height }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.weight }} kg</td>
                                <td class="text-center">{{ bodyMeasurement.biceps }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.forearms }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.shoulders }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.chest }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.waist_width }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.width_at_navel_level }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.buttocks_or_hip }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.thigh }} cm</td>
                                <td class="text-center">{{ bodyMeasurement.calves }} cm</td>
                                
                                <td class="text-center" nowrap>
                                   <button type="button" @click="$emit('editBodyMeasurement', bodyMeasurement.id)" title="Editar medidas corporales"
                                        class="btn btn-warning btn-sm mr-1">
                                        <i class="fa fa-edit"></i> 
                                    </button>
                                    <button type="button" @click="deleteBodyMeasurement(bodyMeasurement, index)" :disabled="bodyMeasurement.deleting" title="Eliminar medidas corporales"
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
    }
}
</script>