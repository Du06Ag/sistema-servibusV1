const db = require('../../config/database');
const bcrypt =require('bcrypt-nodejs');

const hash = (contrasenia) =>{
	return bcrypt.hashSync(contrasenia, bcrypt.genSaltSync(8), null);
}

exports.agregarUsuario = function(req, res){
			console.log('POST /empleado usuarios new');
			    nombre=req.body.nombre;
					password=hash(req.body.password);
					id_empleado= req.body.id_empleado;
					rol = req.body.rol;
					console.log(nombre +' '+ password +' '+ id_empleado +' '+ rol );
			    data = {}
			    db.query("select * from cat_rol where nombre=?",req.body.rol, (err,rows) => {
						data['puestos'] = JSON.parse(JSON.stringify(rows[0]));
						console.log(data);
						if(err){
							console.log(err);
						}else{
							db.query("SELECT COUNT(*) as result FROM usuario where id_empleado=?",id_empleado, (err, rows) =>{
								data['usuario']=JSON.parse(JSON.stringify(rows[0]));
								console.log(data);
								if(err){
									console.log(err);
								}else{
									console.log(data.usuario.result);
									if(data.usuario.result=='0'){
										db.query("insert into usuario(id_usuario,nombre, password, estado, id_empleado, id_rol) values(default,?,?,'Activo',?,?)",[nombre, password, id_empleado, data.puestos.id_rol], (err, rows) => {
											if(err){
												console.log(err);
											}else{
												console.log('Success');
												res.redirect('/index');
											}
										});
									}else{
										console.log('Usuario repetido error');
      					  	res.redirect('/empleado');
									}
								}
							});
						}
					});
}

exports.actualizarEstado = function(req, res){
		console.log(' PUT /usuario/');
        id_usuario = req.body.id_usuario;
        estado = req.body.estado;
        nuevo_estado = (estado == 'Activo') ? 'Inactivo' : 'Activo';
        db.query('update usuario set estado = ? where id_usuario = ?', [nuevo_estado, id_usuario], function(err){
            if(err){
                console.log(err);
            }else{
                res.status(200).send('#');
            }
        });
    }
