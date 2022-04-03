<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Usuarios" icon="pe-7s-clock" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-6 col-lg-6 offset-md-3">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Actualizar permisos de usuario</h5>
                        <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <input type="text" placeholder="Buscar permiso" class="form-control mb-2" v-model="searchPermission">
                        <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="!allPermissions.length"></vue-loading>    
                        <div style="max-height:530px;overflow:auto" v-else>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <th>Permiso</th>
                                        <th nowrap>
                                            <button class="btn btn-default btn-sm" @click="selectAll">Todos</button>
                                            <button class="btn btn-default btn-sm" @click="unSelectAll">Ninguno</button>
                                        </th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="permission in allPermissionsFiltered" :key="permission.id">
                                            <td>{{ permission.description }}</td>
                                            <td class="text-center">
                                                <input type="checkbox" v-model="permissionsFromUser" :value="permission">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving}" @click.prevent="$router.push({ name: 'users.index' })">
                            <i class="fa fa-undo"></i> Atrás
                        </a>
                        <button class="mt-1 btn btn-primary" :disabled="saving" @click="save">
                            <div class="spinner-border spinner-border-sm" role="status" v-if="saving">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <i class="fa fa-save" v-else></i> Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, VueLoading },
    created () {
        this.getPermissionsFromUserAndAllPermissions()
    },
    data () {
        return {
            allPermissions: [],
            permissionsFromUser: [],
            searchPermission: '',
            errors: null,
            saving: false
        }
    },
    methods: {
        getPermissionsFromUserAndAllPermissions () {
            this.$http.get(`users/${this.$route.params.id}/get-permissions-from-user-and-all-permissions`, this.user).then( response => {
                this.allPermissions = response.data.allPermissions
                this.permissionsFromUser = response.data.permissionsFromUser
                this.permissionsFromUser = this.permissionsFromUser.map(permissionFromUser => {
                    return {
                        created_at: permissionFromUser.created_at,
                        description: permissionFromUser.description,
                        id: permissionFromUser.id,
                        name: permissionFromUser.name,
                        updated_at: permissionFromUser.updated_at,
                    }
                })
            })
        },
        save () {
            this.saving = true

            this.$http.put(`users/${this.$route.params.id}/update-permissions`, { permissionsFromUser: this.permissionsFromUser }).then( response => {
                this.saving = false
                this.$toastr.success('Permisos actualizados')
            }).catch( error => {
                this.saving = false
                if (error.response.status == 422) {
                    this.$toastr.error('Verifica los errores de validación')
                    this.errors = error.response.data.errors
                }
            })
        },
        selectAll () {
            this.permissionsFromUser = []
            this.permissionsFromUser.push(...this.allPermissions)
        },
        unSelectAll () {
            this.permissionsFromUser = []
        }
    },
    computed: {
        allPermissionsFiltered () {
            if (this.searchPermission) {
                return this.allPermissions.filter(permission => permission.description.toLowerCase().includes(this.searchPermission.toLowerCase()))
            }
            return this.allPermissions
        }
    }
}
</script>