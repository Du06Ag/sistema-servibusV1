function findContrato(form){
  contrato = form.contrato.value || "";
  if(contrato != ""){
    $.get('/../api/ContratosConta/'+contrato, function(data, status){
      info = `
          <div class="row" >
            <input id="contratoId" name="orden_servicioId" type="text" class="validate color-text-blue" value="${data.info.id_orden_servicio}" readonly style="visibility:hidden" ></input>
            <div class="input-field col s8">
              <input id="operador" type="text" class="validate color-text-blue" value="${data.info.operador}" readonly></input>
              <label for="operador" style="color:blue" class="active"> Nombre del operador </label>
            </div>
            <div class="input-field col s4">
              <input id="unidad" name="unidad" type="text" class="validate color-text-blue" value="${data.info.numero_economico}" readonly></input>
              <label class="active" for="unidad" style="color:blue"> Unidad </label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s3">
              <i class="material-icons prefix"> date_range </i>
              <input type="text" class="validate" id="fecha_salida" value="${data.info.fecha_salida}" readonly></input>
              <label class="active" for="fecha_salida" style="color:blue"> Fecha salida </label>
            </div>
            <div class="input-field col s3">
              <i class="material-icons prefix"> access_time </i>
              <input type="text" class="validate" id="hora_salida" value="${data.info.hora_salida}" readonly></input>
              <label class="active" for="hora_salida" style="color:blue"> Hora salida</label>
            </div>
            <div class="input-field col s3">
              <i class="material-icons prefix"> data_range </i>
              <input type="text" class="validate" id="fecha_regreso" value="${data.info.fecha_regreso}" readonly></input>
              <label class="active" for="fecha_regreso" style="color:blue; font-size:14px"> Fecha de llegada</label>
            </div>
            <div class="input-field col s3">
              <input type="text" class="validate" id="numDias" name="numDias" value="${data.info.dias}" ></input>
              <label for="numDias" style="color:blue" class="active">Numero de dias</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input id="destino" type="text" class="validate color-text-blue" value="${data.info.destino}" readonly></input>
              <label class="active" for="destino" style="color:blue"> Destino</label>
            </div>
            <div class="input-field col s8">
              <input id="itinerario" type="text" class="validate color-text-blue" value="${data.info.itinerario}" readonly></input>
              <label class="active" for="itinerario" style="color:blue"> Itinerario</label>
            </div>
          </div>
          <div class="row" >
            <div class="input-field col s4">
              <input id="responsable" type="text" class="validate color-text-blue" value="${data.info.responsable}" readonly></input>
              <label class="active" for="responsable" style="color:blue"> Nombre del responsable</label>
            </div>
            <div class="input-field col s4">
              <input id="telefono" type="text" class="validate color-text-blue" value="${data.info.telefono}" readonly></input>
              <label class="active" for="telefono" style="color:blue"> Telefono </label>
            </div>
            <div class="input-field col s4">
              <input id="importe" type="text" class="validate color-text-blue" value="${data.info.importe}" readonly></input>
              <label class="active" for="importe" style="color:blue"> Importe del servicio $</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input id="kmSalida" type="text" class="validate color-text-blue" value="${data.info.kilometros_salida}" readonly></input>
              <label class="active" for="kmSalida" style="color:blue"> Km Salida</label>
            </div>
            <div class="input-field col s4">
              <input id="kmLLegada" name="kmLLegada" type="text" onblur="kilometraje()" class="validate color-text-blue" required></input>
              <label for="kmLLegada" style="color:blue"> Km Llegada</label>
            </div>
            <div class="input-field col s4">
              <input id="kmRecorridos" name="kmRecorridos" type="text" class="validate color-text-blue"></input>
              <label for="kmRecorridos" style="color:blue"> Km Recorridos</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input id="combustibleLts" name="combustibleLts" type="text" onblur="rendimientoCombustible()" class="validate color-text-blue" required></input>
              <label for="combustibleLts" style="color:blue"> Combustible Lts.</label>
            </div>
            <div class="input-field col s4">
              <input id="combustiblePre" name="combustiblePre" type="text" class="validate color-text-blue"></input>
              <label for="combustiblePre" style="color:blue"> Total de combustible $</label>
            </div>
            <div class="input-field col s4">
              <input id="rendimiento" name="rendimiento" type="text" class="validate color-text-blue"></input>
              <label for="rendimiento" style="color:blue" class="active"> Rendimiento</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input id="gastos_operador" name="gastos_operador" type="text" class="validate color-text-blue"></input>
              <label for="gastos_operador" style="color:blue"> Importe de gastos al operador $</label>
            </div>
            <div class="input-field col s4">
              <input id="tipoPago" type="text" class="validate color-text-blue" onblur="operadorPago()" value="13"></input>
              <label for="tipoPago" style="color:blue" class="active">  % de pago al Operador</label>
            </div>
            <div class="input-field col s4">
              <input id="pagoOperador" name="pagoOperador" type="text" class="validate color-text-blue"></input>
              <label for="pagoOperador" style="color:blue"> Pago al operador $</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input id="casetas" name="casetas" type="text" class="validate color-text-blue"></input>
              <label for="casetas" style="color:blue"> Pago de casetas $</label>
            </div>
            <div class="input-field col s4">
              <input id="gastosEx" name="gastosEx" type="text" onblur="totaldegastos()" class="validate color-text-blue"></input>
              <label for="gastosEx" style="color:blue"> Gastos extra $</label>
            </div>
            <div class="input-field col s4">
              <input id="gastosTotal" name="gastosTotal" type="text" class="validate color-text-blue"></input>
              <label for="gastosTotal" style="color:blue"> Total de Gastos $</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s2">
              <input id="kmMantenimiento" name="kmMantenimiento" type="text" value="${data.info.kilometraje_mantenimineto}"></input>
            </div>
            <div class="input-field col s2">
              <input id="servicio" name="servicio" type="text" ></input>
            </div>
            <div class="input-field col s8">
              <input id="utilidad" name="utilidad" type="text" class="validate color-text-blue"></input>
              <label for="utilidad" style="color:blue" class="active"> Utilidad $</label>
            </div>
          </div>
          `;
          $('#dataInfo').html(info);
    });
  }
  return false;
}

