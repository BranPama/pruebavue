import { createRouter, createWebHistory } from "vue-router";



import Index from "../views/home.vue";
import Registro from "../views/registro.vue";
import vistaUsuario from "../views/vistaUsuarios.vue";
import AdministracionClientes from "../views/administracion/AdminClientes.vue";

const routes = [
{
    path: "/",
    component: Index,
},
{
    path: "/inicio",
    component: vistaUsuario,
     meta: { requiresAuth: true }
},
{
    path: "/clientes",
    component: AdministracionClientes,
    meta: { requiresAuth: true }
},
{
    path: "/registro",
    component: Registro,
},

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Guardia de navegación global
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
      next('/');
    } else {
      next();
    }
});

export default router;