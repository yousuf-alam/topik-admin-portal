import Vue from "vue";
import Router from "vue-router";

//import Notifications from "../views/Notifications/Notifications";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");


// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");

// Authentication
const Login = () => import("@/views/login/Login");
const Register = () => import("@/views/login/Register");



import store from "../store/store";
Vue.use(Router);

import globalvariable from "../globalvariables";
import Mocks from "@/views/Mocks/Mocks.vue";
import CreateMock from "@/views/Mocks/CreateMock.vue";
import EditMock from "@/views/Mocks/EditMock.vue";
import ShowMock from "@/views/Mocks/ShowMock.vue";
import Questions from "@/views/Question/Questions.vue";
import showQuestion from "@/views/Question/ShowQuestion.vue";
import EditQuestion from "@/views/Question/EditQuestion.vue";
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
          path: "questions",
          name: "Questions",
          component: Questions,
          meta: {
            permission_name: permissionsList.mock,
          },
        },
        {
          path: "/question/details/:id",
          name: "showQuestion",
          component: showQuestion,
          meta: {
            permission_name: "mock",
          },
        },
        {
          path: "/question/edit/:id",
          name: "EditQuestion",
          component: EditQuestion,
          meta: {
            permission_name: "mock",
          },
        },
      ]
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
