const db = require('../../config/database'),
      multer = require('multer'),
      path = require('path');


exports.principal = (req, res) => {
        db.query("select usuario.id_usuario, usuario.nombre, usuario.estado, usuario.id_empleado,rol.id_rol,rol.nombre as rol, empleado.estatus from usuario inner join cat_rol as rol on usuario.id_rol = rol.id_rol inner join empleado on usuario.id_empleado = empleado.id_empleado where rol.nombre != 'Gerente' and empleado.estatus='Activo';", function(err, rows){
            var usuarios = JSON.parse(JSON.stringify(rows));
            // console.log(usuarios)
            res.render('gerente/index', {usuarios: usuarios});
        });
  //res.render('gerente/index');
}

//baja de Empleados
exports.bajaEmpleado = function(req, res){
		console.log(' PUT /empleado Baja/');
        id_empleado = req.body.id_empleado;
        estado = req.body.estado;
        nuevo_estado = (estado == 'Activo') ? 'Baja' : 'Activo';
        data = {}
        db.query("select puesto from empleado where id_empleado=?;", id_empleado, function (err, rows){
          data['puesto'] = JSON.parse(JSON.stringify(rows[0]));
          if(data.puesto.puesto != "Operador"){
            db.query("update empleado set estatus = ? where id_empleado = ?", [nuevo_estado, id_empleado], function(err){
              if(err){
                console.log(err);
              }else{
                db.query("update usuario set estado='Inactivo' where id_empleado=?;",id_empleado, (err, rows) =>{
                  if(err){
                    console.log(err);
                  }else{
                    res.status(200).send('#');
                  }

                });
              }
            });
          }else{
            db.query('update empleado set estatus = ? where id_empleado = ?', [nuevo_estado, id_empleado], function(err){
                if(err){
                    console.log(err);
                }else{
                  res.status(200).send('#');
                }
            });
          }
        });
    }

exports.newEmpleado = (req, res) => {
      console.log('GET /newEmpleado/');
            data = {};

            db.query("select * from cat_rol where nombre!='Gerente';", function(err, rows){
                var roles = JSON.parse(JSON.stringify(rows));
                data['roles'] = roles;

                res.render('gerente/nuevo_empleado', data);
            });

}

//post
exports.agregarEmpleado = (req, res) => {
      console.log('POST /agregarEmpleado');
      if(req.body.roles !="Operador"){
        params=[req.body.nombre, req.body.ap_paterno, req.body.ap_materno, req.body.telefono, req.body.correo, req.body.calle, req.body.num_interior, req.body.colonia, req.body.codigo_postal, req.body.sexo, req.body.estado_civil, req.body.fecha_naci, req.body.roles]
        console.log(params);
        db.query("insert into empleado (nombre, ap_paterno, ap_materno, telefono, correo_electronico, calle, numero_interior, colonia, codigo_postal, sexo, estado_civil, fecha_nacimiento, puesto) values (?,?,?,?,?,?,?,?,?,?,?,?,?);", params, (err, rows) => {
          if(err){
            console.log(err);
          }else{
            console.log('Success');
            res.redirect('/ver_empleados');
          }
        });
      }else{
        params1=[req.body.nombre, req.body.ap_paterno, req.body.ap_materno, req.body.telefono, req.body.correo, req.body.calle, req.body.num_interior, req.body.colonia, req.body.codigo_postal, req.body.sexo, req.body.estado_civil, req.body.fecha_naci, req.body.roles]
        console.log(params1);
        db.query("insert into empleado (nombre, ap_paterno, ap_materno, telefono, correo_electronico, calle, numero_interior, colonia, codigo_postal, sexo, estado_civil, fecha_nacimiento, puesto) values (?,?,?,?,?,?,?,?,?,?,?,?,?);", params1, (err, rows) => {
          if(err){
            console.log(err);
          }else{
            console.log('inserto empleado su id: ' + rows.insertId );
            params2=[req.body.tipo_pay, req.body.num_licencia, req.body.tipo_lic, req.body.vigencia, rows.insertId]
            console.log(params2);
            db.query("insert into operador (tipo_pago, numero_licencia, tipo_licencia, vigencia_licencia, id_empleado) values(?,?,?,?,?);", params2, (err, rows) =>{
              if(err){
                console.log(err);
              }else{
                console.log('Success new operador');
                res.redirect('/ver_empleados');
              }
            });
          }
        });
      }
    }

