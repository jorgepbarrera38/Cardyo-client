<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Usuarios" icon="pe-7s-clock" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Usuarios
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" 
                                @click="hasPermission('users.store') ? $router.push({ name: 'users.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <Search placeholder="Nombres o usuario" @search="search"></Search>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Nombres</th>
                                <th class="text-center">Usuario</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(user, index) in users.data" :key="user.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ user.names }}</td>
                                        <td class="text-center">{{ user.username }}</td>
                                        <td class="text-center" nowrap>
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
                            </transition-group>
                            <Skeleton v-else/>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <pagination :limit="1" :data="users" @pagination-change-page="getUsers"></pagination>
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
export default {
    components: { PageTitle, Skeleton, Search },
    created () {
        this.getUsers()
    },
    data () {
        return {
            users: {},
            searchBody: '',
            searching: true
        }
    },
    methods: {
        search (search) {
            this.searchBody = search
            this.getUsers()
        },
        getUsers (page = 1, searching = true) {
            this.searching = searching
            this.$http.get('users?page=' + page + '&search=' + this.searchBody).then( response => {
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