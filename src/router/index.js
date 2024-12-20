import Vue from "vue";
import Router from "vue-router";

//import Notifications from "../views/Notifications/Notifications";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");
const Orders = () => import("@/views/Orders/Orders");
const OrderShow = () => import("../views/Orders/Order_Show");
const OrderEdit = () => import("../views/Orders/OrderEdit");
const OrderCreate = () => import("../views/Orders/OrderCreate");
const Appointments = () => import("@/views/Orders/Appointments/Appointments");
const AppointmentShow = () =>
  import("../views/Orders/Appointments/Appointment_Show");
const AppointmentEdit = () =>
  import("../views/Orders/Appointments/AppointmentEdit");
const AppointmentCreate = () =>
  import("../views/Orders/Appointments/AppointmentCreate");

const ThirdPartyOrders = () =>
  import("@/views/ThirdPartyOrders/ThirdPartyOrders");
const ThirdPartyOrderPlace = () =>
  import("@/views/ThirdPartyOrders/PlaceOrder");
const ThirdPartyContents = () =>
  import("@/views/ThirdPartyContent/ThirdPartyContents");
const ThirdPartyContentCreate = () =>
  import("@/views/ThirdPartyContent/ThirdPartyContentCreate");
const ThirdPartyContentEdit = () =>
  import("@/views/ThirdPartyContent/ThirdPartyContentEdit");

import SelfAllNotifications from "../views/Notifications/self/SelfAllNotifications";
const Notifications = () => import("@/views/Notifications/Notifications");
const NotificationCreate = () =>
  import("../views/Notifications/NotificationCreate");
const NotificationEdit = () =>
  import("../views/Notifications/NotificationEdit");

const Promos = () => import("@/views/Promos/Promos");
const PromoCreate = () => import("../views/Promos/PromoCreate");
const PromoEdit = () => import("../views/Promos/PromoEdit");
const PartnerPromos = () => import("@/views/Promos/PartnerPromos");

const HotDeals = () => import("@/views/HotDeals/HotDeals");
// const HotDealCreate = () => import("../views/HotDeals/HotDealCreate");
// const HotDealEdit = () => import("../views/HotDeals/HotDealEdit");
const CardBins = () => import("@/views/CardBins/CardBins");



const Locations = () => import("@/views/Locations/Locations");
const LocationCreate = () => import("@/views/Locations/LocationCreate");
const LocationEdit = () => import("../views/Locations/LocationEdit");
const FullLocation = () => import("../views/Locations/FullLocation");

const Services = () => import("@/views/Services/Services");
const ServiceCreate = () => import("../views/Services/ServiceCreate");
const ServiceEdit = () => import("../views/Services/ServiceEdit");

const Categories = () => import("@/views/Categories/Categories");
const CategoryCreate = () => import("../views/Categories/CategoryCreate");
const CategoryEdit = () => import("../views/Categories/CategoryEdit");
const SubategoryEdit = () => import("../views/Categories/SubcategoryEdit");

const LineItems = () => import("@/views/LineItems/LineItems");
const LineItemCreate = () => import("../views/LineItems/LineItemCreate");
const TestLineItemCreate = () =>
  import("../views/LineItems/testcreate/TestLineitemCreate.vue");
const LineitemEdit = () => import("../views/LineItems/LineitemEdit");
const LineItemShow = () => import("../views/LineItems/LineItemShow");

const Products = () => import("@/views/Products/Products");
const ProductCreate = () => import("../views/Products/ProductCreate.vue");
const ProductEdit = () => import("../views/Products/ProductEdit.vue");




const ProductRequest = () => import("@/views/ProductRequest/ProductRequests");
const ProductRequestCreate = () => import("../views/ProductRequest/ProductRequestCreate.vue")
const ProductRequestEdit = () => import("../views/ProductRequest/ProductRequestEdit.vue");
const ProductRequestShow = () => import("../views/ProductRequest/ProductRequestShow.vue");


const Partners = () => import("@/views/Partners/Partners");
const PartnerShow = () => import("../views/Partners/PartnerShow");
const PartnerPayments = () => import("../views/Partners/PartnerPayments");

const Resources = () => import("@/views/Resources/Resources");
const ResourceShow = () => import("../views/Resources/ResourceShow");

const Wallets = () => import("@/views/Wallets/Wallets");
const WalletShow = () => import("../views/Wallets/WalletShow");

const Banners = () => import("@/views/Banners/Banners");
const BannerCreate = () => import("../views/Banners/BannerCreate");
const BannerEdit = () => import("../views/Banners/BannerEdit");

const Complains = () => import("@/views/Complains/Complaints.vue");
const ComplainCreate = () => import("@/views/Complains/ComplainCreate");
const ComplainShow = () => import("../views/Complains/ComplainShow");
const Reviews = () => import("../views/Reviews");

const BotOffers = () => import("../views/ChatBot/BotOffers");
const BotOfferEdit = () => import("../views/ChatBot/BotOfferEdit");
const BotOfferCreate = () => import("../views/ChatBot/BotOfferCreate");

