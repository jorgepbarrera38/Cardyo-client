<template>
    <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header/>
        <!--Theme and color-->
        <!--<ThemeAndColor/>-->
        <!--Main-->
        <div class="app-main">
            <Sidebar/>
            <div class="app-main__outer">
                <router-view/>
                <Footer/>  
            </div>
        </div>
    </div>
</template>
<script>
import Header from './_partials/Header'
import ThemeAndColor from './_partials/ThemeAndColor'
import Sidebar from './_partials/Sidebar'
import Footer from './_partials/Footer'
import { mapState } from 'vuex'

export default ({
    components: { Header, ThemeAndColor, Sidebar, Footer },
})
</script>