<template>
    <div class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Tipos de membresías</h3>
                        <div class="card-tools">
                            <button class="active btn btn-primary btn-sm" @click="hasPermission('membership_types.store') ? $router.push({ name: 'membership_types.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="card-body p-0">

                        <div class="input-group input-group-sm" style="width: 300px; margin: 0.75rem">
                            <input type="text" name="table_search" class="form-control float-right" @keyup.enter="getMembershipTypes" placeholder="Nombre membresía" v-model="search">
                            <div class="input-group-append">
                                <button class="btn btn-default" @click="getMembershipTypes">
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
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="(membershipType, index) in membershipTypes.data" :key="membershipType.id">
                                            <td nowrap>{{ membershipType.name }}</td>
                                            <td>{{ membershipType.type }}</td>
                                            <td>{{ membershipType.quantity }}</td>
                                            <td>${{ convertMoney(membershipType.price) }}</td>
                                            <td nowrap>
                                                <button type="button" 
                                                    @click="hasPermission('membership_types.update') ? $router.push({ name: 'membership_types.edit', params: { id: membershipType.id } }) : ''"
                                                    title="Editar"
                                                    class="btn btn-warning btn-sm mr-1">
                                                    <i class="fa fa-edit"></i> 
                                                </button>
                                                <button type="button" 
                                                    @click="hasPermission('membership_types.delete') ? deleteMembershipType(membershipType, index) : ''" :disabled="membershipType.deleting"
                                                    title="Eliminar"
                                                    class="btn btn-danger btn-sm">
                                                    <div class="spinner-border spinner-border-sm" v-if="membershipType.deleting"
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
                            <pagination :limit="1" :data="membershipTypes" @pagination-change-page="getMembershipTypes"></pagination>
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
import formatNum from 'format-num'
import { VueLoading } from 'vue-loading-template'
export default {
    components: { PageTitle, Search, VueLoading },
    created () {
        this.getMembershipTypes()
    },
    data () {
        return {
            membershipTypes: {},
            search: '',
            searching: true,
        }
    },
    methods: {
        getMembershipTypes (page = 1) {
            this.searching = true
            this.$http.get('membership-types?page=' + page + '&search=' + this.search).then( response => {
                this.membershipTypes = response.data
                this.membershipTypes.data.forEach(membershipType => {
                    this.$set(membershipType, 'deleting', false)
                })
                this.searching = false
            })
        },
        deleteMembershipType (membershipType, index) {
            membershipType.deleting = true
            this.$http.delete(`membership-types/${ membershipType.id }`).then( response => {
                this.getMembershipTypes(this.membershipTypes.current_page, false)
                this.membershipTypes.data.splice(index, 1)
                membershipType.deleting = false
                this.$toastr.success('Tipo de membresía eliminada')
            }).catch(error => {
                membershipType.deleting = false
                if (error.response.status != 403) {
                    this.$toastr.error('El tipo de membresía no se pudo eliminar')
                }
            })
        },
        convertMoney (value) {
            return formatNum(value)
        }
    }
}
</script>