/* GLOBAL VARS */
var minutaD = new Date();
//para minutas ES de polmon el archivo es pubMinuta_es.json
//var gJsonMinutaFlag= "/canales/pubPolmon_es.json?date="+ minutaD.getTime();
var gJsonMinutaFlag= "/recursos/js/bm/pubMinuta_es.json?date="+ minutaD.getTime();
var gMinutaPubDate= "";
var gMinutaEnabled= false;
var gMinutaLinkText= "";
//var gPolmonDesc= "";
var gMinutaURL= "";
//var gUseLinkText=false;
var gMinutaTargetSpan= "#bmMinutaTargetSpan";
var gTextoMinutaPublicada="";
// Selector de elemento destino para el contenido de la publicación 
var targetDestinoPublicacionMinuta= "headerForMinutaLink";

function bmLeeEstadoMostrarMinuta(){
	$.ajax({
	  url: gJsonMinutaFlag,
	  cache: false
	}).done(function( data ) {

		try{
			//gMinutaEnabled= data.polmonEnabled.substr(0,4).toLowerCase();
			gMinutaPubDate= data.pubDate;
			gMinutaEnabled= data.enabled;
			gMinutaLinkText= data.linkText;							
			gMinutaURL= data.url;				
			//gUseLinkText= data.useLinkText;
			//gTextoMinutaPublicada= 'Puede consultar el anuncio de política monetaria <a id=\"targetPolmonAnchor\" href=\"' + gMinutaURL + '\" target=\"_blank\">aquí</a>.';			
			if(gMinutaEnabled)
				bmInitMinuta();
		}catch(err){ console.log("e01:"+err.message)}
	}).fail(function( jqXHR, textStatus ) {l
		console.log( "edb: " + textStatus );
	});
			
}

function bmInitMinuta(){
	var bmPolmonHTML="";
	bmPolmonHTML += "<div class=\"container\" style=\"max-width: 1170px;\">";
	bmPolmonHTML += "	<div class=\"row\"><!-- Div para streaming -->";
	bmPolmonHTML += "		<div class=\"col-xs-12 col-sm-12 col-md-12\">";
	bmPolmonHTML += "			<div class=\"panel panel-default\">";
	bmPolmonHTML += "				<div class=\"panel-body\">";
	bmPolmonHTML += "					<div class=\"container\">";
	//bmPolmonHTML += "								<div class=\"row no-gutters\" id=\"bmStreamingBSRowDiv\" style=\"border-radius: 0px 10px 10px 0px; background-color: rgb(238, 243, 243);\">";
	bmPolmonHTML += "								<div class=\"row no-gutters\" style=\"border-radius: 10px; background-color: rgb(238, 243, 243); box-shadow: 5px 5px 5px rgba(68,68,68,0.3); \">";
	bmPolmonHTML += "										<div class=\"col-xs-12 col-sm-12 col-md-12\" style=\"padding: 0px;\">";
	bmPolmonHTML += "											<div style=\"margin: auto; width: 99%; height: 100%; text-align: center;\">";
	bmPolmonHTML += "												<p class=\"card-title a11yCencab\" id=\""+targetDestinoPublicacionMinuta+"\" ><\/p>";//modificado accesibilidad remediación, h3 por p
	bmPolmonHTML += "											<\/div>";
	bmPolmonHTML += "										<\/div>";
	bmPolmonHTML += "								<\/div>";
	bmPolmonHTML += "					<\/div>";
	bmPolmonHTML += "				<\/div>";
	bmPolmonHTML += "			<\/div>";
	bmPolmonHTML += "		<\/div>";
	bmPolmonHTML += "		<\/div>";
	bmPolmonHTML += "<\/div>";

	/* --------Insertando div con texto previo a la polmon--------- */
	$(gMinutaTargetSpan).append(bmPolmonHTML);

	/* --------Insertando texto sólo si existe liga--------- */
	//limpiando strings 
	gMinutaURL= gMinutaURL.replace(/^\s+|\s+$/g,"");
	gMinutaLinkText= gMinutaLinkText.replace(/^\s+|\s+$/g,"");
	
	if( gMinutaURL != "" && gMinutaLinkText != ""){		
			//if( gUseLinkText ){ }
			//gTextoMinutaPublicada= "<a href=\"" + gMinutaURL + "\" target=\"_blank\" style=\"text-decoration: underline;\" >"+gMinutaPubDate+"&nbsp;" + gMinutaLinkText + "</a>";
			//gTextoMinutaPublicada= "<a href=\"" + gMinutaURL + "\" target=\"_blank\" style=\"text-decoration: underline;\" >&nbsp;" + gMinutaLinkText + "</a>";			
			gTextoMinutaPublicada= "<a title=\"se abrirá en otra pestaña\" data-a11y=\"true\" onclick=\"ga('send', 'event', 'Hit', 'Open', '"+gMinutaURL+"');\" href=\""+gMinutaURL+"\" target=\"_blank\" style=\"text-decoration: underline;\">"+gMinutaLinkText+"<\/a>";//modificado accesibilidad remediación, se incluyen title y data-a11y
	}else{			
		gTextoMinutaPublicada="";
	}	
	var auxSelector="#" + targetDestinoPublicacionMinuta;
	$( auxSelector ).html(gTextoMinutaPublicada);
}

$(document).ready(function(){
	try{
			bmLeeEstadoMostrarMinuta();		
	}catch(err){ console.log("E:" + err.message); }
});
	
	