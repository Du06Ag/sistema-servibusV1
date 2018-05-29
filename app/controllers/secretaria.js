const db = require('../../config/database'),
      multer = require('multer'),
      path = require('path');
var pdfs = require('./pdfs');

exports.inicio = (req, res) => {
  console.log('GET /indexSecretaria');
  data = {};
  db.query("select contrato.id_contrato, date_format(contrato.fecha_contrato, '%e-%m-%Y') as fecha_contrato, contrato.anticipo_numero, contrato.importe_restante, contrato.estatus, contrato.id_cotizacion, contrato.estado, cotizacion.importe from contrato inner join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion;", (err, rows) =>{
    var contrato = JSON.parse(JSON.stringify(rows));
    db.query("select count(id_contrato) as sin_agendar from contrato where estado='Sin agendar';", (err, rows) => {
      var sinAgendar = JSON.parse(JSON.stringify(rows));
      data['sinAgendar'] = sinAgendar;
      res.render('secretaria/index',{contrato : contrato, data});
    });
  });
}

exports.bitacoraV = (req, res) => {
  res.render('secretaria/generar_bitacora');
}

exports.contrato = (req, res) => {
  res.render('secretaria/generar_contrato');
}

exports.orden = (req, res) => {
  res.render('secretaria/generar_orden');
}

exports.agenda = (req, res) => {
  res.render('secretaria/agendar_servicio');
}

//api buscar cotizacion info
exports.APICotizacionInfo = (req, res) => {
  console.log('GET /api/APICotizacionInfo/:cotizacion');
  console.log(req.params.cotizacion);
  data ={}
  db.query("select importe from cotizacion where id_cotizacion=?;",[req.params.cotizacion], (err, rows) => {
    data['importe'] = JSON.parse(JSON.stringify(rows[0]));
    if(data.importe.importe == ""){
      console.log('no se puede generar el contrato sin a ver puesto el importe de la misma');
      res.redirect('/generar_contrato');
    }else{
      db.query("select concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno)as nombre, persona.estatus, cotizacion.id_cotizacion, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, date_format(fecha_salida, '%e-%m-%Y') as fecha_salida, concat(cotizacion.origen,', ',cotizacion.lugar_salida) as origen, cotizacion.hora_salida, cotizacion.itinerario, date_format(fecha_regreso, '%e-%m-%Y') as fecha_regreso, cotizacion.hora_regreso, cotizacion.importe,cotizacion_tipounidad.id_tipo_unidad,cotizacion_tipounidad.numero_unidades, concat(tipo_unidad.marca_unidad,' ',tipo_unidad.modelo_unidad,' ',tipo_unidad.numero_plazas) as modelo from cotizacion inner join persona on persona.id_persona =cotizacion.id_persona inner join cotizacion_tipounidad on cotizacion_tipounidad.id_cotizacion = cotizacion.id_cotizacion inner join tipo_unidad on tipo_unidad.id_tipo_unidad = cotizacion_tipounidad.id_tipo_unidad where cotizacion.id_cotizacion=?;", [req.params.cotizacion], (err, rows) => {
        var cotiza =JSON.parse(JSON.stringify(rows));
        res.status(200).json(cotiza[0]);
        console.log(cotiza[0]);
      });
    }
  });
}

exports.newContrato = (req, res) =>{
  console.log('POST /registrar/contrato');
  params = [req.body.adelanto, req.body.anticipo, req.body.saldo, req.body.cotizacionId];
  console.log(params);
  db.query("insert into contrato (fecha_contrato, anticipo_letra, anticipo_numero, importe_restante,estatus, id_cotizacion,estado) values (current_date,?,?,?,default,?,default);",params, (err, rows) => {
    if(err){
      console.log(err);
    }else{
      console.log('Success ');
      res.redirect('/indexSecre');
    }
  });
}

