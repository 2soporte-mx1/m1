class tags {

    /* Category */
    category = "pay_santander";


    /* Actions */
    banner = "banner_pay_santander"
    cuentasConCodigo = "ingresa_tu_codigo"
    nuestrosProductos = "nuestros_productos";

    /* Labels */
    pagar1 = "pagar_tarjeta";
    pagar2 = "pagar_tarjeta";


    /* ======================== */
    /* Labels nuestrosProductos */
    /* ======================== */
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

    utag.link({
        interaction_category: descargaDatos["category"], //required
        interaction_action: descargaDatos[paso1Action], //required
        interaction_label: descargaDatos[paso1Label], //required
    });

}