exports.ver_empleados = (req, res) =>{
  console.log('GET /ver_empleados');
  db.query("select id_empleado, concat(nombre,' ', ap_paterno,' ',ap_materno) as nombre, puesto, estatus from empleado where puesto != 'Gerente' and estatus='Activo';", function(err, rows){
      var empleados = JSON.parse(JSON.stringify(rows));
      console.log(empleados);
      // console.log(usuarios)
      res.render('gerente/ver_empleados', {empleados: empleados});
  });

}

exports.findEmp = (req, res) =>{
    console.log('GET /Informacion_emp/:id');
    console.log(req.params.id_empleado);
    data = {}

    db.query("select puesto from empleado where id_empleado=?;",[req.params.id_empleado], function(err, rows){
      data['puesto']=JSON.parse(JSON.stringify(rows[0]));
      if(data.puesto.puesto == "Operador"){
        db.query("select empleado.id_empleado,concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno)as nombre, empleado.telefono, empleado.correo_electronico, concat('Call. ',empleado.calle,' ',empleado.numero_interior,' Col. ',empleado.colonia,' C.P. ',empleado.codigo_postal)as direccion, empleado.sexo,empleado.estado_civil, date_format(empleado.fecha_nacimiento,'%e-%m-%Y')as fecha_nacimiento, empleado.puesto, operador.id_operador,operador.tipo_pago,operador.numero_licencia,operador.tipo_licencia, operador.vigencia_licencia,operador.estatus from empleado inner join operador on operador.id_empleado = empleado.id_empleado where empleado.id_empleado=?;",[req.params.id_empleado], function(err, data){
          //var info_emp = JSON.parse(JSON.stringify(rows[0]));
          res.render('gerente/ver_informacionOpe',{info_emp : data[0]});
          console.log(data[0]);
        });
      }else{
        db.query("select id_empleado,concat(nombre,' ',ap_paterno,' ',ap_materno)as nombre,telefono, correo_electronico, concat('Call. ',calle,' ',numero_interior,' Col. ',colonia,' C.P. ',codigo_postal)as direccion,sexo,estado_civil, date_format(fecha_nacimiento,'%e-%m-%Y')as fecha_nacimiento, puesto from empleado where id_empleado=?;",[req.params.id_empleado], function(err, data){
          //data['empleado']=JSON.parse(JSON.stringify(rows[0]));
          res.render('gerente/ver_informacion', {info_emp : data[0]});
          console.log(data[0]);
        });
      }
    });
}

exports.findEmpleado = (req, res) =>{
    console.log('GET /empleado_info/:id');
    db.query("select id_empleado,concat(nombre,' ',ap_paterno,' ',ap_materno)as nombre,telefono, correo_electronico, concat('Call. ',calle,' ',numero_interior,' Col. ',colonia,' C.P. ',codigo_postal)as direccion,sexo,estado_civil, date_format(fecha_nacimiento,'%e-%m-%Y')as fecha_nacimiento, puesto from empleado where id_empleado=?;",[req.params.id_empleado], function(err, data){
      res.render('gerente/viewinfo_empleado', {info_emp : data[0]});
    });
}

