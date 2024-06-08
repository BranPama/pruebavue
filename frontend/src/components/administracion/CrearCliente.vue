<template>
    <div>
      <v-btn @click="cargarVista" icon color="#121A21" density="compact">
        <v-icon color="white"> mdi-plus </v-icon>
        <v-tooltip activator="parent" location="bottom">Crear usuario</v-tooltip>
      </v-btn>
  
      <v-row justify="space-around">
        <v-col sm="12" md="12" xs="12">
          <v-dialog
            v-model="crearClienteVista"
            transition="dialog-bottom-transition"
            width="800"
          >
            <v-card>
              <v-toolbar dark color="#121A21">
                <v-toolbar-title>Crear nuevo cliente</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <!-- <v-btn variant="text" @click="dialog = false"> Save </v-btn> -->
                  <v-btn icon dark @click="crearClienteVista = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
  
              <v-form
                lazy-validation
                ref="formApp"
                @submit.prevent="crearCliente"
              >
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="4" xs="12" order="1">
                    <div class="text-subtitle-1 text-medium-emphasis ma-2">
                      Nit
                    </div>
                    <v-text-field
                      label="Nit"
                      variant="solo"
                      density="compact"
                      color="#7A7A7A"
                      class="ma-2"
                      v-model="nit"
                      :rules="validarNit"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" xs="12" order="2">
                    <div class="text-subtitle-1 text-medium-emphasis ma-2">
                      Razón social
                    </div>
                    <v-text-field
                      label="Razón social"
                      variant="solo"
                      density="compact"
                      color="#7A7A7A"
                      class="ma-2"
                      v-model="razon_social"
                      :rules="validarVacios"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" xs="3" order="3">
                    <div class="text-subtitle-1 text-medium-emphasis ma-2">
                      Usuario Creador
                    </div>
                    <v-text-field
                      class="ma-2"
                      label="usuario creador"
                      variant="solo"
                      density="compact"
                      v-model="usuario_creador"
                      :rules="validarVacios"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="4" xs="12" order="1">
                    <div class="text-subtitle-1 text-medium-emphasis ma-2">
                      Teléfono
                    </div>
                    <v-text-field
                      label="Teléfono"
                      variant="solo"
                      density="compact"
                      color="#7A7A7A"
                      class="ma-2"
                      v-model="telefono"
                      :rules="telefonoRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" xs="3" order="2">
                    <div class="text-subtitle-1 text-medium-emphasis ma-2">
                      Correo
                    </div>
                    <v-text-field
                      class="ma-2"
                      prepend-inner-icon="mdi-email mr-2 text-grey-darken-4"
                      type="Correo"
                      label="Correo"
                      variant="solo"
                      density="compact"
                      v-model="correo"
                      :rules="validarCorreo"
                    >
                    </v-text-field>
                  </v-col>
                  <!--<v-col cols="12" sm="6" md="4" xs="3" order="3">
                    <div class="text-subtitle-1 text-medium-emphasis ma-2">
                      estado
                    </div>
                    <v-autocomplete
                      label="estado"
                      placeholder="Seleccionar estado"
                      variant="solo"
                      density="compact"
                      color="#7A7A7A"
                      :items="estadoes"
                      item-title="estado"
                      item-value="estado"
                      class="ma-2"
                      :rules="validarVacios"
                    ></v-autocomplete>
                  </v-col>-->
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" md="4" xs="12" order="2"> </v-col>
                  <v-col cols="12" sm="6" md="4" xs="3" order="3"> </v-col>
                </v-row>
                <v-col
                  cols="12"
                  sm="12"
                  xs="12"
                  md="12"
                  class="d-flex justify-center"
                >
                  <v-btn
                    color="#121a21"
                    prepend-icon="mdi-content-save-plus-outline"
                    type="submit"
                    class="mx-2 mb-7 fondo-boton rounded-pill"
                    :loading="estadoBotonGuardar"
                  >
                    Crear Cliente
                  </v-btn>
                </v-col>
              </v-form>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
  </template>
        <script>
  import { defineComponent, ref, onMounted, computed, defineProps } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    name: "crearCliente",
    emits: ["click"],
    components: {},
    props: {
      nit: {
        type: Text,
        require: true,
      },
    },
    setup(props, { emit }) {
      
  
      //Campos formulario
      const nit = ref("");
      const razon_social = ref("");
      const correo = ref("");
      const telefono = ref("");
      const usuario_creador = ref("");


      const cargarVista = () => {
        crearClienteVista.value = true;
      };
      const crearClienteVista = ref(false);
      const estadoBotonGuardar = ref(false);

  
      //Datos
      const estadoes = ref([]);
      const datosFormularioCliente = () => {
        axios
          .get(`/cabecera_formulario_clientes`)
          .then((res) => {
            estadoes.value = res.data[0];
          })
          .catch((error) => {
            console.error(error);
          });
      };
  
      //Configuración de formulario
      //let valid = ref(true);
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
      let validarNit = ref([
        (v) => !!v || "Este campo es requerido",
        (v) => (v && v.length <= 9) || "El Nit debe tener 9 dígitos",
      ]);
  
     
  
      // Funciones
      const resetearDatos = () => {
        nit.value = "";
        razon_social.value = "";
        correo.value = "";
        telefono.value = "";
        usuario_creador.value = "";
      };
  
      const enviarActualizacionVista = () => {
        emit("click");
      };
  
      const crearCliente = async () => {
        const { valid } = await formApp.value.validate();
        if (valid) {
          axios
            .post(
              `http://localhost:8500/registrar_cliente`,
              {
                nit: nit.value,
                razon_social: razon_social.value,
                correo: correo.value,
                telefono: telefono.value,
                usuario_creador: usuario_creador.value,
              },
            )
            .then((res) => {
              console.log(res);
              crearClienteVista.value = false;
              resetearDatos();
              enviarActualizacionVista();
              formApp.value.resetValidation();
            })
            .catch((error) => {
              console.error('Error al enviar datos', error);
            });
        }
      };
  
      return {
        nit,
        razon_social,
        usuario_creador,
        telefono,
        correo,
        estadoes,
        crearClienteVista,
        formApp,
        validarCorreo,
        validarVacios,
        telefonoRules,
        validarNit,
        //Booleanos
        estadoBotonGuardar,
        cargarVista,
        crearCliente,
        datosFormularioCliente,
      };
    },
  });
  </script>
    <style scoped>

    </style>
            