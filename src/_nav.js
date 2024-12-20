import _ from "lodash";
import gbvar from "./globalvariables";
import store from "./store/store";
const permissionsList = gbvar.permissionsList;
const navitems = {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
    },

    {
      title: true,
      name: "Access Control",
      permission_name: permissionsList.manage_roles,
      class: "",
      wrapper: {
        element: "",
        attributes: {},
      },
    },
    {
      name: "Roles",
      url: "/roles",
      icon: "fa fa-podcast",
      permission_name: permissionsList.manage_roles,
    },
    {
      name: "Users",
      url: "/users",
      icon: "fa fa-superpowers",
      permission_name: permissionsList.manage_roles,
    },
    {
      title: true,
      name: "Question",
      class: "",
      wrapper: {
        element: "",
        attributes: {},
      },
    },

    {
      name: "Questions",
      url: "/questions",
      icon: "fa fa-cart-plus",
      permission_name: permissionsList.question,
    },
    {
      name: "Mocks",
      url: "/mocks",
      icon: "fa fa-cart-plus",
      permission_name: permissionsList.mock,
    },
    {
      name: "Mock User",
      url: "/mock-users",
      icon: "fa fa-cart-plus",
      permission_name: permissionsList.mock_user,
    },
    {
      name: "Complaint",
      url: "/complaint",
      icon: "fa fa-cart-plus",
      permission_name: permissionsList.complaint,
    },

    {
      name: "Promo Codes",
      url: "/promos",
      icon: "fa fa-gift",
      permission_name: permissionsList.coupon,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: "fa fa-gift",
      permission_name: permissionsList.reports,
    },
    {
      name: "Packages",
      url: "/packages",
      icon: "fa fa-gift",
      permission_name: permissionsList.package,
    },




    {
      name: "Otps",
      url: "/otps",
      icon: "fa fa-phone",
      permission_name: permissionsList.otp,
    },


  ],
};

// For filtering the nav items, based on permission_name .
const navItemsToShow = { ...navitems };
navItemsToShow.items = _.filter(navItemsToShow.items, (item) => {
  return filterByPermissions(item);
});

function filterByPermissions(item) {
  if (Object.prototype.hasOwnProperty.call(item, "permission_name")) {
    return store.getters["auth/hasPermission"](item.permission_name)
      ? item
      : null;
  }
  return item;
}

export default navItemsToShow;
