const db    = require('../../config/database')
var fonts = {
        Roboto: {
            normal: __dirname +'/../assets/fonts/pdfmake/Roboto-Regular.ttf',
            bold: __dirname+'/../assets/fonts/pdfmake/Roboto-Medium.ttf',
            italics: __dirname+'/../assets/fonts/pdfmake/Roboto-Italic.ttf',
            bolditalics: __dirname+'/../assets/fonts/pdfmake/Roboto-Italic.ttf'
        }
    };
var pdfmake = require('pdfmake');
var PdfPrinter = require(__dirname + '/../../node_modules/pdfmake/src/printer');
var printer = new PdfPrinter(fonts);

module.exports = {
    contratoPDF: (data, res) => {
        var dd={
            content:[
                {
                    columns: [
                        {
                          width: '100%',
                          text: 'SERVICIOS TURISTICOS TERRESTRES\n',style: 'header', bold:true, fontSize:30, alignment: 'center', color: '#498c20',
                        }
                    ]
                },
                {
                    columns: [
                      {

                          width: 295,
                          image: __dirname + '/../assets/images/PDF.png',
                          width:200,
                          height:85,
                          alignment: 'justify',

                      },
                      {
                        width:300,
                        alignment:'center',
                        color: '#46a10e',
                        fontSize:9,
                        text: ['RFC: GAGJ7506234Z7 \n',
                        'PASEO ALEJANDRO CERVANTES DELGADO NO. 3 COL. MORELOS \n',
                        'CHILPANCINGO, GRO, TEL. (747) 47 2 00 51, 49 1 67 56 \n',
                        '', {
                          text:'ServiBus ', bold:true, fontSize:25, color: '#498c20',
                        },
                        '', {
                          text:' CONTRATO DE TRANSPORTE\n', fontSize:12,
                        },
                        'Chilpancingo Gro. A ', {
                          text: `${data.fecha_contrato}\n\n`
                        },
                      ]}
                    ]
                },
                {
                  color: '#46a10e',
                  text: [
                        'Recibi de:      ',
                        //nombre del cliente
                        {text:data.nombre , bold:false, color: '#040505'},
                        '\n La cantidad de $:       ',
                        //importe del servicio
                        {text:data.anticipo_letra, bold:false, color: '#040505'},
                        '\n Por concepto de:   ',
                        {text: ' SERVICIO DE TRANSPORTE   ', color: '#040505', bold: true},
                        ' del dia:    ',
                        {text: data.fecha_salida, bold:false, color: '#040505'},
                        '     al:    ',
                        {text: data.fecha_regreso, bold:false, color: '#040505'},
                        //lugar y hora de salida
                        '\n Lugar y hora de salida:     ',
                        {text: data.salida, bold:false, color: '#040505'},
                        //lugar y hora de regreso
                        '\n Lugar y hora de regreso: ',
                        {text: data.regreso, bold:false, color: '#040505'},
                        ' Destino:',
                        {text: data.destino, bold:false, color: '#040505'},
                        //itinerario
                        '\n Itinerario: ',
                        {text: data.itinerario, bold: false, color: '#040505'},
                        //precio
                        '\n\n Precio total:        ',
                        {text: data.importe, bold:false, color: '#040505'},
                        '            Anticipo:        ',
                        {text: data.anticipo_numero, bold:false, color: '#040505'},
                        '            Saldo:         ',
                        {text: data.importe_restante, bold:false , color: '#040505', color: '#040505'},
                        //observaciones
                        '\n\nObservaciones:',
                        {text:'________________________________________________________________________________'},
                        '\n ',
                        {text: 'www.turismoservibus.com.mx                                                                                                    servibus2010@hotmail.com', fontSize:10, alignment:'right'},
                        '\n\n CLAUSULAS:',
                        {text: '\n\nEL CLIENTE Y LA EMPRESA ACEPTAN DE CONFORMIDA SOMETERSE A LAS SIGUIENTES DECLARACIONES Y CLAUSULAS AL FIRMAR EL PRESENTE CONTRATO', alignment:'center', fontSize:11, color: '#498c20', bold: true}
                  ]
                },
                {
                  columns: [
                    {
                      color: '#46a10e',
                      width: 262,
                      fontSize: 8,

                      text: ['\n',{
                        text: '1.- La Empresa declara que el Seguro de la unidad solo ampara 18 a 47 pasajeros segun el cupo dela unidad y se reserva el derecho de no realizar el servicio si no se respeta el cupo convenido.', fontSize:9,
                      },
                      '\n\n 2.- El Cliente acepta que',{
                        text: ' QUEDA ESTRICTAMENTE PROHIBIDO LLEVAR PASAJE EN EL PASILLO, ir parados sobre los asientos o sentados en las coderas.', fontSize:9, bold:true,
                      },
                      '\n\n 3.- El Cliente acepta de conformidad que a mas tardar un dia antes de realizar el viaje se liquidara todo el servicio.',
                      '\n\n 4.- El Cliente acepta que en caso de cancelacion, el anticipo queda a beneficio de la empresa.',
                      '\n\n 5.- El Cliente acepta de absoluta conformidad que en caso de no poderse terminar el servicio contratado por causas de fuerza mayoro descompostura de la unidad, se devolvera unicamente su importe promedio del tiempo que falte para terminar dicho servicio sin que este tenga mas contra la empresa.',
                      '\n\n 6.- El Cliente acepta que en caso que la unidad contratada no se presentara en el lugar y hora establecidos, la empresa queda obligada a devolver el importe cobrado (anticipo o cobro total), sin que tenga mas en contra de la empresa.',
                      '\n\n 7.- El Cliente acepta que el servicio que se contrate por dia, comprendera una jornada maxima de 12 horas o 400 km., de recorrido maximo, en la inteligencia de que se acumulan para el dia o dias subsiguientes horas no utilizadas o kilometraje no recorrido.',
                      '\n\n 8.- El Cliente acepta que cualquier cambio en el horario generara costo extra.'
                    ]},
                    {
                      color: '#46a10e',
                      width: 260,
                      fontSize: 8,
                      text: ['\n 9.- Queda prohibido tirar basura dentro de la unidad.',
                      '\n\n 10.- El Sistema de audio y video queda bajo responsabilidad y uso exclusivo del operador.',
                      '\n\n 11.- El Operador no esta autorizado a realizar servicios fuera de la ruta establecida en e contrato.',
                      '\n\n12.- ',{
                        text: 'El lugar de partida se considera tambien el lugar donde terminara el servicio. No realizaremos paradas domiciliarias.', bold:true,
                      },
                      '\n\n 13.- Queda prohibido ingerir bebidas embriagantes dentro del autobus, asi como, la portacion de armas de todo tipo y la transportacion de sustancias, peligrosas o prohibidas, como materiales inflables, o explosivas, drogas, o mercancia de procedencia ilicita.',{
                        text: '\n TODO DAÑO QUE SE CAUSE AL VEHICULO POR EL PASAJE DEBERA SER CUBIERTO POR EL "USUARIO".', bold:true,
                      },
                      '\n\n 14.- Los pagos a estacionamientos del autobus sera por cuenta del contratante durante el recorrido.',
                      '\n\n 15.- QUEDA PROHIBIDO EL ACCESO A LA UNIDAD PORTANDO ROPA U OBJETOS MOJADOS O HUMEDOS.',
                      '\n\n 16.- La empresa no se hace responsable por perdidas materiales de ningun tipo.',
                      '\n\n 17.- El uso del W.C. es uso exclusivo para emergencias.',
                      '\n\n 18.- L empresa no se hace responsable de productos parecederos (alimentos, bebidas o medicamentos) que estan dentro de la unidad.',
                    ]},
                  ]
                },
                '\n',{
                  text:'                                                                 CLIENTE                                                                                                EMPRESA', bold:true, alignment:'center', fontSize:12, color: '#498c20',
                },
                '\n\n',{
                  text:'__________________________________                                              __________________________________', color: '#498c20',
                }
            ],
            style: {
               header: {
                 fontsize: 30,
                 bold: true,
                 margin:[0, 0, 0, 0]
               },
               subheader: {
                        fontSize: 13.5,
                        bold: true,
                        alignment: 'justify'
                    }
            },
        }
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(res);
      pdfDoc.end();
    },
    bitacoraPDF: (data, res) => {
      var dd={
          content:[
              {
                  columns: [
                      {
                          width: '30%',
                          image: __dirname + '/../assets/images/mapa.png',
                          width: 100,
                          height: 60
                      },
                      {
                          width: '70%',
                          text: 'SERVICIOS TURISTICOS \nTERRESTRES', style: 'header', bold:true, fontSize:25, alignment: 'center', color: '#3280c8',
                      },

                  ]
              },
              {
                text: [
                    '',
                    {text:'\nPERMICIONARIO JUAN GALINDO GARRIDO. RFC. GAGJ750623 4Z7 \nCONSTITUYENTES # 34, COL. BENITO JUAREZ, CHILPANCINGO, GRO.\n', bold:false, fontSize:10, alignment: 'center'}
                ]
              },
              {

                columns: [
                  {
                       width:'90%',
                       text: ['\n ',{
                           text: '                                                           BITACORA DE HORAS DE SERVICIO DEL CONDUCTOR                              ', alignment:'center', fontSize:10, background:'#98ff98',
                       }
                     ]},
                     {
                       width:'10%',
                       text: ['\n',{
                            text: 'FOLIO', color:'#f40707',background:'#fcfcfc', alignment:'center', fontSize:9,
                       },
                       '\n',{
                            text:`${data.contrato || ''}`, bold:true, fontSize:10, alignment:'center',
                       }

                     ]},
                ]
              },
              {
                text: ['\n',
                    {text:'FECHA DE ELABORCION:           ', fontSize:9, alignment:'right'},
                    '',
                    {text:`${data.fecha_bitacora || ''}`, fontSize:10, bold:true, alignment:'right'},
                ],
              },
              {
                text: ['\n',

                ],
              },

              {
                style: 'table',
                table: {
                    widths: [50, 50, 50, 50, 50,50,50,50,33,1],
                    body: [
                      [
                      {
                        colSpan: 2,
                        text: 'TIPO DE SERVICIO:',
                        bold: false,
                        alignment: 'left',
                        fontSize: 8
                      },{},
                      {

                        text: 'MODALIDAD:',
                        bold: false,
                        alignment: 'left',
                        fontSize: 8
                      },
                      {
                        colSpan:2,
                        text: 'MARCA:',
                        bold: false,
                        alignment: 'left',
                        fontSize: 8
                      },{},
                      {
                        text: 'MODELO:',
                        bold: false,
                        alignment: 'left',
                        fontSize: 8
                      },
                      {
                        text: 'PLACAS NO.:',
                        bold: false,
                        alignment: 'left',
                        fontSize: 8
                      },
                      {
                        colSpan: 2,
                        text: 'NO. ECONOMICO:',
                        bold: false,
                        alignment: 'left',
                        fontSize: 8
                      },{}
                      ],
                      [
                      {
                        colSpan: 2,
                        text: '\n TURISMO',
                        bold: true,
                        alignment: 'center',
                        fontSize: 9
                      },{},
                      {

                        text: '\n ',
                      },
                      {
                        colSpan: 2,
                        text: '\n'+data.marca || '',
                        alignment: 'center',
                        fontSize: 9,
                        bold: true
                      },{},
                      {
                        text: data.modelo || '',
                        alignment:'center',
                        fontSize: 9,
                        bold: true
                      },
                      {
                        text:'\n'+ data.placas || '',
                        alignment:'center',
                        fontSize: 9,
                        bold: true
                      },
                      {
                        colSpan: 2,
                        text: '\n'+data.numero_economico || '',
                        alignment: 'center',
                        fontSize: 9,
                        bold: true
                      },{}
                      ],
                      [
                      {
                        colSpan:2,
                        text: 'NOMBRE DEL \nOPERADOR \n      ',
                        alignment: 'center',
                        fontSize: 8
                      },{},
                      {
                        colSpan:8,
                        text:'\n'+ data.operador || '',
                        alignment: 'center',
                        fontSize: 9,
                        bold: true
                      },{},{},{},{},{},{},{}
                      ],
                      [
                      {
                        colSpan:2,
                        text:'DATOS DE LA \nLICENCIA\n     ',
                        alignment: 'center',
                        fontSize: 8,
                      },{},
                      {
                        colSpan: 3,
                        alignment:'center',
                        fontSize:9,
                        bold:true,
                        text: [
                                {
                                  text:'\nNo.          ',
                                },
                                data.numero_licencia || ''
                            ]
                      },{},{},
                      {

                        alignment:'center',
                        fontSize:9,
                        bold:true,
                        text: [
                                {
                                  text:'TIPO           ',
                                },
                                data.tipo_licencia || ''
                            ]
                      },
                      {

                        colSpan: 3,
                        alignment:'center',
                        fontSize:9,
                        bold:true,
                        text: [
                                {
                                  text:'\nVIGENCIA          ',
                                },
                                data.vigencia_licencia || ''
                            ]
                      },{},{}
                      ],
                      [
                      {
                        rowSpan:2,
                        colSpan: 2,
                        text:'EN CASO DE APLICAR \n DATOS DEL 2nd. \nOPERADOR',
                        fontSize: 8,
                        alignment: 'center'
                      },{},
                      {
                        colSpan: 8,
                        text:'      \n          ',
                        fontSize:9
                      },{},{},{},{},{},{},{}
                      ],
                      [
                      {

                      },{},
                      {
                        colSpan: 3,
                        text: 'LICENCIA No.    ',
                        fontSize: 8,
                        alignment: 'left'
                      },{},{},
                      {
                        text: 'TIPO    \n      ',
                        fontSize: 8,
                        alignment: 'left'
                      },
                      {
                        colSpan: 3,
                        text: 'VIGENCIA   ',
                        fontSize: 8,
                        alignment: 'left'
                      },{},{}
                      ],
                      [
                      {
                        colSpan:9,
                        fontSize:9,
                        bold: true,
                        text: '\nORIGEN:     '+ data.origen + '                                        DESTINO:      '+ data.destino+'\n   '
                      },{},{},{},{},{},{},{},{}
                      ],
                      [
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'HORAS / DIAS',
                        alignment: 'center'
                      },{},{},
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'HORA DE SALIDA',
                        alignment: 'center'
                      },{},{},
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'HORA DE LLEGADA',
                        alignment: 'center',
                      },{},{}
                      ],
                      [
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'DE SERVICIO CONDICIENDO "C" ',
                        alignment: 'left',
                      },{},{},
                      {
                        rowSpan: 3,
                        colSpan: 3,
                        text:' '
                      },{},{},
                      {
                        rowSpan: 3,
                        colSpan:3,
                        text: ' '

                      },{},{},
                      ],
                      [
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'DE SERVICIO SIN CONDUCIR "S" ',
                        alignment: 'left',
                      },{},{},
                      {

                      },{},{},
                      {

                      },{},{},
                      ],
                      [
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'FUERA DE SERVICIO "F" ',
                        alignment: 'left',
                      },{},{},
                      {

                      },{},{},
                      {

                      },{},{},
                      ],
                      [
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'DE DESCANSO "D" ',
                        alignment: 'left'
                      },{},{},
                      {
                        colSpan: 6,
                        fontSize: 9,
                        bold: true,
                        text: 'TIPO DE TRASLADO:     '+ data.tipo_traslado,
                        alignment: 'center'
                      },{},{},{},{},{}
                      ],
                      [
                      {
                        colSpan: 9,
                        text: 'BITACORA DEL CONDUCTOR',
                        fontSize: 8,
                        alignment: 'center'
                      },{},{},{},{},{},{},{},{}
                      ],
                      [
                      {
                        colSpan: 9,
                        style:'table',
                        table: {
                            widths: [10,25,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                            body: [
                              [
                              {
                                text: 'DIA',
                                bold: true,
                                alignment: 'center',
                                fontSize: 4
                              },{fontSize:4,text:'OPERADOR',bold:true},{fontSize:4,text:'01:00'},{fontSize:4,text:'02:00'},{fontSize:4,text:'03:00'},{fontSize:4,text:'04:00'},{fontSize:4,text:'05:00'},{fontSize:4,text:'06:00'},
                              {fontSize:4,text:'07:00'},{fontSize:4,text:'08:00'},{fontSize:4,text:'09:00'},{fontSize:4,text:'10:00'},{fontSize:4,text:'11:00'},{fontSize:4,text:'12:00'},{fontSize:4,text:'13:00'},{fontSize:4,text:'14:00'},
                              {fontSize:4,text:'15:00'},{fontSize:4,text:'16:00'},{fontSize:4,text:'17:00'},{fontSize:4,text:'18:00'},{fontSize:4,text:'19:00'},{fontSize:4,text:'20:00'},{fontSize:4,text:'21:00'},{fontSize:4,text:'22:00'},
                              {fontSize:4,text:'23:00'},{fontSize:4,text:'00:00'}
                              ],
                              [
                              {
                                text:'1',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],
                              [
                              {
                                text:'2',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],
                              [
                              {
                                text:'3',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],
                              [
                              {
                                text:'4',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],
                              [
                              {
                                text:'5',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],
                              [
                              {
                                text:'6',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],
                              [
                              {
                                text:'7',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],
                              [
                              {
                                text:'8',
                                fontSize:6,
                                bold:true,
                                alignment:'center'
                              },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                              ],

                            ]
                        },
                      },{},{},{},{},{},{},{},{}
                      ],
                      [
                      {
                        colSpan: 9,
                        fontSize: 8,
                        text: 'CASOS DE EXCEPCION:',
                        alignment: 'center'
                      },{},{},{},{},{},{},{},{}
                      ],
                      [
                      {
                        colSpan: 9,
                        fontSize: 7,
                        text: ' '
                      },{},{},{},{},{},{},{},{}
                      ],
                      [
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'ELABORO NOMBRE Y FIRMA',
                        alignment: 'center'
                      },{},{},
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'FIRMA DEL RESPONSABLE',
                        alignment: 'center'
                      },{},{},
                      {
                        colSpan: 3,
                        fontSize: 8,
                        text: 'FIRMA DEL CONDUCTO',
                        alignment: 'center'
                      },{},{}
                      ],
                      [
                      {
                        rowSpan: 3,
                        text: '',
                        colSpan:3,
                        fontSize:30
                      },{},{},
                      {
                        rowSpan: 3,
                        text: '',
                        colSpan:3,
                        fontSize:30
                      },{},{},
                      {
                        rowSpan: 3,
                        text: 'aasdas',
                        colSpan:3,
                        color:'#ffffff',
                        fontSize:40
                      },{},{},
                      ],
                      [
                      {

                      },{},{},
                      {

                      },{},{},
                      {

                      },{},{},
                      ],
                      [
                      {

                      },{},{},
                      {

                      },{},{},
                      {

                      },{},{},
                      ],
                      [
                      {
                        colSpan: 9,
                        fontSize:8,
                        bold:true,

                        text: [
                                {
                                  text:'FUNDAMENTO LEGAL:          \n\n ARTICULO 83RTCF .- TODOS LOS CONDUCTORES DE VEHICULOS QUE ESTEN AMPARADOS CON PERMISO EXPEDIDO POR LA SECRETARIA DE COMUNICACIONES Y TRANSPORTE PORTARAN, DEBIDAMENTE REGISTRADA, LA BITACORA A QUE SE REFIERE EL PRESENTE ARTICULO, ASI COMO LAS DE LOS SIETE DIAS ANTERIORES, LOS PERMISIONARIOS DEBERAN CONSERVAR LAS BITCORAS POR UN PERIODO DE 60 DIAS, CONTADOS A PARTIR DEL DIA QUE CORRESPONDA SU ELABORACION. (REFORMA PUBLICA EN EL DOF DE FECHA 29 DE MARZO DE 2000).',
                                },

                            ]
                      }
                      ]

                    ]
                }

              },
              {
                text: ['',
                    {text:'NOTA: ', fontSize:9, bold: true},
                    '',
                    {text:'LA CONDUCCION NO DEBERA EXCEDER DE 8 HRS', fontSize:9, bold:false},
                ],
              }

          ],
          style: {
             header: {
               fontsize: 30,
               bold: true,
               margin:[0, 0, 0, 0]
             },
             table: {
                    margin: [0, 0, 0, 0],
                    fontSize: 11,
                    border: [true,true,true,true]
             },
             subheader: {
                      fontSize: 13.5,
                      bold: true,
                      alignment: 'justify'
                  }
          },
      }
      var pdfDoc = printer.createPdfKitDocument(dd);
      pdfDoc.pipe(res);
    pdfDoc.end();
    },

    ordenPDF: (data, res) => {
        var dd={
            content:[
              {
                    columns: [
                        {
                          width: '100%',
                          text: 'SERVICIOS TURISTICOS TERRESTRES\n\n',style: 'header', bold:true, fontSize:20, alignment: 'center', color: '#054f95',
                        }
                    ]
              },
              {
                columns: [
                    {
                      // auto-sized columns have their widths based on their content
                      width: 'auto',
                      image: __dirname + '/../assets/images/bground.png',
                      width:150,
                      height:85,
                      alignment: 'justify',
                    },
                    {
                      // star-sized columns fill the remaining space
                      // if there's more than one star-column, available width is divided equally
                      width: '*',
                      image: __dirname + '/../assets/images/mapa.png',
                      width:80,
                      height:85,
                      alignment: 'justify',
                    },
                    {
                      // fixed width
                      width: 100,
                      text: '\nServiBus',
                      color: '#054f95',
                      bold: true,
                      fontSize: 25,

                    },
                    {
                      // % width
                      width: 150,
                      height: 85,
                      text: '\n\n\n\nTEL.(01-747) 472-00-51, 491-67-56 \n\n servibus2010@hotmail.com',
                      alignment: 'center',
                      color: '#054f95',
                      fontSize: 7,

                    }
                  ],
                  // optional space between columns
                  columnGap: 20
              },
              {
                text:['',{
                    text:'CONTRATO DE TRANSPORTACION                     ', fontSize:8, alignment: 'right', color: '#054f95',
                },
                '',{
                    text:`${data.id_contrato || ''}`, bold:true, fontSize:9, alignment: 'right',
                }
                ]
              },
              {
                fontSize:8,
                alignment:'right',
                color: '#054f95',
                text:['\nChilpancingo,             Gro,           a            ', {
                  text:`${data.fecha_orden_servicio || ''}`, bold:true, fontSize:9
                }]
              },
              {
                fontSize: 9,
                bold: true,
                color:'#000000',
                text:['\n\n\n\n Responsable:                                       ',{
                  text:`${data.responsable || ''}`, bold:true, fontSize:10, alignment: 'center',
                }]
              },
              {
                fontSize:9,
                bold: true,
                color: '#000000',
                text:['\nNo. Telefonico:                     ',{
                  text:`${data.telefono || ''}`, bold:true, fontSize:10, alignment: 'center',
                }]
              },
              {
                fontSize: 9,
                color: '#054f95',
                text:['\nPor concepto de  ',{
                  text:'    SERVICIO DE TRANSPORTE   ', bold:true, fontsize:10, color: '#000000'
                },
                '                    de el dia ',
                {text:`                          ${data.fecha_salida || ''} `, bold:true, fontsize:10, color: '#000000'},
                '            al                     ',
                {text: ` ${data.fecha_regreso || ''}`, bold:true, fontsize:10, color: '#000000'},
                ]
              },
              {
                fontSize: 9,
                color: '#054f95',
                text:['\nLugar y Hora de Salida  ',{
                  text:`    ${data.salida || ``}    `, bold:true, fontsize:10, color: '#000000', alignment: 'center'
                }]
              },
              {
                fontSize: 9,
                color: '#000000',
                bold: true,
                text:['\nRegreso:    ', {
                  text: `   ${data.regreso || ``}`, bold:true, fontsize:10, color: '#000000', alignment: 'center'
                },
                '',
                {
                  text:'                   Destino                            ' , fontSize: 9, color: '#054f95',
                },
                '',
                {
                  text:`  ${data.destino || ``}`, bold:true, fontsize:10, color: '#000000', alignment: 'center'
                }]
              },
              {
                fontSize: 9,
                color: '#054f95',
                text:['\nItinerario:   ',{
                  text: `${data.itinerario || ``}\n\n\n`, bold:true, fontsize:10, color: '#000000', alignment: 'center'
                }]
              },
              {
                columns: [
                    {},
                    {
                      width: 200,
                      fontSize:9,
                      text: ['\n\nKm de salida:  ', {
                          text: `${data.kilometros_salida || ``}`, bold:true, fontsize:10, color: '#000000', alignment: 'center'
                      },
                      '\n\n\nTotal de Kilometros\n recorrios: ',
                      {   text: '_______________________',color: '#1e85e7'},
                      '\n\n\n Disiel: ',
                      {   text: '___________________________', color: '#1e85e7'}
                    ]},
                    {
                      width: 200,
                      fontSize:9,
                      text: ['\n\nKm de llegada: ',{
                          text: `_______________________`, color: '#1e85e7'
                      },
                      '\n\n\n\nRendimiento: ',
                      {text: '_________________________', color: '#1e85e7'}
                    ]},
                ],
                columnGap: 20,
              },
              {
                fontSize: 10,
                color: '#000000',
                alignment: 'center',
                bold: true,
                text: ['\n\n\nGastos:'],
              },
              {
                fontSize: 9,
                color: '#000000',
                alignment: 'center',
                text:['\nCasetas:   ',
                {text:'______________________________     ', color: '#1e85e7'},
                '  Comidas:   ',
                {text:'______________________________     ', color: '#1e85e7'},
                '  Total:   ',
                {text:'______________________________   ', color: '#1e85e7'}
                ]
              },
              {
                fontSize: 9,
                color: '#000000',
                text:['\n\n\n\n\nOperador:   ',
                {text:'___________________________________________________________________________________________________________________', color: '#1e85e7'}]
              },
              {
                fontSize: 9,
                color: '#000000',
                alignment: 'center',
                text:['\n\n\nOPERADOR                            ',
                {text:'                                                                        RECIBI DE EMPRESA', alignment:'center', color: '#054f95'}]
              },
              {
                color: '#1e85e7',
                alignment: 'center',
                text:['\n\n__________________________________                                  __________________________________']
              }
            ],
            styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 0, 0, 0]
                },
                table: {
                    margin: [0, 0, 0, 0],
                    fontSize: 11,
                    border: [true,true,true,true]
                },
                normal: {
                    fontSize: 11,
                    color: 'black',
                    alignment: 'justify'
                }
            },
        }
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(res);
	    pdfDoc.end();
    }
}
