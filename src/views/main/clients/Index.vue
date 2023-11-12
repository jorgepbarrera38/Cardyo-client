<template>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
            <section class="col-md-12">
                <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Clientes registrados</h3>

                    <div class="card-tools">
                        <button class="active btn btn-primary btn-sm ml-2" @click="hasPermission('clients.store') ? $router.push({ name: 'clients.create' }) : ''">
                            <i class="fa fa-plus"></i> Nuevo
                        </button>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body p-0">

                    <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                            <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getClients" placeholder="Identificación o nombres" v-model="search">
                            <div class="input-group-append">
                                <button class="btn btn-default" @click="getClients">
                                <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>

                    <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="searching"></vue-loading>    
                    <div class="table-responsive" v-else>
    
                        <table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th>Identificación</th>
                                <th>Nombres</th>
                                <th>Dirección</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(client, index) in clients.data" :key="client.id">
                                            <td nowrap>{{ client.identification }}</td>
                                            <td nowrap>
                                                <img width="40" class="rounded-circle" 
                                                                    :src="client.photo ? APP_URL + client.photo : require('../../../assets/user.png') "
                                                                alt="">
                                                {{ client.full_names }}
                                            </td>
                                            <td nowrap>{{ client.address }}</td>
                                            <td nowrap>{{ client.email }}</td>
                                            <td nowrap>{{ client.phonenumber }}</td>
                                            <td nowrap>
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
                        </tbody>
                        </table>
                        </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer clearfix">
                    <pagination class="pagination-sm float-right" :limit="1" :data="clients" @pagination-change-page="getClients"></pagination>
                </div>
                </div>
            </section>
        </div>
      </div>
    </section>
</template>
<script>
import { VueLoading } from 'vue-loading-template'
import { mapState } from 'vuex'
export default {
    components: { VueLoading },
    created () {
        this.getClients()
    },
    data () {
        return {
            clients: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getClients (page = 1) {
            this.searching = true
            this.$http.get('clients?page=' + page + '&search=' + this.search).then( response => {
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