<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Registrar medidas corporales</h3>
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
    created () {
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
        save () {
            this.saving = true
            this.$http.post(`client-body-measurements/${this.$route.params.id}`, this.bodyMeasurement).then( response => {
                this.$emit('bodyMeasurementSaved')
                this.$toastr.success('Medidas corporales registradas')
                this.bodyMeasurement.body_measurement_id = ''
                this.bodyMeasurement.value = ''
                this.saving = false
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