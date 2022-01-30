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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
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
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
