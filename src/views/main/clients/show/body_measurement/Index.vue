<template>
    <component :is="component" :client="client" :bodyMeasurementId="bodyMeasurementId"
        @createBodyMeasurement="createBodyMeasurement"
        @closeFormCreateBodyMeasurement="closeFormCreateBodyMeasurement"
        @bodyMeasurementSaved="bodyMeasurementSaved"
        @bodyMeasurementUpdated="bodyMeasurementUpdated"
        @bodyMeasurementDeleted="bodyMeasurementDeleted"
        @editBodyMeasurement="editBodyMeasurement">
    </component>
</template>
<script>
import BodyMeasurementList from './BodyMeasurementList'
import BodyMeasurementCreate from './Create'
import BodyMeasurementEdit from './Edit'
export default {
    components: { BodyMeasurementList, BodyMeasurementCreate, BodyMeasurementEdit },
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            component: 'BodyMeasurementList',
            bodyMeasurementId: '',
        }
    },
    methods: {
        createBodyMeasurement () {
            this.component = 'BodyMeasurementCreate'
        },
        closeFormCreateBodyMeasurement () {
            this.component = 'BodyMeasurementList'
        },
        bodyMeasurementSaved () {
            this.$emit('bodyMeasurementSaved')
            //this.component = 'BodyMeasurementList'
        },
        bodyMeasurementUpdated () {
            this.$emit('bodyMeasurementSaved')
            this.component = 'BodyMeasurementList'
        },
        bodyMeasurementDeleted (index) {
            this.$emit('bodyMeasurementDeleted', index)
        },
        editBodyMeasurement (bodyMeasurementId) {
            this.bodyMeasurementId = bodyMeasurementId
            this.component = 'BodyMeasurementEdit'
        },
    }
}
</script>