exports.editContrato = (req, res) => {
  console.log('GET /editContrato:id_contrato', req.params.id_contrato);
  data={}
  db.query("select concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno)as nombre, contrato.anticipo_letra, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso, concat(cotizacion.origen,', ',cotizacion.lugar_salida) as salida, cotizacion.hora_salida, concat(cotizacion.origen,', ',cotizacion.lugar_salida) as regreso, cotizacion.hora_regreso, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino,  cotizacion.itinerario, cotizacion.importe, contrato.id_contrato, contrato.anticipo_numero,contrato.importe_restante, date_format(contrato.fecha_contrato, '%e-%m-%Y')as fecha_contrato from cotizacion inner join contrato on contrato.id_cotizacion = cotizacion.id_cotizacion inner join persona on persona.id_persona = cotizacion.id_persona where contrato.id_contrato=?;", req.params.id_contrato, (err, rows) => {
    if(err) {
      console.log(err);
    }else {
      data['contrato'] = JSON.parse(JSON.stringify(rows[0]));
      res.render('secretaria/editar_contrato',data);
    }
  });
}

exports.updateContrato = (req, res) => {
  console.log('PUT /update/contrato', req.params.id_contrato);
  parms = [req.body.adelanto, req.body.anticipo, req.body.saldo, req.params.id_contrato];
  console.log(parms);
  db.query("update contrato set anticipo_letra=?, anticipo_numero=?, importe_restante=? where id_contrato=?;", parms, (err, rows) => {
    if(err){
      console.log(err);
    }else{
      console.log('update contrato Success');
      res.redirect('/indexSecre');
    }
  });
}

exports.contratoPDF = (req, res) => {
  console.log('GET /contratoPDF/:folio');
  data = []
  query="select concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno)as nombre, contrato.anticipo_letra, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso, concat(cotizacion.origen,', ',cotizacion.lugar_salida,' a las ',cotizacion.hora_salida) as salida, concat(cotizacion.origen,', ',cotizacion.lugar_salida,' a las ',cotizacion.hora_regreso) as regreso, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, cotizacion.itinerario, cotizacion.importe,contrato.anticipo_numero,contrato.importe_restante, date_format(contrato.fecha_contrato, '%e-%m-%Y')as fecha_contrato from cotizacion inner join contrato on contrato.id_cotizacion = cotizacion.id_cotizacion inner join persona on persona.id_persona = cotizacion.id_persona where contrato.id_contrato=?;";
  db.query(query, [req.params.folio], (err, rows) => {
    contrato = JSON.parse(JSON.stringify(rows[0]));
    if(err)
        res.status(500).json(err);
    else
        pdfs.contratoPDF(contrato, res);
  });

}

//Agenda
exports.APIContratoInfo = (req, res) =>{
  console.log('GET /api/APIContratoInfo/:contrato', req.params.contrato);
  data ={}
  db.query("select contrato.id_contrato, contrato.estatus, contrato.importe_restante, contrato.anticipo_numero, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno)as nombre, cotizacion.destino, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, concat(cotizacion.origen,', ',cotizacion.lugar_salida)as salida, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso, cotizacion.hora_salida, cotizacion.hora_regreso, cotizacion.importe, cotizacion.id_cotizacion from contrato inner join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion inner join persona on persona.id_persona = cotizacion.id_persona where contrato.id_contrato=?;", req.params.contrato, (err, rows) => {
      data['info'] = JSON.parse(JSON.stringify(rows[0]));
      if(data.info.nombre ==""){
        console.log('Error no se encontro el contrato, verifique el folio');
        res.redirect('/agendar_servicio');
      }else{
        db.query("select contrato.id_contrato, contrato.estado,cotizacion_tipounidad.id_cotizacion, cotizacion_tipounidad.id_tipo_unidad,cotizacion_tipounidad.numero_unidades, concat(tipo_unidad.marca_unidad,' ',tipo_unidad.modelo_unidad)as tipo, tipo_unidad.numero_plazas from contrato inner join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion inner join cotizacion_tipounidad on cotizacion_tipounidad.id_cotizacion = cotizacion.id_cotizacion inner join tipo_unidad on tipo_unidad.id_tipo_unidad = cotizacion_tipounidad.id_tipo_unidad where contrato.id_contrato=?;", req.params.contrato, (err, rows) => {
          data['unidades'] = JSON.parse(JSON.stringify(rows[0]));
          if(err){
            console.log(err);
          }else{
            res.status(200).json(data);
            console.log(data);
          }
        });
      }
  });
}

