<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Asistencias" icon="pe-7s-note2" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Marcar asistencia</h5>
                        
                            <div class="row">
                                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <form @submit.prevent="searchClientMembership">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Identificación" v-model="identification" required>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" :disabled="searching">
                                                    <div class="spinner-border spinner-border-sm" role="status" v-if="searching">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                    <i class="fa fa-search" v-else></i> {{ searching ? 'Buscando' : 'Buscar' }}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-lg-2" v-if="Object.keys(client).length">
                <div class="card">
                    <img class="card-img-top" :src="client.photo ? APP_URL + client.photo : require('../../../assets/user.png') " 
                        alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ client.full_names }}</h5>
                        <p class="card-text">
                            <i class="fa fa-id-card"></i> {{ client.identification }} <br>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-10 col-lg-10" v-if="Object.keys(client).length">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Membresías activas
                    </div>
                     <div class="table-responsive">
                        <table class="table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Membresía</th>
                                <th class="text-center">Fecha de inicio</th>
                                <th class="text-center">Fecha final</th>
                                <th class="text-center">Turno</th>
                                <th class="text-center"></th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(membership, index) in client.memberships" :key="membership.id" :title="membership.observations ? membership.observations : 'No hay observaciónes'">
                                    <td class="text"></td>
                                    <td class="text" nowrap>{{ membership.membership_type.name }}</td>
                                    <td class="text-center" nowrap>{{ membership.date_start }}</td>
                                    <td class="text-center" nowrap>{{ membership.date_finish }}</td>
                                    <td class="text-center" nowrap>{{ membership.turn.name + ' ' + membership.turn.time_start + ' - ' + membership.turn.time_finish }}</td>
                                    <td class="text-center" nowrap>
                                        <div class="badge badge-danger" v-if="daysToExpire(membership.date_finish) == 0">
                                            ¡Vence hoy!
                                        </div>
                                        <div class="badge badge-danger" v-if="daysToExpire(membership.date_finish) == 1">
                                            ¡Vence mañana!
                                        </div>
                                        <div class="badge badge-danger" v-if="daysToExpire(membership.date_finish) > 1 && daysToExpire(membership.date_finish) <= 3">
                                            ¡Vence en {{ daysToExpire(membership.date_finish) }} días!
                                        </div>
                                    </td>                                  
                                    <td class="text-center" nowrap>
                                        <i class="fa fa-check-circle" v-if="membership.clientMembershipHasAssistanceToday"></i>
                                        <button type="button" v-else @click="markAttendance(membership)" :disabled="membership.markingAttendance"
                                            class="btn btn-success btn-sm">
                                            <div class="spinner-border spinner-border-sm" v-if="membership.markingAttendance"
                                                role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            <i class="fa fa-check-circle" v-else></i> Marcar asistencia
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
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
    components: { PageTitle },
    data () {
        return {
            identification: '',
            searching: false,
            client: {
            },
            saving: false,
        }
    },
    methods: {
        searchClientMembership () {
            this.client = {}
            this.searching = true,

            this.$http.get(`assitances/get-active-memberships?identification=${this.identification}`)
                .then( response => {

                this.client = response.data.clientWithInfoMemberships
                
                this.client.memberships.forEach(membership => {
                    this.$set(membership, 'markingAttendance', false)
                    this.$set(membership, 'clientMembershipHasAssistanceToday', this.clientMembershipHasAssistanceToday(membership))
                })

                this.searching = false
                if (!response.data.clientHasActiveMemberships) {
                    this.$toastr.error('El cliente no tiene membresías activas')
                }
            }).catch( error => {
                this.searching = false
                if (error.response.status == 422) {
                    this.$toastr.error(error.response.data.errors.message[0])
                }
            })
        },
        markAttendance (membership) {
            membership.markingAttendance = true
            this.$http.post(`assitances/mark-attendance`, { client_membership_id: membership.id })
                .then( () => {
                membership.clientMembershipHasAssistanceToday = true
                this.$toastr.success('Asistencia marcada')
                membership.markingAttendance = false
            }).catch( error => {
                membership.markingAttendance = false
                if (error.response.status == 422) {
                    this.$toastr.error(error.response.data.errors.memsbership_id[0])
                }
            })
        },
        clearData () {
        },
        clientMembershipHasAssistanceToday (membership) {
            let clientMembershipHasAssistanceToday = membership.client_membership_assistances.find(client_membership_assistance => {
                return moment().startOf('days').isSame(client_membership_assistance.date)
            })
            if (clientMembershipHasAssistanceToday) {
                return true
            } else {
                return false
            }
        },
        daysToExpire (dateFinish) {
            let dateFinishA = moment(dateFinish)
            
            return dateFinishA.diff(moment().startOf('day'), 'days')
        }
    },
    computed: {
        ...mapState(['APP_URL'])
    }
}
</script>