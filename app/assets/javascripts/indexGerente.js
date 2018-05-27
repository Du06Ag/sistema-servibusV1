function cambiarEstado(id_usuario, estado){
	cambia = false;
	swal({
		title: "¿Confirmar cambio de estado de este usuario?" + estado,
		text: "Esto afectara el ingreso del usuario al sistema",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#2fa353",
		confirmButtonText: "Si, estoy seguro.",
	   	cancelButtonText: "No, cancelar.",
	   	closeOnConfirm: false,
	   	closeOnCancel: true,
	   }, function(isConfirm){
	   		if(isConfirm){
	   			cambia = true;
	   			$.ajax({
	   				url: '/usuario/',
	   				method: 'PUT',
	   				data: {
	   					id_usuario: id_usuario,
	   					estado: estado
	   				},
	   				success: function(xml, textStatus, xhr){
	   					if(xhr.status == 200)
	   						swal('Estado cambiado!', "...", "success");
	   					else
	   						swal('Error al cambiar al estado', "...", "error");
	   				}
	   			})
	   		}else{
	   			return false;
	   		}
	   	}
	)
	return false;
}

function bajaEmpleado(id_empleado, estado){
	cambia = false;
	swal({
		title: "¿Confirmar dar de baja al empleado?" + estado,
		text: "Una vez dado de baja el empleado no podra revertir el cambio",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#2fa353",
		confirmButtonText: "Si, estoy seguro.",
	   	cancelButtonText: "No, cancelar.",
	   	closeOnConfirm: false,
	   	closeOnCancel: true,
	   }, function(isConfirm){
	   		if(isConfirm){
	   			cambia = true;
	   			$.ajax({
	   				url: '/bajaEmp/',
	   				method: 'PUT',
	   				data: {
	   					id_empleado: id_empleado,
	   					estado: estado
	   				},
	   				success: function(xml, textStatus, xhr){
	   					if(xhr.status == 200)
	   						swal('El empleado asido dado de baja permanentemente!', "...", "success");
	   					else
	   						swal('Error al dar de baja el empleado', "...", "error");
	   				}
	   			})
	   		}else{
	   			return false;
	   		}
	   	}
	)
	return false;
}
