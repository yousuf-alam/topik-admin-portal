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
const SubategoryEdit = () => import('../views/Categories/SubcategoryEdit')

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
const CoreUiUsers = () => import('@/views/users/Users')
const CoreUiUser = () => import('@/views/users/User')

import Role from '../views/AccessControl/role/Role';
import RoleShow from '../views/AccessControl/role/RoleShow';
import CreateNewRole from '../views/AccessControl/role/CreateNewRole';
import RoleEdit from '../views/AccessControl/role/RoleEdit';

import Users from '../views/AccessControl/users/Users';
import UserShow from '../views/AccessControl/users/UserShow';
import CreateNewUser from '../views/AccessControl/users/CreateNewUser';
import UserEdit from '../views/AccessControl/users/UserEdit';

import store from '../store/store';
Vue.use(Router)


import globalvariable from '../globalvariables';
const permissionsList = globalvariable.permissionsList;


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
        name: 'Roles',
        component: {
          render (c) { return c('router-view') }
        },
        children: [
          {
            path: '',
            component: Role,
            meta: { 
              permission_name: 'manage roles' 
            },
          },
          {
            path: 'show/:id',
            name: 'RoleShow',
            component: RoleShow,
            meta: { 
              permission_name: 'manage roles' 
            },
          },
          {
            path: 'new',
            name: 'Create New Role',
            component: CreateNewRole,
            meta: { 
              permission_name: 'manage roles' 
            },
          },
          {
            path: 'edit/:id',
            name: 'RoleEdit ',
            component: RoleEdit,
            meta: { 
              permission_name: 'manage roles' 
            },
          }
        ]
      },
      {
        path: 'users',
        redirect: '/users',
        name: 'Users',
        component: {
          render (c) { return c('router-view') }
        },
        children: [
          {
            path: '',
            component: Users, 
            meta: { 
              permission_name: 'manage roles' 
            },
          },
          {
            path: 'show/:id',
            name: 'UserShow',
            component: UserShow,
            meta: { 
              permission_name: 'manage roles' 
            },
          },
          {
            path: 'new',
            name: 'Create New User',
            component: CreateNewUser,
            meta: { 
              permission_name: 'manage roles' 
            },
          },
          {
            path: 'edit/:id',
            name: 'Edit ',
            component: UserEdit,
            meta: { 
              permission_name: 'manage roles' 
            },
          }
        ]
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { 
          permission_name: permissionsList.order
        },
      },
      {
        path: '/orders/details/:id',
        name: 'OrderShow',
        component: OrderShow,
        meta: { 
          permission_name: 'order read' 
        },
      },
      {
        path: '/orders/create',
        name: 'OrderCreate',
        component: OrderCreate,
        meta: { 
          permission_name: 'order create' 
        },
      },
      {
        path: 'notifications',
        name: 'Notification',
        component: Notifications,
        meta: { 
          permission_name: permissionsList.notification
        },
      },
      {
        path: '/notifications/edit/:id',
        name: 'NotificationEdit',
        component: NotificationEdit,
        meta: { 
          permission_name: 'notification update' 
        },
      },
      {
        path: '/notifications/create',
        name: 'NotificationCreate',
        component: NotificationCreate,
        meta: { 
          permission_name: 'notification create' 
        },
      },
      {
        path: 'promos',
        name: 'Promo Codes',
        component: Promos,
        meta: { 
          permission_name: permissionsList.promocode
        },
      },
      {
        path: '/promos/edit/:id',
        name: 'PromoEdit',
        component: PromoEdit,
        meta: { 
          permission_name: 'promocode update' 
        },
      },
      {
        path: '/promos/create',
        name: 'PromoCreate',
        component: PromoCreate,
        meta: { 
          permission_name: 'promocode create' 
        },
      },
      {
        path: 'locations',
        name: 'Locations',
        component: Locations,
        meta: { 
          permission_name: permissionsList.location 
        },
      },
      {
        path: '/locations/edit/:id',
        name: 'LocationsEdit',
        component: LocationEdit,
        meta: { 
          permission_name: 'location update' 
        },
      },
      {
        path: 'services',
        name: 'Services',
        component: Services,
        meta: { 
          permission_name: permissionsList.service 
        },
      },
      {
        path: '/services/edit/:id',
        name: 'ServiceEdit',
        component: ServiceEdit,
        meta: { 
          permission_name: ['service update'] 
        },
      },
      {
        path: '/services/create',
        name: 'ServiceCreate',
        component: ServiceCreate,
        meta: { 
          permission_name: 'service create' 
        },
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories,
        meta: { 
          permission_name: permissionsList.category 
        },
      },
      {
        path: '/categories/edit/:id',
        name: 'CategoryEdit',
        component: CategoryEdit,
        meta: { 
          permission_name: 'category update' 
        },
      },
      {
        path: '/subcategories/edit/:id',
        name: 'SubcategoryEdit',
        component: SubategoryEdit
      },
      {
        path: '/categories/create',
        name: 'CategoryCreate',
        component: CategoryCreate,
        meta: { 
          permission_name: 'category create' 
        },
      },
      {
        path: 'line-items',
        name: 'LineItems',
        component: LineItems,
        meta: { 
          permission_name: permissionsList.lineitem 
        },
      },
      {
        path: '/line-items/edit/:id',
        name: 'LineItemEdit',
        component: LineItemEdit,
        meta: { 
          permission_name: 'lineitem update' 
        },
      },
      {
        path: '/line-items/show/:id',
        name: 'LineItemShow',
        component: LineItemShow,
        meta: { 
          permission_name: 'lineitem read' 
        },
      },
      {
        path: '/line-items/create',
        name: 'LineItemCreate',
        component: LineItemCreate,
        meta: { 
          permission_name: 'lineitem create' 
        },
      },
      {
        path: 'partners',
        name: 'Partners',
        component: Partners,
        meta: { 
          permission_name: permissionsList.partner 
        },
      },
      {
        path: '/partners/show/:id',
        name: 'PartnerShow',
        component: PartnerShow,
        meta: { 
          permission_name: 'partner read' 
        },
      },
      {
        path: 'resources',
        name: 'Resources',
        component: Resources,
        meta: { 
          permission_name: permissionsList.resource 
        },
      },
      {
        path: '/resources/show/:id',
        name: 'ResourceShow',
        component: ResourceShow,
        meta: { 
          permission_name: 'resource read' 
        },
      },
      {
        path: 'partner-wallets',
        name: 'wallets',
        component: Wallets,
        meta: { 
          permission_name: permissionsList.partnerwallet
        },
      },
      {
        path: '/wallets/show/:id',
        name: 'WalletShow',
        component: WalletShow,
        meta: { 
          permission_name: 'partnerwallet read' 
        },
      },
      {
        path: 'top-banners',
        name: 'Top Banners',
        component: TopBanners,
        meta: { 
          permission_name: permissionsList.topbanner 
        },
      },
      {
        path: '/top-banners/edit/:id',
        name: 'TopBannerEdit',
        component: TopBannerEdit,
        meta: { 
          permission_name: 'topbanner update' 
        },
      },
      {
        path: '/top-banners/create',
        name: 'TopBannerCreate',
        component: TopBannerCreate,
        meta: { 
          permission_name: 'topbanner create' 
        },
      },
      {
        path: 'bottom-banners',
        name: 'Bottom Banners',
        component: BottomBanners,
        meta: { 
          permission_name: permissionsList.bottombanner 
        },
      },
      {
        path: '/bottom-banners/edit/:id',
        name: 'BottomBannerEdit',
        component: BottomBannerEdit,
        meta: { 
          permission_name: 'bottombanner update' 
        },
      },
      {
        path: '/bottom-banners/create',
        name: 'BottomBannerCreate',
        component: BottomBannerCreate,
        meta: { 
          permission_name: 'bottombanner create' 
        },
      },
      {
        path: 'complains',
        name: 'Complains',
        component: Complains,
        meta: { 
          permission_name: permissionsList.complain 
        },
      },
      {
        path: '/complains/show/:id',
        name: 'ComplainShow',
        component: ComplainShow,
        meta: { 
          permission_name: 'complain read' 
        },
      },
      {
        path: '/complains/create',
        name: 'ComplainCreate',
        component: ComplainCreate,
        meta: { 
          permission_name: 'complain create' 
        },
      },
      {
        path: 'documents',
        name: 'Documents',
        component: Documents,
        meta: { 
          permission_name: permissionsList.document 
        },
      },
      /*
          {
              path: 'login',
              name: 'Login',
              component: Login
          },
      */
      {
        path: 'coreuiusers',
        meta: {label: 'CoreUiUsers'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: CoreUiUsers,
          },
          {
            path: ':id',
            meta: {label: 'User Details'},
            name: 'User',
            component: CoreUiUser,
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

function checkRoutePermission(to) {
  const routeObj = to.matched[to.matched.length - 1];
  if (Object.prototype.hasOwnProperty.call(routeObj.meta, 'permission_name')) {
    return store.getters['auth/hasPermission'](routeObj.meta.permission_name) ? true : false
  }
  return true;
}


router.beforeEach((to, from, next) => {
  // let user_roles = JSON.parse(window.localStorage.getItem("user_roles"));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      if (checkRoutePermission(to)) {
        next()      
      }
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
