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
const ServiceShow = () => import('../views/Services/ServiceShow')

//const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }

//import OrderShow from '../views/Orders/OrderShow';




const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Promos
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: DefaultContainer,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },

                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                },
                {
                    path: '/orders/details/:id',
                    name: 'Orders / Show',
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
                    name: 'Notifications / Edit',
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
                    path: '/services/show/:id',
                    name: 'Service / Show',
                    component: ServiceShow
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
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets
                },
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
        }
    ]
})
