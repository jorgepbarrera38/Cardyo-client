<template>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">

<div class="card card-primary card-outline">
<div class="card-body box-profile">
<div class="text-center">
<img class="profile-user-img img-fluid img-circle" :src="client.photo ? APP_URL + client.photo : require('../../../../assets/user.png') " alt="User profile picture">
</div>
<h3 class="profile-username text-center">{{ client.full_names }}</h3>
<!--<p class="text-muted text-center">Software Engineer</p>-->
<ul class="list-group list-group-unbordered mb-3">
<li class="list-group-item">
<b>Identificación</b> <a class="float-right">{{ client.identification }}</a>
</li>
<li class="list-group-item">
<b>Sexo</b> <a class="float-right">{{ client.sex }}</a>
</li>
<li class="list-group-item">
<b>Fecha de nacimiento</b> <a class="float-right">{{ client.date_of_birth }}</a>
</li>
<li class="list-group-item">
<b>Dirección</b> <a class="float-right">{{ client.address }}</a>
</li>
<li class="list-group-item">
<b>Teléfono</b> <a class="float-right">{{ client.phonenumber }}</a>
</li>
</ul>
<!--<a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>-->
</div>

</div>

</div>
            <section class="col-md-9">
                <Membership :client="client" @membershipDeleted="getClient" @membershipSaved="getClient"/>
                <BodyMeasurement :client="client" @bodyMeasurementDeleted="bodyMeasurementDeleted"/>
                <Shopping :client="client"/>
            </section>
        </div>
      </div>
    </section>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import Profile from './profile/Profile'
import Membership from './membership/Index'
import BodyMeasurement from './body_measurement/Index'
import Shopping from './shopping/Index'
 import { mapState } from 'vuex'
export default {
    components: { PageTitle, Profile, Membership, BodyMeasurement, Shopping },
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
                })////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+

                this.client.body_measurements.forEach(bodyMeasurement => {
                    this.$set(bodyMeasurement, 'deleting', false)
                })

                this.searching = false
            })
        },
        /*membershipDeleted (index) {
            this.client.memberships.splice(index, 1)
        },*/
        bodyMeasurementDeleted (index) {
            this.client.body_measurements.splice(index, 1)
        }
    },
    computed: {
        ...mapState(['APP_URL'])
    }
}
</script>