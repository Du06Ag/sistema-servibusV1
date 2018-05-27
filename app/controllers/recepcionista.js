const db = require('../../config/database'),
      multer = require('multer'),
      path = require('path');

exports.ini = (req, res) => {
  console.log('GET /ini cotizacion');
  data = {}
  db.query("select concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno)as nombre, persona.estatus,persona.telefono, persona.correo_electronico, concat(persona.calle,' ',persona.numero_interior,' ',persona.colonia,' ',persona.codigo_postal)as direccion, cotizacion.id_cotizacion, date_format(fecha_salida, '%e-%m-%Y') as fecha_salida, cotizacion.itinerario,  date_format(fecha_regreso, '%e-%m-%Y') as fecha_regreso, cotizacion.importe, cotizacion.id_persona, cotizacion_tipounidad.id_tipo_unidad, cotizacion_tipounidad.numero_unidades, concat(tipo_unidad.marca_unidad,' ',tipo_unidad.modelo_unidad,' ',tipo_unidad.numero_plazas) as modelo from cotizacion inner join persona on persona.id_persona =cotizacion.id_persona inner join cotizacion_tipounidad on cotizacion_tipounidad.id_cotizacion = cotizacion.id_cotizacion inner join tipo_unidad on tipo_unidad.id_tipo_unidad = cotizacion_tipounidad.id_tipo_unidad;", function(err, rows){
      var cotizaciones = JSON.parse(JSON.stringify(rows));
      db.query("select count(id_cotizacion) as cotizaciones_pendientes from cotizacion where importe=0;", function(err, rows){
        var pendientes = JSON.parse(JSON.stringify(rows));
        data['pendientes']=pendientes;
        res.render('recepcionista/index', {cotizaciones: cotizaciones,data});
        console.log(data);
      });
      // console.log(usuarios)
  });
}

exports.coti = (req, res) => {
  console.log('GET /cotiPersonal');
        data = {};

        db.query("select * from tipo_unidad;", function(err, rows){
            var unidades = JSON.parse(JSON.stringify(rows));
            data['unidades'] = unidades;

            res.render('recepcionista/cotizacion_presencial', data);
        });

}

exports.registrar_coti = (req, res) => {
  console.log('POST /registrar_coti');
  id=req.body.id_persona;
  console.log(id);
  if(id == ""){
    console.log('Nuevo cliente');
    params=[req.body.nombre, req.body.ap_paterno, req.body.ap_materno, req.body.telefono, req.body.correo, req.body.calle, req.body.num_interior, req.body.colonia, req.body.codigo_postal]
    console.log(params);
    db.query("insert into persona (nombre, ap_paterno, ap_materno, telefono, correo_electronico, calle, numero_interior, colonia, codigo_postal, estatus) values (?,?,?,?,?,?,?,?,?,'Solicitante');", params, function(err, rows){
      if(err){
        console.log('error al insertar persona ' + err);
      }else{
        console.log('inserto persona su id: ' + rows.insertId);
        parmms1=[req.body.ciudad_destino, req.body.lugar_destino, req.body.fecha_salida, req.body.ciudad_origen, req.body.lugar_origen, req.body.hora_salida, req.body.itinerario, req.body.fecha_regreso, req.body.hora_regreso, rows.insertId]
        console.log(parmms1);
        db.query("insert into cotizacion (destino, lugar_destino, fecha_salida, origen, lugar_salida, hora_salida, itinerario, fecha_regreso, hora_regreso, importe, id_persona) values (?,?,?,?,?,?,?,?,?,default,?);", parmms1, function(err, rows){
          if(err){
            console.log('error al insertar cotizacion ' + err);
          }else{
            console.log('inserto cotizacion su id: ' + rows.insertId);
            console.log(rows.insertId + ' ' + req.body.tipo + ' ' + req.body.num_unidades);
            db.query("insert into cotizacion_tipounidad (id_cotizacion, id_tipo_unidad, numero_unidades) values ("+rows.insertId+","+req.body.tipo+","+req.body.num_unidades+");", function(err, rows){
              if(err){
                console.log('error al insertar cotizacion_tipounidad ' + err);
              }else{
                console.log('success');
                res.redirect('/indexRecep');
              }
            });
          }
        });
      }
    });
  }else{
    console.log('persona registrada su id: ' + id);
    parmms1=[req.body.ciudad_destino, req.body.lugar_destino, req.body.fecha_salida, req.body.ciudad_origen, req.body.lugar_origen, req.body.hora_salida, req.body.itinerario, req.body.fecha_regreso, req.body.hora_regreso, req.body.id_persona]
    console.log(parmms1);
    db.query("insert into cotizacion (destino, lugar_destino, fecha_salida, origen, lugar_salida, hora_salida, itinerario, fecha_regreso, hora_regreso, importe, id_persona) values (?,?,?,?,?,?,?,?,?,default,?);", parmms1, function(err, rows){
      if(err){
        console.log('error al insertar cotizacion ' + err);
      }else{
        console.log('inserto cotizacion su id: ' + rows.insertId);
        console.log(rows.insertId + ' ' + req.body.tipo + ' ' + req.body.num_unidades);
        db.query("insert into cotizacion_tipounidad (id_cotizacion, id_tipo_unidad, numero_unidades) values ("+rows.insertId+","+req.body.tipo+","+req.body.num_unidades+");", function(err, rows){
          if(err){
            console.log('error al insertar cotizacion_tipounidad ' + err);
          }else{
            console.log('success');
            res.redirect('/indexRecep');
          }
        });
      }
    });
  }

}

