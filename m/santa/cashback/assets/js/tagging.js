class tags {

    /* TAGGEO CORRESPONDIENTE A LA LANDING PAGE "MEMBERS-SAMSUNG" */

    event = "home";

    /* Category */
    category = "cashback";

    /* Actions */
    submenu = "submenu";
    ganar = "como_ganar_cashback";
    generar = "donde_generar_cashback";
    preguntas = "preguntas_frecuentes";
    requisitos = "requisitos";
    beneficios_nomina = "beneficios_nomina";
    calcula = "calcula_tu_cashback";
    cliente = "aun_no_eres_cliente";
    comercios = "comercios_participantes"

    gasolineras = "calcula_gasolineras";
    res_entre = "calcula_restaurantes_entretenimiento";
    farmacias = "calcula_farmacias";
    /* Labels */

    submenu_opt1 = "casback_baby";
    submenu_opt2 = "likeu";
    submenu_opt3 = "nomina";
    submenu_opt4 = "calculadora";
    submenu_opt5 = "comercios_participantes";

    lblVerMasNomina = "ver_mas_nomina";
    lblVerMasLikeU = "ver_mas_likeu";
    lblConsultaTyC = "consultar_tyc";
    lblVerMasTDC = "ver_mas_likeu";
    lblDescargarFormato = "decargar_formato";
    lblPortabilidad = "haz_tu_portabilidad";
    lblSolicitala = "solicitala";

    lblTarjetaNomina = "tarjeta_nomina";
    lblTarjetaLikeU = "tarjeta_likeu";


    /* Labels Preguntas */
    lblPregunta1 = "que_es_cashback";
    lblPregunta2 = "como_me_inscribo";
    lblPregunta3 = "donde_recibire_cashback";
    lblPregunta4 = "cuando_recibire_cashback";
    lblPregunta5 = "todas_mis_compras_daran_cashback";
    lblPregunta6 = "compra_no_me_dio_cashback";
    lblPregunta7 = "que_compras_dan_cashback";
    lblPregunta8 = "el_programa_genera_costo";
    lblPregunta9 = "cuanto_cashback_tengo";
    lblPregunta10 = "el_cashback_tiene_vigencia";
    lblPregunta11 = "hay_un_monto_maximo_cashback";
    lblPregunta12 = "que_pasa_si_recibo_monto_maximo";
    lblPregunta13 = "pierdo_cashback_generado";


    lblLikeuPregunta1 = "se_acumula_cashback";
    lblLikeuPregunta2 = "compras_en_linea_genera_cashback";
    lblLikeuPregunta3 = "recibir_cashback_tarjeta_digital";
    lblLikeuPregunta4 = "meses_sin_intereses_dan_cashback";
    lblLikeuPregunta5 = "si_pierdo_mi_tarjeta_likeu";
    lblLikeuPregunta6 = "necesito_abrir_otra_cuenta";

    lblNominaPregunta1 = "sigo_generando_cashback";
    lblNominaPregunta2 = "si_cancelo_portabilidad";
    lblNominaPregunta3 = "perdi_mi_tarjeta_nomina";
    lblNominaPregunta4 = "envio_dinero_a_otra_cuenta";
    lblNominaPregunta5 = "compras_con_tarjeta_digital";
    lblNominaPregunta6 = "tengo_otra_tarjeta_de_debito";
    lblNominaPregunta7 = "recibo_cashback_de_las_dos";
    lblNominaPregunta8 = "recibo_cashback_en_todas";
    lblNominaPregunta9 = "requisitos_cashback_nomina";

    /* ======================== */
    /* Footer superlinea        */
    /* ======================== */
    nuestrosProductos = "nuestros_productos";
    superlinea = "superlinea";
    desdeMexico = "5551694304";
    desdeExtranj = "18447058077";
    tarjetas = "tarjetas_de_credito";
    cuentas = "opc_cuentas";
    inversiones = "opc_inversiones";
    credHipot = "credito_hipotecario";
    credAutom = "credito_automotriz";
    credPers = "credito_personal";
    seguros = "seguros";
    traeTuNom = "trae_tu_nomina";
}


let _category = "";
let _action = "";
let _label = "";

let _category_error = "";
let _action_error = "";
let _label_error = "";

const eventUtag = (paso1Action, paso1Label, value = false, tarjeta = "") => {

    let descargaDatos = new tags();
        
    if(value) {
        if(paso1Label != null && paso1Label != "") {
            if(_category != descargaDatos["category"] || _action != descargaDatos[paso1Action] + "_" + tarjeta || _label != paso1Label) {

                _category = descargaDatos["category"];
                _action = descargaDatos[paso1Action] + "_" + tarjeta;
                _label = paso1Label;

                dataLayer.push({
                    event: descargaDatos["event"],
                    category: descargaDatos["category"],
                    action: descargaDatos[paso1Action] + "_" + tarjeta,
                    label: paso1Label
                }); 
            }  
        }
    }
    else {
        dataLayer.push({
            event: descargaDatos["event"],
            category: descargaDatos["category"],
            action: descargaDatos[paso1Action],
            label: descargaDatos[paso1Label]
        });
    }
}


const eventUtagError = (textAction, textLabel) =>  {

    if(_action_error != textAction || _label_error != textLabel + "_monto_limite") {

        _action_error = textAction;
        _label_error = textLabel + "_monto_limite";

        dataLayer.push({
            event: "home",
            category: "error",
            action: textAction,
            label: textLabel + "_monto_limite"
        });
    }
}