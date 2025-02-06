class tags {

    /* TAGGEO CORRESPONDIENTE A LA LANDING PAGE "MEMBERS-SAMSUNG" */

    event = "home";

    /* Category */
    category = "supernomina";

    /* Actions */
    submenu = "menu";
    descargas = "descargas";
    asistencias = "nuevas_asistencias";
    beneficio1 = "beneficio_santander_plus";
    beneficio2 = "beneficio_muerte_accidental";

    /* Labels menu */
    submenu_opt1 = "beneficios";
    submenu_opt2 = "trae_tu_nomina";
    submenu_opt3 = "requisitos";
    submenu_opt4 = "nuevas_asistencias";

    /* Labels descargas */
    descarga_folleto = "folleto_informativo";
    descarga_formato = "formato_solicitud";
    descarga_cancelacion = "cancelacion_sucursal";

    /* Labels nuevas asistencias */
    lbl_nueva_asistencia = "conoce_mas";

    /* ======================== */
    /* Menu                     */
    /* ======================== */
    navbar = "seccion_navbar";
    iconSantander = "icono_santander"
    opcPersonas = "personas";
    opcTarjetas = "tarjetas_credito"
    opcCreditoPersonal = "credito_personal";
    opcCreditoHipotecario = "credito_hipotecario";
    opcCreditoAutomotriz = "credito_automotriz";
    opcSantanderPlus = "santander_plus";
    opcCuentas = "cuentas";
    opcInversiones = "inversiones";
    opcSeguros = "seguros";
    opcSantanderDigital = "santander_digital";
    opcRegulacion = "regulacion"
    opcPrivateBanking = "private_banking";
    opcSelect = "select";
    opcUniversidades = "universidades";
    opcColectivos = "colectivos"
    opcImgSupernet = "imagen_supernet"
    opcPymes = "pymes";
    opcEmpresasYgobierno = "empresas_y_gobierno";
    opcEmpresas = "empresas";
    opcGobierno = "gobierno";
    opcAcercaDelBanco = "acerca_banco"
    opcInversionistas = "inversionistas";
    opcSalaComunic = "sala_comunicacion";
    opcBancaResponsable = "banca_responsable";
    opcBolsaTrabajo = "bolsa_trabajo";
    opcEducFinanc = "educacion_financiera";
    opcEncuentrame = "encuentrame";
    opcAyuda = "ayuda";
    opcTutoriales = "tutoriales";
    opcBuscar = "buscar";
    opcHazteCliente = "hazte_cliente";


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


const eventUtag = (paso1Action, paso1Label) => {

    let descargaDatos = new tags();

    dataLayer.push({
        event: descargaDatos["event"],
        category: descargaDatos["category"],
        action: descargaDatos[paso1Action],
        label: descargaDatos[paso1Label]
    });
}