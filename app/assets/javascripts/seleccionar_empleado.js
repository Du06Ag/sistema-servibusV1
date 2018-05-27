$(document).ready(function(){
    $('.seleccionar_empleado').modal({opacity: .7});
});

$(document).ready(function(){
    $('.collapsible').collapsible();
});

function getEmpleado(form){
	num_empleado = form.num_empleado.value;
	$.get('/../api/empleado/'+num_empleado, function(data, status){
    if(data.nombre ==" "){
      alert('El numero de empleado no se encontro, ingrese otro!');
    }
			empleado = `<li>
							<div class="collapsible-header">
								<i class="material-icons left">
									account_circle
								</i>
								${data.nombre}
								<i class="material-icons right" onclick="seleccionarEmpleado(${data.id_empleado},'${data.puesto}');">
									add_circle
								</i>
							</div>
							<div class="collapsible-body">
								<strong style="font-weight: bold;"> ID empleado: </strong>
								<span>${data.id_empleado} </span>
								<br>
								<strong style="font-weight: bold;"> Telefono: </strong>
								<span>${data.telefono} </span>
								<br>
								<strong style="font-weight: bold;"> Correo electronico: </strong>
								<span>${data.correo_electronico} </span>
								<br>
								<strong style="font-weight: bold;"> Sexo: </strong>
								<span>${data.sexo} </span>
								<br>
								<strong style="font-weight: bold;"> Puesto: </strong>
								<span>${data.puesto} </span>
								<br>
							</div>
						</li>`;
    	$('#empleados_list').html(empleado);
		//alert("data => "+data);
	});
	return false;
}

function seleccionarEmpleado(id_empleado, puesto){
  $('#rol').val(puesto);
  $('#id_empleado').val(id_empleado);
	$('#seleccionar_empleado').modal('close');
}

$().ready(function (){
	$('#formValidate').validate({
		rules:{
			nombre: {
				required: true,
				minlength: 3
			},
			password: {
				required: true,
				minlength: 6
			},
			id_empleado: {
				required: true
			}
		},
		messages: {
			nombre:{
                required: "Ingrese un nombre de usuario",
                minlength: "El tamaño minimo del nombre es de 3 caracteres"
	        },
	        password: {
	        	required: "Ingrese una contraseña",
	        	minlength: "El tamaño minimo de la contraseña es de 6 caracteres"
	        },
	        id_empleado:{
	        	required: "El usuario debe estar ligado a un empleado"
	        }
		},
		errorElement : "div",
	    errorPlacement : function(error, element) {
	      var placement = $(element).data('error');
	      if (placement) {
	        $(placement).append(error)
	      } else {
	        error.insertAfter(element);
	      }
	    }
	});
})

function getPersona(input){
	nombre = input.value;
	$.get('/../api/persona/buscar/nombre/'+nombre, function(data, status){
			personas = "";
			data.forEach( function(element, index) {
				personas += `<li>
								<div class="collapsible-header">
									<i class="material-icons left">
										arrow_drop_down_circle
									</i>
									${element.nombre}
									<i class="material-icons right green-text tooltipped" onclick="seleccionarEmpleado(${element.id_empleado});" data-position="top" data-delay="50" data-tooltip="Seleccioar al empleado" >
										add_circle
									</i>
									<a href="/empleado/editar/${element.id_empleado}">
										<i class="material-icons right blue-text tooltipped"  data-position="top" data-delay="50" data-tooltip="Editar al empleado" >
											edit
										</i>
									</a>

								</div>
								<div class="collapsible-body">
									<strong> ID empleado: </strong>
									<span>${element.id_empleado} </span>
									<br>
									<strong> CUIP: </strong>
									<span>${element.cuip} </span>
									<br>
									<strong> Numero de empleado: </strong>
									<span>${element.num_empleado} </span>
									<br>
									<strong> Puesto: </strong>
									<span>${element.puesto} </span>
									<br>
									<strong> Adscripcion: </strong>
									<span>${element.adscripcion} </span>
									<br>
								</div>
							</li>`;
			});
			if(personas == ""){
				$('#persona_list').html("<p class='red-text center'> No se encontraron resultados</p>");
			}else{
				$('#persona_list').html(personas);
			}
	});
	return false;
}
