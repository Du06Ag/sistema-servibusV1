
 $(document).ready(function(){
     $('.seleccionar_persona').modal({opacity: .7});
 });

 $(document).ready(function(){
     $('.seleccionar_email').modal({opacity: .7});
 });

 $(document).ready(function(){
     $('.collapsible').collapsible();
 });

function getPersona(form){
	nombre = form.nombre_persona.value;
	$.get('/../api/persona/buscar/nombre/'+nombre, function(data, status){
      persona="";
      data.forEach(function(element, index){
        persona += `<li>
              <div class="collapsible-header">
                <i class="material-icons left">
                  account_circle
                </i>
                ${element.nombre} ${element.ap_paterno}  ${element.ap_materno}
                <a href="/persona/editar${element.id_persona}">
								    <i class="material-icons right blue-text tooltipped"  data-position="top" data-delay="50" data-tooltip="Editar al empleado" >
									    edit
								    </i>
								</a>
                <i class="material-icons right" onclick="seleccionarPersona(${element.id_persona},'${element.nombre}','${element.ap_paterno}','${element.ap_materno}','${element.telefono}','${element.correo_electronico}','${element.calle}','${element.numero_interior}','${element.colonia}','${element.codigo_postal}');">
                    add_circle
                </i>
              </div>
              <div class="collapsible-body">
                <strong style="font-weight: bold;"> ID empleado: </strong>
                <span>${element.id_persona} </span>
                <br>
                <strong style="font-weight: bold;"> Telefono: </strong>
                <span>${element.telefono} </span>
                <br>
                <strong style="font-weight: bold;"> Correo electronico: </strong>
                <span>${element.correo_electronico} </span>
                <br>
                <strong style="font-weight: bold;"> Direccion </strong>
                <span> Call. ${element.calle}, ${element.numero_interior}, Col. ${element.colonia}, C.P. ${element.codigo_postal}  </span>
                <br>
                <strong style="font-weight: bold;"> Estatus </strong>
                <span>${element.estatus} </span>
                <br>
              </div>
            </li>`;
      });
      if(persona == ""){
        $('#persona_list').html("<p class='red-text center'> No se encontraron resultados....</p>")
      }else{
        $('#persona_list').html(persona);
      }
    //alert("data => "+data);
  });
  return false;
}

function seleccionarPersona(id_persona,nombre,paterno,materno){
  $('#id_persona').val(id_persona);
  $('#nombre').val(nombre+' '+paterno+' '+materno);
	$('#seleccionar_persona').modal('close');
  var id=document.getElementById('id_persona').value
  if(id!=""){
    document.getElementById('datos_persona').style.display='none';
    document.getElementById('nom_label').style.display='none';
  }else{

  }

}

function getcorreo(form){
	email = form.correo_persona.value;
  persona="";
	$.get('/../api/persona/buscar/correo/'+email, function(data, status){
        persona = `<li>
              <div class="collapsible-header">
                <i class="material-icons left">
                  account_circle
                </i>
                ${data.correo_electronico}
                <i class="material-icons right" onclick="seleccionarCorreo(${data.id_persona},'${data.correo_electronico}');">
                    add_circle
                </i>
              </div>
            </li>`;
    //alert("data => "+data);
    if(persona == ""){
      $('#persona_correo').html("<p class='red-text center'> No se encontraron resultados, ingrese correctamente su correo electronico....</p>")
    }else{
      $('#persona_correo').html(persona);
    }
  });

  return false;
}

function seleccionarCorreo(id_persona,correo){
  $('#email').val(correo);
  $('#id').val(id_persona);
	$('#seleccionar_email').modal('close');
  var email=document.getElementById('email').value
  if(email!=""){
    document.getElementById('datos_persona').style.display='none';
    //document.getElementById('nom_label').style.display='none';
  }else{

  }

}