exports.editar_cotizacion = (req, res) =>{
  console.log('GET /editar_cotizacion/:id_cotizacion');
  data = {}
  query = "select persona.id_persona, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno) as nombre, persona.estatus, persona.telefono, persona.correo_electronico, cotizacion.id_cotizacion,cotizacion.destino, cotizacion.lugar_destino, date_format(fecha_salida, '%Y-%m-%e') as fecha_salida, cotizacion.origen, cotizacion.lugar_salida, cotizacion.hora_salida, cotizacion.itinerario, date_format(fecha_regreso, '%Y-%m-%e') as fecha_regreso, cotizacion.hora_regreso, cotizacion.importe,cotizacion_tipounidad.id_tipo_unidad,cotizacion_tipounidad.numero_unidades, tipo_unidad.marca_unidad ,tipo_unidad.modelo_unidad, tipo_unidad.numero_plazas from cotizacion inner join persona on persona.id_persona =cotizacion.id_persona inner join cotizacion_tipounidad on cotizacion_tipounidad.id_cotizacion = cotizacion.id_cotizacion inner join tipo_unidad on tipo_unidad.id_tipo_unidad = cotizacion_tipounidad.id_tipo_unidad where cotizacion.id_cotizacion=?;";
  db.query("select * from tipo_unidad", (err, rows) =>{
    data['tipo_unidad'] = JSON.parse(JSON.stringify(rows));
    db.query(query, [req.params.id_cotizacion], function(err, rows){
      data['cotizacion'] = JSON.parse(JSON.stringify(rows[0]));
      res.render('recepcionista/editar_coti', data);
      console.log(data);
    });
  });
}

exports.update_coti = (req, res) =>{
  console.log('PUT /cotiza/edit/:id_cotizacion');
  parms1=[req.body.ciudad_destino, req.body.lugar_destino, req.body.fecha_salida, req.body.ciudad_origen, req.body.lugar_origen, req.body.hora_salida, req.body.itinerario, req.body.fecha_regreso, req.body.hora_regreso, req.body.importe, req.body.idpersona, req.params.id_cotizacion]
  console.log(parms1);
  db.query("update cotizacion set destino=?, lugar_destino=?, fecha_salida=?, origen=?, lugar_salida=?, hora_salida=?, itinerario=?, fecha_regreso=?, hora_regreso=?, importe=?, id_persona=? where id_cotizacion=?;", parms1, (err, result) =>{
    if(err){
      console.log('error al actualizar cotizacion ' + err);
    }else{
      console.log('se actualizo cotizacion');
      console.log('success');
      res.redirect('/indexRecep');
    }
  });
}

exports.verPersona = (req, res) =>{
  console.log('GET /persona/editar/:id_persona');
  data={}
  db.query("select * from persona where id_persona=?", [req.params.id_persona], (err, rows) =>{
    data['persona'] = JSON.parse(JSON.stringify(rows[0]));
    res.render('recepcionista/edit_persona', data);
    console.log(data);
  });
}

exports.editarPersona = (req, res) => {
  console.log('PUT /persona/update');
  parms=[req.body.nombre, req.body.ap_paterno, req.body.ap_materno, req.body.telefono, req.body.correo, req.body.calle, req.body.num_interior, req.body.colonia, req.body.codigo_postal, req.body.estado, req.body.idpersona]
  console.log(parms);
  db.query("update persona set nombre=?, ap_paterno=?, ap_materno=?, telefono=?, correo_electronico=?, calle=?, numero_interior=?, colonia=?, codigo_postal=?, estatus=? where id_persona=?;", parms, (err, result) =>{
    if(err){
      console.log('error al actualizar persona ' + err);
    }else{
      console.log('se actualizo cotizacion');
      res.redirect('/cotizacion_presencial');
    }
  });

}

//API :- Info Cotizacion
exports.APIDetalleCotizacion = function(req, res){
  console.log('llego api');
  query = "select concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno)as nombre, persona.estatus, persona.telefono, persona.correo_electronico, concat('Calle   ',persona.calle,'      ',persona.numero_interior,'      Colonia    ',persona.colonia,'     Codigo postal    ',persona.codigo_postal)as direccion, cotizacion.id_cotizacion, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, date_format(fecha_salida, '%e-%m-%Y') as fecha_salida, concat(cotizacion.origen,', ',cotizacion.lugar_salida) as origen, cotizacion.hora_salida, cotizacion.itinerario, date_format(fecha_regreso, '%e-%m-%Y') as fecha_regreso, cotizacion.hora_regreso, cotizacion.importe,cotizacion_tipounidad.id_tipo_unidad,cotizacion_tipounidad.numero_unidades, concat(tipo_unidad.marca_unidad,' ',tipo_unidad.modelo_unidad,' ',tipo_unidad.numero_plazas) as modelo from cotizacion inner join persona on persona.id_persona =cotizacion.id_persona inner join cotizacion_tipounidad on cotizacion_tipounidad.id_cotizacion = cotizacion.id_cotizacion inner join tipo_unidad on tipo_unidad.id_tipo_unidad = cotizacion_tipounidad.id_tipo_unidad where cotizacion.id_cotizacion=?;";
  console.log(req.params.id_cotizacion);
  db.query(query, [req.params.id_cotizacion], function(err, rows){
    if(err){
      res.status(500).json({error: 'Error al realizar la busqueda'});
    }else{
      var cotizacion = JSON.parse(JSON.stringify(rows[0]));
      res.status(200).json(cotizacion);
      console.log(cotizacion);
    }
  });
}

//api busca por nombre personas
exports.APIBuscarPorPersonaNombre = function(req, res){
            console.log('GET /api/persona/buscar/nombre/:nombre/')
            db.query('select * from persona where nombre LIKE "%'+req.params.nombre+'%";', function(err, rows){
                var personas = JSON.parse(JSON.stringify(rows));
                res.status(200).json(personas);
                console.log(personas);
            });
        }
