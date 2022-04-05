<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Clientes" icon="pe-7s-users" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Clientes registrados
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" @click="hasPermission('clients.store') ? $router.push({ name: 'clients.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <Search placeholder="Identificación o nombres" @search="search"></Search>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th class="text-center">Identificación</th>
                                <th>Nombres</th>
                                <th class="text-center">Dirección</th>
                                <th class="text-center">Email</th>
                                <th class="text-center">Teléfono</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(client, index) in clients.data" :key="client.id">
                                        <td class="text-center text-muted">{{ client.identification }}</td>
                                        <td>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">
                                                    <div class="widget-content-left mr-3">
                                                        <div class="widget-content-left">
                                                            <img width="40" class="rounded-circle" 
                                                                :src="client.photo ? APP_URL + client.photo : require('../../../assets/user.png') "
                                                            alt="">
                                                        </div>
                                                    </div>
                                                    <div class="widget-content-left flex2">
                                                        <div class="widget-heading">{{ client.full_names }}</div>
                                                        <div class="widget-subheading opacity-7">{{ client.sex }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">{{ client.address }}</td>
                                        <td class="text-center">{{ client.email }}</td>
                                        <td class="text-center">{{ client.phonenumber }}</td>
                                        <td class="text-center" nowrap>
                                            <button type="button" 
                                                @click="hasPermission('clients.show') ? $router.push({ name: 'clients.show', params: { id: client.id } }) : ''"
                                                title="Ver información"
                                                class="btn btn-info btn-sm mr-1">
                                                <i class="fa fa-eye"></i> 
                                            </button>
                                            <button type="button" 
                                                @click="hasPermission('clients.update') ? $router.push({ name: 'clients.edit', params: { id: client.id } }) : ''"
                                                title="Editar"
                                                class="btn btn-warning btn-sm mr-1">
                                                <i class="fa fa-edit"></i> 
                                            </button>
                                            <button type="button" 
                                                @click="hasPermission('clients.delete') ? deleteClient(client, index) : ''" :disabled="client.deleting"
                                                title="Eliminar"
                                                class="btn btn-danger btn-sm">
                                                <div class="spinner-border spinner-border-sm" v-if="client.deleting"
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
                        <pagination :limit="1" :data="clients" @pagination-change-page="getClients"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle'
import Skeleton from './_partials/Skeleton'
import Search from '../components/Search'
import { mapState } from 'vuex'
export default {
    components: { PageTitle, Skeleton, Search },
    created () {
        this.getClients()
    },
    data () {
        return {
            clients: {},
            searchBody: '',
            searching: true
        }
    },
    methods: {
        search (search) {
            this.searchBody = search
            this.getClients()
        },
        getClients (page = 1, searching = true) {
            this.searching = searching
            this.$http.get('clients?page=' + page + '&search=' + this.searchBody).then( response => {
                this.clients = response.data
                this.clients.data.forEach(client => {
                    this.$set(client, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteClient (client, index) {
            client.deleting = true
            this.$http.delete(`clients/${ client.id }`).then( response => {
                this.getClients(this.clients.current_page, false)
                this.clients.data.splice(index, 1)
                client.deleting = false
                this.$toastr.success('Cliente eliminado')
            }).catch(error => {
                client.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('El cliente no se pudo eliminar')
                }
            })
        }
    },
    computed: {
        ...mapState(['APP_URL'])
    }
}
</script>