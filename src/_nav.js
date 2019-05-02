import _ from 'lodash';
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
      has_permission: 'manage roles'
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'fa fa-superpowers'
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
      icon: 'fa fa-cart-plus'
    },
    {
      name: 'Complains',
      url: '/complains',
      icon: 'fa fa-thumbs-down'
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
      icon: 'fa fa-stumbleupon '
    },
    {
      name: 'Category',
      url: '/categories',
      icon: 'fa fa-barcode'
    },
    {
      name: 'Line Item',
      url: '/line-items',
      icon: 'fa fa-bars'
    },
    {
      name: 'Location',
      url: '/locations',
      icon: 'icon-location-pin'
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
      icon: 'cui-credit-card'
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
      icon: 'fa fa-user'
    },
    {
      name: 'Resources',
      url: '/resources',
      icon: 'fa fa-users'
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
      icon: 'icon-bell'
    },
    {
      name: 'Promo Codes',
      url: '/promos',
      icon: 'fa fa-plus-square'
    },
    {
      name: 'Top Banners',
      url: '/top-banners',
      icon: 'fa fa-file-image-o'
    },
    {
      name: 'Bottom Banners',
      url: '/bottom-banners',
      icon: 'fa fa-image'
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
      icon: 'fa fa-file-word-o'
    }
  ]
}


function userHasPermission( permission_name ) {
  const user_permissions = ['get up', 'eat breakfast', 'go home', ];
    return user_permissions.includes(permission_name) ? true : false;
}

const navItemsCopy = { ...navitems };

function filterByPermissions(item) {
  if (Object.prototype.hasOwnProperty.call(item, 'has_permission')) {
    return userHasPermission(item.has_permission) ? item: null
    /*
      const user_permissions = ['get up', 'eat breakfast', 'go home', 'manage roles' ];
      return user_permissions.includes(item.has_permission) ? item : null;
    */
   }
   return item;
}

const filteredItems = _.filter(navItemsCopy.items, item => {
  return filterByPermissions(item);
})

const finalObj = {};
finalObj.items = filteredItems;

export default  finalObj;
