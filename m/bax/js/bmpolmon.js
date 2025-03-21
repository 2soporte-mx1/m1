/* GLOBAL VARS */
var polmonDate = new Date();
//para minutas ES de polmon el archivo es pubMinuta_es.json
//var gJsonPolmonFlag= "/canales/pubPolmon_es.json?date="+ polmonDate.getTime();
var gJsonPolmonFlag= "/recursos/js/bm/pubPolmon_es.json?date="+ polmonDate.getTime();
var gPubDate= "";
var gPolmonEnabled= false;
var gPolmonLinkText= "";
//var gPolmonDesc= "";
var gPolmonURL= "";
//var gUseLinkText=false;
var gPolmonTargetSpan= "#bmPOLMONTargetSpan";
var gTextoPolmonPublicada="";
// Selector de elemento destino para el contenido de la publicación 
var targetDestinoPublicacion= "headerForPolmonLink";

function bmLeeEstadoMostrarPolmon(){
	$.ajax({
	  url: gJsonPolmonFlag,
	  cache: false
	}).done(function( data ) {

		try{
			//gPolmonEnabled= data.polmonEnabled.substr(0,4).toLowerCase();
			gPubDate= data.pubDate;
			gPolmonEnabled= data.enabled;
			gPolmonLinkText= data.linkText;							
			gPolmonURL= data.url;				
			//gUseLinkText= data.useLinkText;
			//gTextoPolmonPublicada= 'Puede consultar el anuncio de política monetaria <a id=\"targetPolmonAnchor\" href=\"' + gPolmonURL + '\" target=\"_blank\">aquí</a>.';			
			if(gPolmonEnabled)
				bmInitPolmon();
		}catch(err){ console.log("e01:"+err.message)}
	}).fail(function( jqXHR, textStatus ) {
		console.log( "edb: " + textStatus );
	});
			
}

function bmInitPolmon(){
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
	bmPolmonHTML += "											<div style=\"margin: auto; width: 99%; height: 100%; text-align: center;\">										";
	bmPolmonHTML += "												<p class=\"card-title a11yCencab\" id=\""+targetDestinoPublicacion+"\" ><\/p>"; //modificado accesibilidad remediación, h3 por p
	bmPolmonHTML += "											<\/div>						";
	bmPolmonHTML += "										<\/div>";
	bmPolmonHTML += "								<\/div>";
	bmPolmonHTML += "					<\/div>";
	bmPolmonHTML += "				<\/div>		";
	bmPolmonHTML += "			<\/div>";
	bmPolmonHTML += "		<\/div>";
	bmPolmonHTML += "		<\/div>";
	bmPolmonHTML += "<\/div>";

	/* --------Insertando div con texto previo a la polmon--------- */
	$(gPolmonTargetSpan).append(bmPolmonHTML);

	/* --------Insertando texto sólo si existe liga--------- */
	//limpiando strings 
	gPolmonURL= gPolmonURL.replace(/^\s+|\s+$/g,"");
	gPolmonLinkText= gPolmonLinkText.replace(/^\s+|\s+$/g,"");
	
	if( gPolmonURL != "" && gPolmonLinkText != ""){					
			//gTextoPolmonPublicada= "<a href=\"" + gPolmonURL + "\" target=\"_blank\" style=\"text-decoration: underline;\" >"+gPubDate+"&nbsp;" + gPolmonLinkText + "</a>";
			//gTextoPolmonPublicada= "<a href=\"" + gPolmonURL + "\" target=\"_blank\" style=\"text-decoration: underline;\" >&nbsp;" + gPolmonLinkText + "</a>";			
			//HTML RAW <a onclick="ga('send', 'event', 'Hit', 'Open', 'gPolmonURL');" href="gPolmonURL" target="_blank" style="text-decoration: underline;">gPolmonLinkText</a>
			gTextoPolmonPublicada= "<a title=\"se abrirá en otra pestaña\" data-a11y=\"true\" onclick=\"ga('send', 'event', 'Hit', 'Open', '"+gPolmonURL+"');\" href=\""+gPolmonURL+"\" target=\"_blank\" style=\"text-decoration: underline;\" >"+gPolmonLinkText+"<\/a>"; //modificado accesibilidad remediación, se incluyen title y data-a11y
			
	}else{			
		gTextoPolmonPublicada="";
	}	
	var auxSelector="#" + targetDestinoPublicacion;
	$( auxSelector ).html(gTextoPolmonPublicada);
}

$(document).ready(function(){
	try{
			bmLeeEstadoMostrarPolmon();		
	}catch(err){ console.log("E:" + err.message); }
});
	
	