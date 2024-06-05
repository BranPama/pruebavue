import { createRouter, createWebHistory } from "vue-router";



import Index from "../views/home.vue";
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
},
{
    path: "/clientes",
    component: AdministracionClientes,
},

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;