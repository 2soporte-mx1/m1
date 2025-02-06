$(function(){
    var utag_data = {
        'tipoSitio': 'Publico',
        'idiomaPagina': 'Espanol',
        'canalBanco': 'Sitio_publico',
        'section': 'Personas', //section
        'subsection1': 'Tarjetas-de-credito', //section
        'subsection2': 'Index', //section
        'page_name': '|Personas|Tarjetas-de-credito|Index|', // pagename concatenated with previous values 
        'url': window.location.pathname, //,
        'visualization': 'desktop',
        'event':'pageview'
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
            else if(value.lastIndexOf(".html") != 0) {
                let page = value.replace(".html", "");

                utag_data["subsection" + index] = page;
                pageName += page + '|';
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
    
    dataLayer.push(utag_data);
});