exports.APIContratoUni = (req, res) => {
  console.log('GET /api/APIContratoUni:CONTRATO', req.params.contrato);
  db.query("select contrato.id_contrato, contrato.estado,cotizacion_tipounidad.id_cotizacion, cotizacion_tipounidad.id_tipo_unidad,cotizacion_tipounidad.numero_unidades, concat(tipo_unidad.marca_unidad,' ',tipo_unidad.modelo_unidad)as tipo, tipo_unidad.numero_plazas from contrato inner join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion inner join cotizacion_tipounidad on cotizacion_tipounidad.id_cotizacion = cotizacion.id_cotizacion inner join tipo_unidad on tipo_unidad.id_tipo_unidad = cotizacion_tipounidad.id_tipo_unidad where contrato.id_contrato=?;", req.params.contrato, (err, rows) => {
    var unidades = JSON.parse(JSON.stringify(rows));
    if(err){
      console.log(err);
    }else{
      res.status(200).json(unidades);
      console.log(data);
    }
  });
}

//Agenda
exports.verAgenda = (req, res) => {
  console.log('GET /verAgenda');
  query = "select cotizacion.id_cotizacion as cotizacion, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, concat(cotizacion.origen,', ', cotizacion.lugar_salida) as salida, cotizacion.importe, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno) as nombre, contrato.id_contrato as contrato, date_format(contrato.fecha_contrato,'%e-%m-%Y') as fecha_contrato, agenda.id_agenda as agenda, agenda.estatus, unidad.numero_economico,unidad.numero_placas as placas, tipo_unidad.id_tipo_unidad, concat(tipo_unidad.marca_unidad,' ',tipo_unidad.modelo_unidad) as tipo, operador.id_operador, empleado.id_empleado, concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno) as operador from agenda join contrato on contrato.id_contrato = agenda.id_contrato join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion join persona on persona.id_persona = cotizacion.id_persona join unidad on unidad.numero_economico = agenda.numero_economico join tipo_unidad on tipo_unidad.id_tipo_unidad = unidad.id_tipo_unidad join operador on operador.id_operador = agenda.id_operador join empleado on empleado.id_empleado = operador.id_empleado order by id_agenda desc;";

  db.query(query, (err, rows) =>{
    agenda = JSON.parse(JSON.stringify(rows));
    if(err){
      console.log(err);
    }else{
      res.render('secretaria/ver_agenda',agenda);
    }
  });

}

exports.agendar = (req, res) => {
  console.log('POST/ /Agendar/contratos');
  params=[req.body.contratoId, req.body.unid, req.body.opera]
  console.log(params);

  db.query("insert into agenda (id_contrato,numero_economico,id_operador,estatus) values (?,?,?,default)",params, (err, rows) =>{
    if(err){
      console.log(err);
    }else{
      console.log('inserto en agenda');
      db.query("update contrato set estado='Agendado' where id_contrato=?;", req.body.contratoId, (err, rows) => {
        if(err){
          console.log(err);
        }else{
          console.log('actualizo contrato');
          db.query("update unidad set estatus='Asignada' where numero_economico=?;", req.body.unid, (err, rows) => {
            if(err){
              console.log(err);
            }else{
              console.log('actualizo unidad');
              db.query("update operador set estatus='Asignado' where id_operador=?;", req.body.opera, (err, rows) => {
                if(err){
                  console.log(err);
                }else{
                  console.log('actualizo operador');
                  console.log('Success :)');
                  res.redirect('/ver_agenda');
                }
              });
            }
          });
        }
      });
    }
  });
}

exports.APIFindContrato = (req, res) =>{
  console.log('GET /api/APIFindContrato/:contrato', req.params.contrato);
  query="select cotizacion.id_cotizacion as cotizacion, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, concat(cotizacion.origen,', ', cotizacion.lugar_salida) as salida, cotizacion.hora_salida, cotizacion.hora_regreso, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno) as nombre, contrato.id_contrato as contrato, agenda.id_agenda as agenda, agenda.estatus, unidad.numero_economico,unidad.numero_placas as placas, tipo_unidad.id_tipo_unidad, concat(tipo_unidad.marca_unidad,' ',tipo_unidad.modelo_unidad) as tipo, tipo_unidad.marca_unidad as marca, tipo_unidad.modelo_unidad as modelo, operador.id_operador, empleado.id_empleado, concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno) as operador, operador.numero_licencia, operador.tipo_licencia, operador.vigencia_licencia from agenda join contrato on contrato.id_contrato = agenda.id_contrato join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion join persona on persona.id_persona = cotizacion.id_persona join unidad on unidad.numero_economico = agenda.numero_economico join tipo_unidad on tipo_unidad.id_tipo_unidad = unidad.id_tipo_unidad join operador on operador.id_operador = agenda.id_operador join empleado on empleado.id_empleado = operador.id_empleado where contrato.id_contrato=?;";
  data ={}
  db.query(query, req.params.contrato, (err, rows) => {
      data['info'] = JSON.parse(JSON.stringify(rows[0]));
      if(data['info'] == " "){
        console.log('Error no se encontro el contrato, verifique el folio');
        res.redirect('/generar_bitacora');
      }else{
        res.status(200).json(data);
        console.log(data);
      }
  });
}

