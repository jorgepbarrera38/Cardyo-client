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
                                    <a href="#" class="mm-active" @click.prevent="$router.push({ name: 'dashboard.index' })">
                                        <i class="metismenu-icon pe-7s-rocket"></i>
                                        Dashboard
                                    </a>
                                </li>
                                <li class="app-sidebar__heading">UI Components</li>
                                <li>
                                    <a href="#">
                                        <i class="metismenu-icon pe-7s-config"></i>
                                        General
                                        <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#" @click.prevent="$router.push({ name: 'membership_types.index' })">
                                                <i class="metismenu-icon"></i>
                                                Tipos de membresías
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" @click.prevent="$router.push({ name: 'turns.index' })">
                                                <i class="metismenu-icon">
                                                </i>Turnos
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" @click.prevent="$router.push({ name: 'clients.index' })">
                                        <i class="metismenu-icon pe-7s-users"></i>
                                        Clientes
                                    </a>
                                </li>
                                <li>
                                    <a href="#" @click.prevent="$router.push({ name: 'assistances.index' })">
                                        <i class="metismenu-icon pe-7s-note2"></i>
                                        Asistencia
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="metismenu-icon pe-7s-box1"></i>
                                        Inventario
                                        <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#" @click.prevent="$router.push({ name: 'inventory-categories.index' })">
                                                <i class="metismenu-icon"></i>
                                                Categorías
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" @click.prevent="$router.push({ name: 'inventory-products.index' })">
                                                <i class="metismenu-icon"></i>
                                                Productos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" @click.prevent="$router.push({ name: 'inventory-products.index' })">
                                                <i class="metismenu-icon"></i>
                                                Proveedores
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" @click.prevent="$router.push({ name: 'turns.index' })">
                                                <i class="metismenu-icon"></i>
                                                Compras
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" @click.prevent="$router.push({ name: 'turns.index' })">
                                                <i class="metismenu-icon"></i>
                                                Devolución de compras
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
</template>