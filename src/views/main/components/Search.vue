<template>
    <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <form @submit.prevent="search">
                <div class="input-group">
                    <input type="text" class="form-control" :placeholder="placeholder" v-model="valueSearch" maxlength="100">
                    <div class="input-group-append">
                        <button class="btn btn-primary">
                            <i class="fa fa-search"></i> Buscar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    props: ['placeholder'],
    data () {
        return {
            valueSearch: '',

        }
    },
    methods: {
        search () {
            this.$emit('search', this.valueSearch)
        }
    }
}
</script>