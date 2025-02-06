let timeout
let input = document.querySelector('#busquedaFaqs');//Input donde escribe el usuario
let resultado = document.querySelector('#buscaFaqsDiv');//div para insertar informacion(html)

//Información a mostrar
//1 nomina
//2 tarjeta de debito
//3 cuenta
let faqs = [
    {
        id: 1,
        preguntas: 'nomina portabilidad recibo credito cambio',
        html: `<h4 class="h4Generico">¿Qué es la portabilidad de nómina?</h4>
        <p class="parrafoGenericoMb">
            Es un proceso sin costo que puedes realizar para trasladar el pago de tu nómina al banco que tú elijas.
        </p>

        <h4 class="h4Generico">¿Puedo seguir recibiendo mi nómina en Santander si cambié de trabajo o mi empresa cambió de banco?</h4>
        <p class="parrafoGenericoMb">
            Sí, sólo debes realizar tu portabilidad de nómina a Santander. Acude a cualquier sucursal donde te ayudaremos o hazlo tú mismo desde tu banca electrónica de Santander.
        </p>        
        
        <h4 class="h4Generico">¿Puedo hacer mi portabilidad a Santander si tengo un crédito contratado con el banco en el que actualmente recibo mi nómina?</h4>
        <p class="parrafoGenericoMb">
            Claro que puedes. El banco donde actualmente recibes tu nómina descontará tus pagos, antes de enviar el saldo de tu nómina a Santander.                              
        </p>
        
        <h4 class="h4Generico">Si cambio mi nómina a Santander ¿tengo que cancelar la cuenta del banco en donde recibo mi nómina actualmente?</h4>
        <p class="parrafoGenerico">
            No es obligatorio cancelarla. Tu cuenta seguirá activa, sólo que tus pagos de nómina los verás reflejados en tu cuenta Santander.
        </p>
        `
    },
    {
        id: 2,
        preguntas: 'tarjeta de debito tdc tdd debiti plastico dinero cajero',
        html: `<h4 class="h4Generico">¿Para qué sirve la tarjeta de débito?</h4>
        <p class="parrafoGenericoMb">
            La tarjeta de débito puede ser fisica o digital, tu tarjeta fisica es un plástico con el que puedes disponer de tu dinero a través de nuestros cajeros sin costo; y con tu tarjeta digital podras pagar en miles de comercios electronicos de forma segura.
        </p>

        <h4 class="h4Generico">¿Cómo reportar o reponer mi tarjeta por robo o extravío?</h4>
        <p class="parrafoGenerico">
            Te invitamos a llamar a la SuperLínea desde cualquier parte del país, sin costo: 55 5169 4300.
        </p>`
    },
    {
        id: 3,
        preguntas: 'sucursal cercana clabe numero de cuenta desbloquear',
        html: `
        <h4 class="h4Generico">¿Cómo abrir una cuenta bancaria?</h4>
        <ul style="margin-bottom: 0;">
            <li class="parrafoGenerico">Acude a tu sucursal <a onclick="eventUtag('faqs', 'como_abrir_una_cuenta_bancaria_faqs', 'sucursal_santander_mas_cercana')" href="https://branchlocator.santander.com/?view=mx&defaultLanguage=es" class="txt-red">Santander más cercana</a></li>
            <li class="parrafoGenerico">Presenta tu identificación oficial vigente y comprobante de domicilio no mayor a 3 meses</li>
            <li class="parrafoGenerico">Solicita tu Cuenta Santander. ¡Eso es todo!</li>            
        </ul>                                    
        <p class="parrafoGenericoMb">     
            *Consulta los requisitos de contratación especificos para cada cuenta en los folletos informativos que ponemos a tu disposición
        </p>   

        <h4 class="h4Generico">¿Dónde puedo consultar mi cuenta CLABE o mi número de cuenta?</h4>
        <p class="parrafoGenerico">
            <ul>
                <li class="parrafoGenerico"> Ingresa a la aplicación SuperMóvil desde tu celular.</li>
                <li class="parrafoGenerico">Da click en la sección de detalle cuenta.</li>
                <li class="parrafoGenerico">Ingresa tu Token y listo.</li>
            </ul>
        </p>
        
        <h4 class="h4Generico">¿Cómo desbloquear mi cuenta Santander?</h4>
        <p class="parrafoGenerico">
            Para desbloquear o activar tu cuenta deberás seguir estos pasos:
            <ul>
                <li class="parrafoGenerico">Acude a la sucursal Santander de tu preferencia con una Identificación oficial vigente.</li>
                <li class="parrafoGenerico">Presenta una carta solicitando el desbloqueo o reactivación de tu cuenta; la carta debe
                contener:</li>
                <li class="parrafoGenerico">Nombre completo del titular de la cuenta.</li>
                <li class="parrafoGenerico">El número de cuenta que se va a desbloquear o reactivar.</li>
                <li class="parrafoGenerico">Firma del titular de la cuenta.</li>
            </ul>
        </p>

        <h4 class="h4Generico">¿Cómo puedo descargar mi estado de cuenta?</h4>
        <p class="parrafoGenerico">
            <ul>
                <li class="parrafoGenerico">Despliega el menú en la parte superior derecha y da click en estados de cuenta.</li>
                <li class="parrafoGenerico">Selecciona tu cuenta y el periodo.</li>
                <li class="parrafoGenerico">Ingresa tu supertoken y ¡Listo!.</li>
            </ul>
        </p>
        `
    }
]

