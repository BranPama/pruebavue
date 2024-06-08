const { request, response, query } = require("express");
const pool = require("../db.js");

async function consultarClientes(req, res, query) {
    try {
        const clientes = await pool.query(
            `
            SELECT 
                cpv.id_cliente,
                cpv.fecha_creacion,
                cpv.nit,
                cpv.razon_social, 
                cpv.correo,
                cpv.telefono,
                cpv.usuario_creador,
                cpv.estado
            FROM 
                clientes cpv 
            `
        );

        res.status(200).json(clientes.rows);
    } catch (error) {
        console.error(`Error en controller consultarClientes ${error}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

async function crearCliente(req = request, res = response) {
    try {
  
      const {nit, razon_social, correo, telefono, usuario_creador} = req.body;
  
      const validarClienteSistema = await pool.query(`
          select 
            c.nit 
            from 
          clientes c 
          where 
          c.nit in ($1)
      `, [nit]);
      
      if(validarClienteSistema.rowCount == 0){
        await pool.query(
          `
          INSERT 
          INTO 
          public.clientes
          (nit, razon_social, correo, telefono, usuario_creador)
          VALUES($1, $2, $3, $4, $5) ;
          `, [nit, razon_social.toUpperCase(), telefono, correo, usuario_creador.toUpperCase()]
        );
    
        res.status(201).json({
          msg: 'Se ha registrado un nuevo cliente en el sistema.'
        });
      }else if(validarClienteSistema.rowCount == 1){
        console.log('El usuario ya esta registrado')
      }
    } catch (error) {
      console.error(`Error en controller crearCliente ${error}`);
    }
  };

  async function desactivarCliente(req = request, res = response) {
    try {
      const { nit } = req.body;
  
      await pool.query(
        `
        update
        public.clientes
        set
          estado = false
        where 
        nit in ($1)
        `,
        [nit]
      );
  
      res.status(201).json({
        msg: "Se ha desactivado el cliente en el sistema.",
      });
    } catch (error) {
      console.error(`Error en controller desactivarCliente ${error}`);
      res.status(400).json({
      });
    }
  };


module.exports = {
    consultarClientes,
    crearCliente,
    desactivarCliente,
}