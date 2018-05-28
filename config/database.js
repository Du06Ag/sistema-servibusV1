// configuracion de la base de datos
const mysql = require('mysql');
module.exports = mysql.createConnection({
	host: 'bfhpwlqpx-mysql.services.clever-cloud.com',
	user: 'uca3izh26hwoieqm',
	password: 'Hrj2jbNXGnICB9u9nZe',
	database: 'bfhpwlqpx',
	port: 3306
});
