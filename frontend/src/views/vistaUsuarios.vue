<script>
import { defineComponent, ref, computed } from 'vue'

import Navbar from "../../src/components/Navbar.vue";

export default defineComponent({
    components: {
        Navbar,
    },
    setup() {

        const frontend = ref([
            "Vue-Js",
            "Vuetify",
            "Axios",
            "Vue-Router"
        ])
        const backend = ref([
            "Node-JS",
            "Express",
            "Morgan",
            "Pg",
            "Cors"
        ])
        return {
            frontend,
            backend,
        };
    },
});
</script>

<template>
    <v-app>
        <Navbar/>
        <v-main>
            <v-container>
                <v-row class="" fill-height>
                    <v-col class="text-center" cols="12" xs="12" sm="12" md="12">
                        <h1>Inicio Aplicacion</h1>
                    </v-col>
                    <v-col class="text-center" cols="12" xs="12" sm="12" md="12">
                        <p>Se crea la aplicacion mediante las tecnologias de:</p>
                    </v-col>
                    <v-row class="d-flex align-start justify-center">
                        <v-col cols="12" xs="12" sm="12" md="4">
                            <v-list class="text-center">
                                <h2>Frontend</h2>
                                <v-list-item
                                class="text-blue"
                                v-for="(lenFrond) in frontend"
                                >
                                {{ lenFrond }}
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="4">
                            <v-list class="text-center">
                                <h2>Backend</h2>
                                <v-list-item
                                class="text-yellow"
                                v-for="(lenback) in backend"
                                >
                                {{ lenback }}                                
                                </v-list-item>
                            </v-list>
                        </v-col>    
                    </v-row>
                    <v-col class="text-center" cols="12" xs="12" sm="12" md="12">
                        <p>Autor : Bran Andres Pama</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
   
</template>

<style scoped>

</style>