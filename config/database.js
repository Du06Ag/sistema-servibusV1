// configuracion de la base de datos
const mysql = require('mysql');
module.exports = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'duky',
	database: 'sistema_servibus_test',
	port: 3306
});
