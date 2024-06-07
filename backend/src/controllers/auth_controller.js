const { request, response, query } = require("express");
const pool = require("../db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function crearUsuario(req = request, res = response) {
    const { nombre, apellido, telefono, correo, contraseña } = req.body;

    try {
    // Verificar si el correo electrónico ya está en uso
    const existingUser = await pool.query(`SELECT correo FROM public.usuarios WHERE correo = $1`, [correo]);
    if (existingUser.rows.length > 0) {
       res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Almacenar el nuevo usuario en la base de datos
    await pool.query(
        `INSERT 
         INTO 
         public.usuarios 
         (nombre, apellido, telefono, correo, contraseña) 
         VALUES ($1, $2, $3, $4, $5)`
         ,
        [nombre, apellido, telefono, correo, hashedPassword]);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
    console.error('Error al registrar usuario:', error);
        console.log(res.status(500).json({ error: 'Error interno del servidor' }))
    }
}

const generateToken = (user) => {
    return jwt.sign({ user }, 'mi_secreto', { expiresIn: '1h' });
  };

async function loginUsuario(req = request, res = response) {
    const { correo, contraseña } = req.body;

    try {
        // Consulta SQL para obtener el correo y la contraseña hasheada del usuario
        const result = await pool.query(
            `SELECT id_usuario, correo, contraseña FROM public.usuarios WHERE correo = $1`,
            [correo]
        );

        // Verificar si se encontró el usuario
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        // Obtener el hash de la contraseña del usuario
        const usuario = result.rows[0];
        const hashedPassword = usuario.contraseña;

        // Verificar si la contraseña proporcionada coincide con el hash almacenado
        const validPassword = await bcrypt.compare(contraseña, hashedPassword);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Si la contraseña es válida, iniciar sesión y enviar respuesta exitosa
        const token = generateToken(usuario);
        res.json({ token , message: 'Inicio de sesión exitoso' });

    } catch (error) {
        // Manejar errores de la consulta SQL y otros errores
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}


module.exports = {
    crearUsuario,
    loginUsuario,
    generateToken,
}