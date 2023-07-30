// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Changelog from '../views/Changelog.vue';
const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            if (isAuthenticated()) {
                // User is authenticated, allow access to the profile page
                next();
            } else {
                // User is not authenticated, redirect to the login page
                next('/login');
            }
        },
    },
    {
        path: '/changelog',
        name: 'Changelog',
        component: Changelog,
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            if (isAuthenticated()) {
                // User is authenticated, allow access to the profile page
                next();
            } else {
                // User is not authenticated, redirect to the login page
                next('/login');
            }
        },
    },
];
const isAuthenticated = () => {
    // Check if the user is authenticated 
    const token = localStorage.getItem('token');
    return !!token;
};


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;