<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Editar medidas corporales</h3>
        </div>
        <div class="card-body">
            <div class="alert alert-danger fade show" role="alert" v-if="errors">
                <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
            </div>
            <form @submit.prevent="save">
                <div class="row">
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Fecha (*)</label>
                            <input type="date" class="form-control" v-model="bodyMeasurement.date">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Medida corporal (*)</label>
                            <select class="form-control" v-model="bodyMeasurement.body_measurement_id">
                                <option value="">Seleccione opción</option>
                                <option :value="bodyMeasurementDB.id" v-for="bodyMeasurementDB in bodyMeasurements">
                                    {{ bodyMeasurementDB.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Valor (*)</label>
                            <input type="number" class="form-control" v-model="bodyMeasurement.value" step="any">
                        </div>
                    </div>
                </div>

                <a href="#" :class="{'mt-1 btn btn-secondary btn-sm mr-1': true, disabled: saving}" @click.prevent="$emit('closeFormCreateBodyMeasurement')">
                    <i class="fa fa-undo"></i> Atrás
                </a>
                <button class="mt-1 btn btn-primary btn-sm" :disabled="saving">
                    <div class="spinner-border spinner-border-sm" role="status" v-if="saving">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <i class="fa fa-save" v-else></i> Guardar
                </button>
            </form>
        </div>
    </div>
</template>
<script>
import formatNum from 'format-num'
import moment from 'moment'
export default {
    props: {
        bodyMeasurementId: {
            type: Number,
            required: true
        }
    },
    created () {
        this.getClientBodyMeasurement()
        this.getDataToRegisterBodyMeasurement()
    },
    data () {
        return {
            bodyMeasurement: {
                date: '',
                body_measurement_id: '',
                value: '',                
            },
            bodyMeasurements: [],
            saving: false,
            errors: null
        }
    },
    methods: {
        getDataToRegisterBodyMeasurement () {
            this.$http.get(`client-body-measurements/get-data-to-register-body-measurement`).then( response => {
                this.bodyMeasurements = response.data
            })
        },
        getClientBodyMeasurement () {
            this.$http.get(`client-body-measurements/${this.bodyMeasurementId}/edit`).then( response => {
                this.bodyMeasurement = response.data
            })
        },
        save () {
            this.saving = true
            this.$http.put(`client-body-measurements/${this.bodyMeasurementId}/update`, this.bodyMeasurement).then( response => {
                this.$emit('bodyMeasurementUpdated')
                this.$toastr.success('Medidas corporales actualizadas')
                this.$emit('bodyMeasurementSaved')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    },
}
</script>