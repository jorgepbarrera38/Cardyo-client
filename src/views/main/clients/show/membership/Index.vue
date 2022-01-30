<template>
    <component :is="component" :client="client" :membershipId="membershipId"
        @createMembership="createMembership"
        @closeFormCreateMembership="closeFormCreateMembership"
        @membershipSaved="membershipSaved"
        @membershipDeleted="membershipDeleted"
        @editMembership="editMembership">
    </component>
</template>
<script>
import MembershipList from './MembershipList'
import MembershipCreate from './Create'
import MembershipEdit from './Edit'
export default {
    components: { MembershipList, MembershipCreate, MembershipEdit },
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            component: 'MembershipList',
            membershipId: '',
        }
    },
    methods: {
        createMembership () {
            this.component = 'MembershipCreate'
        },
        closeFormCreateMembership () {
            this.component = 'MembershipList'
        },
        membershipSaved () {
            this.$emit('membershipSaved')
            this.component = 'MembershipList'
        },
        membershipDeleted (index) {
            this.$emit('membershipDeleted', index)
        },
        editMembership (membershipId) {
            this.membershipId = membershipId
            this.component = 'MembershipEdit'
        },
    }
}
</script>