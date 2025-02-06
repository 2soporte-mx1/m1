(function(a, b, c, d) {
    // Taggeo para prod
    a = '//tags.tiqcdn.com/utag/santander/mx-main-public/prod/utag.js';
    // Taggeo para dev
    // a = "//tags.tiqcdn.com/utag/santander/mx-intranet/prod/utag.js";
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
    'section': 'Educacion-financiera', //section
    'subsection1': 'Index', //section
    'page_name': '|Educacion-financiera|Index|', // pagename concatenated with previous values 
    'url': window.location.pathname, //,
    'visualization': 'desktop'
}

function capitalize(word) {
    if(word === "") {
        return "";
    }

    return word[0].toUpperCase() + word.slice(1);
}

var arreglo = window.location.pathname.slice(1).split('/');
var pageName = '|';

arreglo.forEach(function(value, index){
    value = capitalize(value);
    
    if(index == 0) {
        utag_data["section"] = value;
        pageName += value + '|';
    }
    else {
        if(value === 'Index.html' || value === 'Index-redesign.html' ) {
            utag_data["subsection" + index] = 'Index';
            pageName += 'Index|';
        }
        else if(value === ""){

        }
        else {
            utag_data["subsection" + index] = value;
            pageName += value + '|';
        }
    }
});

utag_data["page_name"] = pageName;

if(window.location.pathname.lastIndexOf(".html") != -1) {
    let path = window.location.pathname;

    utag_data["url"] = path.slice(0,path.length-5);
}