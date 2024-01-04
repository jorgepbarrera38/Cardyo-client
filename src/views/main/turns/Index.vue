<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Turnos</h3>
                            <div class="card-tools">
                                <button class="active btn btn-primary btn-sm" @click="hasPermission('turns.store') ? $router.push({ name: 'turns.create' }) : ''">
                                    <i class="fa fa-plus"></i> Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">

                            <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                                <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getTurns" placeholder="Nombre turno" v-model="search">
                                <div class="input-group-append">
                                    <button class="btn btn-default" @click="getTurns">
                                    <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>

                        <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="searching"></vue-loading>    
                        <div class="table-responsive" v-else>

                            <table class="table table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Hora inicial</th>
                                        <th>Hora final</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="(turn, index) in turns.data" :key="turn.id">
                                            <td nowrap>{{ turn.name }}</td>
                                            <td>{{ turn.time_start }}</td>
                                            <td>{{ turn.time_finish }}</td>
                                            <td nowrap>
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
                                    </tbody>
                            </table>
                        </div>
                        <div class="d-block text-center card-footer">
                            <pagination :limit="1" :data="turns" @pagination-change-page="getTurns"></pagination>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        <!--Fin contenido-->
        </div>
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle'
import Search from '../components/Search'
import formatNum from 'format-num'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getTurns()
    },
    data () {
        return {
            turns: {},
            searchBody: '',
            search: '',
            searching: true
        }
    },
    methods: {
        getTurns (page = 1) {
            this.searching = true
            this.$http.get('turns?page=' + page + '&search=' + this.search).then( response => {
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