const B2CSections = () => import("../views/B2CSections/B2CSections");
const B2CSectionEdit = () => import("../views/B2CSections/B2CSectionEdit");
const B2CSectionCreate = () => import("../views/B2CSections/B2CSectionCreate");

const Reports = () => import("../views/Reports");
const OldReports = () => import("../views/OldReports");
const AreaWiseReports = () => import("../views/AreaWiseReports");
const AreaWiseReportDetails = () => import("../views/AreaWiseReportDetails");
const DetailsReport = () => import("../views/DetailsReport");
const CustomerReport = () => import("../views/CustomerReport");
const Otps = () => import("../views/Otps");
const GpStar = () => import("../views/GpStar");
const Eloan = () => import("../views/Eloan");
const EloanShow = () => import("../views/EloanShow");
const Profile = () => import("../views/Profile");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");

// Authentication
const Login = () => import("@/views/login/Login");
const Register = () => import("@/views/login/Register");

import Role from "../views/AccessControl/role/Role";
import RoleShow from "../views/AccessControl/role/RoleShow";
import CreateNewRole from "../views/AccessControl/role/CreateNewRole";
import RoleEdit from "../views/AccessControl/role/RoleEdit";

import Users from "../views/AccessControl/users/Users";
import UserShow from "../views/AccessControl/users/UserShow";
import CreateNewUser from "../views/AccessControl/users/CreateNewUser";
import UserEdit from "../views/AccessControl/users/UserEdit";

import TestComponent from "../views/Test/TestComponent";
import TestOrders from "../views/Test/TestOrders";
import PartnerCalender from "../views/Calendar/PartnerCalender";

import store from "../store/store";
Vue.use(Router);

