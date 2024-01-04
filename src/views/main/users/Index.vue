<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Usuarios</h3>
                            <div class="card-tools">
                                <button class="active btn btn-primary btn-sm" 
                                    @click="hasPermission('users.store') ? $router.push({ name: 'users.create' }) : ''">
                                    <i class="fa fa-plus"></i> Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">

                            <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                                <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getUsers" placeholder="Nombres o usuario" v-model="search">
                                <div class="input-group-append">
                                    <button class="btn btn-default" @click="getUsers">
                                    <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>

                            <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="searching"></vue-loading>    
                            <div class="table-responsive" v-else>
                                <table class="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nombres</th>
                                            <th>Usuario</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(user, index) in users.data" :key="user.id">
                                            <td nowrap>{{ user.names }}</td>
                                            <td>{{ user.username }}</td>
                                            <td nowrap>
                                                <button type="button" 
                                                    @click="hasPermission('users.update_permissions') ? $router.push({ name: 'users.update_permissions', params: { id: user.id } }) : ''" 
                                                    title="Actualizar permisos"
                                                    class="btn btn-info btn-sm mr-1">
                                                    <i class="fa fa-key"></i>
                                                </button>
                                                <button type="button" 
                                                    @click="hasPermission('users.update') ? $router.push({ name: 'users.edit', params: { id: user.id } }) : ''" 
                                                    title="Editar"
                                                    class="btn btn-warning btn-sm mr-1">
                                                    <i class="fa fa-edit"></i> 
                                                </button>
                                                <button type="button" 
                                                    @click="hasPermission('users.delete') ? deleteUser(user, index) : ''" :disabled="user.deleting" 
                                                    title="Eliminar"
                                                    class="btn btn-danger btn-sm">
                                                    <div class="spinner-border spinner-border-sm" v-if="user.deleting"
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
                                <pagination :limit="1" :data="users" @pagination-change-page="getUsers"></pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle'
import Search from '../components/Search'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getUsers()
    },
    data () {
        return {
            users: {},
            search: '',
            searching: true
        }
    },
    methods: {
        getUsers (page = 1) {
            this.searching = true
            this.$http.get('users?page=' + page + '&search=' + this.search).then( response => {
                this.users = response.data
                this.users.data.forEach(user => {
                    this.$set(user, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteUser (user, index) {
            user.deleting = true
            this.$http.delete(`users/${ user.id }`).then( response => {
                this.getUsers(this.searchBody.current_page, false)
                this.users.data.splice(index, 1)
                user.deleting = false
                this.$toastr.success('Usuario eliminado')
            }).catch(error => {
                user.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('El usuario no se pudo eliminar')
                }
            })
        },
    }
}
</script>