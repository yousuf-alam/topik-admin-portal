import Vue from 'vue'
import Router from 'vue-router'

//import Notifications from "../views/Notifications/Notifications";

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Orders = () => import('@/views/Orders/Orders')
const OrderShow = () => import('../views/Orders/Order_Show')
const OrderEdit = () => import('../views/Orders/OrderEdit')
const OrderCreate = () => import('../views/Orders/OrderCreate')
const Appointments = () => import('@/views/Orders/Appointments/Appointments')
const AppointmentShow = () => import('../views/Orders/Appointments/Appointment_Show')
const AppointmentEdit = () => import('../views/Orders/Appointments/AppointmentEdit')
const AppointmentCreate = () => import('../views/Orders/Appointments/AppointmentCreate')



import SelfAllNotifications from '../views/Notifications/self/SelfAllNotifications';
const Notifications = () => import('@/views/Notifications/Notifications')
const NotificationCreate = () => import('../views/Notifications/NotificationCreate')
const NotificationEdit = () => import('../views/Notifications/NotificationEdit')

const Promos = () => import('@/views/Promos/Promos')
const PromoCreate = () => import('../views/Promos/PromoCreate')
const PromoEdit = () => import('../views/Promos/PromoEdit')
const PartnerPromos = () => import('@/views/Promos/PartnerPromos')

const Locations = () => import('@/views/Locations/Locations')
const LocationCreate = () => import('@/views/Locations/LocationCreate')
const LocationEdit = () => import('../views/Locations/LocationEdit')
const FullLocation = () => import('../views/Locations/FullLocation')

const Services = () => import('@/views/Services/Services')
const ServiceCreate = () => import('../views/Services/ServiceCreate')
const ServiceEdit = () => import('../views/Services/ServiceEdit')

const Categories = () => import('@/views/Categories/Categories')
const CategoryCreate = () => import('../views/Categories/CategoryCreate')
const CategoryEdit = () => import('../views/Categories/CategoryEdit')
const SubategoryEdit = () => import('../views/Categories/SubcategoryEdit')

const LineItems = () => import('@/views/LineItems/LineItems')
const LineItemCreate = () => import('../views/LineItems/LineItemCreate')
const TestLineItemCreate = () => import('../views/LineItems/testcreate/TestLineitemCreate.vue');
const LineitemEdit = () => import('../views/LineItems/LineitemEdit')
const LineItemShow = () => import('../views/LineItems/LineItemShow')

const Partners = () => import('@/views/Partners/Partners')
const PartnerShow = () => import('../views/Partners/PartnerShow')

const Resources = () => import('@/views/Resources/Resources')
const ResourceShow = () => import('../views/Resources/ResourceShow')

const Wallets = () => import('@/views/Wallets/Wallets')
const WalletShow = () => import('../views/Wallets/WalletShow')

const Banners = () => import('@/views/Banners/Banners')
const BannerCreate = () => import('../views/Banners/BannerCreate')
const BannerEdit = () => import('../views/Banners/BannerEdit')

const Complains = () => import('@/views/Complains/Complains')
const ComplainCreate = () => import('@/views/Complains/ComplainCreate')
const ComplainShow = () => import('../views/Complains/ComplainShow')
const Reviews = () => import('../views/Reviews')

const BotOffers = () => import('../views/ChatBot/BotOffers')
const BotOfferEdit = () => import('../views/ChatBot/BotOfferEdit')
const BotOfferCreate = () => import('../views/ChatBot/BotOfferCreate')
const Documents = () => import('../views/Documents')
const Eloan = () => import('../views/Eloan')
const EloanShow = () => import('../views/EloanShow')
const Profile   = () => import('../views/Profile')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

// Authentication
const Login = () => import('@/views/login/Login')
const Register = () => import('@/views/login/Register')


import Role from '../views/AccessControl/role/Role';
import RoleShow from '../views/AccessControl/role/RoleShow';
import CreateNewRole from '../views/AccessControl/role/CreateNewRole';
import RoleEdit from '../views/AccessControl/role/RoleEdit';

import Users from '../views/AccessControl/users/Users';
import UserShow from '../views/AccessControl/users/UserShow';
import CreateNewUser from '../views/AccessControl/users/CreateNewUser';
import UserEdit from '../views/AccessControl/users/UserEdit';

