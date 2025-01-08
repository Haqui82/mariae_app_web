const express = require('express'); // 1.1 Importa el paquete express
const app = express(); // 1.2 Crea una instancia de una aplicación Express

app.use(express.json()); // 2.1 Utiliza el middleware nativo de Express para JSON

app.get('/', (req, res) => {
    res.send('Probando al Servidor - Prueba exitosa! :}'); // 3.1 Ruta por defecto que responde con un mensaje
});

const config = require('./config/config'); // 4.1 Importa la configuración centralizada

const server = app.listen(config.server.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.server.port}`); // 5.1 Mensaje de consola al iniciar el servidor
});

const sequelize = config.db; // 6.1 Importa la conexión desde config

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a MariaDB usando Sequelize'); // 6.2.1 Mensaje de éxito en la conexión
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err); // 6.2.2 Mensaje de error en la conexión
    });

const postRoute = require('./routes/post'); // 7.1 Importa las rutas desde el archivo 'post'
app.use('/servicios', postRoute); // 7.2 Usa las rutas importadas bajo el endpoint '/servicios'

// Manejo de eventos de cierre para liberar el puerto
function handleShutdown() {
    console.log('Cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado.');
        process.exit(0);
    });
}

process.on('SIGINT', handleShutdown); // Para manejar Ctrl+C
process.on('SIGTERM', handleShutdown); // Para manejar otras señales de terminación
