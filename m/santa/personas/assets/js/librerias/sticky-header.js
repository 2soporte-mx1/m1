window.onscroll = function () {
    onScrollWindow()
};

var body = document.querySelector("body");
var header = document.querySelector("body > header");
var sticky = header.offsetTop;

function onScrollWindow() {
    if (window.pageYOffset > sticky) {
        header.classList.add("cro-sticky");
    } else {
        header.classList.remove("cro-sticky");
    }
}

// function onScrollWindow() {
//     if (window.pageYOffset > sticky) {
//         header.classList.add("cro-sticky");
//         body.classList.add("cro-header-sticky");

//     } else {
//         header.classList.remove("cro-sticky");
//         body.classList.remove("cro-header-sticky");
//     }
// }

var testInterval = setInterval(function () {
    conditionalCro();

    if (document.querySelector('.cro-header-link')) {
        clearInterval(testInterval);
    }

}, 500);

function conditionalCro() {
    var elRef = document.querySelector("#header > nav > div> div:nth-child(4) > div > a");

    if (elRef) {
        init();
    }
}

// function conditionalCro() {
//     var elRef = document.querySelector("body > header > div > div.cliente__mobile > a");

//     if (elRef) {
//         init();
//     }
// }

function init() {
    var btn = document.querySelector("#header > nav > div> div:nth-child(4) > div > a");

    var url = 'https://www.santander.com.mx/personas/santander-digital/hazte-cliente.html?utm_source=Boton_hazte_cliente&utm_medium=click&utm_campaign=MXACC028_HazteCliente_Variante';
    btn.setAttribute('href', url);

    var funcGA = function (evento) {
        evento.preventDefault();
        utag.link({
            interaction_category: 'Boton_hazte_cliente',
            interaction_action: 'Click',
            interaction_label: 'MXACC028_HazteCliente_Variante'
        });
        window.open(url, "_self")
    };

    btn.addEventListener('click', funcGA);

    btn.classList.add('cro-header-link');
}

// function init() {
//     var btn = document.querySelector("body > header > div > div.cliente__mobile > a");

//     btn.setAttribute('target', '_blank');

//     btn.setAttribute('href', 'https://www.santander.com.mx/personas/santander-digital/hazte-cliente.html?utm_source=Boton_hazte_cliente&utm_medium=click&utm_campaign=MXACC028v2_HazteCliente_Variante');

//     var funcGA = function () {

//         setTimeout(function () {
//             ga("create", "UA-66848441-30", "auto");
//             ga('send', 'event', 'Boton_hazte_cliente', 'Click', 'MXACC028v2_HazteCliente_Variante');
//         }, 1500);

//     };

//     btn.addEventListener('click', funcGA);

//     btn.classList.add('cro-header-link');
// }

init();