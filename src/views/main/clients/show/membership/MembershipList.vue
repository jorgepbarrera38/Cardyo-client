<template>
<div class="row">
    <div :class="{'col-md-8': showAssistancesFromMembership, 'col-md-12': !showAssistancesFromMembership}">
        <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Membresías</h3>
                    <div class="card-tools">
                        <button class="active btn btn-primary btn-sm" @click="hasPermission('client_memberships.store') ? $emit('createMembership') : ''">
                            <i class="fa fa-plus"></i> Nuevo
                        </button>
                    </div>
                </div>
                <div class="card-body p-0">

                
                    <div class="table-responsive" style="max-height: 250px;">
                        <table class="table table-sm table-hover">
                            <thead>
                            <tr>
                                <th>Membresía nombre</th>
                                <th>Membresía cantidad</th>
                                <th>Membresía tipo</th>
                                <th>Cantidad</th>
                                <th>Precio unitario</th>
                                <th>Precio total</th>
                                <th>Fecha de inicio</th>
                                <th>Fecha final</th>
                                <th>Turno</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(membership, index) in client.memberships" :key="membership.id" :title="membership.observations ? membership.observations : 'No hay observaciónes'">
                                    <td nowrap>{{ membership.membership_type.name }}</td>
                                    <td>{{ membership.membership_type.quantity }}</td>
                                    <td>{{ membership.membership_type.type }}</td>
                                    <td>{{ membership.quantity }}</td>
                                    <td>{{ convertMoney(membership.price) }}</td>
                                    <td>{{ convertMoney(membership.total_price) }}</td>
                                    <td nowrap>{{ membership.date_start }}</td>
                                    <td nowrap>{{ membership.date_finish }}</td>
                                    <td>{{ membership.turn.name + ' ' + membership.turn.time_start + ' - ' + membership.turn.time_finish }}</td>
                                    <td>
                                        <div class="badge badge-warning" v-if="membershipIsPending(membership.date_start)">Pendiente</div>
                                        <div class="badge badge-success" v-if="membershipIsActive(membership.date_start, membership.date_finish)">Activa</div>
                                        <div class="badge badge-secondary" v-if="membershipIsFinished(membership.date_finish)">Finalizada</div>
                                    </td>
                                    <td class="text-center" nowrap>
                                        <button type="button" 
                                            @click="hasPermission('client_memberships.update') ? $emit('editMembership', membership.id) : ''" 
                                            title="Editar membresía"
                                            class="btn btn-warning btn-sm mr-1">
                                            <i class="fa fa-edit"></i> 
                                        </button>
                                        <button type="button" 
                                            @click="hasPermission('client_memberships.delete') ? deleteMembership(membership, index) : ''"
                                            :disabled="membership.deleting" 
                                            title="Eliminar membresía"
                                            class="btn btn-danger btn-sm mr-1">
                                            <div class="spinner-border spinner-border-sm" v-if="membership.deleting"
                                                role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            <i class="fa fa-trash-alt" v-else></i> 
                                        </button>
                                        <button type="button" @click="getAndShowAsistancesFromMembership(membership)" :disabled="membership.searchingAssistances" title="Ver asistencias"
                                            class="btn btn-info btn-sm mr-1">
                                            <div class="spinner-border spinner-border-sm" v-if="membership.searchingAssistances"
                                                role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            <i class="fa fa-calendar" v-else></i> 
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
    </div>
    <div class="col-md-4" v-if="showAssistancesFromMembership">
        <div class="main-card mb-3 card">
                <div class="card-header">
                    Asistencias
                    <div class="btn-actions-pane-right">
                        <button class="active btn btn-danger" @click="showAssistancesFromMembership = false">
                            <i class="fa fa-undo"></i> Cerrar
                        </button>
                    </div>
                </div>
                <div class="card-body">

                    <v-calendar :attributes='attributesAssistancesCalendar' is-expanded
                            :min-date="minDate"
                            :max-date="maxDate"
                            :from-page="{ month: getFirstMonthFromAssistance, year: getFirstYearFromAssistance }"/>
                </div>
                
                    <!--:columns="2" is-expanded-->
                
                <!--<div class="table-responsive">
                    <table class="table table-borderless table-striped table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Fecha</th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(assistanceFromMembership, index) in assistancesFromMembership" :key="assistanceFromMembership.id">
                                <td class="text"></td>
                                <td class="text" nowrap>{{ assistanceFromMembership.date }}</td>
                                <td class="text-center" nowrap>
                                    <button type="button" @click="deleteMembership(membership, index)" :disabled="membership.deleting" title="Eliminar asistencia"
                                        class="btn btn-danger btn-sm">
                                        <div class="spinner-border spinner-border-sm" v-if="membership.deleting"
                                            role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <i class="fa fa-trash-alt" v-else></i> 
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>-->
        </div>
    </div>
</div>
</template>
<script>
import formatNum from 'format-num'
import moment from 'moment'
import LoginVue from '../../../../login/Login.vue'
export default {
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            showAssistancesFromMembership: false,
            searchingAssistances: false,
            assistancesFromMembership: []
        }
    },
    methods: {
        convertMoney (value) {
            return `$${formatNum(value)}`
        },
        membershipIsActive (date_start, date_finish) {
            return moment().isBetween(date_start, moment(date_finish).add(1, 'days'))
        },
        membershipIsFinished (date_finish) {
            return moment(date_finish).isBefore(moment().startOf('day'))
        },
        membershipIsPending (date_start) {
            return moment(date_start).isAfter(moment().startOf('day'))
        },
        deleteMembership (membership, index) {
            membership.deleting = true
            this.$http.delete(`client-memberships/${ membership.id }/destroy`).then( response => {
                this.$emit('membershipDeleted', index)
                this.$toastr.success('Membresía eliminada')
            }).catch(error => {
                membership.deleting = false
                this.$toastr.error(error.response.data.errors.message[0])
            })
        },
        getAndShowAsistancesFromMembership (membership) {
            membership.searchingAssistances = true
            this.assistancesFromMembership = []
            this.$http.get(`client-memberships/${ membership.id }/get-asistances-from-membership`).then( response => {
                this.assistancesFromMembership = response.data
                membership.searchingAssistances = false
                
                if (!this.assistancesFromMembership.length) {
                    return this.$toastr.info('No hay registros de asistencias')
                }
                
                this.showAssistancesFromMembership = true
            })
        }
    },
    computed: {
        attributesAssistancesCalendar () {
            let data = []

            data = this.assistancesFromMembership.map(assistance => {
                return {
                    key: assistance.id,
                    highlight: true,
                    dates: Date.parse(moment(assistance.date).format()),
                }
            })
            return data
        },
        getFirstMonthFromAssistance () {
            if (this.assistancesFromMembership.length) {
                return Number(moment(this.assistancesFromMembership[0].date).format('M'))
            }
            return Number(moment().format('M'))
        },
        getFirstYearFromAssistance () {
            if (this.assistancesFromMembership.length) {
                return Number(moment(this.assistancesFromMembership[0].date).format('Y'))
            }
            return Number(moment().format('Y'))
        },
        minDate () {
            if (this.assistancesFromMembership.length) {
                return Date.parse(moment(this.assistancesFromMembership[0].date).format())
            }
        },
        maxDate () {
            if (this.assistancesFromMembership.length) {
                return Date.parse(moment(this.assistancesFromMembership[this.assistancesFromMembership.length - 1].date).format())
            }
        }
    }
}
</script>