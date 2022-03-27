<template>
    <div class="app-header header-shadow">
            <div class="app-header__logo">
                <div class="logo-src">
                    
                </div>
                <div class="header__pane ml-auto">
                    <div>
                        <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="app-header__mobile-menu">
                <div>
                    <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="app-header__menu">
                <span>
                    <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span class="btn-icon-wrapper">
                            <i class="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>    <div class="app-header__content">
                <!--<div class="app-header-left">
                    <ul class="header-menu nav">
                        <li class="nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <i class="nav-link-icon fa fa-database"> </i>
                                Statistics
                            </a>
                        </li>
                        <li class="btn-group nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <i class="nav-link-icon fa fa-edit"></i>
                                Projects
                            </a>
                        </li>
                        <li class="dropdown nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <i class="nav-link-icon fa fa-cog"></i>
                                Settings
                            </a>
                        </li>
                    </ul>        
                </div>-->
                <div class="app-header-right">
                    <div class="header-btn-lg pr-0">
                        <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="btn-group">
                                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
                                            <img width="42" class="rounded-circle" src="assets/images/avatars/1.jpg" alt="">
                                            <i class="fa fa-angle-down ml-2 opacity-8"></i>
                                        </a>
                                        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right" id="menuUser">
                                            <button @click="logout" type="button" tabindex="0" class="dropdown-item" :disabled="logouting || !authenticated">
                                                <span class="mr-1">Cerrar sesión</span>
                                                <div class="spinner-border spinner-border-sm" v-if="logouting"
                                                    role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left  ml-3 header-user-info">
                                    <div class="widget-heading">
                                        {{ namesUser }}
                                    </div>
                                    <!--<div class="widget-subheading">
                                        VP People Manager
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>        </div>
            </div>
        </div>    
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            errors: null,
            logouting: false
        }
    },
    methods: {
        ...mapMutations(['changeStateAuthUser', 'setNamesUser', 'setPermissionsUser']),
        logout () {
            this.logouting = true

            this.$http.post('auth/logout').then( response => {
                localStorage.removeItem('permissionsUser')
                this.setPermissionsUser([])
                localStorage.removeItem('namesUser')
                localStorage.removeItem('access_token')
                this.setNamesUser('Usuario')
                this.changeStateAuthUser(false)
                document.getElementById('menuUser').classList.remove('show')
                this.logouting = false
                this.$router.push({ name: 'login' })
            }).catch( error => {
                localStorage.removeItem('permissionsUser')
                this.setPermissionsUser([])
                localStorage.removeItem('namesUser')
                localStorage.removeItem('access_token')
                this.setNamesUser('Usuario')
                this.changeStateAuthUser(false)
                document.getElementById('menuUser').classList.remove('show')
                this.logouting = false
                this.$router.push({ name: 'login' })
            })
        },
    },
    computed: {
        ...mapState(['namesUser', 'authenticated'])
    }
}
</script>