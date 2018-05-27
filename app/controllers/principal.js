const db = require('../../config/database');
exports.principal = (req, res) => {

  res.render('index');
}

exports.cotizacion = (req, res) => {
  console.log('GET /cotiUser');
        data = {};

        db.query("select * from tipo_unidad;", function(err, rows){
            var unidades = JSON.parse(JSON.stringify(rows));
            data['unidades'] = unidades;

            res.render('cotizacion', data);
        });
}

exports.login = (req, res) => {
  res.render('login');
}
