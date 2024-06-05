<script>
import { defineComponent, ref, computed } from 'vue'

import Navbar from "../../src/components/Navbar.vue";

export default defineComponent({
    components: {
        Navbar,
    },
    setup() {


        return {

        };
    },
});
</script>

<template>
    <v-app>
        <!--<Navbar/>-->
        <v-main>
            <v-container>
                <v-row class="d-flex justify-center align-center" fill-height>
                    <v-col cols="12" xs="12" sm="12" md="6" lg="5" xxl="5" class="mt-10">
                        <v-card class="pa-5" append-icon="mdi-login" elevation="8" rounded="xl">
                            <div class="text-center">
                                <h2 
                                    class="text-black"
                                    >Es un placer tenerte de vuelta
                                </h2>
                            </div>
                            <v-form fast-fail @submit.prevent type="GET">
                                <v-text-field 
                                    class="mt-10"
                                    variant="outlined"
                                    density="compact"
                                    v-model="firstName" 
                                    :rules="firstNameRules" 
                                    label="Correo"
                                    prepend-inner-icon="mdi-email">
                                </v-text-field>
            
                                <v-text-field 
                                    variant="outlined"
                                    density="compact"
                                    v-model="lastName" 
                                    :rules="lastNameRules" 
                                    label="Contraseña"
                                    type="password"
                                    prepend-inner-icon="mdi-lock">
                                </v-text-field>
            
                                <v-btn 
                                    class="text-white bg-green" 
                                    rounded="xl"
                                    type="submit" 
                                    block
                                    href="/inicio"
                                    >
                                    Ingresar
                                </v-btn>
                            </v-form>
                            <div>
                                <v-divider class="ma-5">O</v-divider>
                                <v-btn 
                                    class="mb-10 text-black bg-yellow" 
                                    rounded="xl"
                                    type="submit" 
                                    block
                                    
                                    >
                                    Registrarme
                                </v-btn>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
   
</template>

<style scoped>
main{
    background-color: rgb(244, 236, 245);
}
</style>