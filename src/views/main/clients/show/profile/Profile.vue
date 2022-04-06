<template>
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <vue-loading type="spin" color="#3F6AD8" :size="{ width: '50px', height: '50px' }" v-if="!Object.keys(this.client).length"></vue-loading>    
        <div class="card" style="width: 18rem;" v-else>
            <img class="card-img-top" :src="client.photo ? 'http://localhost:8000/' + client.photo : require('../../../../../assets/user.png') " 
                alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ client.full_names }}</h5>
                <p class="card-text">
                    <i :class="{'fa': true, 'fa-venus': client.sex == 'Femenino', 'fa-mars': client.sex == 'Masculino'}"></i> {{ client.sex }} <br>
                    <i class="fa fa-id-card"></i> {{ client.identification }} <br>
                    <i class="fa fa-birthday-cake"></i> {{ client.date_of_birth }} <br>
                    <span v-if="client.address">
                        <i class="fa fa-map-marker-alt"></i> {{ client.address }} <br>
                    </span>
                    <span v-if="client.email">
                        <i class="fa fa-envelope"></i> {{ client.email }} <br>
                    </span>
                    <span v-if="client.phonenumber">
                        <i class="fa fa-phone"></i> {{ client.phonenumber }} <br>
                    </span>
                </p>
                <button class="btn btn-info" @click="$router.push({ name: 'clients.index' })">
                    <i class="fa fa-undo"></i> Atrás
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { VueLoading } from 'vue-loading-template'
export default {
    components: {
      VueLoading
    },
    props: {
        client: {
            type: Object,
            required: true
        }
    }
}
</script>