/* GLOBAL VARS */
var polcamD = new Date();
//para minutas ES de polmon el archivo es pubMinuta_es.json
//var gJsonPolcamFlag= "/canales/pubPolmon_es.json?date="+ polcamD.getTime();
var gJsonPolcamFlag= "/recursos/js/bm/pubPolcam_es.json?date="+ polcamD.getTime();
var gPolcamPubDate= "";
var gPolcamEnabled= false;
var gPolcamLinkText= "";
//var gPolmonDesc= "";
var gPolcamURL= "";
//var gUseLinkText=false;
var gPolcamTargetSpan= "#bmPolcamTargetSpan";
var gTextoPolcamPublicada="";
// Selector de elemento destino para el contenido de la publicación 
var targetDestinoPublicacionPolcam= "headerForPolcamLink";

function bmLeeEstadoMostrarPolcam(){
	$.ajax({
	  url: gJsonPolcamFlag,
	  cache: false
	}).done(function( data ) {

		try{
			//gPolcamEnabled= data.polmonEnabled.substr(0,4).toLowerCase();
			gPolcamPubDate= data.pubDate;
			gPolcamEnabled= data.enabled;
			gPolcamLinkText= data.linkText;							
			gPolcamURL= data.url;				
			//gUseLinkText= data.useLinkText;
			//gTextoPolcamPublicada= 'Puede consultar el anuncio de política monetaria <a id=\"targetPolmonAnchor\" href=\"' + gPolcamURL + '\" target=\"_blank\">aquí</a>.';			
			if(gPolcamEnabled)
				bmInitPolcam();
		}catch(err){ console.log("e01:"+err.message)}
	}).fail(function( jqXHR, textStatus ) {l
		console.log( "edb: " + textStatus );
	});
			
}

function bmInitPolcam(){
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
	bmPolmonHTML += "												<p class=\"card-title a11yCencab\" id=\""+targetDestinoPublicacionPolcam+"\" ><\/p>";//modificado accesibilidad remediación, h3 por p
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
	$(gPolcamTargetSpan).append(bmPolmonHTML);

	/* --------Insertando texto sólo si existe liga--------- */
	//limpiando strings 
	gPolcamURL= gPolcamURL.replace(/^\s+|\s+$/g,"");
	gPolcamLinkText= gPolcamLinkText.replace(/^\s+|\s+$/g,"");
	
	if( gPolcamURL != "" && gPolcamLinkText != ""){		
			//if( gUseLinkText ){ }
			//gTextoPolcamPublicada= "<a href=\"" + gPolcamURL + "\" target=\"_blank\" style=\"text-decoration: underline;\" >"+gPolcamPubDate+"&nbsp;" + gPolcamLinkText + "</a>";
			//gTextoPolcamPublicada= "<a href=\"" + gPolcamURL + "\" target=\"_blank\" style=\"text-decoration: underline;\" >&nbsp;" + gPolcamLinkText + "</a>";			
			gTextoPolcamPublicada= "<a title=\"se abrirá en otra pestaña\" data-a11y=\"true\" onclick=\"ga('send', 'event', 'Hit', 'Open', '"+gPolcamURL+"');\" href=\""+gPolcamURL+"\" target=\"_blank\" style=\"text-decoration: underline;\">"+gPolcamLinkText+"<\/a>";//modificado accesibilidad remediación, se incluyen title y data-a11y
	}else{			
		gTextoPolcamPublicada="";
	}	
	var auxSelector="#" + targetDestinoPublicacionPolcam;
	$( auxSelector ).html(gTextoPolcamPublicada);
}

$(document).ready(function(){
	try{
			bmLeeEstadoMostrarPolcam();		
	}catch(err){ console.log("E:" + err.message); }
});
	
	