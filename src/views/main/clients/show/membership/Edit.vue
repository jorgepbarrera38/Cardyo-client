<template>
    <div class="main-card mb-3 card">
        <div class="card-body"><h5 class="card-title">Editar membresía</h5>
            <div class="alert alert-danger fade show" role="alert" v-if="errors">
                <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
            </div>
            <form @submit.prevent="save">
                <div class="row">
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Turno (*)</label>
                            <select class="form-control" v-model="membership.turn_id">
                                <option value="">Seleccione opción</option>
                                <option :value="turn.id" v-for="turn in turns" :key="`turn-${ turn.id }`">
                                    {{ turn.name + ' ' + turn.time_start + ' - ' + turn.time_finish }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Tipo de membresía (*)</label>
                            <select class="form-control" v-model="membership.membership_type_id">
                                <option value="">Seleccione opción</option>
                                <option :value="membershipType.id" 
                                    v-for="membershipType in membershipTypes" :key="`membership-type-${ membershipType.id }`">
                                        {{ membershipType.name + ' - ' + membershipType.quantity + ' ' + membershipType.type + ' $' + convertMoney(membershipType.price) }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Precio</label>
                            <input type="number" class="form-control" disabled v-model="membership.price">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Cantidad (*)</label>
                            <input type="number" class="form-control" v-model="membership.quantity" min="1" max="1000">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Fecha de inicio (*)</label>
                            <input type="date" class="form-control" v-model="membership.date_start">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="" class="">Fecha final</label>
                            <input type="date" class="form-control" v-model="membership.date_finish" disabled>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="position-relative form-group">
                            <label for="" class="">Observaciónes</label>
                            <textarea rows="3" class="form-control" v-model="membership.observations" maxlength="500"></textarea>
                        </div>
                    </div>
                </div>

                <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$emit('closeFormCreateMembership')">
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
    props: {
        membershipId: {
            type: Number,
            required: true
        }
    },
    created () {
        this.getDataToCreateMembership()
        this.getClientMembership()
    },
    data () {
        return {
            membership: {
                turn_id: '',
                membership_type_id: '',
                price: '',
                quantity: '',
                date_start: '',
                date_finish: '',
                observations: '',
            },
            turns: [],
            membershipTypes: [],
            saving: false,
            errors: null
        }
    },
    methods: {
        getDataToCreateMembership () {
            this.$http.get('client-memberships/get-data-to-create-membership').then( response => {
                this.turns = response.data.turns
                this.membershipTypes = response.data.membershipTypes
            })
        },
        getClientMembership () {
            this.$http.get(`client-memberships/${this.membershipId}/edit`).then( response => {
                this.membership.turn_id = response.data.turn_id
                this.membership.membership_type_id = response.data.membership_type_id
                this.membership.price = response.data.price
                this.membership.quantity = response.data.quantity
                this.membership.date_start = response.data.date_start
                this.membership.date_finish = response.data.date_finish
                this.membership.observations = response.data.observations
            })
        },
        save () {
            this.saving = true
            this.$http.put(`client-memberships/${this.membershipId}/update`, this.membership).then( response => {
                this.$emit('membershipSaved')
                this.$toastr.success('Membresía actualizada')
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
    watch: {
        'membership.membership_type_id' (newValue) {
            if (newValue) {
                let membershipType = this.membershipTypes.find(membershipType => membershipType.id == newValue)
                this.membership.price = membershipType.price
                if (this.membership.date_start && this.membership.quantity) {
                    let quantity = membershipType.quantity
                    if (membershipType.type == 'Meses') {
                        //Calcula en base a meses
                        let date_finish = moment(this.membership.date_start).add(quantity * this.membership.quantity, 'M').subtract(1, 'days').format('yyyy-MM-DD')
                        this.membership.date_finish = date_finish
                    } else {
                        //Calcula en base a días
                        let date_finish = moment(this.membership.date_start).add(quantity * this.membership.quantity, 'd').subtract(1, 'days').format('yyyy-MM-DD')
                        this.membership.date_finish = date_finish
                    }
                }
            }
        },
        'membership.date_start' (newValue) {
            if (newValue && this.membership.membership_type_id && this.membership.quantity) {
                let membershipType = this.membershipTypes.find(membershipType => membershipType.id == this.membership.membership_type_id)
                let quantity = membershipType.quantity
                if (membershipType.type == 'Meses') {
                    //Calcula en base a meses
                    let date_finish = moment(this.membership.date_start).add(quantity * this.membership.quantity, 'M').subtract(1, 'days').format('yyyy-MM-DD')
                    this.membership.date_finish = date_finish
                } else {
                    //Calcula en base a días
                    let date_finish = moment(this.membership.date_start).add(quantity * this.membership.quantity, 'd').subtract(1, 'days').format('yyyy-MM-DD')
                    this.membership.date_finish = date_finish
                }
            }
        },
        'membership.quantity' (newValue) {
            if (newValue && this.membership.membership_type_id && this.membership.date_start) {
                let membershipType = this.membershipTypes.find(membershipType => membershipType.id == this.membership.membership_type_id)
                let quantity = membershipType.quantity
                if (membershipType.type == 'Meses') {
                    //Calcula en base a meses
                    let date_finish = moment(this.membership.date_start).add(quantity * newValue, 'M').subtract(1, 'days').format('yyyy-MM-DD')
                    this.membership.date_finish = date_finish
                } else {
                    //Calcula en base a días
                    let date_finish = moment(this.membership.date_start).add(quantity * newValue, 'd').subtract(1, 'days').format('yyyy-MM-DD')
                    this.membership.date_finish = date_finish
                }
            }
        }
    }
}
</script>