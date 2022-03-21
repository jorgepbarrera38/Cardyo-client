<template>
    <div class="main-card mb-3 card">
        <div class="card-body"><h5 class="card-title">Registrar medidas corporales</h5>
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
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Altura - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.height" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Peso - kg (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.weight" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Bíceps - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.biceps" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Antebrazos - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.forearms" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Hombros - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.shoulders" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Pecho - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.chest" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Anchura cintura zona más estrecha - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.waist_width" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Anchura a nivel del ombligo - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.width_at_navel_level" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Glúteos o cadera - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.buttocks_or_hip" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Muslo - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.thigh" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="position-relative form-group">
                            <label for="" class="">Pantorrillas - cm (*)</label>
                            <input type="number" step="0.1" class="form-control" v-model="bodyMeasurement.calves" min="1" max="1000">
                        </div>
                    </div>
                </div>

                <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$emit('closeFormCreateBodyMeasurement')">
                    <i class="fa fa-undo"></i> Atrás
                </a>
                <button class="mt-1 btn btn-primary" :disabled="saving">
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
    data () {
        return {
            bodyMeasurement: {
                date: '',
                height: '',//Altura
                weight: '',//Peso
                biceps: '',//Bíceps
                forearms: '',//Antebrazos
                shoulders: '',//Hombros
                chest: '',//Pecho
                waist_width: '',//Anchura cintura
                width_at_navel_level: '',//Anchura a nivel del ombligo
                buttocks_or_hip: '',//Glúteos o cadera
                thigh: '',//Muslo
                calves: '',//Pantorrillas
            },
            saving: false,
            errors: null
        }
    },
    methods: {
        save () {
            this.saving = true
            this.$http.post(`client-body-measurements/${this.$route.params.id}`, this.bodyMeasurement).then( response => {
                this.$emit('bodyMeasurementSaved')
                this.$toastr.success('Medidas corporales registradas')
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