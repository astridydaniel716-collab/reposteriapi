const Conexion = require('./bd/Conexion');
const bcrypt = require('bcrypt'); // 1. Importamos bcrypt

class CrearUsuarioModelo {
  constructor() {
    if (CrearUsuarioModelo.instance) {
      return CrearUsuarioModelo.instance;
    }

    this.db = Conexion;
    CrearUsuarioModelo.instance = this;
  }

  /**
   * Crea un nuevo usuario con contraseña hasheada
   */
  async crear(datosUsuario) {
    // Corregido: cambié el nombre de la variable para evitar conflicto con la propiedad 'usuario'
    const {
      nombres,
      usuario,
      contrasena,
      correo
    } = datosUsuario;

    try {
      // 2. Generar el Hash con salto de 10
      const saltRounds = 10;
      const contrasenaHasheada = await bcrypt.hash(contrasena, saltRounds);

      const query = `
        INSERT INTO usuarios (nombres, usuario, contrasena, correo)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      // 3. Guardamos la versión segura (hasheada)
      const values = [nombres, usuario, contrasenaHasheada, correo];

      const result = await this.db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('❌ Error al crear usuario:', err.message);
      throw err;
    }
  }

  /**

* Busca un usuario por su ID

*/

async buscarPorId(idusuarios) {

const query = `SELECT * FROM usuarios WHERE idusuarios = $1;`;



try {

const result = await this.db.query(query, [idusuarios]);

return result.rows[0] || null;

} catch (err) {

console.error('❌ Error al buscar usuario por ID:', err.message);

throw err;

}

}



/**

* Busca un usuario por su correo

*/

async buscarPorCorreo(correo) {

const query = `SELECT * FROM usuarios WHERE correo = $1;`;



try {

const result = await this.db.query(query, [correo]);

return result.rows[0] || null;

} catch (err) {

console.error('❌ Error al buscar usuario por correo:', err.message);

throw err;

}

}

/**

* Lista todos los usuarios

*/

async listarTodos() {

const query = `SELECT * FROM usuarios ORDER BY idusuarios ASC;`;



try {

const result = await this.db.query(query);

return result.rows;

} catch (err) {

console.error('❌ Error al listar usuarios:', err.message);

throw err;

}

}
}
module.exports = new CrearUsuarioModelo();