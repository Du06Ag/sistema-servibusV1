const db = require('../config/database');
const validate = require("validate.js");

//controladores
const principalCTRL = require('./controllers/principal');
const gerenteCTRL = require('./controllers/gerente');
const contadorCTRL = require('./controllers/contador');
const secretariaCTRL = require('./controllers/secretaria');
const recepcionistaCTRL = require('./controllers/recepcionista');
const usuarioCTRL = require('./controllers/usuario');
const helpersCTRL = require('./controllers/helpers');
const clienteCTRL = require('./controllers/cliente');

module.exports = function(app, passport, express) {
	const router = express.Router();

	//home
  router.get('/', principalCTRL.principal);
  router.get('/cotizacion', principalCTRL.cotizacion);
	//registrar cotizacion cliente
	router.post('/registrar_cotiCliente', clienteCTRL.cotizacionCli);

	router.get('/sesionIni', isLoggedIn, helpersCTRL.index);

	  //sistema ya con inicio de sessiones

	  //gerente
	  router.post('/index', isLoggedIn, isAdministrador, gerenteCTRL.principal);
	  router.get('/nuevo_empleado', isLoggedIn, isAdministrador, gerenteCTRL.newEmpleado);
	  router.post('/agregar_empleado', isLoggedIn, isAdministrador, gerenteCTRL.agregarEmpleado);
	  router.get('/editar_empleado:id_empleado', isLoggedIn, isAdministrador, gerenteCTRL.editEmpleado);
    router.get('/index', isLoggedIn, isAdministrador, gerenteCTRL.principal);
		router.get('/ver_empleados', isLoggedIn, isAdministrador, gerenteCTRL.ver_empleados);

	  // cambiar de estado
    router.put('/usuario/', isLoggedIn, isAdministrador, usuarioCTRL.actualizarEstado);
		// dar de baja a empleados
		router.put('/bajaEmp/',isLoggedIn, isAdministrador, gerenteCTRL.bajaEmpleado);
		//info empleados
		router.get('/verinfo_empleado:id_empleado', isLoggedIn, isAdministrador, gerenteCTRL.findEmp);
		//info user
	  router.get('/viewinfo_empleado:id_empleado',isLoggedIn, isAdministrador, gerenteCTRL.findEmpleado);
	  router.put('/empleado/editar/:id_empleado', isLoggedIn, isAdministrador, gerenteCTRL.updateEmpleado);
    //agregar usuarios para ngresar a sistema
		router.route('/empleado')
        .get(isLoggedIn,isAdministrador,gerenteCTRL.empleado)
        .post(isLoggedIn,isAdministrador, usuarioCTRL.agregarUsuario);

		router.get('/registrar_unidad', isLoggedIn, isAdministrador, gerenteCTRL.newUnidad);
		router.post('/agregar_unidad', isLoggedIn, isAdministrador, gerenteCTRL.agregarUnidad);
		router.get('/editar_unidad:numero_economico', isLoggedIn, isAdministrador, gerenteCTRL.editUnidad);
		router.put('/unidad/editar/:numero_economico', isLoggedIn, isAdministrador, gerenteCTRL.updateUnidad);
		router.get('/ver_unidades', isLoggedIn, isAdministrador, gerenteCTRL.viewUnidades);

		// cambiar de estado
    router.put('/unidad/', isLoggedIn, isAdministrador, gerenteCTRL.unidadEstatus);
		router.get('/borrar_unidad:numero_economico', isLoggedIn, isAdministrador, gerenteCTRL.borrarUnidad);

	  //contador
 	  router.get('/indexConta', isLoggedIn, contadorCTRL.home);
	  router.get('/bitacora_manteni', isLoggedIn, contadorCTRL.bitacora);
	  router.get('/reporte_rendimiento', isLoggedIn, contadorCTRL.reporte);
		router.post('/registrar/reporte/rendimiento', isLoggedIn, contadorCTRL.newReporte);
		//actualizar bitacora de mantenimiento
		router.get('/editar_mantenimineto/:numero', isLoggedIn, contadorCTRL.updateMantenimiento);

    //secretaria
	  router.get('/indexSecre', isLoggedIn, secretariaCTRL.inicio);
	  router.get('/generar_bitacora', isLoggedIn, secretariaCTRL.bitacoraV);
	  router.get('/generar_contrato', isLoggedIn, secretariaCTRL.contrato);
	  router.get('/generar_orden', isLoggedIn, secretariaCTRL.orden);
	  router.get('/agendar_servicio', isLoggedIn, secretariaCTRL.agenda);

    //contrato
		router.post('/registrar/contrato', isLoggedIn, secretariaCTRL.newContrato);
		router.get('/editar_contrato:id_contrato', isLoggedIn, secretariaCTRL.editContrato);
		router.put('/update/contrato/:id_contrato', isLoggedIn, secretariaCTRL.updateContrato);
		router.get('/contrato/pdf/:folio',isLoggedIn, secretariaCTRL.contratoPDF); // logged

		//bitacora
		router.post('/registrar/bitacora', isLoggedIn, secretariaCTRL.newBitacora);
		router.get('/ver_bitacoras', isLoggedIn, secretariaCTRL.verBitacora);
		router.get('/bitacora/pdf/:folio',isLoggedIn, secretariaCTRL.bitacoraPDF);

		//Orden de servicio
		router.post('/registrar/orden', isLoggedIn, secretariaCTRL.newOrden);
		router.get('/ver_ordenServicio', isLoggedIn, secretariaCTRL.verOrden);
		router.get('/orden/pdf/:folio', isLoggedIn, secretariaCTRL.ordenPDF);

		//agenda
		router.get('/ver_agenda', isLoggedIn, secretariaCTRL.verAgenda);

	  //recepcionista
    router.get('/indexRecep', isLoggedIn, recepcionistaCTRL.ini);
	  router.get('/cotizacion_presencial', isLoggedIn, recepcionistaCTRL.coti);
		router.post('/registrar_coti', isLoggedIn, recepcionistaCTRL.registrar_coti);
		router.get('/editar_cotizacion:id_cotizacion', isLoggedIn, recepcionistaCTRL.editar_cotizacion);
		router.put('/cotiza/edit/:id_cotizacion', isLoggedIn, recepcionistaCTRL.update_coti);

		router.get('/persona/editar:id_persona', isLoggedIn, recepcionistaCTRL.verPersona);
		router.put('/persona/edit/:id_persona', isLoggedIn, recepcionistaCTRL.editarPersona);

		//inicio de sesion de los usuarios
		router.route('/login')
		    .get(notIsLoggedIn, function(req, res){
					  console.log('GET /login');
						res.render('login', {message: req.flash('loginMessage')});
				})
				.post(passport.authenticate('local-login', {
					  successRedirect: '/sesionIni',
						failureRedirect: '/login',
						failureFlash: true
				}));

		router.get('/logout', function(req, res){
			req.logout();
			res.redirect('/login');
		});
		//fin

    //set router in app
		app.use(router);

		//API responde JSON
		const api = express.Router();

		//api empleados
		api.route('/empleado/:num_empleado/')
        .get(isLoggedIn,isAdministrador, gerenteCTRL.APIBuscarPorNumEmpleado);

		//api busca por nombre empleado
		api.route('/persona/buscar/nombre/:nombre/')
		    .get(isLoggedIn, recepcionistaCTRL.APIBuscarPorPersonaNombre);

		//api busca por correo electronico
		api.route('/persona/buscar/correo/:email/')
			  .get(clienteCTRL.APIBuscarPorPersonaEmail);

	  // api/cotizacion
		api.route('/cotiza/:id_cotizacion/')
		   .get(isLoggedIn, recepcionistaCTRL.APIDetalleCotizacion);

		//api/busca folio de cotizacion
		api.route('/cotizaciones/:cotizacion/')
			  .get(isLoggedIn, secretariaCTRL.APICotizacionInfo);

		//api/busca folio de contrato
		api.route('/contratos/:contrato/')
				.get(isLoggedIn, secretariaCTRL.APIContratoInfo);

		api.route('/contratoUnidad/:contrato')
				.get(isLoggedIn, secretariaCTRL.APIContratoUni);

		api.route('/findContrato/:contrato/')
				.get(isLoggedIn, secretariaCTRL.APIFindContrato);

		api.route('/OrdenContrato/:contrato/')
				.get(isLoggedIn, secretariaCTRL.APIOrdenContrato);

		//api buscar contrato info para reporte del contador
		api.route('/ContratosConta/:contrato')
				.get(isLoggedIn, contadorCTRL.APIReporteServicio);

		//api detalles de reportes modal
		api.route('/reportesDetalles/:id_contrato')
				.get(isLoggedIn, contadorCTRL.APIReporteDetalles);

		app.use('/api', api);

		app.use(function(req, res){
        res.status(400);
        res.render('404');
    });

		// # END
		//funciones de inicio de sesion
		function isAdministrador(req, res, next) {
			console.log(req.user.id_rol);
			//1 = gerente
			if (req.user.id_rol == 1)
			    return next();
			res.render('privileges');
		}

		function notIsAdministrador(req, res, next){
			  if (req.user.id_rol != 1)
				    return next();
				res.redirect('/sesionIni');
		}

		function isLoggedIn(req, res, next) {
			//if user is authenticate in the session, carry on
			if(req.isAuthenticated())
			   return next();
			//if they aren't redirect them to the home page
			res.redirect('/login');
		}

		function notIsLoggedIn(req, res, next) {
			// if user not is authenticate in the session, carry on
			if (req.isAuthenticated())
			    res.redirect('/sesionIni');
			// if they aren't redirect them to the home page
			return next();
		}

}
