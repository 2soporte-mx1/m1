(function(a, b, c, d) {
    // Taggeo para prod
    a = '//tags.tiqcdn.com/utag/santander/mx-main-public/prod/utag.js';
    // Taggeo para dev
    /* a = "//tags.tiqcdn.com/utag/santander/mx-intranet/prod/utag.js"; */
    b = document;
    c = 'script';
    d = b.createElement(c);
    d.src = a;
    d.type = 'text/java' + c;
    d.async = true;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a);
})();

/* TEALIUM */
var utag_data = {
    'tag_tipoSitio': 'Publico',
    'tag_idiomaPagina': 'Espanol',
    'tag_canalBanco': 'Sitio_publico',
    'section': 'Personas', //section
    'subsection': 'Tarjetas-De-Credito', //section
    'subsection': 'Pay-Santander', //section
    'page_name': 'Personas|Tarjetas-De-Credito|Pay-Santander', // pagename concatenated with previous values 
    'url': window.location.pathname, //,
    'visualization': 'desktop'
}