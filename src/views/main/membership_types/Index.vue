<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Tipos de membresías" icon="pe-7s-id" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                        Tipos de membresías
                        <div class="btn-actions-pane-right">
                            <button class="active btn btn-success" @click="hasPermission('membership_types.store') ? $router.push({ name: 'membership_types.create' }) : ''">
                                <i class="fa fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th class="text-center">Tipo</th>
                                <th class="text-center">Cantidad</th>
                                <th class="text-center">Precio</th>
                                <th class="text-center"></th>
                            </tr>
                            </thead>
                            <transition-group tag="tbody" name="fade" v-if="!searching">>
                                    <tr v-for="(membershipType, index) in membershipTypes.data" :key="membershipType.id">
                                        <td class="text"></td>
                                        <td class="text" nowrap>{{ membershipType.name }}</td>
                                        <td class="text-center">{{ membershipType.type }}</td>
                                        <td class="text-center">{{ membershipType.quantity }}</td>
                                        <td class="text-center">${{ convertMoney(membershipType.price) }}</td>
                                        <td class="text-center" nowrap>
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
                            </transition-group>
                            <Skeleton v-else/>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <pagination :limit="1" :data="membershipTypes" @pagination-change-page="getMembershipTypes"></pagination>
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
import formatNum from 'format-num'
export default {
    components: { PageTitle, Skeleton },
    created () {
        this.getMembershipTypes()
    },
    data () {
        return {
            membershipTypes: {},
            searching: true
        }
    },
    methods: {
        getMembershipTypes (page = 1) {
            this.searching = true
            this.$http.get('membership-types?page=' + page).then( response => {
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
                this.getMembershipTypes()
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