function modalDetalleReportes(id_contrato) {
  $('#detalle_reporte').modal('open');
  reporte=``;
  $.get('api/reportesDetalles/'+id_contrato, function(data, status){
    reporte = `
              <h4 class="center">Reporte de rendimiento y control del viaje de la unidad No. ${data.unidad}</h4>
              <div class="row">
                <div class="col s12 m12 l3 left">
                  <label style="color:blue"> No. de Unidad </label>
                  <input type="text" readonly value="${data.unidad}" />
                </div>
              </div>
              <div class="row">
                <div class="col s12 m12 l3">
                  <label style="color:blue"> Operador </label>
                  <input type="text" readonly value="${data.operador}" />
                </div>
                <div class="col s12 m12 l3">
                  <label style="color:blue"> Fecha de salida </label>
                  <input type="text" readonly value="${data.fecha_salida}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Hora de salida </label>
                  <input type="text" readonly value="${data.hora_salida}" />
                </div>
                <div class="col s12 m12 l3">
                  <label style="color:blue"> Fecha de llegada </label>
                  <input type="text" readonly value="${data.fecha_regreso}" />
                </div>
                <div class="col s12 m12 l1">
                  <label style="color:blue"> Dias </label>
                  <input type="text" readonly value="${data.numero_dias}" />
                </div>
              </div>
              <div class="row">
                <div class="col s12 m12 l3">
                  <label style="color:blue"> Destino </label>
                  <input type="text" readonly value="${data.destino}" />
                </div>
                <div class="col s12 m12 l7">
                  <label style="color:blue"> Itinerario </label>
                  <input type="text" readonly value="${data.itinerario}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Importe </label>
                  <input type="text" readonly value="$ ${data.importe}" />
                </div>
              </div>
              <div class="row">
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Km. de salida </label>
                  <input type="text" readonly value="${data.kilometros_salida}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Km. de llegada </label>
                  <input type="text" readonly value="${data.kilometros_llegada}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Combustible lts. </label>
                  <input type="text" readonly value="${data.combustible_litros}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Diesel </label>
                  <input type="text" readonly value="$ ${data.precio_combustible}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Km. de recorridos </label>
                  <input type="text" readonly value="${data.kilometros_recorridos}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Rendimineto </label>
                  <input type="text" readonly value="$ ${data.rendimiento}" />
                </div>
              </div>
              <div class="row">
                <div class="col s12 m12 l6">
                  <label style="color:blue"> Responsable del viaje </label>
                  <input type="text" readonly value="${data.responsable}" />
                </div>
                <div class="col s12 m12 l6">
                  <label style="color:blue"> No. de telefono </label>
                  <input type="text" readonly value=" ${data.telefono}" />
                </div>
              </div>
              <div class="row">
                <div class="col s12 m12 l3">
                  <label style="color:blue"> Importe de gastos al operador </label>
                  <input type="text" readonly value="$ ${data.importe_gastos}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Casetas </label>
                  <input type="text" readonly value="$ ${data.casetas}" />
                </div>
                <div class="col s12 m12 l3">
                  <label style="color:blue"> Comision operador o viaticos </label>
                  <input type="text" readonly value="$ ${data.comision_operador}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Gastos </label>
                  <input type="text" readonly value="$ ${data.gastos_total}" />
                </div>
                <div class="col s12 m12 l2">
                  <label style="color:blue"> Gastos extra </label>
                  <input type="text" readonly value="$ ${data.gastos_extra}" />
                </div>
              </div>
              <div class="row">
                <div class="col s12 m12 l6 push-l6" style="font-size:15px; font-weight:bold;">
                  <label style="color:blue"> Utilidad </label>
                  <input type="text" readonly value="$ ${data.utilidad}" />
                </div>
              </div>

      `;
    $('#content-reporte').html(reporte);
  });

}
