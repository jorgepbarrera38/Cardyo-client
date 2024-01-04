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

import ReportAsistance from '../views/main/reports/Assistance'
import ReportPurchase from '../views/main/reports/Purchase'
import ReportInventoryTweak from '../views/main/reports/InventoryTweak'
import ReportSale from '../views/main/reports/Sale'
import ReportStockProduct from '../views/main/reports/StockProduct'
import ReportMembershipPayed from '../views/main/reports/MembershipPayed'

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
        component: Login,
      },
      {
        path: '/',
        name: 'dashboard.index',
        component: Dashboard
      },
      {
        path: 'clientes',
        name: 'clients.index',
        component: ClientIndex,
        meta: {
          title: 'Clientes'
        }
      },
      {
        path: 'clientes/:id',
        name: 'clients.show',
        component: ClientShow,
        meta: {
          title: 'Clientes'
        }
      },
      {
        path: 'clientes/nuevo',
        name: 'clients.create',
        component: ClientCreate,
        meta: {
          title: 'Clientes'
        }
      },
      {
        path: 'clientes/:id/editar',
        name: 'clients.edit',
        component: ClientEdit,
        meta: {
          title: 'Clientes'
        }
      },
      {
        path: 'tipos-de-membresias',
        name: 'membership_types.index',
        component: MembershipTypeIndex,
        meta: {
          title: 'Tipos de membresías'
        }
      },
      {
        path: 'tipos-de-membresias/nuevo',
        name: 'membership_types.create',
        component: MembershipTypeCreate,
        meta: {
          title: 'Tipos de membresías'
        }
      },
      {
        path: 'tipos-de-membresias/:id/editar',
        name: 'membership_types.edit',
        component: MembershipTypeEdit,
        meta: {
          title: 'Tipos de membresías'
        }
      },
      {
        path: 'turnos',
        name: 'turns.index',
        component: TurnIndex,
        meta: {
          title: 'Turnos'
        }
      },
      {
        path: 'turnos/nuevo',
        name: 'turns.create',
        component: TurnCreate,
        meta: {
          title: 'Turnos'
        }
      },
      {
        path: 'turnos/:id/editar',
        name: 'turns.edit',
        component: TurnEdit,
        meta: {
          title: 'Turnos'
        }
      },
      {
        path: 'asistencia',
        name: 'assistances.index',
        component: AssistanceIndex,
        meta: {
          title: 'Asistencia'
        }
      },
      {
        path: 'inventario/categorias',
        name: 'inventory-categories.index',
        component: InventoryCategoryIndex,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/categorias/nuevo',
        name: 'inventory-categories.create',
        component: InventoryCategoryCreate,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/categorias/:id/editar',
        name: 'inventory-categories.edit',
        component: InventoryCategoryEdit,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/productos',
        name: 'inventory-products.index',
        component: InventoryProductIndex,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/productos/nuevo',
        name: 'inventory-products.create',
        component: InventoryProductCreate,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/productos/:id/editar',
        name: 'inventory-products.edit',
        component: InventoryProductEdit,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/proveedores',
        name: 'inventory-providers.index',
        component: InventoryProviderIndex,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/proveedores/nuevo',
        name: 'inventory-providers.create',
        component: InventoryProviderCreate,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/proveedores/:id/editar',
        name: 'inventory-providers.edit',
        component: InventoryProviderEdit,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/compras',
        name: 'inventory-purchases.index',
        component: InventoryPurchaseIndex,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/compras/nuevo',
        name: 'inventory-purchases.create',
        component: InventoryPurchaseCreate,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/compras/:id',
        name: 'inventory-purchases.show',
        component: InventoryPurchaseShow,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/devolucion-de-compras',
        name: 'inventory-purchase-returns.index',
        component: InventoryPurchaseReturnIndex,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/devolucion-de-compras/nuevo',
        name: 'inventory-purchase-returns.create',
        component: InventoryPurchaseReturnCreate,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/devolucion-de-compras/:id',
        name: 'inventory-purchase-returns.show',
        component: InventoryPurchaseReturnShow,
        meta: {
          title: 'Inventarios'
        }
      },

      {
        path: 'inventario/ajustes-de-inventario',
        name: 'inventory-tweaks.index',
        component: InventoryTweakIndex,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/ajustes-de-inventario/nuevo',
        name: 'inventory-tweaks.create',
        component: InventoryTweakCreate,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'inventario/ajustes-de-inventario/:id',
        name: 'inventory-tweaks.show',
        component: InventoryTweakShow,
        meta: {
          title: 'Inventarios'
        }
      },
      {
        path: 'ventas',
        name: 'sales.index',
        component: SaleIndex,
        meta: {
          title: 'Ventas'
        }
      },
      {
        path: 'ventas/nuevo',
        name: 'sales.create',
        component: SaleCreate,
        meta: {
          title: 'Ventas'
        }
      },
      {
        path: 'ventas/:id',
        name: 'sales.show',
        component: SaleShow,
        meta: {
          title: 'Ventas'
        }
      },
      {
        path: 'usuarios',
        name: 'users.index',
        component: UserIndex,
        meta: {
          title: 'Sistema'
        }
      },
      {
        path: 'usuarios/nuevo',
        name: 'users.create',
        component: UserCreate,
        meta: {
          title: 'Sistema'
        }
      },
      {
        path: 'usuarios/:id/edit',
        name: 'users.edit',
        component: UserEdit,
        meta: {
          title: 'Sistema'
        }
      },
      {
        path: 'usuarios/:id/actualizar-permisos',
        name: 'users.update_permissions',
        component: UserUpdatePermission,
        meta: {
          title: 'Sistema'
        }
      },
      {
        path: 'empresa',
        name: 'company.index',
        component: CompanyIndex,
        meta: {
          title: 'Sistema'
        }
      },

      {
        path: 'reportes/asistencias',
        name: 'reports.asistances',
        component: ReportAsistance,
        meta: {
          title: 'Reportes'
        }
      },
      {
        path: 'reportes/compras',
        name: 'reports.purchases',
        component: ReportPurchase,
        meta: {
          title: 'Reportes'
        }
      },
      {
        path: 'reportes/ajustes-de-inventario',
        name: 'reports.inventory-tweaks',
        component: ReportInventoryTweak,
        meta: {
          title: 'Reportes'
        }
      },
      {
        path: 'reportes/ventas',
        name: 'reports.sales',
        component: ReportSale,
        meta: {
          title: 'Reportes'
        }
      },
      {
        path: 'reportes/stock-de-productos',
        name: 'reports.stock-products',
        component: ReportStockProduct,
        meta: {
          title: 'Reportes'
        }
      },
      {
        path: 'reportes/membresias-pagadas',
        name: 'reports.memberships-payed',
        component: ReportMembershipPayed,
        meta: {
          title: 'Reportes'
        }
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
