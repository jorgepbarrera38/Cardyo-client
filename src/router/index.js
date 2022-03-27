import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login'
import Main from '../views/main/Main'
import ClientIndex from '../views/main/clients/Index'
import ClientShow from '../views/main/clients/show/Show'
import ClientCreate from '../views/main/clients/Create'
import ClientEdit from '../views/main/clients/Edit'
import MembershipTypeIndex from '../views/main/membership_types/Index'
import MembershipTypeCreate from '../views/main/membership_types/Create'
import MembershipTypeEdit from '../views/main/membership_types/Edit'
import TurnIndex from '../views/main/turns/Index'
import TurnCreate from '../views/main/turns/Create'
import TurnEdit from '../views/main/turns/Edit'
import AssistanceIndex from '../views/main/assistances/Index'
import Dashboard from '../views/main/dashboard/Dashboard'
import InventoryProductIndex from '../views/main/inventories/products/Index'
import InventoryProductCreate from '../views/main/inventories/products/Create'
import InventoryProductEdit from '../views/main/inventories/products/Edit'
import InventoryCategoryIndex from '../views/main/inventories/categories/Index'
import InventoryCategoryCreate from '../views/main/inventories/categories/Create'
import InventoryCategoryEdit from '../views/main/inventories/categories/Edit'
import InventoryProviderIndex from '../views/main/inventories/providers/Index'
import InventoryProviderCreate from '../views/main/inventories/providers/Create'
import InventoryProviderEdit from '../views/main/inventories/providers/Edit'
import InventoryPurchaseIndex from '../views/main/inventories/purchases/Index'
import InventoryPurchaseCreate from '../views/main/inventories/purchases/Create'
import InventoryPurchaseShow from '../views/main/inventories/purchases/Show'
import InventoryPurchaseReturnIndex from '../views/main/inventories/purchase_returns/Index'
import InventoryPurchaseReturnCreate from '../views/main/inventories/purchase_returns/Create'
import InventoryPurchaseReturnShow from '../views/main/inventories/purchase_returns/Show'

import SaleIndex from '../views/main/sales/Index'
import SaleShow from '../views/main/sales/Show'
import SaleCreate from '../views/main/sales/Create'

import InventoryTweakIndex from '../views/main/inventories/inventory_tweaks/Index'
import InventoryTweakShow from '../views/main/inventories/inventory_tweaks/Show'
import InventoryTweakCreate from '../views/main/inventories/inventory_tweaks/Create'

import UserIndex from '../views/main/users/Index'
import UserCreate from '../views/main/users/Create'
import UserEdit from '../views/main/users/Edit'
import UserUpdatePermission from '../views/main/users/UpdatePermission'

import CompanyIndex from '../views/main/company/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //name: 'Main',
    component: Main,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: '/',
        name: 'dashboard.index',
        component: Dashboard
      },
      {
        path: 'clientes',
        name: 'clients.index',
        component: ClientIndex
      },
      {
        path: 'clientes/:id',
        name: 'clients.show',
        component: ClientShow
      },
      {
        path: 'clientes/nuevo',
        name: 'clients.create',
        component: ClientCreate
      },
      {
        path: 'clientes/:id/editar',
        name: 'clients.edit',
        component: ClientEdit
      },
      {
        path: 'tipos-de-membresias',
        name: 'membership_types.index',
        component: MembershipTypeIndex
      },
      {
        path: 'tipos-de-membresias/nuevo',
        name: 'membership_types.create',
        component: MembershipTypeCreate
      },
      {
        path: 'tipos-de-membresias/:id/editar',
        name: 'membership_types.edit',
        component: MembershipTypeEdit
      },
      {
        path: 'turnos',
        name: 'turns.index',
        component: TurnIndex
      },
      {
        path: 'turnos/nuevo',
        name: 'turns.create',
        component: TurnCreate
      },
      {
        path: 'turnos/:id/editar',
        name: 'turns.edit',
        component: TurnEdit
      },
      {
        path: 'asistencia',
        name: 'assistances.index',
        component: AssistanceIndex
      },
      {
        path: 'inventario/categorias',
        name: 'inventory-categories.index',
        component: InventoryCategoryIndex
      },
      {
        path: 'inventario/categorias/nuevo',
        name: 'inventory-categories.create',
        component: InventoryCategoryCreate
      },
      {
        path: 'inventario/categorias/:id/editar',
        name: 'inventory-categories.edit',
        component: InventoryCategoryEdit
      },
      {
        path: 'inventario/productos',
        name: 'inventory-products.index',
        component: InventoryProductIndex
      },
      {
        path: 'inventario/productos/nuevo',
        name: 'inventory-products.create',
        component: InventoryProductCreate
      },
      {
        path: 'inventario/productos/:id/editar',
        name: 'inventory-products.edit',
        component: InventoryProductEdit
      },
      {
        path: 'inventario/proveedores',
        name: 'inventory-providers.index',
        component: InventoryProviderIndex
      },
      {
        path: 'inventario/proveedores/nuevo',
        name: 'inventory-providers.create',
        component: InventoryProviderCreate
      },
      {
        path: 'inventario/proveedores/:id/editar',
        name: 'inventory-providers.edit',
        component: InventoryProviderEdit
      },
      {
        path: 'inventario/compras',
        name: 'inventory-purchases.index',
        component: InventoryPurchaseIndex
      },
      {
        path: 'inventario/compras/nuevo',
        name: 'inventory-purchases.create',
        component: InventoryPurchaseCreate
      },
      {
        path: 'inventario/compras/:id',
        name: 'inventory-purchases.show',
        component: InventoryPurchaseShow
      },
      {
        path: 'inventario/devolucion-de-compras',
        name: 'inventory-purchase-returns.index',
        component: InventoryPurchaseReturnIndex
      },
      {
        path: 'inventario/devolucion-de-compras/nuevo',
        name: 'inventory-purchase-returns.create',
        component: InventoryPurchaseReturnCreate
      },
      {
        path: 'inventario/devolucion-de-compras/:id',
        name: 'inventory-purchase-returns.show',
        component: InventoryPurchaseReturnShow
      },

      {
        path: 'inventario/ajustes-de-inventario',
        name: 'inventory-tweaks.index',
        component: InventoryTweakIndex
      },
      {
        path: 'inventario/ajustes-de-inventario/nuevo',
        name: 'inventory-tweaks.create',
        component: InventoryTweakCreate
      },
      {
        path: 'inventario/ajustes-de-inventario/:id',
        name: 'inventory-tweaks.show',
        component: InventoryTweakShow
      },
      {
        path: 'ventas',
        name: 'sales.index',
        component: SaleIndex
      },
      {
        path: 'ventas/nuevo',
        name: 'sales.create',
        component: SaleCreate
      },
      {
        path: 'ventas/:id',
        name: 'sales.show',
        component: SaleShow
      },
      {
        path: 'usuarios',
        name: 'users.index',
        component: UserIndex
      },
      {
        path: 'usuarios/nuevo',
        name: 'users.create',
        component: UserCreate
      },
      {
        path: 'usuarios/:id/edit',
        name: 'users.edit',
        component: UserEdit
      },
      {
        path: 'usuarios/:id/actualizar-permisos',
        name: 'users.update_permissions',
        component: UserUpdatePermission
      },
      {
        path: 'empresa',
        name: 'company.index',
        component: CompanyIndex
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
