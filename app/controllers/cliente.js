const db = require('../../config/database'),
      multer = require('multer'),
      path = require('path');

exports.APIBuscarPorPersonaEmail = function(req, res){
            console.log('GET /persona/buscar/correo/:email/');
            //console.log("num_empleado => " + req.params.num_empleado)
            db.query("select id_persona, correo_electronico from persona where correo_electronico=?;",[req.params.email], function(err, rows){
                var persona = JSON.parse(JSON.stringify(rows));
                res.status(200).json(persona[0]);
                console.log(persona[0]);
            });
}

exports.cotizacionCli =function(req, res){
  console.log('POST /cliente/registrar/coti');
  id = req.body.id;
  console.log(id);
  if(id ==""){
    console.log('Nuevo cliente');
    params=[req.body.nombre, req.body.ap_paterno, req.body.ap_materno, req.body.telefono, req.body.correo, req.body.calle, req.body.num_interior, req.body.colonia, req.body.codigo_postal]
    console.log(params);
    db.query("insert into persona (nombre, ap_paterno, ap_materno, telefono, correo_electronico, calle, numero_interior, colonia, codigo_postal, estatus) values (?,?,?,?,?,?,?,?,?,'Solicitante');",params, function(err, rows){
      if(err){
        console.log(err);
      }else{
        console.log('inserto persona su id: ' + rows.insertId);
        parmms1=[req.body.ciudad_destino, req.body.lugar_destino, req.body.fecha_salida, req.body.ciudad_origen, req.body.lugar_origen, req.body.hora_salida, req.body.itinerario, req.body.fecha_regreso, req.body.hora_regreso, rows.insertId]
        console.log(parmms1);
        db.query("insert into cotizacion (destino, lugar_destino, fecha_salida, origen, lugar_salida, hora_salida, itinerario, fecha_regreso, hora_regreso, importe, id_persona) values (?,?,?,?,?,?,?,?,?,default,?);",parmms1, function(err, rows){
          if(err){
            console.log(err);
          }else{
            console.log('inserto cotizacion su id: ' + rows.insertId);
            console.log(rows.insertId + ' ' + req.body.tipo + ' ' + req.body.num_unidades);
            db.query("insert into cotizacion_tipounidad (id_cotizacion, id_tipo_unidad, numero_unidades) values ("+rows.insertId+","+req.body.tipo+","+req.body.num_unidades+");", function(err, rows){
              if(err){
                console.log(err);
              }else{
                console.log('success');
                res.redirect('/cotizacion');
              }
            });
          }
        });
      }
    });
  }else{
    console.log('persona registrada su id: ',id);
    parmms1=[req.body.ciudad_destino, req.body.lugar_destino, req.body.fecha_salida, req.body.ciudad_origen, req.body.lugar_origen, req.body.hora_salida, req.body.itinerario, req.body.fecha_regreso, req.body.hora_regreso, id]
    console.log(parmms1);
    db.query("insert into cotizacion (destino, lugar_destino, fecha_salida, origen, lugar_salida, hora_salida, itinerario, fecha_regreso, hora_regreso, importe, id_persona) values (?,?,?,?,?,?,?,?,?,default,?);",parmms1, function(err, rows){
      if(err){
        console.log(err);
      }else{
        console.log('inserto cotizacion su id: ' + rows.insertId);
        console.log(rows.insertId + ' ' + req.body.tipo + ' ' + req.body.num_unidades);
        db.query("insert into cotizacion_tipounidad (id_cotizacion, id_tipo_unidad, numero_unidades) values ("+rows.insertId+","+req.body.tipo+","+req.body.num_unidades+");", function(err, rows){
          if(err){
            console.log(err);
          }else{
            console.log('success');
            res.redirect('/cotizacion');
          }
        });
      }
    });
  }
}
