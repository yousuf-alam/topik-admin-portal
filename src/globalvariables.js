import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL = process.env.VUE_APP_ADMIN_URL;

const PUSHER_APP_ID = process.env.VUE_APP_PUSHER_APP_ID;
const PUSHER_APP_KEY = process.env.VUE_APP_PUSHER_APP_KEY;
const PUSHER_APP_SECRET = process.env.VUE_APP_PUSHER_APP_SECRET;
const PUSHER_APP_CLUSTER = process.env.VUE_APP_PUSHER_APP_CLUSTER;

export default {
  axios: axios,
  LS_TOKEN_KEY_NAME: "token",
  LS_PERMISSION_KEY_NAME: "user_permissions",
  LS_USER_KEY_NAME: "user",
  ADMIN_URL: ADMIN_URL,
  BASE_URL: BASE_URL,
  is_valid_phone: (phoneNo) =>
    /(^()?(01){1}[23456789]{1}(\d){8})$/i.test(phoneNo),

  permissionsList: {
    manage_roles: "manage roles",
    order: ["order create", "order read", "order update", "order delete"],
    complain: [
      "complain create",
      "complain read",
      "complain update",
      "complain delete",
    ],
    service: [
      "service create",
      "service read",
      "service update",
      "service delete",
    ],
    category: [
      "category create",
      "category read",
      "category update",
      "category delete",
    ],
    lineitem: [
      "lineitem create",
      "lineitem read",
      "lineitem update",
      "lineitem delete",
    ],
    location: [
      "location create",
      "location read",
      "location update",
      "location delete",
    ],
    partnerwallet: [
      "partnerwallet create",
      "partnerwallet read",
      "partnerwallet update",
      "partnerwallet delete",
    ],
    partner: [
      "partner create",
      "partner read",
      "partner update",
      "partner delete",
    ],
    resource: [
      "resource create",
      "resource read",
      "resource update",
      "resource delete",
    ],
    notification: [
      "notification create",
      "notification read",
      "notification update",
      "notification delete",
    ],
    promocode: [
      "promocode create",
      "promocode read",
      "promocode update",
      "promocode delete",
    ],
    topbanner: [
      "topbanner create",
      "topbanner read",
      "topbanner update",
      "topbanner delete",
    ],
    bottombanner: [
      "bottombanner create",
      "bottombanner read",
      "bottombanner update",
      "bottombanner delete",
    ],
    document: [
      "document create",
      "document read",
      "document update",
      "document delete",
    ],
    partnerSalary: ["partner salary"],
    partnerLeaves: ["partner leaves"],
    spRoutes: ["sp route"],
    salaryDisbursement: ["salary disbursement"],
    spOrderCount: ["sp order count"],

    minimumOrderAmount: [
      "minimum order amount create",
      "minimum order amount read",
      "minimum order amount update",
      "minimum order amount delete",
    ],
    otps: ["otp read"],
    admin: ["admin"],
    reports: ["reports"],
    eloan: ["eloan read"],
    thirdparty: ["third party"],
    dashboard: ["dashboard"],
    shohoz: ["shohoz"],
  },
  SECRET_KEY: "Kali Nagin Ke Jaisi Julfe Teri Kali Kali",
  SECRET_KEY_SAME_AS_PARTNER_PANEL:
    "Dust in the wind." /* TO_EDIT_THIS_PLACE, This has to be same as Partner panel gbvar SECRET_KEY*/,
  PUSHER_CREDENTIALS: {
    APP_ID: PUSHER_APP_ID,
    APP_KEY: PUSHER_APP_KEY,
    APP_SECRET: PUSHER_APP_SECRET,
    APP_CLUSTER: PUSHER_APP_CLUSTER,
  },
};
