import Vue from 'vue'
import VueRouter from 'vue-router'
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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //name: 'Main',
    component: Main,
    children: [
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
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
