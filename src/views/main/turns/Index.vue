<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Turnos" icon="pe-7s-clock" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Turnos
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" @click="hasPermission('turns.store') ? $router.push({ name: 'turns.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <Search placeholder="Nombre turno" @search="search"></Search>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th class="text-center">Hora inicial</th>
                                <th class="text-center">Hora final</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(turn, index) in turns.data" :key="turn.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ turn.name }}</td>
                                        <td class="text-center">{{ turn.time_start }}</td>
                                        <td class="text-center">{{ turn.time_finish }}</td>
                                        <td class="text-center" nowrap>
                                            <button type="button" @click="hasPermission('turns.update') ? $router.push({ name: 'turns.edit', params: { id: turn.id } }) : ''"
                                                title="Editar"
                                                class="btn btn-warning btn-sm mr-1">
                                                <i class="fa fa-edit"></i> 
                                            </button>
                                            <button type="button" @click="hasPermission('turns.delete') ? deleteTurn(turn, index) : ''" :disabled="turn.deleting"
                                                title="Eliminar"
                                                class="btn btn-danger btn-sm">
                                                <div class="spinner-border spinner-border-sm" v-if="turn.deleting"
                                                    role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <i class="fa fa-trash-alt" v-else></i> 
                                            </button>
                                        </td>
                                    </tr>
                            </transition-group>
                            <Skeleton v-else/>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <pagination :limit="1" :data="turns" @pagination-change-page="getTurns"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle'
import Search from '../components/Search'
import Skeleton from './_partials/Skeleton'
import formatNum from 'format-num'
export default {
    components: { PageTitle, Skeleton, Search },
    created () {
        this.getTurns()
    },
    data () {
        return {
            turns: {},
            searchBody: '',
            searching: true
        }
    },
    methods: {
        search (search) {
            this.searchBody = search
            this.getTurns()
        },
        getTurns (page = 1, searching = true) {
            this.searching = searching
            this.$http.get('turns?page=' + page + '&search=' + this.searchBody).then( response => {
                this.turns = response.data
                this.turns.data.forEach(turn => {
                    this.$set(turn, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteTurn (turn, index) {
            turn.deleting = true
            this.$http.delete(`turns/${ turn.id }`).then( response => {
                this.getTurns(this.turns.current_page, false)
                //this.turns.data.splice(index, 1)
                turn.deleting = false
                this.$toastr.success('Turno eliminado')
            }).catch(error => {
                turn.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('El turno no se pudo eliminar')
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    }
}
</script>