function kilometraje(){
	var kmsalida = parseInt(document.getElementById('kmSalida').value);
	var kmllegada = parseInt(document.getElementById('kmLLegada').value);
  var manteKM = parseInt(document.getElementById('kmMantenimiento').value);
	var recorrido=0;
  var km=0;

	if(kmllegada > kmsalida){
		recorrido=(kmllegada - kmsalida).toFixed(2);
		document.getElementById('kmRecorridos').value=recorrido;

    km=(recorrido / manteKM).toFixed(2);
    document.getElementById('servicio').value=km;
	}else{
		alert('El km de llegada no puede se menor que el kilometraje de salida...'+kmsalida +' '+kmllegada);
	}

}

function rendimientoCombustible(){
	var kmrecorridos = parseInt(document.getElementById('kmRecorridos').value);
	var litrosDiesel = parseInt(document.getElementById('combustibleLts').value);
	var rendimientos=0;

	if(kmrecorridos > 0 && litrosDiesel>0){
		rendimientos=(kmrecorridos / litrosDiesel).toFixed(2);
		document.getElementById('rendimiento').value=rendimientos;
	}else{
		alert('Los kilometros recorridos deben ser mayor a cero al igual que los litros de combustible...'+kmrecorridos +' '+litrosDiesel);
	}

}

function operadorPago(){
	var importe = parseInt(document.getElementById('importe').value);
	var porcentaje = parseInt(document.getElementById('tipoPago').value);
	var pago=0;

	if(importe > 0 && porcentaje>0){
		pago=((porcentaje / 100)*importe).toFixed(2);
		document.getElementById('pagoOperador').value=pago;
	}else{
		alert('el importe debe ser mayo a cero asi como el porcentaje...'+importe +' '+porcentaje);
	}

}

function totaldegastos(){
	var combustible = parseInt(document.getElementById('combustiblePre').value);
	var casetas = parseInt(document.getElementById('casetas').value);
  var operador = parseInt(document.getElementById('pagoOperador').value);
  var extra = parseInt(document.getElementById('gastosEx').value);

  var importe = parseInt(document.getElementById('importe').value);
	var total=0;
  var utilidad=0;

	if(combustible > 0 && casetas > 0 && extra > 0){
		total=(combustible+casetas+operador+extra).toFixed(2);
		document.getElementById('gastosTotal').value=total;

    utilidad=(importe-total).toFixed(2);
    document.getElementById('utilidad').value=utilidad;
	}else{
		alert('Las cantidades deben ser mayores a cero...');
	}

}
