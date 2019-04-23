import Vue from 'vue'
import Router from 'vue-router'

//import Notifications from "../views/Notifications/Notifications";

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Orders = () => import('@/views/Orders/Orders')
const OrderShow = () => import('../views/Orders/Order_Show')
const OrderCreate = () => import('../views/Orders/OrderCreate')


const Notifications = () => import('@/views/Notifications/Notifications')
const NotificationCreate = () => import('../views/Notifications/NotificationCreate')
const NotificationEdit = () => import('../views/Notifications/NotificationEdit')

const Promos = () => import('@/views/Promos/Promos')
const PromoCreate = () => import('../views/Promos/PromoCreate')
const PromoEdit = () => import('../views/Promos/PromoEdit')

const Locations = () => import('@/views/Locations/Locations')
const LocationEdit = () => import('../views/Locations/LocationEdit')

const Services = () => import('@/views/Services/Services')
const ServiceCreate = () => import('../views/Services/ServiceCreate')
const ServiceEdit = () => import('../views/Services/ServiceEdit')

const Categories = () => import('@/views/Categories/Categories')
const CategoryCreate = () => import('../views/Categories/CategoryCreate')
const CategoryEdit = () => import('../views/Categories/CategoryEdit')

const LineItems = () => import('@/views/LineItems/LineItems')
const LineItemCreate = () => import('../views/LineItems/LineItemCreate')
const LineItemEdit = () => import('../views/LineItems/LineItemEdit')
const LineItemShow = () => import('../views/LineItems/LineItemShow')

const Partners = () => import('@/views/Partners/Partners')
const PartnerShow = () => import('../views/Partners/PartnerShow')

const Resources = () => import('@/views/Resources/Resources')
const ResourceShow = () => import('../views/Resources/ResourceShow')

const Wallets = () => import('@/views/Wallets/Wallets')
const WalletShow = () => import('../views/Wallets/WalletShow')

const TopBanners = () => import('@/views/Top Banners/TopBanners')
const TopBannerCreate = () => import('../views/Top Banners/TopBannerCreate')
const TopBannerEdit = () => import('../views/Top Banners/TopBannerEdit')

const BottomBanners = () => import('@/views/Bottom Banners/BottomBanners')
const BottomBannerCreate = () => import('../views/Bottom Banners/BottomBannerCreate')
const BottomBannerEdit = () => import('../views/Bottom Banners/BottomBannerEdit')

const Complains = () => import('@/views/Complains/Complains')
const ComplainCreate = () => import('@/views/Complains/ComplainCreate')
const ComplainShow = () => import('../views/Complains/ComplainShow')

const Documents = () => import('../views/Documents')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

