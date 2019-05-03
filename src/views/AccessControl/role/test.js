
 const routes = [
    {
      path: '/',
      mode: 'hash',
      redirect: '/dashboard',
      name: 'Home',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',

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
            },
            {
              path: 'show/:id',
              name: 'RoleShow',

            },
            {
              path: 'new',
              name: 'Create New Role',
            },
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
            },
            {
              path: 'show/:id',
              name: 'UserShow',

            },

          ]
        },
        {
          path: 'orders',
          name: 'Orders',

        },
        {
          path: '/orders/details/:id',
          name: 'Order / Show',

        },
        {
          path: '/orders/create',
          name: 'OrderCreate',

        },
        {
          path: 'notifications',
          name: 'Notification',

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

            },
            {
              path: ':id',
              meta: {label: 'User Details'},
              name: 'User',

            },
          ]
        }
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

        },
        {
          path: '500',
          name: 'Page500',

        },
        {
          path: 'login',
          name: 'Login',

  
        },
        {
          path: 'register',
          name: 'Register',

        }
      ]
    },
  ]
  

console.log('-----------TEST.JS-------------');
console.log(routes);

/*
// Rough  test ... For javascript object manipulation.  
// Import this file and start console.log('.......test.js.....');
const ques = [[{ "value": "a" }, { "value": "x" }], [{ "value": "a" }, { "value": "y" }], [{ "value": "b" }, { "value": "x" }], [{ "value": "b" }, { "value": "y" }]];

let finalResult = [];

for (let i = 0; i < ques.length; i++) {
let res = {};
    for (let j in ques[i]) {
        let key = "name" + j;
        let nameObj = {};
        nameObj[key] = ques[i][j]['value'];
        Object.assign(res, nameObj)
    }
    finalResult.push(res);
}

console.log(finalResult );

*/