exports.newBitacora = (req, res) =>{
  console.log('POST /registrar/Bitacora');
  params = [req.body.viaje, req.body.contratoId];
  console.log(params);
  db.query("insert into bitacora (fecha_bitacora,tipo_traslado,id_contrato) values (current_date,?,?);",params, (err, rows) =>{
    if(err){
      console.log(err);
    }else{
      console.log('Success ');
      res.redirect('/ver_bitacoras');
    }
  });
}


exports.verBitacora = (req, res) => {
  console.log('GET /ver_Bitacoras');
  query="select contrato.id_contrato, date_format(bitacora.fecha_bitacora, '%e-%m-%Y') as fecha_bitacora, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno) as operador, agenda.numero_economico, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso from bitacora join contrato on contrato.id_contrato = bitacora.id_contrato join cotizacion on cotizacion.id_cotizacion = contrato.id_contrato join agenda on agenda.id_contrato = contrato.id_contrato join operador on operador.id_operador = agenda.id_operador join empleado on empleado.id_empleado = operador.id_empleado;";
  db.query(query, (err, rows) =>{
    bitacoras = JSON.parse(JSON.stringify(rows));
    if(err){
      console.log(err);
    }else{
      res.render('secretaria/ver_bitacora',bitacoras);
    }
  });
}

exports.bitacoraPDF = (req, res) => {
  console.log('GET /bitacoraPDF/:folio', req.params.folio);
  data = []
  query="select contrato.id_contrato as contrato, tipo_unidad.marca_unidad as marca, tipo_unidad.modelo_unidad as modelo, unidad.numero_placas as placas, agenda.numero_economico, concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno) as operador, operador.numero_licencia, operador.tipo_licencia, date_format(operador.vigencia_licencia, '%e-%m-%Y') as vigencia_licencia, concat(cotizacion.origen,', ', cotizacion.lugar_salida) as origen, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, cotizacion.hora_salida, cotizacion.hora_regreso, bitacora.tipo_traslado, date_format(bitacora.fecha_bitacora, '%e-%m-%Y') as fecha_bitacora, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno) as nombre from bitacora join contrato on contrato.id_contrato = bitacora.id_contrato join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion join persona on persona.id_persona = cotizacion.id_persona join agenda on agenda.id_contrato = contrato.id_contrato join unidad on unidad.numero_economico = agenda.numero_economico join tipo_unidad on tipo_unidad.id_tipo_unidad = unidad.id_tipo_unidad join operador on operador.id_operador = agenda.id_operador join empleado on empleado.id_empleado = operador.id_empleado where contrato.id_contrato=?;";
  db.query(query, [req.params.folio], (err, rows) => {
    bitacora = JSON.parse(JSON.stringify(rows[0]));
    if(err)
        res.status(500).json(err);
    else
        pdfs.bitacoraPDF(bitacora, res);
  });

}

exports.APIOrdenContrato = (req, res) =>{
  console.log('GET /api/APIOrdenContrato/:contrato', req.params.contrato);
  query="select contrato.id_contrato as contrato, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno) as nombre, persona.telefono, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, concat(cotizacion.origen,', ', cotizacion.lugar_salida) as salida, cotizacion.hora_salida, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso, cotizacion.hora_regreso, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, cotizacion.itinerario, concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno) as operador, unidad.kilometraje_actual from contrato join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion join persona on persona.id_persona = cotizacion.id_persona join agenda on agenda.id_contrato = contrato.id_contrato join unidad on unidad.numero_economico = agenda.numero_economico join tipo_unidad on tipo_unidad.id_tipo_unidad = unidad.id_tipo_unidad join operador on operador.id_operador = agenda.id_operador join empleado on empleado.id_empleado = operador.id_empleado where contrato.id_contrato=?;";
  data ={}
  db.query(query, req.params.contrato, (err, rows) => {
      data['info'] = JSON.parse(JSON.stringify(rows[0]));
      if(data['info'] == " "){
        console.log('Error no se encontro el contrato, verifique el folio');
        res.redirect('/generar_orden');
      }else{
        res.status(200).json(data);
        console.log(data);
      }
  });
}

