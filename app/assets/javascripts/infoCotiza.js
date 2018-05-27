function modalDetalleCotizacion(id_cotizacion){
  $('#detalle_cotizacion').modal('open');
  cotizacion=``;
  $.get('api/cotiza/'+id_cotizacion, function(data, status){
    cotizacion = `
        <h4>Detalles de la cotizacion</h4>
        <div class="row">
          <div class="col s12 m12 l4 left">
            <label> Id cotizacion </label>
            <input type="text" readonly value="${data.id_cotizacion}"/>
          </div>
        </div>
        <div class="row">
           <div class="col s12 m12 l4 left">
              <label> Nombre del ${data.estatus}</label>
              <input type="text" readonly value="${data.nombre}">
           </div>
           <div class="col s12 m12 l4 push-s4">
              <label> Telefono </label>
              <input type="text" readonly value="${data.telefono}">
           </div>
           <div class="col s12 m12 l4 push-s4">
              <label> Correo electronico </label>
              <input type="text" readonly value="${data.correo_electronico}">
           </div>
        </div>
        <div class="row">
          <div class=" col s12 m12 l12">
            <label> Direccion </label>
            <input type="text" readonly value="${data.direccion}">
            <hr style="background: #31B404; height:3px"/>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m12 l6 left">
            <label> Origen </label>
            <input type="text" readonly value="${data.origen}">
          </div>
          <div class="col s12 m12 l6 push-s6">
            <label> Destino </label>
            <input type="text" readonly value="${data.destino}">
          </div>
        </div>
        <div class="row">
          <div class="col s12 m12 l6">
            <label> Fecha y hora de salida </label>
            <input type="text" readonly value="${data.fecha_salida} hora: ${data.hora_salida}">
          </div>
          <div class="col s12 m12 l6 push-s6">
            <label> Fecha y hora de regreso </label>
            <input type="text" readonly value="${data.fecha_regreso} hora: ${data.hora_regreso}">
          </div>
        </div>
        <div class="row">
          <div class="col s12 m12 l12">
            <label> Itinerario </label>
            <input type="text" readonly value="${data.itinerario}">
          </div>
        </div>
        <div class="row">
          <div class="col s12 m12 l6">
            <label> Tipo de unidad requerida </label>
            <input type="text" readonly value="${data.modelo}"/>
          </div>
          <div class="col s12 m12 l6 push-s6">
            <label> Unidades requeridas </label>
            <input type="text" readonly value="${data.numero_unidades}"/>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m12 l6 right">
            <label> Importe $ </label>
            <input type="text" readonly value="${data.importe}"/>
          </div>
        </div>
      `;
    $('#content-cotizacion').html(cotizacion);
  });
}
