const express = require('express');
const cors = require('cors');
const app = express();
const crearusuario = require('./vista/RutaCliente'); 

// Middlewares
app.use(cors({
    origin: '*', // Permite solicitudes de cualquier origen. Considera restringirlo en producción.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de cookies de origen cruzado
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/app', crearusuario);//pruductos-usuario

// Ruta base o principal
app.get('/', (req, res) => {
    res.send('API de reposteria funcionando');
});

// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});