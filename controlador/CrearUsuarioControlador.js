const CrearUsuarioModelo = require('../modelo/CrearUsuarioModelo'); // Ajusta la ruta según tu estructura

class CrearUsuarioControlador {
  /**
   * Maneja la creación de un nuevo usuario
   */
  async crear(req, res) {
    const { nombres, usuario, contrasena, correo } = req.body;

    // 1. Validación básica de campos obligatorios
    if (!nombres || !usuario || !contrasena || !correo) {
      return res.status(400).json({
        ok: false,
        msg: 'Todos los campos son obligatorios (nombres, usuario, contrasena, correo)'
      });
    }

    try {
      // 2. Verificar si el correo ya existe antes de intentar crear
      const usuarioExistente = await CrearUsuarioModelo.buscarPorCorreo(correo);
      if (usuarioExistente) {
        return res.status(400).json({
          ok: false,
          msg: 'El correo ya está registrado'
        });
      }

      // 3. Llamar al modelo para insertar (el modelo ya tiene el hash de bcrypt)
      const nuevoUsuario = await CrearUsuarioModelo.crear({
        nombres,
        usuario,
        contrasena,
        correo
      });

      // 4. Respuesta exitosa
      return res.status(201).json({
        ok: true,
        msg: 'Usuario creado correctamente',
        data: {
          id: nuevoUsuario.idusuarios,
          nombres: nuevoUsuario.nombres,
          usuario: nuevoUsuario.usuario,
          correo: nuevoUsuario.correo
        }
      });

    } catch (error) {
      console.error('Error en CrearUsuarioControlador:', error);
      return res.status(500).json({
        ok: false,
        msg: 'Error interno del servidor al crear usuario'
      });
    }
  }

  /**
   * Maneja la obtención de todos los usuarios
   */
  async listar(req, res) {
    try {
      const usuarios = await CrearUsuarioModelo.listarTodos();
      return res.json({
        ok: true,
        data: usuarios
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        msg: 'Error al obtener la lista de usuarios'
      });
    }
  }
}

// Exportamos la instancia
module.exports = new CrearUsuarioControlador();