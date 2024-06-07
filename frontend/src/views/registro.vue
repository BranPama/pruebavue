<script>
import { defineComponent, ref, computed } from 'vue'
import axios from "axios";

import Navbar from "../../src/components/Navbar.vue";

export default defineComponent({
    components: {
        Navbar,
    },
    setup() {
        //campos formulario 
        const nombre =  ref("");
        const apellido = ref("");
        const telefono = ref("");
        const correo = ref("")
        const contraseña = ref("");

        const estadoBotonEnviar = ref(false)

        const resetearDatos = () => {
            nombre.value = "";
            apellido.value = "";
            telefono.value = "";
            correo.value = "";
            contraseña.value = "";
        };

        const formApp = ref(null);

        let validarCorreo = ref([
        (v) => !!v || "Correo este campo es requerido!",
        (v) =>
          v.indexOf("@") !== 0 ||
          "El correo electrónico debe tener un nombre de usuario",
        (v) =>
          v.includes("@") || "El correo electrónico debe incluir un símbolo de @",
        //(v) =>
        // v.indexOf(".") - v.indexOf("@") > 1 ||
        //"El correo electrónico debe contener un dominio válido",
        (v) =>
          v.indexOf(".") <= v.length - 3 ||
          "El correo electrónico debe contener extensiones de dominio válida",
        ]);
        let validarVacios = ref([(v) => !!v || "Este campo es requerido"]);
        let telefonoRules = ref([
        (v) => !!v || "El número de teléfono es requerido",
        (v) =>
          (v && v.length <= 10) || "El número de teléfono debe tener 10 dígitos",
        (v) =>
          /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v) ||
          "Formato de número de teléfono no válido",
        ]);

        const crearUsuario = async () => {
        const { valid } = await formApp.value.validate();
        if (valid) {
          axios
            .post(
              `http://localhost:8500/registrar_usuario`,
              {
                nombre: nombre.value,
                apellido: apellido.value,
                telefono: telefono.value,
                correo: correo.value,
                contraseña: contraseña.value,
              },
            )
            .then((res) => {
              console.log(res);
              //formApp.value.reset();
              resetearDatos();
              formApp.value.resetValidation();
            })
            .catch((error) => {
              console.error('Error al enviar datos', error);
            });
        }
        };




        return {
            nombre,
            apellido,
            telefono,
            correo,
            contraseña,
            validarCorreo,
            validarVacios,
            telefonoRules,
            estadoBotonEnviar,
            resetearDatos,
            formApp,
            crearUsuario,

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
                                <h4 
                                    class="text-black"
                                    >
                                    Registrate
                                </h4>
                            </div>
                            <v-form 
                                lazy-validation
                                ref="formApp"
                                @submit.prevent="crearUsuario">
                                <v-text-field 
                                    class="mt-10"
                                    variant="outlined"
                                    density="compact"
                                    v-model="nombre" 
                                    :rules="validarVacios" 
                                    label="Nombre"
                                    prepend-inner-icon="mdi-alpha-n">
                                </v-text-field>

                                <v-text-field 
                                    class=""
                                    variant="outlined"
                                    density="compact"
                                    v-model="apellido" 
                                    :rules="validarVacios" 
                                    label="Apellido"
                                    prepend-inner-icon="mdi-alpha-a">
                                </v-text-field>

                                <v-text-field 
                                    class=""
                                    variant="outlined"
                                    density="compact"
                                    v-model="telefono" 
                                    :rules="telefonoRules" 
                                    label="Telefono"
                                    type="number"
                                    prepend-inner-icon="mdi-phone">
                                </v-text-field>

                                <v-text-field 
                                    class=""
                                    variant="outlined"
                                    density="compact"
                                    v-model="correo" 
                                    :rules="validarCorreo" 
                                    label="Correo"
                                    type="email"
                                    prepend-inner-icon="mdi-email">
                                </v-text-field>
            
                                <v-text-field 
                                    variant="outlined"
                                    density="compact"
                                    v-model="contraseña" 
                                    :rules="validarVacios" 
                                    label="Contraseña"
                                    type="password"
                                    prepend-inner-icon="mdi-lock">
                                </v-text-field>
            
                                <v-btn 
                                    class="text-black bg-yellow" 
                                    rounded="xl"
                                    type="submit" 
                                    block
                                    :loading="estadoBotonEnviar"
                                    >
                                    Registrarme
                                </v-btn>
                            </v-form>
                            <div>
                                <v-divider class="ma-5">O</v-divider>
                                <v-btn 
                                    class="mb-10 text-white bg-green" 
                                    rounded="xl" 
                                    block
                                    to="/"
                                    >
                                    Ingresar
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