exports.editEmpleado = (req, res) => {
  console.log('GET /edit_empleado/:id');
  data = {}
  db.query("select puesto from empleado where id_empleado=?;",[req.params.id_empleado], function(err, rows){
    data['puesto']=JSON.parse(JSON.stringify(rows[0]));
    if(data.puesto.puesto == "Operador"){
      db.query("select empleado.id_empleado,empleado.nombre,empleado.ap_paterno,empleado.ap_materno,empleado.telefono, empleado.correo_electronico,empleado.calle,empleado.numero_interior,empleado.colonia,empleado.codigo_postal,empleado.sexo,empleado.estado_civil, date_format(empleado.fecha_nacimiento,'%Y-%m-%e')as fecha_nacimiento, empleado.puesto, operador.id_operador,operador.tipo_pago,operador.numero_licencia,operador.tipo_licencia,date_format(operador.vigencia_licencia,'%Y-%m-%e')as vigencia_licencia,operador.estatus from empleado inner join operador on operador.id_empleado = empleado.id_empleado where empleado.id_empleado=?;",[req.params.id_empleado],function(err, rows){
        data['empleado']=JSON.parse(JSON.stringify(rows[0]));
        res.render('gerente/editar_empleado',data);
        console.log(data);
      });
    }else{
      db.query("select id_empleado, nombre, ap_paterno, ap_materno ,telefono, correo_electronico, calle, numero_interior, colonia, codigo_postal, sexo, estado_civil, date_format(fecha_nacimiento,'%Y/%m/%e')as fecha_nacimiento, puesto from empleado where id_empleado=?;",[req.params.id_empleado], function(err, rows){
        data['empleado'] = JSON.parse(JSON.stringify(rows[0]));
        res.render('gerente/editar_empleado',data);
        console.log(data);
      });
    }

});
}
//put updateEmpleado
exports.updateEmpleado = (req, res) =>{
  console.log('PUT /empleado/editar/:id_empleado');
  data = {}
  db.query("select puesto from empleado where id_empleado=?;",[req.params.id_empleado], function(err, rows){
    data['puesto']=JSON.parse(JSON.stringify(rows[0]));
    if(data.puesto.puesto =="Operador"){
      parms = [req.body.nombre, req.body.ap_paterno, req.body.ap_materno, req.body.telefono, req.body.correo, req.body.calle, req.body.num_interior, req.body.colonia, req.body.codigo_postal, req.body.sexo, req.body.estado_civil, req.body.fecha_naci, req.body.puesto, req.body.id_empleado];
      console.log(parms);
      db.query("update empleado set nombre=?, ap_paterno=?, ap_materno=?, telefono=?, correo_electronico=?, calle=?, numero_interior=?, colonia=?, codigo_postal=?, sexo=?, estado_civil=?, fecha_nacimiento=?, puesto=? where id_empleado=?;", parms, (err, result) => {
        if(err){
          console.log(err);
        }else{
          parms=[req.body.tipo_pay, req.body.num_licencia, req.body.tipo_lic, req.body.vigencia,req.params.id_empleado];
          console.log('datos del operador',parms);
          db.query("update operador set tipo_pago=?, numero_licencia=?, tipo_licencia=?, vigencia_licencia=? where id_empleado=?;",parms, (err, result) =>{
            if(err){
              console.log(err);
            }else{
              console.log(result);
              res.redirect('/ver_empleados');
            }
          });
        }
      });
    }else{
      parms = [req.body.nombre, req.body.ap_paterno, req.body.ap_materno, req.body.telefono, req.body.correo, req.body.calle, req.body.num_interior, req.body.colonia, req.body.codigo_postal, req.body.sexo, req.body.estado_civil, req.body.fecha_naci, req.body.puesto, req.body.id_empleado];
      console.log(parms);
      db.query("update empleado set nombre=?, ap_paterno=?, ap_materno=?, telefono=?, correo_electronico=?, calle=?, numero_interior=?, colonia=?, codigo_postal=?, sexo=?, estado_civil=?, fecha_nacimiento=?, puesto=? where id_empleado=?;", parms, (err, result) => {
        if(err){
          console.log(err);
        }else{
          console.log(result);
          res.redirect('/ver_empleados');
        }
      });
    }
  });
}

// GET /empleado
exports.empleado = function(req, res){
			console.log('GET /empleado');
            // render nuevo empleado
            db.query("select id_rol, nombre from cat_rol where nombre != 'Gerente' and nombre != 'Operador';", function(err, rows){
                var roles = JSON.parse(JSON.stringify(rows));
                res.render('gerente/empleado', {roles: roles, messages: req.flash('info')});
            });
        }

//API: empleado

exports.APIBuscarPorNumEmpleado = function(req, res){
            console.log('GET /api/empleado/:num_empleado/');
            //console.log("num_empleado => " + req.params.num_empleado)
            db.query("select id_empleado, concat(nombre,' ',ap_paterno,' ',ap_materno) as nombre, telefono, correo_electronico, sexo, puesto from empleado where estatus='Activo' and puesto !='Gerente' and puesto!='Operador' and id_empleado=?;",[req.params.num_empleado], function(err, rows){
                var empleado = JSON.parse(JSON.stringify(rows));
                res.status(200).json(empleado[0]);
            });
}

exports.newUnidad = (req, res) => {
  console.log('GET /newUnidad');
        data = {};

        db.query("select * from tipo_unidad;", function(err, rows){
            var unidades = JSON.parse(JSON.stringify(rows));
            data['unidades'] = unidades;

            res.render('gerente/registrar_unidad', data);
        });
}

