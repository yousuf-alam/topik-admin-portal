import _ from 'lodash';
import gbvar from './globalvariables';
import store from './store/store';
const permissionsList = gbvar.permissionsList;
const navitems = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Access Control',
      permission_name: permissionsList.manage_roles,
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Roles',
      url: '/roles',
      icon: 'fa fa-podcast',
      permission_name: permissionsList.manage_roles
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'fa fa-superpowers',
      permission_name: permissionsList.manage_roles
    },
    {
      title: true,
      name: 'Order',
      permission_name: [...permissionsList.order, ...permissionsList.complain],
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Orders',
      url: '/orders',
      icon: 'fa fa-cart-plus',
      permission_name: permissionsList.order
    },
    {
      name: 'Appointments',
      url: '/appointments',
      icon: 'fa fa-calendar',
      permission_name: permissionsList.order
    },
    {
      name: 'Complains',
      url: '/complains',
      icon: 'fa fa-thumbs-down',
      permission_name: permissionsList.complain
    },
    {
      name: 'Reviews',
      url: '/reviews',
      icon: 'fa fa-thumbs-up',
      permission_name: permissionsList.complain
    },
    {
      title: true,
      name: 'Service',
      class: '',
      permission_name: [
        ...permissionsList.service, ...permissionsList.category,
        ...permissionsList.lineitem, ...permissionsList.location
      ],
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Service',
      url: '/services',
      icon: 'fa fa-stumbleupon ',
      permission_name: permissionsList.service
    },
    {
      name: 'Category',
      url: '/categories',
      icon: 'fa fa-barcode',
      permission_name: permissionsList.category
    },
    {
      name: 'Line Item',
      url: '/line-items',
      icon: 'fa fa-bars',
      permission_name: permissionsList.lineitem
    },
    {
      name: 'Location',
      url: '/locations',
      icon: 'icon-location-pin',
      permission_name: permissionsList.location
    },
    {
      title: true,
      name: 'Finance',
      class: '',
      permission_name: [],
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Partner Wallet',
      url: '/partner-wallets',
      icon: 'cui-credit-card',
      permission_name: permissionsList.partnerwallet
    },
    {
      title: true,
      name: 'Partner',
      class: '',
      permission_name: [...permissionsList.partner, ...permissionsList.resource],
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Partners',
      url: '/partners',
      icon: 'fa fa-user',
      permission_name: permissionsList.partner
    },
    {
      name: 'Resources',
      url: '/resources',
      icon: 'fa fa-users',
      permission_name: permissionsList.resource
    },
/*    {
      name: 'Partner Reorder',
      url: '/partner-reorder',
      icon: 'fa fa-reorder'
    },*/
    {
      title: true,
      name: 'Marketing',
      permission_name: [
        ...permissionsList.notification, ...permissionsList.promocode,
        ...permissionsList.topbanner, ...permissionsList.bottombanner
      ],
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      permission_name: permissionsList.notification
    },
    {
      name: 'Promo Codes',
      url: '/promos',
      icon: 'fa fa-gift',
      permission_name:  permissionsList.promocode,
    },
    {
      name: 'Banners',
      url: '/banners',
      icon: 'fa fa-file-image-o',
      permission_name: permissionsList.topbanner
    },
    {
      name: 'GP Star',
      url: '/gp-star-check',
      icon: 'fa fa-gift',
      permission_name: permissionsList.notification
    },
    {
      name: 'Chat Bot',
      url: '/bot-offers',
      icon: 'fa fa-reddit-alien',
      permission_name: permissionsList.topbanner
    },
    {
      title: true,
      name: 'Portal',
      permission_name: [...permissionsList.document],
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'fa fa-file-word-o',
      permission_name: permissionsList.document
    },
    {
      title: true,
      name: 'eLoan',
      permission_name: [...permissionsList.document],
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'eLoan',
      url: '/eloan',
      icon: 'fa fa-dollar',
      permission_name: permissionsList.document
    }
  ]
}

// For filtering the nav items, based on permission_name .
const navItemsToShow = { ...navitems };
navItemsToShow.items = _.filter(navItemsToShow.items, item => {
  return filterByPermissions(item);
});

function filterByPermissions(item) {
  if (Object.prototype.hasOwnProperty.call(item, 'permission_name')) {
    return store.getters['auth/hasPermission'](item.permission_name) ? item : null
   }
   return item;
}

export default navItemsToShow;