// Authentication
const Login = () => import('@/views/login/Login')
const Register = () => import('@/views/login/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

import Role from '../views/AccessControl/role/Role';
import RoleShow from '../views/AccessControl/role/RoleShow';
import CreateNewRole from '../views/AccessControl/role/CreateNewRole';
import RoleEdit from '../views/AccessControl/role/RoleEdit';
 
import Permission from '../views/AccessControl/permission/Permission';


import store from '../store/store';
Vue.use(Router)

const router =  new Router({
    mode: 'history', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            mode: 'hash',
            redirect: '/dashboard',
            name: 'Home',
            component: DefaultContainer,
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'roles',
                    redirect: '/roles',
                    name: 'Role',
                    component: {
                      render (c) { return c('router-view') }
                    },
                    children: [
                      {
                        path: '',
                        component: Role
                      },
                      {
                        path: 'show/:id',
                        name: 'RoleShow',
                        component: RoleShow
                      },
                      {
                        path: 'new',
                        name: 'Create New Role',
                        component: CreateNewRole
                      },
                      {
                        path: 'edit/:id',
                        name: 'Edit ',
                        component: RoleEdit
                      }
                    ]
                },
                {
                    path: 'permissions',
                    name: 'Permission',
                    component: Permission
                },                
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                },
                {
                    path: '/orders/details/:id',
                    name: 'Order / Show',
                    component: OrderShow
                },
                {
                    path: '/orders/create',
                    name: 'OrderCreate',
                    component: OrderCreate
                },
                {
                    path: 'notifications',
                    name: 'Notification',
                    component: Notifications
                },
                {
                    path: '/notifications/edit/:id',
                    name: 'Notification / Edit',
                    component: NotificationEdit
                },
                {
                    path: '/notifications/create',
                    name: 'NotificationCreate',
                    component: NotificationCreate
                },
                {
                    path: 'promos',
                    name: 'Promo Codes',
                    component: Promos
                },
                {
                    path: '/promos/edit/:id',
                    name: 'Promo / Edit',
                    component: PromoEdit
                },
                {
                    path: '/promos/create',
                    name: 'PromoCreate',
                    component: PromoCreate
                },
                {
                    path: 'locations',
                    name: 'Locations',
                    component: Locations
                },
                {
                    path: '/locations/edit/:id',
                    name: 'Locations / Edit',
                    component: LocationEdit
                },
                {
                    path: 'services',
                    name: 'Services',
                    component: Services
                },
                {
                    path: '/services/edit/:id',
                    name: 'Service / Edit',
                    component: ServiceEdit
                },
                {
                    path: '/services/create',
                    name: 'ServiceCreate',
                    component: ServiceCreate
                },
                {
                    path: 'categories',
                    name: 'Categories',
                    component: Categories
                },
                {
                    path: '/categories/edit/:id',
                    name: 'Category / Edit',
                    component: CategoryEdit
                },
                {
                    path: '/categories/create',
                    name: 'CategoryCreate',
                    component: CategoryCreate
                },
                {
                    path: 'line-items',
                    name: 'LineItems',
                    component: LineItems
                },
                {
                    path: '/line-items/edit/:id',
                    name: 'LineItem / Edit',
                    component: LineItemEdit
                },
                {
                    path: '/line-items/show/:id',
                    name: 'LineItem / Show',
                    component: LineItemShow
                },
                {
                    path: '/line-items/create',
                    name: 'LineItemCreate',
                    component: LineItemCreate
                },
                {
                    path: 'partners',
                    name: 'Partners',
                    component: Partners
                },
                {
                    path: '/partners/show/:id',
                    name: 'Partner / Show',
                    component: PartnerShow
                },
                {
                    path: 'resources',
                    name: 'Resources',
                    component: Resources
                },
                {
                    path: '/resources/show/:id',
                    name: 'Resource / Show',
                    component: ResourceShow
                },
                {
                    path: 'partner-wallets',
                    name: 'wallets',
                    component: Wallets
                },
                {
                    path: '/wallets/show/:id',
                    name: 'Wallet / Show',
                    component: WalletShow
                },
                {
                    path: 'top-banners',
                    name: 'Top Banners',
                    component: TopBanners
                },
                {
                    path: '/top-banners/edit/:id',
                    name: 'TopBanner / Edit',
                    component: TopBannerEdit
                },
                {
                    path: '/top-banners/create',
                    name: 'TopBannerCreate',
                    component: TopBannerCreate
                },
                {
                    path: 'bottom-banners',
                    name: 'Bottom Banners',
                    component: BottomBanners
                },
                {
                    path: '/bottom-banners/edit/:id',
                    name: 'BottomBanner / Edit',
                    component: BottomBannerEdit
                },
                {
                    path: '/bottom-banners/create',
                    name: 'BottomBannerCreate',
                    component: BottomBannerCreate
                },
                {
                    path: 'complains',
                    name: 'Complains',
                    component: Complains
                },
                {
                    path: '/complains/show/:id',
                    name: 'Complain / Show',
                    component: ComplainShow
                },
                {
                    path: '/complains/create',
                    name: 'ComplainCreate',
                    component: ComplainCreate
                },
                {
                    path: 'documents',
                    name: 'Documents',
                    component: Documents
                },
            /*
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
            */
                {
                    path: 'users',
                    meta: {label: 'Users'},
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '',
                            component: Users,
                        },
                        {
                            path: ':id',
                            meta: {label: 'User Details'},
                            name: 'User',
                            component: User,
                        },
                    ]
                }
                /*{
                  path: 'notifications',
                  redirect: '/notifications/alerts',
                  name: 'Notifications',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'alerts',
                      name: 'Alerts',
                      component: Alerts
                    },
                    {
                      path: 'badges',
                      name: 'Badges',
                      component: Badges
                    },
                    {
                      path: 'modals',
                      name: 'Modals',
                      component: Modals
                    }
                  ]
                }*/
            ]
        },
        {
            path: '/',
            redirect: '/404',
            name: 'Authentication',
            component: {
              render (c) { return c('router-view') }
            },
            children: [
              {
                path: '404',
                name: 'Page404',
                component: Page404
              },
              {
                path: '500',
                name: 'Page500',
                component: Page500
              },
              {
                path: 'login',
                name: 'Login',
                component: Login,

              },
              {
                path: 'register',
                name: 'Register',
                component: Register
              }
            ]
        },
    ]
})


router.beforeEach((to, from, next) => {
  // let user_roles = JSON.parse(window.localStorage.getItem("user_roles"));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/login')

   } else if (store.getters['auth/isLoggedIn']) {
     if (to.matched.some(record => (record.name === 'Login' || record.name === 'Register') )) {
        next('/dashboard')
     } else {
       next()
     }

  } else {
    next()
  }

})


export default router
