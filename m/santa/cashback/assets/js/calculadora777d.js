const SIGNO_PESOS = "$";
var monto_gastado = 0;
const TITLE_NOMINA = "Nómina";
const TITLE_LIKEU = "LikeU";

const PORCENTAJE_GASOLINA_NOMINA = 0.01;
const PORCENTAJE_GASOLINA_LIKEU = 0.04;

const PORCENTAJE_REST_ENTRE_NOMINA = 0.02;
const PORCENTAJE_REST_ENTRE_LIKEU = 0.05;

const PORCENTAJE_FARMACIAS_NOMINA = 0.03;
const PORCENTAJE_FARMACIAS_LIKEU = 0.06;


function getCardSelected(cardActive, cardSelected, pGasolineras, pRestEntre, pFarmacias) {
    $("*").removeClass("card-active");
    $("*").removeClass("text-active");
    $("#card" + cardActive).addClass("card-active");
    $("#text" + cardActive).addClass("text-active");
    
    var setCardSelected = document.querySelectorAll('.title-card-selected');
    for (let index = 0; index < setCardSelected.length; index++) {
        setCardSelected[index].innerHTML = cardSelected;       
    }

    document.getElementById("porcentaje-gasolineras").innerHTML = pGasolineras;
    document.getElementById("porcentaje-rest-entre").innerHTML = pRestEntre;
    document.getElementById("porcentaje-farmacias").innerHTML = pFarmacias;

    
    document.getElementById("monto_gasolineras").value = "";
    document.getElementById("monto_res_entre").value = "";
    document.getElementById("monto_farmacias").value = "";

    $("*").removeClass("show-alert");
    document.getElementById("monto_gasolineras").removeAttribute("disabled", true);
    document.getElementById("monto_res_entre").removeAttribute("disabled", true);
    document.getElementById("monto_farmacias").removeAttribute("disabled", true);
    $("*").removeClass("text-disabled");


    document.getElementById("result-cashback-gasolineras").innerHTML = 0;
    document.getElementById("result-cashback-rest-entre").innerHTML = 0;
    document.getElementById("result-cashback-farmacias").innerHTML = 0;

    document.getElementById("cashback_total_anual").innerHTML = 0;
    
}

/**
 * Calcular cashback.
 */
function getMontoCashback(montoInput, resultCashBack, porcentaje, comercio, inputDisabled1, inputDisabled2) {
    var input = document.getElementById(montoInput);

    input.value = (input.value.length > 0) ? SIGNO_PESOS + convertValuetoMoney(input.value) : input.value;

    if (input.value != "") {
        monto_gastado = excluirCaracteresEspeciales(input.value)
        document.getElementById(resultCashBack).innerHTML = convertValuetoMoney(getPorcentajeAnual(monto_gastado, parseFloat("0.0"+ porcentaje)));
    } else {
        document.getElementById(resultCashBack).innerHTML = 0;
    }
    setResultCashbackAnual(comercio, inputDisabled1, inputDisabled2);
}

//Formato a tipo modeda dentro de input.
function convertValuetoMoney(value) {
    var valueMoney = value.replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    return valueMoney;
}

//Quita $ y , al monto ingresado.
function excluirCaracteresEspeciales(valor) {
    var monto_input = valor.replace(SIGNO_PESOS, "");
    return parseFloat(monto_input.replace(/,/g, ""));
}

function getPorcentajeAnual(monto, porcentaje) {
    var cashback = monto * porcentaje * 12;
    return cashback.toFixed(2);
}

function setResultCashbackAnual(comercio, inputDisabled1, inputDisabled2) {    
    /**
     * Se realiza suma total de cashback nomina
     */
    var resultTotal = 0;
    $("*").removeClass("show-alert");
    document.getElementById("monto_" + inputDisabled1).removeAttribute("disabled", true);
    document.getElementById("monto_" + inputDisabled2).removeAttribute("disabled", true);
    $("*").removeClass("text-disabled");
    var gasolinera_cashback = document.getElementById("result-cashback-gasolineras").innerHTML;
    var rest_entre_cashback = document.getElementById("result-cashback-rest-entre").innerHTML;
    var farmacias_cashback = document.getElementById("result-cashback-farmacias").innerHTML;

    gasolinera_cashback = parseFloat(gasolinera_cashback.replace(/,/g, ""));
    rest_entre_cashback = parseFloat(rest_entre_cashback.replace(/,/g, ""));
    farmacias_cashback = parseFloat(farmacias_cashback.replace(/,/g, ""));

    resultTotal = gasolinera_cashback + rest_entre_cashback + farmacias_cashback;

    var cashbackMaximo = (document.getElementById("title-card-selected").innerHTML === TITLE_LIKEU) ? 10000 : 5000;
    
    if (resultTotal > cashbackMaximo) {
        resultTotal = cashbackMaximo;

        validateAlerts(comercio, gasolinera_cashback, farmacias_cashback, rest_entre_cashback, cashbackMaximo);
        

        if (document.getElementById("monto_" + inputDisabled1).value == "") {
            document.getElementById("monto_" + inputDisabled1).setAttribute("disabled", true);
            document.getElementById("result_" + inputDisabled1).classList.add("text-disabled");
        }
        if (document.getElementById("monto_" + inputDisabled2).value == "") {
            document.getElementById("monto_" + inputDisabled2).setAttribute("disabled", true);
            document.getElementById("result_" + inputDisabled2).classList.add("text-disabled");
        }
        
    }
    
    document.getElementById("cashback_total_anual").innerHTML = (resultTotal > 0) ? convertValuetoMoney(resultTotal.toFixed(2)) : 0;
}

function validateAlerts(comercio, gasolinera_cashback, farmacias_cashback, rest_entre_cashback, cashbackMaximo) {
    if (gasolinera_cashback > cashbackMaximo) {
        document.getElementById("alert_gasolineras").classList.add("show-alert");
    } else if (rest_entre_cashback > cashbackMaximo) {
        document.getElementById("alert_res_entre").classList.add("show-alert");
    } else if (farmacias_cashback > cashbackMaximo) {
        document.getElementById("alert_farmacias").classList.add("show-alert");
    } else {
        document.getElementById("alert_" + comercio).classList.add("show-alert");
    }
}