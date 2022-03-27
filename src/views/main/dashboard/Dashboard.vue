<template>
    <div class="app-main__inner">
                        <div class="app-page-title">
                            <div class="page-title-wrapper">
                                <div class="page-title-heading">
                                    <div class="page-title-icon">
                                        <i class="pe-7s-home icon-gradient bg-mean-fruit">
                                        </i>
                                    </div>
                                    <div>Dashboard
                                        <!--<div class="page-title-subheading">This is an example dashboard created using build-in elements and components.
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!---->
                        <div class="row">
                            <div class="col-md-6 col-xl-4">
                                <div class="card mb-3 widget-content">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Asistencias esperadas hoy</div>
                                                <div class="widget-subheading">Asistencias que se esperan durante el día</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-success">{{ attendanceExpectedToday }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-4">
                                <div class="card mb-3 widget-content">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Total asistencias hoy</div>
                                                <div class="widget-subheading">Asistencias registradas hasta el momento</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-success">{{ totalAssistsToday }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</template>
<script>
export default {
    created () {
        this.getData()
    },
    data () {
        return {
            attendanceExpectedToday: '',
            totalAssistsToday: '',
        }
    },
    methods: {
        getData () {
            this.$http.get('dashboard/get-data').then( response => {
                console.log(response.data)
                this.attendanceExpectedToday = response.data.attendanceExpectedToday
                this.totalAssistsToday = response.data.totalAssistsToday
            })
        }
    }

}
</script>