<template>
      <div class="app-sidebar sidebar-shadow">
                    <div class="app-header__logo">
                        <div class="logo-src"></div>
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
                    </div>    <div class="scrollbar-sidebar">
                        <div class="app-sidebar__inner">
                            <ul class="vertical-nav-menu">
                                <li class="app-sidebar__heading">Dashboard</li>
                                <li>
                                    <a href="#" class="mm-active" @click.prevent="goToRoute('dashboard.index')">
                                        <i class="metismenu-icon pe-7s-gym"></i>
                                        Dashboard
                                    </a>
                                </li>
                                <li class="app-sidebar__heading">Módulos</li>
                                <li>
                                    <a href="#">
                                        <i class="metismenu-icon pe-7s-config"></i>
                                        General
                                        <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                            @click.prevent="hasPermission('membership_types.index') ? goToRoute('membership_types.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Tipos de membresías
                                            </a>
                                            <a href="#" v-else
                                            @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Tipos de membresías
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('turns.index') ? goToRoute('turns.index') : ''">
                                                <i class="metismenu-icon">
                                                </i>Turnos
                                            </a>
                                            <a href="#" v-else
                                            @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Turnos
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" v-if="authenticated"
                                        @click.prevent="hasPermission('clients.index') ? goToRoute('clients.index') : ''">
                                        <i class="metismenu-icon pe-7s-users"></i>
                                        Clientes
                                    </a>
                                    <a href="#" v-else
                                        @click.prevent="">
                                        <i class="metismenu-icon pe-7s-users"></i>
                                        Clientes
                                    </a>
                                </li>
                                <li>
                                    <a href="#" v-if="authenticated"
                                        @click.prevent="hasPermission('assistances.mark_attendance') ? goToRoute('assistances.index') : ''">
                                        <i class="metismenu-icon pe-7s-note2"></i>
                                        Asistencia
                                    </a>
                                    <a href="#" v-else
                                        @click.prevent="">
                                            <i class="metismenu-icon pe-7s-note2"></i>
                                        Asistencia
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="metismenu-icon pe-7s-box1"></i>
                                        Inventarios
                                        <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('inventory_categories.index') ? goToRoute('inventory-categories.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Categorías
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Categorías
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('inventory_products.index') ? goToRoute('inventory-products.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Productos
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Productos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('inventory_providers.index') ? goToRoute('inventory-providers.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Proveedores
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Proveedores
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('inventory_purchases.index') ? goToRoute('inventory-purchases.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Compras
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Compras
                                            </a>
                                        </li>
                                        <!--<li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('inventory_purchase_returns.index') ? $router.push({ name: 'inventory-purchase-returns.index' }) : ''">
                                                <i class="metismenu-icon"></i>
                                                Devolución de compras
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Devolución de compras
                                            </a>
                                        </li>-->
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('inventory_tweaks.index') ? goToRoute('inventory-tweaks.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Ajustes de inventario
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Ajustes de inventario
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" v-if="authenticated"
                                        @click.prevent="hasPermission('sales.index') ? goToRoute('sales.index') : ''">
                                        <i class="metismenu-icon pe-7s-cart"></i>
                                        Ventas
                                    </a>
                                    <a href="#" v-else
                                        @click.prevent="">
                                        <i class="metismenu-icon pe-7s-cart"></i>
                                        Ventas
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="metismenu-icon pe-7s-news-paper"></i>
                                        Reportes
                                        <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                            @click.prevent="hasPermission('reports.show') ? goToRoute('reports.asistances') : ''">
                                                <i class="metismenu-icon"></i>
                                                Asistencias
                                            </a>
                                            <a href="#" v-else
                                            @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Asistencias
                                            </a>
                                        </li>
                                         <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('reports.show') ? goToRoute('reports.stock-products') : ''">
                                                <i class="metismenu-icon"></i>
                                                Stock de productos
                                            </a>
                                            <a href="#" v-else
                                            @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Stock de productos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('reports.show') ? goToRoute('reports.purchases') : ''">
                                                <i class="metismenu-icon"></i>
                                                Compras
                                            </a>
                                            <a href="#" v-else
                                            @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Compras
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('reports.show') ? goToRoute('reports.inventory-tweaks') : ''">
                                                <i class="metismenu-icon"></i>
                                                Ajustes de inventario
                                            </a>
                                            <a href="#" v-else
                                            @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Ajustes de inventario
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('reports.show') ? goToRoute('reports.sales') : ''">
                                                <i class="metismenu-icon"></i>
                                                Ventas
                                            </a>
                                            <a href="#" v-else
                                            @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Ventas
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="metismenu-icon pe-7s-edit"></i>
                                        Sistema
                                        <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('users.index') ? goToRoute('users.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Usuarios
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Usuarios
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-if="authenticated"
                                                @click.prevent="hasPermission('company.index') ? goToRoute('company.index') : ''">
                                                <i class="metismenu-icon"></i>
                                                Empresa
                                            </a>
                                            <a href="#" v-else
                                                @click.prevent="">
                                                <i class="metismenu-icon"></i>
                                                Empresa
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
</template>
<script>
import { mapState } from 'vuex'


export default ({
    methods: {
        goToRoute (route) {
            document.getElementById('app-container').classList.remove('sidebar-mobile-open')
            document.getElementById('hamburger--elastic').classList.remove('is-active')
            this.$router.push({ name: route })
        }
    },
    computed: {
        ...mapState(['authenticated'])
    }
})
</script>
