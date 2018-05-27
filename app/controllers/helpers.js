const db = require('../../config/database');

exports.index = function(req, res) {
        console.log('GET /');
        console.log(req.session);
        console.log(req.user.id_rol);

        db.query("select nombre from cat_rol where id_rol=?",[req.user.id_rol], function(err, rows){
            var rol = JSON.parse(JSON.stringify(rows));
            console.log(rol);

            if(rol[0].nombre == 'Recepcionista'){
                console.log('es recepcionista');
                res.redirect('/indexRecep');

            }else if(rol[0].nombre == 'Gerente'){
                // vista principal del usuario administrador
                console.log(req.user);
                db.query("select usuario.id_usuario, usuario.nombre, usuario.estado, usuario.id_empleado,rol.id_rol,rol.nombre as rol, empleado.estatus from usuario inner join cat_rol as rol on usuario.id_rol = rol.id_rol inner join empleado on usuario.id_empleado = empleado.id_empleado where rol.nombre != 'Gerente' and empleado.estatus='Activo';", function(err, rows){
                    var usuarios = JSON.parse(JSON.stringify(rows));
                    // console.log(usuarios)
                    res.render('gerente/index', {usuarios: usuarios});
                });

            }else if(rol[0].nombre == 'Secretaria'){
                console.log(' es Secretaria');
                res.redirect('/indexSecre');

            }else if(rol[0].nombre == 'Contador'){
                console.log('es Contador');
                res.redirect('/indexConta');
            }
        });
    }
