<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Clientes" icon="pe-7s-users" subtitle=""/>     
        <!--Fin titulo página-->
        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <li class="nav-item">
                <a role="tab" class="nav-link active" id="tab-1" data-toggle="tab" 
                    @click.prevent="tab = 'Profile'"
                    href="#">
                    <span>Información personal</span>
                </a>
            </li>
            <li class="nav-item">
                <a role="tab" class="nav-link" id="tab-2" data-toggle="tab" 
                    @click.prevent="tab = 'Membership'"
                    href="#">
                    <span>Membresías</span>
                </a>
            </li>
        </ul>
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                  <component v-bind:is="tab" 
                    :client="client"
                    @membershipSaved="getClient"
                    @membershipDeleted="membershipDeleted">
                  </component>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import Profile from './profile/Profile'
import Membership from './membership/Index'
export default {
    components: { PageTitle, Profile, Membership },
    created () {
        this.getClient()
    },
    data () {
        return {
            client: {},
            searching: true,
            tab: 'Profile'
        }
    },
    methods: {
        getClient () {
            this.$http.get(`clients/${ this.$route.params.id }`).then( response => {
                this.client = response.data
                this.client.memberships.forEach(membership => {
                    this.$set(membership, 'deleting', false)
                    this.$set(membership, 'searchingAssistances', false)
                });
                this.searching = false
            })
        },
        membershipDeleted (index) {
            this.client.memberships.splice(index, 1)
        }
    }
}
</script>