import globalvariable from "../globalvariables";
import RedeemShow from "@/views/Redeem/RedeemShow";
import CreateRedeem from "@/views/Redeem/CreateRedeem";
import EditRedeem from "@/views/Redeem/EditRedeem";
import ShowSlot from "@/views/SlotCount/ShowSlot";
import CreateSlot from "@/views/SlotCount/CreateSlot";
import ShowPopupPromo from "@/views/PopupPromo/ShowPopupPromo";
import CreatePopup from "@/views/PopupPromo/CreatePopup";
import EditPopupPromo from "@/views/PopupPromo/EditPopupPromo";
import FeedShow from "@/views/Feed/FeedShow";
import CreateFeed from "@/views/Feed/CreateFeed";
import EditFeed from "@/views/Feed/EditFeed.vue";
import ShowFutureNotification from "@/views/FutureNotification/ShowFutureNotification.vue";
import CreateFutureNotification from "@/views/FutureNotification/CreateFutureNotification.vue";
import EditFutureNotification from "@/views/FutureNotification/EditFutureNotification.vue";
import FaqRewardShow from "@/views/FaqReward/FaqRewardShow.vue";
import CreateFaqReward from "@/views/FaqReward/CreateFaqReward.vue";
import EditRewardFaq from "@/views/FaqReward/EditRewardFaq.vue";
import StatusShow from "@/views/RewardStatus/RewardStatus.vue";
import CreateStatus from "@/views/RewardStatus/CreateStatus.vue";
import EditStatus from "@/views/RewardStatus/EditStatus.vue";
import ShowMinimumAmount from "@/views/MinimumOrderAmount/ShowMinimumAmount.vue";
import CreateMinimumAmount from "@/views/MinimumOrderAmount/CreateMinimumAmount.vue";
import CreateMinimumAmountByFilter from "@/views/MinimumOrderAmount/CreateMinimumAmountByFilter.vue";
import EditMinimumAmount from "@/views/MinimumOrderAmount/EditMinimumAmount.vue";
import showDiscount from "@/views/FirstOrderDiscount/ShowDiscount.vue";
import CreatDiscount from "@/views/FirstOrderDiscount/CreatDiscount.vue";
import EditDiscount from "@/views/FirstOrderDiscount/EditDiscount.vue";
import EditMinimumTime from "@/views/MinimumTimeOrder/EditMinimumTime.vue";
import CreateMinimumTime from "@/views/MinimumTimeOrder/CreateMinimumTime.vue";
import ShowMinimumTime from "@/views/MinimumTimeOrder/ShowMinimumTime.vue";
import ShowMinimumPaymentTime from "@/views/MinimumTimePayment/ShowMinimumPaymentTime.vue";
import EditMinimumPaymentTime from "@/views/MinimumTimePayment/EditMinimumPaymentTime.vue";
import OrderNumberSp from "@/views/OrderNumberSp.vue";
import RouteSpDaily from "@/views/RouteSpDaily.vue";
import ShowPartnerLeave from "@/views/PartnerLeave/ShowPartnerLeave.vue";
import CreatePartnerLeave from "@/views/PartnerLeave/CreatePartnerLeave.vue";
import EditPartnerLeave from "@/views/PartnerLeave/EditPartnerLeave.vue";
import LeaveCalender from "@/views/PartnerLeave/LeaveCalender.vue";
import LeaveSummary from "@/views/PartnerLeave/LeaveSummary.vue";
import LeaveLog from "@/views/PartnerLeave/LeaveLog.vue";
import ShowSalary from "@/views/PartnerSalary/ShowSalary.vue";
import WalletMonthly from "@/views/PartnerSalary/WalletMonthly.vue";
import CreateSalary from "@/views/PartnerSalary/CreateSalary.vue";
import CreatePayment from "@/views/Partners/CreatePayment.vue";
import EditPayment from "@/views/Partners/EditPayment.vue";
import UnsettledOrders from "@/views/Orders/Unsettle/UnsettledOrders.vue";
import FilterPartnerLeave from "@/views/PartnerLeave/FilterPartnerLeave.vue";
import Statistics from "@/views/Statistics.vue";
import RewardUser from "@/views/RewardUser/RewardUser.vue";
import PaymentMethods from "@/views/PaymentMethod/PaymentMethods.vue";
import EditPaymentMethod from "@/views/PaymentMethod/EditPaymentMethod.vue";
import AdvancePaymentSchedule from "@/views/AdvancePayment/AdvancePaymentScheduleList.vue";
import EditAdvancePaymentSchedule from "@/views/AdvancePayment/EditAdvancePaymentSchedule.vue";
import CreateAdvancePaymentSchedule from "@/views/AdvancePayment/CreateAdvancePaymentSchedule.vue";
import LeaveApproval from "@/views/PartnerLeave/LeaveApproval.vue";
import NoticeEdit from "@/views/PartnerNotice/NoticeEdit.vue";
import NoticeCreate from "@/views/PartnerNotice/NoticeCreate.vue";
import NoticeShow from "@/views/PartnerNotice/NoticeShow.vue";
import AllPaymentData from "@/views/Partners/AllPaymentData.vue";
import SalaryDisbursement from "@/views/PartnerSalary/SalaryDisbursement.vue";
import EditLeaveApplication from "@/views/PartnerLeave/EditLeaveApplication.vue";
import LeaveApplication from "@/views/PartnerLeave/LeaveApplication.vue";
import LineItemRevenueReport from "@/views/LineItemRevenueReport.vue";
import ScheduleNotification from "@/views/ScheduleNotification/ScheduleNotification.vue";
import EditContent from "@/views/ScheduleNotification/EditContent.vue";
import CreateContent from "@/views/ScheduleNotification/CreateContent.vue";
import showContent from "@/views/ScheduleNotification/ShowContent.vue";
import ShowContent from "@/views/ScheduleNotification/ShowContent.vue";
import CreateScheduleNotification from "@/views/ScheduleNotification/CreateScheduleNotification.vue";
import ComplainEdit from "@/views/Complains/ComplainEdit.vue";
import OrderRefund from "@/views/Orders/OrderRefund.vue";
import FilterSpRoute from "@/views/FilterSpRoute.vue";
import Complaints from "@/views/Complains/Complaints.vue";
import RewardStatus from "@/views/RewardStatus/RewardStatus.vue";
import Mocks from "@/views/Mocks/Mocks.vue";
import CreateMock from "@/views/Mocks/CreateMock.vue";
import EditMock from "@/views/Mocks/EditMock.vue";
import ShowMock from "@/views/Mocks/ShowMock.vue";
const permissionsList = globalvariable.permissionsList;

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      mode: "hash",
      redirect: "/dashboard",
      name: "Home",
      component: DefaultContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "statistics",
          name: "Statistics",
          component: Statistics,
        },
        {
          path: "roles",
          redirect: "/roles",
          name: "Roles",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              component: Role,
              meta: {
                permission_name: "manage roles",
              },
            },
            {
              path: "show/:id",
              name: "RoleShow",
              component: RoleShow,
              meta: {
                permission_name: "manage roles",
              },
            },
            {
              path: "new",
              name: "Create New Role",
              component: CreateNewRole,
              meta: {
                permission_name: "manage roles",
              },
            },
            {
              path: "edit/:id",
              name: "RoleEdit ",
              component: RoleEdit,
              meta: {
                permission_name: "manage roles",
              },
            },
          ],
        },
        {
          path: "users",
          redirect: "/users",
          name: "Users",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              component: Users,
              meta: {
                permission_name: "manage roles",
              },
            },
            {
              path: "show/:id",
              name: "UserShow",
              component: UserShow,
              meta: {
                permission_name: "manage roles",
              },
            },
            {
              path: "new",
              name: "Create New User",
              component: CreateNewUser,
              meta: {
                permission_name: "manage roles",
              },
            },
            {
              path: "edit/:id",
              name: "Edit ",
              component: UserEdit,
              meta: {
                permission_name: "manage roles",
              },
            },
          ],
        },
        {
          path: "mocks",
          name: "Mocks",
          component: Mocks,
          meta: {
            permission_name: permissionsList.mock,
          },
        },
        {
          path: "/mock/details/:id",
          name: "ShowMock",
          component: ShowMock,
          meta: {
            permission_name: "mock",
          },
        },
        {
          path: "/mock/edit/:id",
          name: "EditMock",
          component: EditMock,
          meta: {
            permission_name: "mock",
          },
        },
        {
          path: "/mock/create",
          name: "CreateMock",
          component: CreateMock,
          props: true,
          meta: {
            permission_name: "mock",
          },
        },
        {
          path: "mocks",
          name: "Mocks",
          component: Mocks,
          meta: {
            permission_name: permissionsList.mock,
          },
        },
        {
          path: "/mock/details/:id",
          name: "ShowMock",
          component: ShowMock,
          meta: {
            permission_name: "mock",
          },
        },
        {
          path: "/mock/edit/:id",
          name: "EditMock",
          component: EditMock,
          meta: {
            permission_name: "mock",
          },
        },
        {
          path: "/mock/create",
          name: "CreateMock",
          component: CreateMock,
          props: true,
          meta: {
            permission_name: "mock",
          },
        },
        {
          path: "/un-settled-orders",
          name: "UnsettledOrders",
          component: UnsettledOrders,
          meta: {
            permission_name: "order read",
          },
        },
        {
          path: "third-party-orders",
          name: "ThirdPartyOrders",
          component: ThirdPartyOrders,
          meta: {
            permission_name: [
              ...permissionsList.thirdparty,
              ...permissionsList.shohoz,
            ],
          },
        },
        {
          path: "third-party-contents",
          name: "ThirdPartyContents",
          component: ThirdPartyContents,
          meta: {
            permission_name: permissionsList.order,
          },
        },
        {
          path: "/third-party-contents/create",
          name: "ThirdPartyContentCreate",
          component: ThirdPartyContentCreate,
          props: true,
          meta: {
            permission_name: "order create",
          },
        },
        {
          path: "/third-party-contents/edit/:id",
          name: "Edit Content",
          component: ThirdPartyContentEdit,
          props: true,
          meta: {
            permission_name: "order create",
          },
        },

        {
          path: "/third-party-orders/place-order/:id",
          name: "ThirdPartyOrderPlace",
          component: ThirdPartyOrderPlace,
          props: true,
          meta: {
            permission_name: "order create",
          },
        },
        {
          path: "appointments",
          name: "Appointments",
          component: Appointments,
          meta: {
            permission_name: permissionsList.order,
          },
        },
        {
          path: "/appointments/details/:id",
          name: "AppointmentShow",
          component: AppointmentShow,
          meta: {
            permission_name: "order read",
          },
        },
        {
          path: "/appointments/edit/:id",
          name: "AppointmentEdit",
          component: AppointmentEdit,
          meta: {
            permission_name: "order read",
          },
        },
        {
          path: "/appointments/create",
          name: "AppointmentCreate",
          component: AppointmentCreate,
          props: true,
          meta: {
            permission_name: "order create",
          },
        },
        {
          path: "notifications",
          name: "Notification",
          component: Notifications,
          meta: {
            permission_name: permissionsList.notification,
          },
        },
        {
          path: "notifications/self",
          name: "SelfAllNotifications",
          component: SelfAllNotifications,
        },
        {
          path: "/notifications/edit/:id",
          name: "NotificationEdit",
          component: NotificationEdit,
          meta: {
            permission_name: "notification update",
          },
        },
        {
          path: "/notifications/create",
          name: "NotificationCreate",
          component: NotificationCreate,
          meta: {
            permission_name: "notification create",
          },
        },
        {
          /* ------ ------- This Route Has Been Made for Test Purpose ------- --------*/
          path: "/test/orders",
          name: "TestOrders",
          component: TestOrders,
        },
        {
          /* ------ ------- This Route Has Been Made for Test Purpose ------- --------*/
          path: "/test",
          name: "TestComponent",
          component: TestComponent,
        },
        {
          path: "promos",
          name: "Promo Codes",
          component: Promos,
          meta: {
            //permission_name: permissionsList.promocode
          },
        },
        {
          path: "/promos/edit/:id",
          name: "PromoEdit",
          component: PromoEdit,
          meta: {
            // permission_name: 'promocode update'
          },
        },
        {
          path: "/promos/create",
          name: "PromoCreate",
          component: PromoCreate,
          meta: {
            // permission_name: 'promocode create'
          },
        },
        {
          path: "/promos/partner-promos",
          name: "PartnerPromos",
          component: PartnerPromos,
          meta: {
            // permission_name: 'promocode create'
          },
        },

        {
          path: "hot-deals",
          name: "Hot Deals",
          component: HotDeals,
          meta: {
            //permission_name: permissionsList.promocode
          },
        },
        // {
        //   path: "hot-deals/create",
        //   name: "HotDealCreate",
        //   component: HotDealCreate,
        //   meta: {

        //   },
        // },
        // {
        //   path: "hot-deals//edit/:id",
        //   name: "HotDealEdit",
        //   component: HotDealEdit,
        //   meta: {
        //   },
        // },


        {
          path: "card-bins",
          name: "Card Bins",
          component: CardBins,
          meta: {
            //permission_name: permissionsList.promocode
          },
        },

        {
          path: "locations",
          name: "Locations",
          component: Locations,
          meta: {
            permission_name: permissionsList.location,
          },
        },
        {
          path: "locations/create",
          name: "LocationCreate",
          component: LocationCreate,
          meta: {
            permission_name: permissionsList.location,
          },
        },
        {
          path: "/locations/edit/:id",
          name: "LocationEdit",
          component: LocationEdit,
          meta: {
            // permission_name: 'location update'
          },
        },
        {
          path: "locations/full-coverage",
          name: "FullLocation",
          component: FullLocation,
          meta: {
            permission_name: permissionsList.location,
          },
        },
        {
          path: "services",
          name: "Services",
          component: Services,
          meta: {
            permission_name: permissionsList.service,
          },
        },
        {
          path: "/services/edit/:id",
          name: "ServiceEdit",
          component: ServiceEdit,
          meta: {
            permission_name: "service update",
          },
        },
        {
          path: "/services/create",
          name: "ServiceCreate",
          component: ServiceCreate,
          meta: {
            permission_name: "service create",
          },
        },
        {
          path: "categories",
          name: "Categories",
          component: Categories,
          meta: {
            permission_name: permissionsList.category,
          },
        },
        {
          path: "/categories/edit/:id",
          name: "CategoryEdit",
          component: CategoryEdit,
          meta: {
            permission_name: "category update",
          },
        },
        {
          path: "/subcategories/edit/:id",
          name: "SubcategoryEdit",
          component: SubategoryEdit,
        },
        {
          path: "/categories/create",
          name: "CategoryCreate",
          component: CategoryCreate,
          meta: {
            permission_name: "category create",
          },
        },
        {
          path: "line-items",
          name: "LineItems",
          component: LineItems,
          meta: {
            permission_name: permissionsList.lineitem,
          },
        },
        {
          path: "/line-items/edit/:id",
          name: "LineitemEdit",
          component: LineitemEdit,
          meta: {
            permission_name: "lineitem update",
          },
        },
        {
          path: "/line-items/show/:id",
          name: "LineItemShow",
          component: LineItemShow,
          meta: {
            permission_name: "lineitem read",
          },
        },
        {
          path: "/line-items/create",
          name: "LineItemCreate",
          component: LineItemCreate,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/test-line-items/create",
          name: "TestLineItemCreate",
          component: TestLineItemCreate,
          meta: {
            permission_name: "lineitem create",
          },
        },

        {
          path: "/products",
          name: "Products",
          component: Products,
          meta: {
            permission_name: permissionsList.service,
          },
        },
        {
          path: "/products/edit/:id",
          name: "ProductEdit",
          component: ProductEdit,
          // meta: {
          //   permission_name: "Product update",
          // },
        },

        {
          path: "/products/create",
          name: "ProductCreate",
          component: ProductCreate,
          // meta: {
          //   permission_name: "product read",
          // },
        },

        {
          path: "/product-requests",
          name: "ProductRequest",
          component: ProductRequest,
          // meta: {
          //   permission_name: permissionsList.service,
          // },
        },
        {
          path: "/product-requests/create",
          name: "ProductRequestCreate",
          component: ProductRequestCreate,
          // meta: {
          //   permission_name: permissionsList.service,
          // },
        },
        {
          path: "/product-requests/edit/:id",
          name: "ProductRequestEdit",
          component: ProductRequestEdit,
          // meta: {
          //   permission_name: permissionsList.service,
          // },
        },
        {
          path: "/product-requests/show/:id",
          name: "ProductRequestShow",
          component: ProductRequestShow,
          // meta: {
          //   permission_name: permissionsList.service,
          // },
        },

        {
          path: "/redeem",
          name: "Redeem",
          component: RedeemShow,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/redeem-create",
          name: "CreateRedeem",
          component: CreateRedeem,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-redeem/:id",
          name: "EditRedeem",
          component: EditRedeem,
          meta: {
            permission_name: "lineitem create",
          },
        },

        //minimum order amount
        {
          path: "/minimum-order-amount",
          name: "ShowMinimumAmount",
          component: ShowMinimumAmount,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/min-order-amount-create",
          name: "CreateMinimumAmount",
          component: CreateMinimumAmount,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/min-order-amount-filter-create",
          name: "CreateMinimumAmountByFilter",
          component: CreateMinimumAmountByFilter,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-min-order-amount/:id",
          name: "EditMinimumAmount",
          component: EditMinimumAmount,
          meta: {
            permission_name: "lineitem create",
          },
        },
        // First Order Discount
        {
          path: "/first-order-discount",
          name: "showDiscount",
          component: showDiscount,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/first-order-discount-create",
          name: "CreatDiscount",
          component: CreatDiscount,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-first-order-discount/:id",
          name: "EditDiscount",
          component: EditDiscount,
          meta: {
            permission_name: "lineitem create",
          },
        },
        //minimum order time
        {
          path: "/minimum-order-time",
          name: "ShowMinimumTime",
          component: ShowMinimumTime,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/minimum-order-time-create",
          name: "CreateMinimumTime",
          component: CreateMinimumTime,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-minimum-order-time/:id",
          name: "EditMinimumTime",
          component: EditMinimumTime,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/reward-faq",
          name: "FAQReward",
          component: FaqRewardShow,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/reward-user",
          name: "RewardUser",
          component: RewardUser,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/create-reward-faq",
          name: "CreateFAQReward",
          component: CreateFaqReward,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-reward-faq/:id",
          name: "EditRewardFaq",
          component: EditRewardFaq,
          meta: {
            permission_name: "lineitem create",
          },
        },
        //
        {
          path: "/reward-status",
          name: "RewardStatus",
          component: RewardStatus,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/create-reward-status",
          name: "CreateStatus",
          component: CreateStatus,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-status/:id",
          name: "EditStatus",
          component: EditStatus,
          meta: {
            permission_name: "lineitem create",
          },
        },

        {
          path: "/partner-notice",
          name: "NoticeShow",
          component: NoticeShow,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/create-partner-notice",
          name: "NoticeCreate",
          component: NoticeCreate,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-partner-notice/:id",
          name: "NoticeEdit",
          component: NoticeEdit,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/payment-method",
          name: "PaymentMethods",
          component: PaymentMethods,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/all-leave-application",
          name: "LeaveApplication",
          component: LeaveApplication,
          meta: {
            permission_name: "lineitem create",
          },
        },

        {
          path: "/advance-payment-schedule",
          name: "AdvancePaymentSchedule",
          component: AdvancePaymentSchedule,
          meta: {
            permission_name: "lineitem create",
          },
        },

        {
          path: "/edit-advance-payment-schedule/:id",
          name: "EditAdvancePaymentSchedule",
          component: EditAdvancePaymentSchedule,
          meta: {
            permission_name: "lineitem create",
          },
        },
        // CreateAdvancePaymentSchedule


        {
          path: "/create-advance-payment-schedule",
          name: "CreateAdvancePaymentSchedule",
          component: CreateAdvancePaymentSchedule,
          meta: {
            permission_name: "lineitem create",
          },
        },



        {
          path: "/minimum-payment-time",
          name: "ShowMinimumPaymentTime",
          component: ShowMinimumPaymentTime,
          meta: {
            permission_name: "lineitem create",
          },
        },

        {
          path: "/edit-minimum-payment-time/:id",
          name: "EditMinimumPaymentTime",
          component: EditMinimumPaymentTime,
          meta: {
            permission_name: "lineitem create",
          },
        },

        {
          path: "/edit-payment-method/:id",
          name: "EditPaymentMethod",
          component: EditPaymentMethod,
          meta: {
            permission_name: "lineitem create",
          },
        },

        {
          path: "/edit-leave-application/:id",
          name: "EditLeaveApplication",
          component: EditLeaveApplication,
          meta: {
            permission_name: "lineitem create",
          },
        },
        //
        {
          path: "/slot-count",
          name: "ShowSlot",
          component: ShowSlot,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/slot-create",
          name: "CreateSlot",
          component: CreateSlot,
          meta: {
            permission_name: "lineitem create",
          },
        },
        // {
        //   path: "/popup-promo",
        //   name: "ShowPopupPromo",
        //   component: ShowPopupPromo,
        //   meta: {
        //     permission_name: "lineitem create",
        //   },
        // },
        {
          path: "/popup-create",
          name: "CreatePopup",
          component: CreatePopup,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-popup/:id",
          name: "EditPopupPromo",
          component: EditPopupPromo,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/feed-show",
          name: "FeedShow",
          component: FeedShow,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/create-feed",
          name: "CreateFeed",
          component: CreateFeed,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-feed/:id",
          name: "EditFeed",
          component: EditFeed,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/show-future-notification",
          name: "ShowFutureNotification",
          component: ShowFutureNotification,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/create-future-notification",
          name: "CreateFutureNotification",
          component: CreateFutureNotification,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "/edit-future-notification/:id",
          name: "EditFutureNotification",
          component: EditFutureNotification,
          meta: {
            permission_name: "lineitem create",
          },
        },
        {
          path: "partners",
          name: "Partners",
          component: Partners,
          meta: {
            permission_name: permissionsList.partner,
          },
        },
        {
          path: "/partners/show/:id",
          name: "PartnerShow",
          component: PartnerShow,
          meta: {
            permission_name: "partner read",
          },
        },
        {
          path: "Partner-payment",
          name: "PartnerPayments",
          component: PartnerPayments,
          meta: {
            permission_name: "partner read",
          },
        },
        {
          path: "all-payment-data",
          name: "AllPaymentData",
          component: AllPaymentData,
          meta: {
            permission_name: "partner read",
          },
        },
        {
          path: "create-partner-payment",
          name: "CreatePayment",
          component: CreatePayment,
          meta: {
            permission_name: "partner read",
          },
        },
        {
          path: "/edit-payment/:id",
          name: "EditPayment",
          component: EditPayment,
          meta: {
            permission_name: "partner read",
          },
        },

        {
          path: "resources",
          name: "Resources",
          component: Resources,
          meta: {
            permission_name: permissionsList.resource,
          },
        },
        {
          path: "/resources/show/:id",
          name: "ResourceShow",
          component: ResourceShow,
          meta: {
            permission_name: "resource read",
          },
        },
        {
          path: "partner-wallets",
          name: "wallets",
          component: Wallets,
          meta: {
            permission_name: permissionsList.partnerwallet,
          },
        },
        {
          path: "/partner-leaves",
          name: "ShowPartnerLeave",
          component: ShowPartnerLeave,
          meta: {
            permission_name: permissionsList.partnerLeaves,
          },
        },
        {
          path: "/show-partner-leave-data",
          name: "CreatePartnerLeave",
          component: CreatePartnerLeave,
          meta: {
            permission_name: permissionsList.partnerLeaves,
          },
        },
        {
          path: "/partner-leaves-log/:id",
          name: "LeaveLog",
          component: LeaveLog,
          meta: {
            permission_name: permissionsList.partnerLeaves,
          },
        },
        {
          path: "/filter-leave",
          name: "FilterPartnerLeave",
          component: FilterPartnerLeave,
          meta: {
            permission_name: permissionsList.partnerLeaves,
          },
        },
        {
          path: "/date-wise-leave-data",
          name: "LeaveCalender",
          component: LeaveCalender,
          meta: {
            permission_name: permissionsList.partnerLeaves,
          },
        },
        {
          path: "/leave-summery",
          name: "LeaveSummary",
          component: LeaveSummary,
          meta: {
            permission_name: permissionsList.partnerLeaves,
          },
        },
        {
          path: "/leave-approval",
          name: "LeaveApproval",
          component: LeaveApproval,
          meta: {
            permission_name: permissionsList.partnerLeaves,
          },
        },
        {
          path: "/partner-salary",
          name: "ShowSalary",
          component: ShowSalary,
          meta: {
            permission_name: permissionsList.partnerSalary,
          },
        },
        {
          path: "/salary-disbursement",
          name: "SalaryDisbursement",
          component: SalaryDisbursement,
          meta: {
            permission_name: permissionsList.salaryDisbursement,
          },
        },
        {
          path: "/partner-salary-create",
          name: "CreateSalary",
          component: CreateSalary,
          meta: {
            permission_name: permissionsList.partnerSalary,
          },
        },
        {
          path: "/sp-wallet-monthly/:id",
          name: "WalletMonthly",
          component: WalletMonthly,
          meta: {
            permission_name: permissionsList.partnerSalary,
          },
        },
        {
          path: "/wallets/show/:id",
          name: "WalletShow",
          component: WalletShow,
          meta: {
            permission_name: "partnerwallet read",
          },
        },
        {
          path: "banners",
          name: "Banners",
          component: Banners,
          meta: {
            permission_name: permissionsList.topbanner,
          },
        },
        {
          path: "/banners/edit/:id",
          name: "Banner / Edit",
          component: BannerEdit,
          meta: {
            permission_name: permissionsList.topbanner,
          },
        },
        {
          path: "/banners/create",
          name: "BannerCreate",
          component: BannerCreate,
          meta: {
            //permission_name: 'banner create'
          },
        },
        {
          path: "complaints",
          name: "Complaints",
          component: Complaints,
          meta: {
            permission_name: permissionsList.complain,
          },
        },
        {
          path: "/complaint/show/:id",
          name: "ComplainShow",
          component: ComplainShow,
          meta: {
            permission_name: "complain read",
          },
        },
        {
          path: "/complaint/edit/:id",
          name: "ComplainEdit",
          component: ComplainEdit,
          meta: {
            permission_name: "complain read",
          },
        },
        {
          path: "/complains/create",
          name: "ComplainCreate",
          component: ComplainCreate,
          meta: {
            permission_name: "complain create",
          },
        },

        //schedule notification
        {
          path: "schedule-notification",
          name: "ScheduleNotification",
          component: ScheduleNotification,
          meta: {
            permission_name: permissionsList.complain,
          },
        },
        {
          path: "schedule-content",
          name: "ShowContent",
          component: ShowContent,
          meta: {
            permission_name: permissionsList.complain,
          },
        },
        {
          path: "refund-orders",
          name: "OrderRefund",
          component: OrderRefund,
          meta: {
            permission_name: permissionsList.complain,
          },
        },
        {
          path: "/schedule/edit/:id",
          name: "EditContent",
          component: EditContent,
          meta: {
            permission_name: "complain read",
          },
        },
        {
          path: "/schedule-content/create",
          name: "CreateContent",
          component: CreateContent,
          meta: {
            permission_name: "complain create",
          },
        },
        {
          path: "/schedule-notification/create",
          name: "CreateScheduleNotification",
          component: CreateScheduleNotification,
          meta: {
            permission_name: "complain create",
          },
        },
        {
          path: "reviews",
          name: "Reviews",
          component: Reviews,
          meta: {
            permission_name: permissionsList.complain,
          },
        },
        {
          path: "oldreports",
          name: "Old Reports",
          component: OldReports,
          meta: {
            permission_name: permissionsList.admin,
          },
        },
        {
          path: "order-number-sp",
          name: "OrderNumberSp",
          component: OrderNumberSp,
          meta: {
            permission_name: permissionsList.spOrderCount,
          },
        },
        {
          path: "sp-route",
          name: "SP Route",
          component: RouteSpDaily,
          meta: {
            permission_name: permissionsList.spRoutes,
          },
        },
        {
          path: "filter-sp-route",
          name: "FilterSpRoute",
          component: FilterSpRoute,
          meta: {
            permission_name: permissionsList.spRoutes,
          },
        },

        {
          path: "reports",
          name: "Reports",
          component: Reports,
          meta: {
            permission_name: permissionsList.reports,
          },
        },
        {
          path: "areawisereports",
          name: "Area Wise Reports",
          component: AreaWiseReports,
          meta: {
            permission_name: permissionsList.reports,
          },
        },
        {
          path: "line-items-revenue-reports",
          name: "LineItemRevenueReport",
          component: LineItemRevenueReport,
          meta: {
            permission_name: permissionsList.reports,
          },
        },
        {
          path: "areawisereportdetails/:from/:to/:areaName",
          name: "Area Wise Report Details",
          component: AreaWiseReportDetails,
          meta: {
            permission_name: permissionsList.reports,
          },

          props: true,
        },
        {
          path: "reports/details",
          name: "DetailsReport",
          component: DetailsReport,
          meta: {
            permission_name: permissionsList.document,
          },
        },
        {
          path: "partner/calender",
          name: "Partner Calender",
          component: PartnerCalender,
          meta: {
            permission_name: permissionsList.reports,
          },
        },
        {
          path: "reports/customerreport",
          name: "CustomerReport",
          component: CustomerReport,
          meta: {
            permission_name: permissionsList.reports,
          },
        },
        {
          path: "otps",
          name: "Otps",
          component: Otps,
          meta: {
            permission_name: permissionsList.otps,
          },
        },
        {
          path: "gp-star-check",
          name: "GpStar",
          component: GpStar,
          meta: {
            permission_name: permissionsList.document,
          },
        },
        {
          path: "eloan",
          name: "Eloan",
          component: Eloan,
          meta: {
            permission_name: permissionsList.eloan,
          },
        },
        {
          path: "eloan/show/:id",
          name: "EloanShow",
          component: EloanShow,
          meta: {
            permission_name: permissionsList.eloan,
          },
        },
        {
          path: "profile",
          name: "Profile",
          component: Profile,
        },
        {
          path: "b2c-sections",
          name: "B2CSections",
          component: B2CSections,
          meta: {
            permission_name: permissionsList.topbanner,
          },
        },
        {
          path: "/b2c-sections/edit/:id",
          name: "B2CSection / Edit",
          component: B2CSectionEdit,
          meta: {
            permission_name: permissionsList.topbanner,
          },
        },
        {
          path: "/b2c-sections/create",
          name: "B2CSectionCreate",
          component: B2CSectionCreate,
          meta: {
            //permission_name: 'banner create'
          },
        },
        {
          path: "bot-offers",
          redirect: "/bot-offers",
          name: "Bot Offers",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              component: BotOffers,
            },
            {
              path: "edit/:id",
              name: "Edit Offer",
              component: BotOfferEdit,
            },
            {
              path: "create",
              name: "Create",
              component: BotOfferCreate,
            },
          ],
        },
      ],
    },
    { path: "*", component: Page404 },
    {
      path: "/",
      redirect: "/404",
      name: "Authentication",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
      ],
    },
  ],
});

function checkRoutePermission(to) {
  const routeObj = to.matched[to.matched.length - 1];
  if (Object.prototype.hasOwnProperty.call(routeObj.meta, "permission_name")) {
    return store.getters["auth/hasPermission"](routeObj.meta.permission_name)
      ? true
      : false;
  }
  return true;
}

router.beforeEach((to, from, next) => {
  // let user_roles = JSON.parse(window.localStorage.getItem("user_roles"));
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["auth/isLoggedIn"]) {
      if (checkRoutePermission(to)) {
        next();
      }
      return;
    }
    next("/login");
  } else if (store.getters["auth/isLoggedIn"]) {
    if (
      to.matched.some(
        (record) => record.name === "Login" || record.name === "Register"
      )
    ) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
