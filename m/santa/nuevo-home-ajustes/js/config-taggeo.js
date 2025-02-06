$(function(){
    var utag_data = {
        'tipoSitio': 'Publico',
        'idiomaPagina': 'Espanol',
        'canalBanco': 'home',
        'versionApp': '1.0.0',
        'section': 'Index', //section
        'page_name': '|Index', // pagename concatenated with previous values 
        'url': '/index', //,
        'visualization': 'desktop',
        'event':'PageView'
    }
    
    dataLayer.push(utag_data);
});