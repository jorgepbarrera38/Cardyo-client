<template>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div class="page-title-icon">
                    <i :class="styleIcon">
                    </i>
                </div>
                <div>{{ title }}
                    <div class="page-title-subheading">
                        {{ subtitle }}
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    computed: {
        styleIcon () {
            return `${ this.icon } icon-gradient bg-mean-fruit`
        }
    }
}
</script>