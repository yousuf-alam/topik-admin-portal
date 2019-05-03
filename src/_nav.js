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
      name: 'Complains',
      url: '/complains',
      icon: 'fa fa-thumbs-down',
      permission_name: permissionsList.complain
    },
    {
      title: true,
      name: 'Service',
      class: '',
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
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Notification',
      url: '/notifications',
      icon: 'icon-bell',
      permission_name: permissionsList.notification
    },
    {
      name: 'Promo Codes',
      url: '/promos',
      icon: 'fa fa-plus-square',
      permission_name:  permissionsList.promocode, 
    },
    {
      name: 'Top Banners',
      url: '/top-banners',
      icon: 'fa fa-file-image-o',
      permission_name: permissionsList.topbanner
    },
    {
      name: 'Bottom Banners',
      url: '/bottom-banners',
      icon: 'fa fa-image',
      permission_name: permissionsList.bottombanner
    },

    {
      title: true,
      name: 'Portal',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Documents',
      url: '/documents',
      icon: 'fa fa-file-word-o',
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