import TestComponent from '../views/Test/TestComponent';
import TestOrders from '../views/Test/TestOrders';

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
        path: '/orders/edit/:id',
        name: 'OrderEdit',
        component: OrderEdit,
        meta: {
          permission_name: 'order read'
        },
      },
      {
        path: '/orders/create',
        name: 'OrderCreate',
        component: OrderCreate,
        props: true,
        meta: {
         permission_name: 'order create'
        },
      },
      {
        path: 'appointments',
        name: 'Appointments',
        component: Appointments,
        meta: {
          permission_name: permissionsList.order
        },
      },
      {
        path: '/appointments/details/:id',
        name: 'AppointmentShow',
        component: AppointmentShow,
        meta: {
          permission_name: 'order read'
        },
      },
      {
        path: '/appointments/edit/:id',
        name: 'AppointmentEdit',
        component: AppointmentEdit,
        meta: {
          permission_name: 'order read'
        },
      },
      {
        path: '/appointments/create',
        name: 'AppointmentCreate',
        component: AppointmentCreate,
        props: true,
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
        path: 'notifications/self',
        name: 'SelfAllNotifications',
        component: SelfAllNotifications,
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
        /* ------ ------- This Route Has Been Made for Test Purpose ------- --------*/
        path: '/test/orders',
        name: 'TestOrders',
        component: TestOrders,
      },
      {
        /* ------ ------- This Route Has Been Made for Test Purpose ------- --------*/
        path: '/test',
        name: 'TestComponent',
        component: TestComponent,
      },
      {
        path: 'promos',
        name: 'Promo Codes',
        component: Promos,
        meta: {
          //permission_name: permissionsList.promocode
        },
      },
      {
        path: '/promos/edit/:id',
        name: 'PromoEdit',
        component: PromoEdit,
        meta: {
         // permission_name: 'promocode update'
        },
      },
      {
        path: '/promos/create',
        name: 'PromoCreate',
        component: PromoCreate,
        meta: {
         // permission_name: 'promocode create'
        },
      },
      {
        path: '/promos/partner-promos',
        name: 'PartnerPromos',
        component: PartnerPromos,
        meta: {
          // permission_name: 'promocode create'
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
        path: 'locations/create',
        name: 'LocationCreate',
        component: LocationCreate,
        meta: {
          permission_name: permissionsList.location
        },
      },
      {
        path: '/locations/edit/:id',
        name: 'LocationEdit',
        component: LocationEdit,
        meta: {
         // permission_name: 'location update'
        },
      },
      {
        path: 'locations/full-coverage',
        name: 'FullLocation',
        component: FullLocation,
        meta: {
          permission_name: permissionsList.location
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
          permission_name: 'service update'
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
        name: 'LineitemEdit',
        component: LineitemEdit,
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
        path: '/test-line-items/create',
        name: 'TestLineItemCreate',
        component: TestLineItemCreate,
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
        path: 'banners',
        name: 'Banners',
        component: Banners,
        meta: {
          permission_name: permissionsList.topbanner
        },
      },
      {
        path: '/banners/edit/:id',
        name: 'Banner / Edit',
        component: BannerEdit,
        meta: {
          permission_name: permissionsList.topbanner
        },
      },
      {
        path: '/banners/create',
        name: 'BannerCreate',
        component: BannerCreate,
        meta: {
          //permission_name: 'banner create'
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
        path: 'reviews',
        name: 'Reviews',
        component: Reviews,
        meta: {
          permission_name: permissionsList.complain
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
      {
        path: 'eloan',
        name: 'Eloan',
        component: Eloan,
        meta: {
          permission_name: permissionsList.document
        },
      },
      {
        path: 'eloan/show/:id',
        name: 'EloanShow',
        component: EloanShow,
        meta: {
          permission_name: permissionsList.document
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
      },
      {
        path: 'bot-offers',
        redirect: '/bot-offers',
        name: 'Bot Offers',
        component: {
          render (c) { return c('router-view') }
        },
        children: [
          {
            path: '',
            component: BotOffers
          },
          {
            path: 'edit/:id',
            name: 'Edit Offer',
            component: BotOfferEdit
          },
          {
            path: 'create',
            name: 'Create',
            component: BotOfferCreate
          }
        ]
      },
    ]
  },
    { path: '*', component: Page404 },
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
