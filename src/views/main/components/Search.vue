<template>
    <form class="form-inline" @submit.prevent="search">
        <div class="mb-2 mr-sm-2 mb-sm-0 position-relative form-group">
            <input :placeholder="placeholder" type="text" class="form-control" v-model="valueSearch" maxlength="100">
        </div>
        <button class="btn btn-primary">
            <i class="fa fa-search"></i> Buscar
        </button>
    </form>
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