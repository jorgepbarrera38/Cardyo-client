<template>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
            <section class="col-md-12">
                <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Nuevo cliente</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    
                    <div class="alert alert-danger fade show" role="alert" v-if="errors">
                            <li v-for="(error, index) in errors" :key="'errors-' + index">{{ error[0] }}</li>
                        </div>
                        <form @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Identificación (*)</label>
                                        <input type="text" class="form-control" v-model="client.identification" maxlength="20">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Nombres (*)</label>
                                        <input type="text" class="form-control" v-model="client.names" maxlength="50">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Apellidos (*)</label>
                                        <input type="text" class="form-control" v-model="client.lastname" maxlength="50">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Sexo (*)</label>
                                        <select class="form-control" v-model="client.sex">
                                            <option value="">Seleccione opción</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Fecha de nacimiento (*)</label>
                                        <input type="date" class="form-control" v-model="client.date_of_birth">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Dirección</label>
                                        <input type="text" class="form-control" v-model="client.address" maxlength="80">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Email</label>
                                        <input type="email" class="form-control" v-model="client.email" maxlength="80">
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Teléfono</label>
                                        <input type="number" class="form-control" v-model="client.phonenumber" maxlength="20">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="position-relative form-group">
                                        <label for="" class="">Foto</label>
                                        <croppa v-model="myCroppa" 
                                                placeholder="Seleccione imagen"
                                                :placeholder-font-size="14"
                                                :prevent-white-space="true"></croppa>
                                        
                                    </div>
                                </div>
                            </div>
                            <a href="#" :class="{'mt-1 btn btn-secondary mr-1': true, disabled: saving, 'btn-sm': true}" @click.prevent="$router.push({ name: 'clients.index' })">
                                <i class="fa fa-undo"></i> Atrás
                            </a>
                            <button class="mt-1 btn btn-primary btn-sm" :disabled="saving">
                                <div class="spinner-border spinner-border-sm" role="status" v-if="saving">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <i class="fa fa-save" v-else></i> Guardar
                            </button>
                        </form>
                </div>
                <!-- /.card-body -->
                </div>
            </section>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
</template>
<script>
import PageTitle from '../components/PageTitle.vue'
export default {
    components: { PageTitle },
    data () {
        return {
            client: {
                identification: '',
                names: '',
                lastname: '',
                sex: '',
                date_of_birth: '',
                address: '',
                email: '',
                phonenumber: '',
            },
            myCroppa: {},
            errors: null,
            saving: false
        }
    },
    methods: {
        save () {
            this.myCroppa.generateBlob(blob => {
                this.saving = true

                let data = new FormData()

                data.append('photo', blob)
                data.append('identification', this.client.identification)
                data.append('names', this.client.names)
                data.append('lastname', this.client.lastname)
                data.append('sex', this.client.sex)
                data.append('date_of_birth', this.client.date_of_birth)
                data.append('address', this.client.address)
                data.append('email', this.client.email)
                data.append('phonenumber', this.client.phonenumber)

                this.$http.post('clients', data).then( response => {
                    this.clearData()
                    this.myCroppa.remove()
                    this.saving = false
                    this.$toastr.success('Cliente registrado')
                }).catch( error => {
                    this.saving = false
                    if (error.response.status == 422) {
                        this.$toastr.error('Verifica los errores de validación')
                        this.errors = error.response.data.errors
                    }
                })
            })

        },
        clearData () {
            this.client = {
                identification: '',
                names: '',
                lastname: '',
                sex: '',
                address: '',
                email: '',
                phonenumber: '',
            }
            this.errors = null
        }
    }
}
</script>