//Default al cargar lading
muestraInfoFaqs(1);

//Para los hover de los botones
const infoFaqs = (opc) => {
    muestraInfoFaqs(opc);
    abrirSeccion(opc);
    $("#busquedaFaqs").val("");
}

//Muestra u oculta divs con info de cada boton
function muestraInfoFaqs(tipo) {
    $(".formaDelBtn").removeClass("opActiva");
    $("#" + tipo).addClass("opActiva");

    //Limpiar div
    if (tipo == 0) {
        resultado.innerHTML = ``
    }
    //Nomina
    if (tipo == 1) {
        resultado.innerHTML = `<div>${faqs[0].html}</div>`
    }
    //TDD
    if (tipo == 2) {
        resultado.innerHTML = `<div>${faqs[1].html}</div>`
    }
    //Cuenta
    if (tipo == 3) {
        resultado.innerHTML = `<div>${faqs[2].html}</div>`
    }
}

//Para que solo escriba letras
function checkEscritura(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Teclas de retroceso para borrar y espacio, siempre las permite
    if (tecla == 8 || tecla == 32) {
        return true;
    }

    // Patrón de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

//Para buscar por palabras clave e inserta el html que sea concidente 
const filtrar = () => {
    resultado.innerHTML = ``;
    const textop = input.value.toLowerCase();
    for (let faq of faqs) {
        let pregunta = faq.preguntas.toLocaleLowerCase();
        if (pregunta.indexOf(textop) !== -1) {
            resultado.innerHTML += `
            <div>${faq.html}</div>
            <br>
            `
            $(".contenedor-tipos-seguros button").removeClass("active");
        }
    }
    eventUtagFaqs('faqs', 'buscador', textop);
}

$(document).ready(function () {
    $("#busquedaFaqs").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            filtrar();            
            navegarSubmenu("buscaFaqsDiv");
        }
    });
});


function abrirSeccion(id_buttom_selected) {                
    $(".contenedor-tipos-seguros button").removeClass("active");
    $("#" + id_buttom_selected).addClass("active");
}

function setScrollSubmenu() {
    $(".scrollMenuRivs").scrollLeft($(window).width());
}

function navegarSubmenu(id){
    let scroll = 90;

    if($("html").scrollTop() == 0) {
        scroll = scroll + 70;
    }

    $("html, body").animate({
        scrollTop: $("#" + id).offset().top - scroll
    }, 0);
}