//post
exports.agregarUnidad = (req, res) => {
      console.log('POST /agregarUnidad');
      params=[req.body.noEconomico, req.body.noPlacas, req.body.kmActual, req.body.tipo]
      console.log(params);
      db.query("insert into unidad (numero_economico, numero_placas, kilometraje_actual, estatus, estado, id_tipo_unidad) values (?,?,?,DEFAULT,DEFAULT,?);", params, function(err, rows){
        if(err){
          console.log(err);
        }else{
          console.log('success');
        }
      });
      res.redirect('/ver_unidades');
    }

exports.editUnidad = (req, res) => {
  console.log('GET /editUnidad/:numero_economico');
  console.log(req.params.numero_economico);
  data={}
  db.query("select estatus from unidad where numero_economico=?;",req.params.numero_economico, (err, rows) => {
    data['estatus'] = JSON.parse(JSON.stringify(rows[0]));
    console.log(data['estatus']);
    if(data.estatus.estatus == "En servicio"){
      console.log('no se puede editar unidad en servicio');
      res.redirect('/ver_unidades');
    }else{
      db.query("select unidad.numero_economico, unidad.numero_placas, unidad.kilometraje_actual, unidad.estatus, unidad.estado, tipo_unidad.id_tipo_unidad, tipo_unidad.marca_unidad, tipo_unidad.modelo_unidad, tipo_unidad.numero_plazas from unidad inner join tipo_unidad on tipo_unidad.id_tipo_unidad = unidad.id_tipo_unidad where unidad.numero_economico =?;",req.params.numero_economico, (err, rows) =>{
        data['unidad'] = JSON.parse(JSON.stringify(rows[0]));
        if(err){
          console.log(err);
        }else{
          res.render('gerente/editar_unidad', data);
          console.log(data['unidad']);
        }
      });
    }
  });
}

//put updateUnidad
exports.updateUnidad = (req, res) =>{
  console.log('PUT /unidad/editar/:id_empleado');

  parms = [req.body.noPlacas,req.body.kmActual,req.body.estatus,req.body.tipo,req.body.noEconomico];
  console.log(parms);
  db.query("update unidad set numero_placas=?, kilometraje_actual=?, estatus=?, id_tipo_unidad=? where numero_economico=?;", parms, (err, result) => {
      console.log(err);
      console.log(result);
      res.redirect('/ver_unidades');
  });
}

exports.viewUnidades = (req, res) => {
  console.log('GET /viewUnidades');
  db.query("select unidad.numero_economico, unidad.numero_placas, unidad.kilometraje_actual, unidad.estatus, unidad.estado, tipo_unidad.id_tipo_unidad, tipo_unidad.marca_unidad, tipo_unidad.modelo_unidad, tipo_unidad.numero_plazas from unidad join tipo_unidad on unidad.id_tipo_unidad = tipo_unidad.id_tipo_unidad where unidad.estado != 'Baja'", function(err, rows){
      var unidades = JSON.parse(JSON.stringify(rows));
      console.log(unidades)
      res.render('gerente/ver_unidades', {unidades: unidades});
  });
}

exports.unidadEstatus = function(req, res){
		console.log(' PUT /unidad/');
        num_eco = req.body.numero_economico;
        estado = req.body.estado;
        console.log(num_eco ," ",estado);
        nuevo_estado = (estado == 'Activo') ? 'Baja' : 'Activo';
        db.query('update unidad set estado = ? where numero_economico = ?', [nuevo_estado, num_eco], function(err){
            if(err){
                console.log(err);
            }else{
                res.status(200).send('#');
            }
        });
    }

exports.borrarUnidad = function(req, res){
    		console.log(' GET /borrarUnidad:numero_economico');
        num_eco = req.params.numero_economico;
        console.log(num_eco);
        data = {}
        db.query('select estatus from unidad where numero_economico=?;', num_eco, (err, rows) =>{
          data['estatus'] = JSON.parse(JSON.stringify(rows[0]));
          if(data.estatus.estatus =="En servicio"){
            console.log('No puede dar de baja a una unidad en servicio');
            res.redirect('/ver_unidades');
          }else{
            db.query("update unidad set estado='Baja' where numero_economico=?;", num_eco, (err, rows) =>{
              if(err){
                console.log(err);
              }else{
                console.log('Success');
                res.redirect('/ver_unidades');
              }
            });
          }
        });
}
