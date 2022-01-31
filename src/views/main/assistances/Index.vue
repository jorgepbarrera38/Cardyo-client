<template>
    <div class="app-main__inner">
        <!--Titulo página-->
        <PageTitle title="Asistencias" subtitle=""/>     
        <!--Fin titulo página-->
        <!--Contenido-->
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Marcar asistencia</h5>
                        <form class="form-inline" @submit.prevent="searchClientMembership">
                            <div class="position-relative form-group">
                                <label for="" class="sr-only">Identificación</label>
                                <input placeholder="Identificación" type="text" v-model="identification"
                                    class="mr-2 form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="searching">
                                 <div class="spinner-border spinner-border-sm" role="status" v-if="searching">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-search" v-else></i> {{ searching ? 'Buscando' : 'Buscar' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--Fin contenido-->
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
export default {
    components: { PageTitle },
    data () {
        return {
            identification: '',
            searching: false,
            saving: false
        }
    },
    methods: {
        searchClientMembership () {
            this.searching = true

            this.$http.get(`assitances/get-active-memberships?identification=${this.identification}`)
                .then( response => {
                console.log(response.data);
                this.searching = false
            }).catch( error => {
                this.searching = false
                if (error.response.status == 422) {
                    this.$toastr.error(error.response.data.errors.message[0])
                }
            })
        },
        clearData () {
        }
    }
}
</script>