const express = require('express');
const router = express.Router();

// Importamos los controladores
const ConsultaGControlador = require('../controlador/CrearUsuarioControlador');
const LoginControlador = require('../controlador/LoginControlador');

// RUTAS
// Usamos funciones de flecha (req, res) => ... para evitar errores de 'this'
router.get('/', (req, res) => ConsultaGControlador.listar(req, res));
router.post('/crear', (req, res) => ConsultaGControlador.crear(req, res));
router.post('/login', (req, res) => LoginControlador.login(req, res));

module.exports = router;