<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios';

import Navbar from "../../components/Navbar.vue";
import CrearCliente from "../../components/administracion/CrearCliente.vue";
import EliminarCliente from "../../components/administracion/EliminarCliente.vue";

export default defineComponent({
    components: {
        Navbar,
        CrearCliente,
        EliminarCliente,
    },
    setup() {
        // Llama al montar el componente
        onMounted(() => {
        clientesRegistrados();
      });


        const search = ref("");
        const datos_cliente = ref([]);
        const datos_cabecera = ref([
            {
                title: "Nit",
                align: "center",
                key: "nit"
            },
            {
                title: "Razon Social",
                align: "center",
                key: "razon_social"
            },  
            {
                title: "Correo",
                align: "center",
                key: "correo"
            },  
            {
                title: "Telefono",
                align: "center",
                key: "telefono"
            },  
            {
                title: "Fecha Creacion",
                align: "center",
                key: "fecha_creacion"
            },  
            {
                title: "Usuario Creador",
                align: "center",
                key: "usuario_creador"
            },
            {
                title: "Estado",
                align: "center",
                key: "estado"
            },
            {
                title: "Eliminar",
                align: "center",
                key: "eliminar"
            },
        ])

        const clientesRegistrados = () => {
            axios
                .get('http://localhost:8500/clientes_registrados')
                .then((res) => {
                    datos_cliente.value = res.data; // Utiliza res.data para obtener los datos de la respuesta
                })
                .catch((error) => {
                    console.error(error);
                });
        };


        return {
            datos_cliente,
            datos_cabecera,
            search,
        };
    },
});
</script>

<template>
    <v-app>
        <Navbar />
        <v-main>
            <v-container>
                <v-row class="d-flex flex-row align-center justify-center">
                    <v-col class="text-center" cols="12" sm="12" xs="12" md="12">
                        <h1>Administracion Clientes</h1>
                    </v-col>
                    <v-col cols="12" sm="12" xs="12" md="4">
                      <div class="d-flex justify-center align-center">
                        <v-text-field
                          v-model="search"
                          prepend-inner-icon="mdi-magnify"
                          density="compact"
                          label="Buscar Por"
                          single-line
                          flat
                          hide-details
                          variant="solo-filled"
                          class="ma-2"
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="12" xs="12" md="4"> 
                      <div class="d-flex justify-center align-center">
                        <CrearCliente class="ma-3" @click="clientesRegistrados"/>
                      </div>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center align-center" fill-height>
                    <v-data-table
                    :search="search"
                    :items="datos_cliente"
                    :headers="datos_cabecera"
                    density="compact"
                    color="#121a21"
                    >
                    <template v-slot:[`item.estado`]="{ item }">
                      <div v-if="item.estado">
                        <v-chip
                          class="ma-2"
                          color="#3a0047"
                          prepend-icon="mdi-account-multiple-check-outline"
                        >
                          ACTIVO
                        </v-chip>
                      </div>
                      <div v-else>
                        <v-chip
                          class="ma-2"
                          color="#F44336"
                          prepend-icon="mdi-account-off"
                        >
                          INACTIVO
                        </v-chip>
                      </div>
                    </template>
                    <template v-slot:[`item.eliminar`]="{ item }">
                        <div class="d-flex justify-center">
                          <EliminarCliente @click="clientesRegistrados" :nit="item.nit"  />
                        </div>
                    </template>
                    </v-data-table>
                </v-row>
            </v-container>
        </v-main>
    </v-app>

</template>

<style scoped></style>