exports.newOrden = (req, res) =>{
  console.log('POST /registrar/orden_servicio');
  params = [req.body.kmsalida, req.body.contratoId];
  console.log(params);
  db.query("insert into orden_servicio (fecha_orden_servicio,kilometros_salida,id_contrato) values (current_date,?,?);",params, (err, rows) =>{
    if(err){
      console.log(err);
    }else{
      console.log('Success ');
      res.redirect('/ver_ordenServicio');
    }
  });
}

//falta hacer la consulta
exports.verOrden = (req, res) => {
  console.log('GET /ver_Bitacoras');
  query="select orden_servicio.id_contrato as contrato, date_format(orden_servicio.fecha_orden_servicio, '%e-%m-%Y')as fecha_orden_servicio, orden_servicio.id_orden_servicio, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno) as nombre, persona.telefono, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, concat(cotizacion.origen,', ', cotizacion.lugar_salida) as salida, cotizacion.hora_salida, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso, cotizacion.hora_regreso, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, cotizacion.itinerario, unidad.kilometraje_actual, concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno) as operador from orden_servicio join contrato on contrato.id_contrato = orden_servicio.id_contrato join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion join persona on persona.id_persona = cotizacion.id_persona join agenda on agenda.id_contrato = contrato.id_contrato join unidad on unidad.numero_economico = agenda.numero_economico join tipo_unidad on tipo_unidad.id_tipo_unidad = unidad.id_tipo_unidad join operador on operador.id_operador = agenda.id_operador join empleado on empleado.id_empleado = operador.id_empleado;";
  db.query(query, (err, rows) =>{
    ordenes = JSON.parse(JSON.stringify(rows));
    if(err){
      console.log(err);
    }else{
      res.render('secretaria/ver_orden',ordenes);
    }
  });
}

exports.ordenPDF = (req, res) => {
  console.log('GET /ordenPDF/:folio', req.params.folio);
  data = []
  query="select contrato.id_contrato,date_format(orden_servicio.fecha_orden_servicio, '%e-%m-%Y') as fecha_orden_servicio, concat(persona.nombre,' ',persona.ap_paterno,' ',persona.ap_materno) as responsable, persona.telefono, date_format(cotizacion.fecha_salida, '%e-%m-%Y') as fecha_salida, date_format(cotizacion.fecha_regreso, '%e-%m-%Y') as fecha_regreso, cotizacion.hora_regreso, concat(cotizacion.origen,', ', cotizacion.lugar_salida,', a las ',cotizacion.hora_salida) as salida, concat(cotizacion.origen,', ', cotizacion.lugar_salida) as regreso, concat(cotizacion.destino,', ',cotizacion.lugar_destino) as destino, cotizacion.itinerario, orden_servicio.kilometros_salida, concat(empleado.nombre,' ',empleado.ap_paterno,' ',empleado.ap_materno) as operador from orden_servicio join contrato on contrato.id_contrato = orden_servicio.id_contrato join cotizacion on cotizacion.id_cotizacion = contrato.id_cotizacion join persona on persona.id_persona = cotizacion.id_persona join agenda on agenda.id_contrato = contrato.id_contrato join unidad on unidad.numero_economico = agenda.numero_economico join tipo_unidad on tipo_unidad.id_tipo_unidad = unidad.id_tipo_unidad join operador on operador.id_operador = agenda.id_operador join empleado on empleado.id_empleado = operador.id_empleado where contrato.id_contrato=?;";
  db.query(query, [req.params.folio], (err, rows) => {
    orden = JSON.parse(JSON.stringify(rows[0]));
    if(err)
        res.status(500).json(err);
    else
        pdfs.ordenPDF(orden, res);
  });

}
