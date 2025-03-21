//Global vars
var globalDynPrefix="";
//var bmCarouselChannelId="50";
var selNPortletCarousel=".bmNPortletCarouselZone";
//var bmNewsChannelId="50";
var selNPortletNews=".bmNPortletNewsZone";
var selNPortletPubsVideos=".bmPubsVideosZone";
var selNPortletDetailedCarousel=".bmNPortletCarouselDetalladoZone";
var selNPortletTableNews=".bmNPortletTableNewsZone";
var selTwitterPortlet=".bmTwitterCarouselZone";
var selNPortletTitleCarousel=".bmNPortletCarouselTituloZone";
//var twitterCacheServer = "http://170.70.86.12";
var twitterCacheServer = "https://www.banxico.org.mx";

var exclude = "https://www.banxico.org.mx";
var httpPort = "80";
var httpsPort = "443";

var imgH = 40;
var imgW = 40;

var maxNumNews = 5;
var maxNumNewsOnTable = 20;

//var serverCache = "http://webdesarrollo:8050";
var serverCache = "";


/* -------------------------- BEGIN WINTERNO FUNCTIONS ------------------------------------------------- */
function getHttpRequestObject2(){
	try{
		var xmlhttp;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	 return xmlhttp;	
	}catch(err){}	
}

function getNodeById(responseDoc, nodeID ){
	try{
		var retNodo;
		for(k=0;k<responseDoc.childNodes.length;k++){
				
				if( responseDoc.childNodes[k].nodeType == 1 ){
					if((responseDoc.childNodes[k].getAttribute("id") != null) && (responseDoc.childNodes[k].getAttribute("id") == nodeID) ){
						retNodo = responseDoc.childNodes[k];
						k=responseDoc.childNodes.length-1;
					}
				}
			}
		
		return retNodo;
	}catch(err){}	
}
/*
function insertBmNPortlet(xmlhttp, portletSel){
	try{
		//new version
		$( xmlhttp.responseText ).insertAfter( portletSel );
		if( portletSel == "#bmFooterZone" ){			
			designerInits();
		}	
	}catch(err){}
}*/

function loadBmNPortlet(portletSel){
	if( $(portletSel) != null && $(portletSel) != undefined  ){
		loadNPortletInternal(portletSel);	
	}else{
		console.log( "No hay portlet '" + portletSel + "' definido" );
	}
}

function loadNPortletInternal(portletSel){
	//try{
		var portletUrl="";
		var channelContent;
		var language;
		var urlDetail;
		try{			
			$(portletSel).each(function( index ) {				
				if(portletSel == ".bmNPortletCarouselZone"){
					//Getting carousel's content
					language = $(".bmSiteLanguageC").text();	
					channelContent= generateCarousel( $(this).text(), language);
				}else if( portletSel == ".bmNPortletNewsZone" ){		
					//Getting news' content
					language = $(".bmSiteLanguage").text(); 
					urlDetail = $(".bmUrlDetail").text();
					channelContent= generateNewsChannel( $(this).text(), urlDetail, language);
				}else if( portletSel == ".bmNPortletTableNewsZone" ){		
					//Getting news' content
					language = $(".bmSiteLanguage").text();					
					channelContent= generateNewsTable( $(this).text(), language);
				}else if( portletSel == ".bmPubsVideosZone" ){		
					//Getting videos and publications' content 
					//TODO split channels and get both contents
					language = $(".bmSiteLanguagePV").text();	
					var bothChannels=$(this).text();
					var splittedChannels = bothChannels.split("_");
					channelContent= generatePubVideosChannel( splittedChannels[1], splittedChannels[0], language);
				}else if( portletSel == ".bmNPortletCarouselDetalladoZone" ){
					//getting detailed carousel's content
					language = $(".bmSiteLanguageTx").text(); 
					channelContent= generateTextCarousel( $(this).text(), language);
				}else if( portletSel == ".bmNPortletCarouselTituloZone" ){
					//getting detailed carousel's content
					language = $(".bmSiteLanguageCT").text(); 					
					channelContent= generateCarouselTitle( $(this).text(), language);
				}else if( portletSel == ".bmTwitterCarouselZone" ){
					//getting TWITTER carousel's content
					channelContent= generateTwitter();
				}
				
				//inserting it
				$(this).parent().replaceWith( $(channelContent).html() );				
			});
		}catch(err){
			console.log("error al obtener portlet: "+ err.message);
		}	
	/*
		var xmlhttp = getHttpRequestObject2();
		var url = portletUrl;
		xmlhttp.open("GET", url, true);
		//xmlhttp.setRequestHeader("Content-Type", "text/html;charset=iso-8859-1");
		xmlhttp.send();
		
		xmlhttp.onreadystatechange=function(){
		  if (xmlhttp.readyState==4 && xmlhttp.status==200){
			  insertBmNPortlet(xmlhttp,portletSel);
		  }
		}
	}catch(err){
		console.log("loadNPortletInternal: Error inesperado al cargar portlet "+portletSel+":: "+err);
	}*/
}

/* ---------------------------- ENDS WINTERNO FUNCTIONS ----------------------------------------- */

/* ---------------------BEGIN CUSTOM CAROUSEL CODE----------------------------- */
function generateCarousel(canal, idioma){	
     var detail;
     var bmSanitizeURL;
  
     /*var http = location.protocol;
     var slashes = http.concat("//");
     var port = window.location.port || httpPort || httpsPort;
     var host = slashes.concat(window.location.hostname);
     var finalUrl =  host.concat(":").concat(port); */
     var baseUrl= location.href;   
     var finalUrl = bmGenerateFinalUrl();     
     var urlResources;  
     
     
     //BEGIN revisando si se la liga de la imagen contiene dyn	
     var dynamicPrefix="/dyn";	 
	 var acwPrefix="/acw";
	 var dynamicActPrefix="/actdyn";
	 var dynamicOtherPrefix="/odyn";

	 //agregado accesibilidad remediación
	 var title_tblank="";
	 var title_download="";
	 var titulo="";
	 if (idioma=="es"){
		title_tblank="se abrir\u00E1 en otra pesta\u00F1a";
		title_download="descarga";
		titulo="Informaci\u00F3n oportuna";
	 }else{
		title_tblank="opens in a new tab";
		title_download="download";
		titulo="Timely information";
	 }
     
     if( baseUrl.indexOf(dynamicPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';
	 }else if( baseUrl.indexOf(dynamicActPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicActPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';
	 }else if( baseUrl.indexOf(dynamicOtherPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicOtherPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';		 
     }else if(baseUrl.indexOf(acwPrefix) > -1){
    	 bmSanitizeURL= dynamicPrefix;
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }else{
    	 bmSanitizeURL= "";
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }
     
	 
     //ENDS revisando si se la liga de la imagen contiene dyn
	
	
	//agregado accesibilidad remediación---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function typeDoc(ext,idioma){

		var extsDoc  =["3gp","3gpp","3g2","3gpp2","asf","avi","bmp","csv","doc","docx","epub","flv","gif","ico","jpeg","jpg","js","json",
						"mov","mp3","mp4","mpe","mpeg","mpg","mpga","pdf","png","ppt","pptx","rar","svg","tif","tiff","txt","wav","wmv","xls","xlsx","zip"];
		var nomsDocEs=["video 3gp","video 3gpp","video 3g2","video 3gpp2","video asf","video avi","imagen bmp","archivo csv","documento word","documento word","archivo epub","video flv",
						"imagen gif","imagen icono ico","imagen jpeg","imagen jpeg","archivo javascript","archivo json","video quicktime mov","audio mp3","video mp4","video mpe","video mpeg",
						"video mpg","audio mpga","documento pdf","imagen png","documento power point","documento power point","archivo comprimido rar","imagen svg","imagen tiff","imagen tiff",
						"documento de texto plano txt","audio wav","video wmv","documento excel","documento excel","archivo comprimido zip"];
		var nomsDocEn=["3gp video","3gpp video","3g2 video","3gpp2video","asf video","avi video","bmp image","csv file","word document","word document","epub file","flv video",
						"gif image","ico icon image ","jpeg image","jpeg image","javascript file","json file","mov quicktime video","mp3 audio","mp4 video","mpe video","mpeg video",
						"mpg video","mpga audio","pdf file","png image","power point file","power point file","rar compressed file","svg image","tiff image","tiff image",
						"txt plain text file","wav audio","wmv video","excel document","excel document","zip compressed file"];
						
		for(var de=0;de<extsDoc.length;de++){if(extsDoc[de]==ext){var docTxt=(idioma=="es")?nomsDocEs[de]:nomsDocEn[de];}}
		return docTxt;
	}//fin accesibilidad remediación
	
	$.ajax({
		type: 'GET',
		url: urlResources,		
		data: [
		],
		dataType: 'json',
		async: false,
		success: function(data){			
			
			 var imageUrl = "/multimedia/logo-BM-xs.png";			 
			 detail = document.createElement("div");
			 detail.className = 'container';
			 
			 var row = document.createElement("div");
			 row.className = 'row';
			 var cx12 = document.createElement("div");
			 cx12.className = 'col-xs-12';
			 
			 
			 var blckContent = document.createElement("div");
			 blckContent.className = 'panel panel-default';
			 
			 var blckD = document.createElement("div");
			 blckD.className = 'panel-body';
			 
			 //agregado accesibilidad remediación
			 var encab = document.createElement("h2"); 
			 encab.setAttribute("class","header-panel sr-only");
			 encab.innerHTML = titulo;//fin accesibilidad remediación
			 
			 var owlContent = document.createElement("div");
			 owlContent.className = 'cl3 owl-carousel owl-theme';
			
			 
			 var item;
			 var aref;
			 var img;
			 var urlFinal;
			 
			 for (var i = 0; i < data.length; i++) {		
				
				 item = document.createElement("div");
				 item.className = 'item';
				 				 
				 aref = document.createElement("a");					 
				 
				 if(data[i].imageRelated != undefined){
					 imageUrl = data[i].imageRelated.imageUrl;
				 }
				 
				 urlFinal = validateUrl(data[i], bmSanitizeURL);			 
				 
				 aref.setAttribute('href', urlFinal);	
				 aref.style.display="block"; //agregado accesibilidad remediación
				 
				 
				 
				 if(data[i].type != 'page'){
					aref.setAttribute('target','_blank');
					aref.setAttribute('title',title_tblank); //agregado accesibilidad remediación
				 }
				 
				 //agregado ally
				 var finUrl= urlFinal.split('.').pop();
				 //console.log("carrusel - "+ data[i].type);
				 if(data[i].type == 'document'){
					title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;
					title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
					aref.setAttribute('title',title_doc);
				 }
				 
				 img = document.createElement("img");
				 img.setAttribute('src', bmSanitizeURL + imageUrl);
				 img.setAttribute('alt', data[i].title);  //agregado accesibilidad remediación
				 img.setAttribute('tag', '{src}['+imageUrl+'].bm:linkurl');
				 
				 aref.appendChild(img);
				 item.appendChild(aref);
				 
				 owlContent.appendChild(item);
				 
			 }		

			 blckD.appendChild(encab);//agregado accesibilidad remediación
			 blckD.appendChild(owlContent);
			 blckContent.appendChild(blckD);	 
			 detail.appendChild(blckContent);	 
							
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {try {if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { console.log(errorThrown)} }
	});
	return detail;			
}
/* ---------------------ENDS CUSTOM CAROUSEL CODE---------------------------------- */

/* ---------------------BEGIN CUSTOM VERTICAL CHANNEL CODE (NEWSNOTICIAS)------------------ */
function generateNewsChannel(canal, urlDetalle, idioma){		
	 var res = document.createElement("div"); 
	 var panel = document.createElement("div");
	 var detail;
	 var blckD;
     var bmSanitizeURL;  
	 
     /*var http = location.protocol;
     var slashes = http.concat("//");
     var port = window.location.port || httpPort || httpsPort;
     var host = slashes.concat(window.location.hostname);
     var finalUrl =  host.concat(":").concat(port); */
     var baseUrl= location.href;   
     var finalUrl = bmGenerateFinalUrl();     
     var urlResources;   
     
     
     //BEGIN revisando si se la liga de la imagen contiene dyn     
     var dynamicPrefix="/dyn";	 
	 var acwPrefix="/acw";  
	 var dynamicActPrefix="/actdyn";
	 var dynamicOtherPrefix="/odyn";
	 
	 
     if( baseUrl.indexOf(dynamicPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page&idioma=' + idioma;
	 }else if( baseUrl.indexOf(dynamicActPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicActPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page&idioma=' + idioma;
	 }else if( baseUrl.indexOf(dynamicOtherPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicOtherPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page&idioma=' + idioma;
     }else if(baseUrl.indexOf(acwPrefix) > -1){
    	 bmSanitizeURL= dynamicPrefix;
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }else{
    	 bmSanitizeURL= "";
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }
     
     //ENDS revisando si se la liga de la imagen contiene dyn

	
     var titulo;
     var mas;
	 var fecha;//agregado accesibilidad remediación
	 var meses;//agregado accesibilidad remediación
	 var title_tblank="";//agregado accesibilidad remediación
	 var title_download="";//agregado accesibilidad remediación
	 
     if(idioma == 'es'){
     	titulo = "Noticias";
     	mas = "M&aacute;s noticias";    
		fecha="Fecha de publicaci\u00F3n";//agregado accesibilidad remediación
		meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];//agregado accesibilidad remediación
		title_tblank="se abrir\u00E1 en otra pesta\u00F1a";//agregado accesibilidad remediación
		title_download="descarga";//agregado accesibilidad remediación
     }else{
     	titulo = "News";
     	mas = "More news";
		fecha= "Publication date"//agregado accesibilidad remediación
		meses=["January","February","March","April","May","June","July","August","September","October","November","December"];//agregado accesibilidad remediación
		title_tblank="opens in a new tab";//agregado accesibilidad remediación
		title_download="download";//agregado accesibilidad remediación
     }
	
    
    panel.className = 'panel panel-default';
    
    
	
	//agregado accesibilidad remediación---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function typeDoc(ext,idioma){

		var extsDoc  =["3gp","3gpp","3g2","3gpp2","asf","avi","bmp","csv","doc","docx","epub","flv","gif","ico","jpeg","jpg","js","json",
						"mov","mp3","mp4","mpe","mpeg","mpg","mpga","pdf","png","ppt","pptx","rar","svg","tif","tiff","txt","wav","wmv","xls","xlsx","zip"];
		var nomsDocEs=["video 3gp","video 3gpp","video 3g2","video 3gpp2","video asf","video avi","imagen bmp","archivo csv","documento word","documento word","archivo epub","video flv",
						"imagen gif","imagen icono ico","imagen jpeg","imagen jpeg","archivo javascript","archivo json","video quicktime mov","audio mp3","video mp4","video mpe","video mpeg",
						"video mpg","audio mpga","documento pdf","imagen png","documento power point","documento power point","archivo comprimido rar","imagen svg","imagen tiff","imagen tiff",
						"documento de texto plano txt","audio wav","video wmv","documento excel","documento excel","archivo comprimido zip"];
		var nomsDocEn=["3gp video","3gpp video","3g2 video","3gpp2video","asf video","avi video","bmp image","csv file","word document","word document","epub file","flv video",
						"gif image","ico icon image ","jpeg image","jpeg image","javascript file","json file","mov quicktime video","mp3 audio","mp4 video","mpe video","mpeg video",
						"mpg video","mpga audio","pdf file","png image","power point file","power point file","rar compressed file","svg image","tiff image","tiff image",
						"txt plain text file","wav audio","wmv video","excel document","excel document","zip compressed file"];
						
		for(var de=0;de<extsDoc.length;de++){if(extsDoc[de]==ext){var docTxt=(idioma=="es")?nomsDocEs[de]:nomsDocEn[de];}}
		return docTxt;
	}//fin accesibilidad remediación
	
	
	$.ajax({
		type: 'GET',
		url: urlResources,		
		data: [
		],
		dataType: 'json',
		async: false,
		success: function(data){ 			
			 var imageUrl = "/multimedia/logo-BM-xs.png";
			 

			 
		
			 var blckContent = document.createElement("div");
			 blckContent.className = 'card-body';			
			 
			 
			 var panelBody = document.createElement("div");
			 panelBody.className = 'panel-body';
			 
			 var span = document.createElement("h2"); //Modificado accesibilidad remediación, span por h2
			 span.className = 'header-panel';
			 span.innerHTML = titulo;		
			 
			
			 var ul = document.createElement("ul");
			 ul.className = 'story-list story-summary';			
			 
			 var li;
			 var article;
			 var thumb;
			 var aref;
			 var img;
			 var overlay;
			 var bnxp;
			 var headline;
			 var time;
			 var strHl;
			 var h3;
			 var ah3;		
			 var urlFinal;
			 
			 
			 var divider;
			 
			 var finalNewsSize;
			 var small;
			 var br;
			 var br2;
			 var br3;
			 var span3;
			 
			 var notlink;//agregado accesibilidad remediación
			 
			 if(data.length < maxNumNews){
				finalNewsSize =  data.length;
			 }else{
				finalNewsSize = maxNumNews;
			 }
			 
			 for (var i = 0; i < finalNewsSize; i++) {		
				
				 li = document.createElement("li");				 
				 article = document.createElement("article");
				 article.className = 'story';
				 thumb = document.createElement("div");
				 thumb.className = 'thumb hidden-xs';
				 
				 
				 //agregado accesibilidad remediación
				 nwDate=data[i].referenceDate;
				 if(idioma=="es"){
					ndd=nwDate.substr(0,2);
					ndm=nwDate.substr(3,2);
					nda=nwDate.substr(6,4);
					ndml=meses[ndm-1];
					lblFn=fecha+" "+ndd+" "+ndml+" "+nda;
				 }else{
					ndm=nwDate.substr(0,2);
					ndd=nwDate.substr(3,2);
					nda=nwDate.substr(6,4);
					ndml=meses[ndm-1];
					lblFn=fecha+" "+ndml+" "+ndd+" "+nda;
				 }//fin accesibilidad remediación
				 
				 //console.log(ndd+"*"+ndm+"*"+nda+" - "+lblFn );
				 
				 
				 
				 
				 
				 small = document.createElement("small");	
				 small.className = 'text-muted';
				 small.innerHTML = data[i].referenceDate;
				 small.setAttribute("aria-hidden","true");//agregado accesibilidad remediación
				 small.style.color="#757575";//agregado accesibilidad remediación
				 small.style.fontSize="12px";//agregado accesibilidad remediación
				 
				
				 
				 
				 
				 
				 br = document.createElement("br");
				 br2 = document.createElement("br");
				 br3 = document.createElement("br");
				 
				 span3 = document.createElement("span");
				 span3.className = 'story-head';
				 
				
				 
				 
				 aref = document.createElement("a");					 
				 
				 if(data[i].imageRelated != undefined){
					 imageUrl = data[i].imageRelated.imageUrl;
				 }
				 
				 urlFinal = validateUrl(data[i], bmSanitizeURL);
				 
				 aref.setAttribute('href', urlFinal);
				 notlink=document.createElement("span"); //agregado accesibilidad remediación
				 notlink.innerHTML = data[i].linkText; //modificado accesibilidad remediación, aref por notlink
				 notlink.setAttribute("aria-hidden","true");//agregado accesibilidad remediación
				 aref.appendChild(small);//modificado accesibilidad remediación, span3 por aref
				 aref.appendChild(br);
				 aref.appendChild(notlink);
				 aref.setAttribute('aria-label',data[i].linkText+" "+lblFn);//agregado accesibilidad remediación
				 aref.style.display="block";//agregado accesibilidad remediación

				 
				 if(data[i].type != 'page'){
					aref.setAttribute('target','_blank');
					aref.setAttribute('title',title_tblank); //agregado accesibilidad remediación
					aref.style.padding="3px";//agregado accesibilidad remediación
					aref.style.margin="-3px";//agregado accesibilidad remediación
				 }
				 
				 //agregado ally
				 var finUrl= urlFinal.split('.').pop();
				 //console.log("carrusel - "+ data[i].type);
				 if(data[i].type == 'document'){	
					title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;
					title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
					aref.setAttribute('title',title_doc); 
					//console.log(title_doc);
				 }
				
				 
				 span3.appendChild(aref);
				 //span3.appendChild(br2);//eliminado accesibilidad remediación	
				 //span3.appendChild(br3);//eliminado accesibilidad remediación
				 span3.style.position="relative";//agregado accesibilidad remediación
				 span3.style.display="block";//agregado accesibilidad remediación
				 span3.style.marginBottom="15px";//agregado accesibilidad remediación
				 blckContent.appendChild(span3);			 
				 
			 }
			 
			 var p;
			 var span2;
			 var ah2;
			 p = document.createElement("p");
			 p.className = "text-right";
			 span2= document.createElement("span");
			 span2.className = "cl1";
			 ah2 = document.createElement("a"); 
			 ah2.setAttribute('href', urlDetalle);
			 ah2.style.padding="5px";//agregado accesibilidad remediación
			 ah2.style.margin="-5px";//agregado accesibilidad remediación
			 ah2.innerHTML = mas;//modificado accesibilidad remediación, se elimina ">" 
			 
			 span2.appendChild(ah2);
			 p.appendChild(span2);			
			 blckContent.appendChild(p);		 
			 			 
			 panelBody.appendChild(span);
			 panelBody.appendChild(blckContent);			 
			 panel.appendChild(panelBody);	
			 res.appendChild(panel);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {try {if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { console.log(errorThrown)} }
	});	
	return res;
}
/* ---------------------ENDS CUSTOM VERTICAL CHANNEL CODE (NEWS)------------------- */
	
	
/* ---------------------BEGIN CUSTOM TEXT CAROUSEL CODE  ----------------------------- */


function generateTextCarousel(canal, idioma){	
	     var blckD;
	     var bmSanitizeURL;	  
		 
	     /*var http = location.protocol;
		 var slashes = http.concat("//");
		 var port = window.location.port || httpPort || httpsPort;
		 var host = slashes.concat(window.location.hostname);
		 var finalUrl =  host.concat(":").concat(port); */
		 var baseUrl= location.href;   
		 var finalUrl = bmGenerateFinalUrl();     
		 var urlResources;     
	     
	     //BEGIN revisando si se la liga de la imagen contiene dyn	
		 var dynamicPrefix="/dyn";	 
		 var acwPrefix="/acw"; 
		 var dynamicActPrefix="/actdyn";
		 var dynamicOtherPrefix="/odyn";
	     
	     if( baseUrl.indexOf(dynamicPrefix) > -1 ){
	    	 bmSanitizeURL= finalUrl + dynamicPrefix;
	    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';
		 }else if( baseUrl.indexOf(dynamicActPrefix) > -1 ){
			 bmSanitizeURL= finalUrl + dynamicActPrefix;
			 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';
		 }else if( baseUrl.indexOf(dynamicOtherPrefix) > -1 ){
			 bmSanitizeURL= finalUrl + dynamicOtherPrefix;
			 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';	
	     }else if(baseUrl.indexOf(acwPrefix) > -1){
	    	 bmSanitizeURL= dynamicPrefix;
	    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
	     }else{
	    	 bmSanitizeURL= "";
	    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
	     }
	     
	     //ENDS revisando si se la liga de la imagen contiene dyn

		 
		 //agregado accesibilidad remediación
		 var title_tblank="";
		 var title_download="";
		 if (idioma=="es"){
			title_tblank="se abrir\u00E1 en otra pesta\u00F1a";
			title_download="descarga";
		 }else{
			title_tblank="opens in a new tab";
			title_download="download";
		 }//fin accesibilidad remediación
		
	
		//agregado accesibilidad remediación---------------------------------------------------------------------------------------------------------------------------------------------------------------------
		function typeDoc(ext,idioma){

			var extsDoc  =["3gp","3gpp","3g2","3gpp2","asf","avi","bmp","csv","doc","docx","epub","flv","gif","ico","jpeg","jpg","js","json",
							"mov","mp3","mp4","mpe","mpeg","mpg","mpga","pdf","png","ppt","pptx","rar","svg","tif","tiff","txt","wav","wmv","xls","xlsx","zip"];
			var nomsDocEs=["video 3gp","video 3gpp","video 3g2","video 3gpp2","video asf","video avi","imagen bmp","archivo csv","documento word","documento word","archivo epub","video flv",
							"imagen gif","imagen icono ico","imagen jpeg","imagen jpeg","archivo javascript","archivo json","video quicktime mov","audio mp3","video mp4","video mpe","video mpeg",
							"video mpg","audio mpga","documento pdf","imagen png","documento power point","documento power point","archivo comprimido rar","imagen svg","imagen tiff","imagen tiff",
							"documento de texto plano txt","audio wav","video wmv","documento excel","documento excel","archivo comprimido zip"];
			var nomsDocEn=["3gp video","3gpp video","3g2 video","3gpp2video","asf video","avi video","bmp image","csv file","word document","word document","epub file","flv video",
							"gif image","ico icon image ","jpeg image","jpeg image","javascript file","json file","mov quicktime video","mp3 audio","mp4 video","mpe video","mpeg video",
							"mpg video","mpga audio","pdf file","png image","power point file","power point file","rar compressed file","svg image","tiff image","tiff image",
							"txt plain text file","wav audio","wmv video","excel document","excel document","zip compressed file"];
							
			for(var de=0;de<extsDoc.length;de++){if(extsDoc[de]==ext){var docTxt=(idioma=="es")?nomsDocEs[de]:nomsDocEn[de];}}
			return docTxt;
		}//fin accesibilidad remediación
	
	
		$.ajax({
			type: 'GET',
			url: urlResources,		
			data: [
			],
			dataType: 'json',
			async: false,
			success: function(data){
			
				 var imageUrl = "/multimedia/logo-BM-xs.png";			 

				 blckD = document.createElement("div");
				 blckD.className = 'block';
				 
				 var blckContent = document.createElement("div");
				 blckContent.className = 'block-content';
				
				 var ul = document.createElement("div"); //modificado accesibilidad remediación, ul por div
				 ul.className = 'story-list story-list-horizontal story-summary owl-carousel';			
				 
				 var li;
				 var article;
				 var thumb;
				 var aref;
				 var img;
				 
				 var headline;
				 var storyHeadline;
				 var h3;
				 var aH3;
				 
				 var overlay;
				 var span;
				 var urlFinal;
				 
				 for (var i = 0; i < data.length; i++) {		
					
					 li = document.createElement("div");//modificado accesibilidad remediación, li por div				 
					 if(i == 0 ){
						 li.className = 'first';
					 }
					 if(i == ((data.length) - 1) ){
						 li.className = 'last';
					 }
					 
					 article = document.createElement("article");
					 article.className = 'story';
					 thumb = document.createElement("div");
					 thumb.className = 'thumb';
					 thumb.setAttribute("align", "center");
					 aref = document.createElement("a");					 
					 
					 if(data[i].imageRelated != undefined){
						 imageUrl = data[i].imageRelated.imageUrl;
					 }
					 
					 urlFinal = validateUrl(data[i], bmSanitizeURL);
					 
					 aref.setAttribute('href', urlFinal);
					 aref.className = 'overlay-wrapper';
					 
					 if(data[i].type != 'page'){
						aref.setAttribute('target','_blank');
						aref.setAttribute('title',title_tblank); //agregado accesibilidad remediación
						aref.style.padding="3px";//agregado accesibilidad remediación
						aref.style.margin="-3px";//agregado accesibilidad remediación
					 }
					 
					 //agregado ally
					 var finUrl= urlFinal.split('.').pop();
					 //console.log("carrusel - "+ data[i].type);
					 if(data[i].type == 'document'){	
						title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;
						title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
						aref.setAttribute('title',title_doc); 
						//console.log(title_doc);
					}
					 
					 
					 
					 img = document.createElement("img");
					 img.setAttribute('src', bmSanitizeURL + imageUrl);
					 img.setAttribute('alt',  data[i].title);  //agregado accesibilidad remediación 
					 img.setAttribute('tag', '{src}['+imageUrl+'].bm:linkurl');
					 
					 overlay = document.createElement("div");
					 overlay.className = 'overlay';
					 
					 span = document.createElement("span");
					 span.className = 'banxico-icon banxico-icon-plus banxico-icon-large';
					 
					 
					 headline = document.createElement("div");
					 headline.className = 'headline';
					 
					 storyHeadline = document.createElement("div");
					 storyHeadline.className = 'story-heading';
					 
					 h3 = document.createElement("h3");
					
					 
					 aH3 = document.createElement("a");
					 aH3.setAttribute('href', urlFinal);
					 aH3.innerHTML = data[i].linkText; 
					 
					 if(data[i].type != 'page'){
						aH3.setAttribute('target', '_blank');
						aH3.setAttribute('title',title_tblank); //agregado accesibilidad remediación
						aH3.style.padding="3px";//agregado accesibilidad remediación
						aH3.style.margin="-3px";//agregado accesibilidad remediación
					 }
					 
					 //agregado accesibilidad remediación
					 var finUrl= urlFinal.split('.').pop();
					 //console.log("carrusel - "+ data[i].type);
					 if(data[i].type == 'document'){	
						title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;
						title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
						aH3.setAttribute('title',title_doc); 
						//console.log(title_doc);
					}//fin accesibilidad remediación
					 
					 
					 
					 h3.appendChild(aH3);					 
					 storyHeadline.appendChild(h3);
					 headline.appendChild(storyHeadline);
					 
					 
					 overlay.appendChild(span);					
					 aref.appendChild(img);
					 aref.appendChild(overlay);
					 thumb.appendChild(aref);
					 article.appendChild(thumb);
					 article.appendChild(headline);	
					 li.appendChild(article);					 
					 ul.appendChild(li);				 
				 }		 

				 blckContent.appendChild(ul);				 
				 blckD.appendChild(blckContent);			 	 
								
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {console.log(errorThrown) }
		});
		return blckD;			
}
/* ---------------ENDS CUSTOM TEXT CAROUSEL CODE ------------------ */

function validateUrl(data, bmSanitizeURL){
	
	var url = data.url;	
	if(bmSanitizeURL.indexOf("/dyn") > -1 ){
		if(startsWith(bmSanitizeURL, exclude) && startsWith(data.url, exclude)){
			url = url.replace(exclude, "");
		}
		if(data.type != "link"){
			url = "/dyn" + data.url;
		}
	}
	if(bmSanitizeURL.indexOf("/actdyn") > -1 ){
		if(startsWith(bmSanitizeURL, exclude) && startsWith(data.url, exclude)){
			url = url.replace(exclude, "");
		}
		if(data.type != "link"){
			url = "/actdyn" + data.url;
		}
	}
	if(bmSanitizeURL.indexOf("/odyn") > -1 ){
		if(startsWith(bmSanitizeURL, exclude) && startsWith(data.url, exclude)){
			url = url.replace(exclude, "");
		}
		if(data.type != "link"){
			url = "/odyn" + data.url;
		}
	}
	
	return url;
}

function startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
}



	
	
/* ---------------------BEGIN CUSTOM PUB-VIDEOS CODE----------------------------- */	

function generatePubVideosChannel(canal1, canal2, idioma){		
	 
     var bmSanitizeURL;
     
     /*var http = location.protocol;     
     var slashes = http.concat("//");
     var port = window.location.port || httpPort || httpsPort;
     var host = slashes.concat(window.location.hostname);
     var finalUrl =  host.concat(":").concat(port);*/ 
     var baseUrl= location.href;   
     var finalUrl = bmGenerateFinalUrl();     
     var urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal1 + '&num=4&types=document,link,page';     
     var urlResources2 = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal2 + '&num=4&types=document,link,page';     
     
     //BEGIN revisando si se la liga de la imagen contiene dyn	
     var dynamicPrefix="/dyn";	 
	 var acwPrefix="/acw";
	 var dynamicActPrefix="/actdyn";
	 var dynamicOtherPrefix="/odyn";
     	 
    if( baseUrl.indexOf(dynamicPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal1 + '&num=20&types=document,link,page';
		 urlResources2 = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal2 + '&num=20&types=document,link,page';
	 }else if( baseUrl.indexOf(dynamicActPrefix) > -1 ){
		 bmSanitizeURL= finalUrl + dynamicActPrefix;
		 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal1 + '&num=20&types=document,link,page';//revisar valor de num
		 urlResources2 = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal2 + '&num=20&types=document,link,page';//revisar valor de num
	 }else if( baseUrl.indexOf(dynamicOtherPrefix) > -1 ){
		 bmSanitizeURL= finalUrl + dynamicOtherPrefix;
		 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';//revisar valor de num
		 urlResources2 = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal2 + '&num=20&types=document,link,page';//revisar valor de num
     }else if(baseUrl.indexOf(acwPrefix) > -1){
    	 bmSanitizeURL= dynamicPrefix;
    	 urlResources = serverCache + '/canales/canal_' + canal1 + '_'+ idioma +'.json';
		 urlResources2 = serverCache + '/canales/canal_' + canal2 + '_'+ idioma +'.json';
     }else{
    	 bmSanitizeURL= "";
    	 urlResources = serverCache + '/canales/canal_' + canal1 + '_'+ idioma +'.json';
		 urlResources2 = serverCache + '/canales/canal_' + canal2 + '_'+ idioma +'.json';
     }
    
     //ENDS revisando si se la liga de la imagen contiene dyn

    var titulo;
    var titPub;
    var titVid;
    if(idioma == 'es'){
    	titulo = "Publicaciones y videos recientes";
    	titPub = "Publicaciones";
    	titVid = "Videos";
    }else{
    	titulo = "Recent publications and videos";
    	titPub = "Publications";
    	titVid = "Videos";
    }
    
	 var imageUrl = "/multimedia/logo-BM-xs.png";
	 
	 
	 var cx12 = document.createElement("div");
	 cx12.className = 'col-xs-12';
	 
	 var panel = document.createElement("div");
	 panel.className = 'panel panel-default';
	 
	 var panelBody = document.createElement("div");
	 panelBody.className = 'panel-body';
	 panelBody.setAttribute("id","panelPubVid");//agregado accesibilidad remediación
	 
	 var span = document.createElement("h2"); //modificado accesibilidad remediación, span por h2
	 span.className = 'header-panel';
	 span.innerHTML = titulo; 
	 
	 
	 var blckD = document.createElement("div");
	 blckD.className = 'block block-default';
	 

	 
	 var blckContent = document.createElement("div");
	 blckContent.className = 'block-content';			 

	 var ulM = document.createElement("ul");
	 ulM.className = 'nav nav-tabs';	
	 ulM.setAttribute("role", "tablist"); 
	 
	 var videos = document.createElement("li");
	 videos.setAttribute("role", "none"); 
	 
	 var avideos = document.createElement("a");
	 var hvideos = document.createElement("h3"); //Agregado accesibilidad remediación
	 hvideos.style.color="inherit"; //Agregado accesibilidad remediación
	 hvideos.style.margin="inherit"; //Agregado accesibilidad remediación
	 hvideos.style.fontSize="inherit"; //Agregado accesibilidad remediación
	 avideos.setAttribute('href', "#story-list-videos");
	 avideos.setAttribute('aria-controls', "story-list-videos");
	 avideos.setAttribute('role', "tab");
	 avideos.setAttribute('aria-expanded', "false"); //Agregado accesibilidad remediación
	 avideos.setAttribute('aria-controls', "story-list-videos"); //Agregado accesibilidad remediación
	 avideos.setAttribute('data-toggle', "tab");
	 hvideos.innerHTML = titVid; //modificado accesibilidad remediación, avideos por hvideos
	 avideos.appendChild(hvideos);//Agregado accesibilidad remediación
	 
	 var pub = document.createElement("li");	
	 pub.setAttribute("role", "none"); 
	 pub.className = 'active';	
	 
	 
	 var apub = document.createElement("a");
	 var hpub = document.createElement("h3"); //Agregado accesibilidad remediación
	 hpub.style.color="inherit"; //Agregado accesibilidad remediación
	 hpub.style.margin="inherit"; //Agregado accesibilidad remediación
	 hpub.style.fontSize="inherit"; //Agregado accesibilidad remediación
	 apub.setAttribute('href', "#story-list");
	 apub.setAttribute('aria-controls', "story-list");
	 apub.setAttribute('role', "tab");
	 apub.setAttribute('aria-expanded', "true"); //Agregado accesibilidad remediación
	 apub.setAttribute('aria-controls', "story-list"); //Agregado accesibilidad remediación
	 apub.setAttribute('data-toggle', "tab");
	 hpub.innerHTML = titPub; //modificado accesibilidad remediación, apub por hpub
	 apub.appendChild(hpub);//Agregado accesibilidad remediación
	 
	 var tabContent = document.createElement("div");
	 tabContent.className = 'tab-content';		 
	
	 pub.appendChild(apub);
	 ulM.appendChild(pub);
	 
	 videos.appendChild(avideos);
	 ulM.appendChild(videos);
	
	 		 
	 blckContent.appendChild(ulM); 
	
	
	
	$.ajax({
		type: 'GET',
		url: urlResources2,	
		data: [
		],
		dataType: 'json',
		async: false,
		success: function(data){ 			
			tabContent.appendChild(generatePublicaciones(data, bmSanitizeURL, idioma)); //modificado accesibilidad remediación, también manda idioma						
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {try {if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { console.log(errorThrown		)} }
	});	
	
	$.ajax({
		type: 'GET',
		url: urlResources,	
		data: [
		],
		dataType: 'json',
		async: false,
		success: function(data){ 			
			 tabContent.appendChild(generateVideos(data, bmSanitizeURL, idioma)); //modificado accesibilidad remediación, también manda idioma							
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {try {if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { console.log(errorThrown)} }
	});
	
	
	 //var br = document.createElement("br"); //eliminado accesibilidad remediación
	 //var br2 = document.createElement("br"); //eliminado accesibilidad remediación
	 	 
	 panelBody.appendChild(span);
	 //panelBody.appendChild(br); //eliminado accesibilidad remediación
	 //panelBody.appendChild(br2); //eliminado accesibilidad remediación
	 panelBody.appendChild(blckContent);
	 panelBody.appendChild(tabContent);	 
	 panel.appendChild(panelBody);
	 cx12.appendChild(panel);
	 console.log(cx12);
	return cx12;		
}

/*-----------------------------Videos tabpanel content--------------------------------------------*/
function generateVideos(data, bmSanitizeURL, idioma){ //modificado accesibilidad remediación, también recibe idioma
	
	 var tabPaneA = document.createElement("div");
	 tabPaneA.className ='tab-pane';				 		 
	 tabPaneA.setAttribute('id', 'story-list-videos');
	 tabPaneA.setAttribute('role', 'tabpanel');
	 
	 var ul = document.createElement("div");//Modificado accesibilidad remediación, ul por div
	 ul.className = 'story-list story-list-horizontal story-summary owl-carousel owl-theme';
	 var indic = document.createElement("p");//Agregado accesibilidad remediación
	 indic.className = "sr-only";//Agregado accesibilidad remediación
	 indic.innerHTML=(idioma=="es")?"pulsa la tecla ESC para regresar a pestaña de este panel o continua nevegando el contenido":"press ESC key to focus on this panel tab or you can continue browsing the panel content";//Agregado accesibilidad remediación
	
	 var li;
	 var article;
	 var thumb;
	 var aref;
	 var img; 
	 var urlFinal;
	 var imageUrl;
	 var playspan;//agregado accesibilidad remediación

	 //agregado accesibilidad remediación
	 var title_tblank="";
	 var title_download="";
	 var panel_label="";
	 if (idioma=="es"){
		title_tblank="se abrir\u00E1 en otra pesta\u00F1a";
		title_download="descarga";
		panel_label="videos panel.";
	 }else{
		title_tblank="opens in a new tab";
		panel_label="videos panel.";
		title_download="download";
	 }	
	 tabPaneA.setAttribute('aria-label', panel_label);
	 tabPaneA.setAttribute('tabindex', '0');
	 tabPaneA.setAttribute('aria-hidden', 'true');
	 tabPaneA.appendChild(indic);
	 
	
	//agregado accesibilidad remediación---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function typeDoc(ext,idioma){

		var extsDoc  =["3gp","3gpp","3g2","3gpp2","asf","avi","bmp","csv","doc","docx","epub","flv","gif","ico","jpeg","jpg","js","json",
						"mov","mp3","mp4","mpe","mpeg","mpg","mpga","pdf","png","ppt","pptx","rar","svg","tif","tiff","txt","wav","wmv","xls","xlsx","zip"];
		var nomsDocEs=["video 3gp","video 3gpp","video 3g2","video 3gpp2","video asf","video avi","imagen bmp","archivo csv","documento word","documento word","archivo epub","video flv",
						"imagen gif","imagen icono ico","imagen jpeg","imagen jpeg","archivo javascript","archivo json","video quicktime mov","audio mp3","video mp4","video mpe","video mpeg",
						"video mpg","audio mpga","documento pdf","imagen png","documento power point","documento power point","archivo comprimido rar","imagen svg","imagen tiff","imagen tiff",
						"documento de texto plano txt","audio wav","video wmv","documento excel","documento excel","archivo comprimido zip"];
		var nomsDocEn=["3gp video","3gpp video","3g2 video","3gpp2video","asf video","avi video","bmp image","csv file","word document","word document","epub file","flv video",
						"gif image","ico icon image ","jpeg image","jpeg image","javascript file","json file","mov quicktime video","mp3 audio","mp4 video","mpe video","mpeg video",
						"mpg video","mpga audio","pdf file","png image","power point file","power point file","rar compressed file","svg image","tiff image","tiff image",
						"txt plain text file","wav audio","wmv video","excel document","excel document","zip compressed file"];
						
		for(var de=0;de<extsDoc.length;de++){if(extsDoc[de]==ext){var docTxt=(idioma=="es")?nomsDocEs[de]:nomsDocEn[de];}}
		return docTxt;
	}//fin accesibilidad remediación
	 
	 for (var i = 0; i < data.length; i++) {		
		 li = document.createElement("div");//Modificado accesibilidad remediación, li por div
		 
		 if(i == 0 ){
			 li.className = 'first';
		 }
		 if(i == ((data.length) - 1) ){
			 li.className = 'last';
		 }				 
		 			 
		 article = document.createElement("article");
		 article.className = 'story story-video';
		 thumb = document.createElement("div");
		 thumb.className = 'thumb';
		 
		 aref = document.createElement("a");	
		 
		 
		 if(data[i].imageRelated != undefined){
			 imageUrl = data[i].imageRelated.imageUrl;
		 }
		 
		 urlFinal = validateUrl(data[i], bmSanitizeURL);
		 
		 aref.setAttribute('href', urlFinal);
		 aref.style.display="block";//agregado accesibilidad remediación
		 
		 
		 
		 playspan=document.createElement("span");//agregado accesibilidad remediación
		 playspan.className = 'play';//modificado accesibilidad remediación, playspan en lugar de aref
		 
		 
		 if(data[i].type != 'page'){
			aref.setAttribute('target','_blank');
			aref.setAttribute('title',title_tblank) //agregado accesibilidad remediación
		 }
				 
		 //agregado accesibilidad remediación
		 var finUrl= urlFinal.split('.').pop();
		 //console.log("carrusel - "+ data[i].type);
		 if(data[i].type == 'document'){	
			title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;
			title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
			aref.setAttribute('title',title_doc); 
			//console.log(title_doc);
		 }//fin accesibilidad remediación
		 
		 
		img = document.createElement("img");
		img.className = 'img-mini';
		img.setAttribute('src', bmSanitizeURL + imageUrl);
		img.setAttribute('alt', data[i].title); //agregado accesibilidad remediación
		img.setAttribute('tag', '{src}['+imageUrl+'].bm:linkurl');
		
		
		aref.appendChild(img);//modificado accesibilidad remediación, aref en lugar de thumb
		aref.appendChild(playspan);//agregado accesibilidad remediación
		thumb.appendChild(aref);	
		article.appendChild(thumb);
		
		
		li.appendChild(article);	
		if(data[i].imageRelated != undefined){
			ul.appendChild(li);	
		}	 
	 }
	 
	 tabPaneA.appendChild(ul);
	
	return tabPaneA;
	
}
/*-----------------------------Publicaciones tabpanel content--------------------------------------------*/
function generatePublicaciones(data, bmSanitizeURL, idioma){//modificado accesibilidad remediación, también recibe idioma
	 var tabPaneB = document.createElement("div");
	 tabPaneB.className ='tab-pane active';				 		 
	 tabPaneB.setAttribute('id', 'story-list');
	 tabPaneB.setAttribute('role', 'tabpanel');
	 
	
	 var ul2 = document.createElement("div");//Modificado accesibilidad remediación, ul por div
	 ul2.className = 'story-list story-list-horizontal story-summary owl-carousel owl-theme';	
	 var indic = document.createElement("p");//Agregado accesibilidad remediación
	 indic.innerHTML=(idioma=="es")?"pulsa tecla ESC para regresar a pestaña de este panel o continua nevegando el contenido":"press ESC key to focus on this panel tab or you can continue browsing the panel content";//Agregado accesibilidad remediación
	 indic.className = "sr-only";//Agregado accesibilidad remediación
	 
	 var li;
	 var article;
	 var thumb;
	 var aref;
	 var img;	 
	
	 var overlay;
	 var bnxp;	 	 
	 var urlFinal;
	 var imageUrl;
	 var iPlus;
	 
	 //agregado accesibilidad remediación
	 var title_tblank="";
	 var panel_label="";
	 var title_download="";
	if (idioma=="es"){
		title_tblank="se abrir\u00E1 en otra pesta\u00F1a";
		title_download="descarga";
		panel_label="publicaciones panel.";
	 }else{
		title_tblank="opens in a new tab";
		title_download="download";
		panel_label="publications panel.";
	 }
	 tabPaneB.setAttribute('aria-label', panel_label);
	 tabPaneB.setAttribute('tabindex', '0');
	 tabPaneB.setAttribute('aria-hidden', 'false');
	 tabPaneB.appendChild(indic);//fin accesibilidad remediación
	
	//agregado accesibilidad remediación---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function typeDoc(ext,idioma){

		var extsDoc  =["3gp","3gpp","3g2","3gpp2","asf","avi","bmp","csv","doc","docx","epub","flv","gif","ico","jpeg","jpg","js","json",
						"mov","mp3","mp4","mpe","mpeg","mpg","mpga","pdf","png","ppt","pptx","rar","svg","tif","tiff","txt","wav","wmv","xls","xlsx","zip"];
		var nomsDocEs=["video 3gp","video 3gpp","video 3g2","video 3gpp2","video asf","video avi","imagen bmp","archivo csv","documento word","documento word","archivo epub","video flv",
						"imagen gif","imagen icono ico","imagen jpeg","imagen jpeg","archivo javascript","archivo json","video quicktime mov","audio mp3","video mp4","video mpe","video mpeg",
						"video mpg","audio mpga","documento pdf","imagen png","documento power point","documento power point","archivo comprimido rar","imagen svg","imagen tiff","imagen tiff",
						"documento de texto plano txt","audio wav","video wmv","documento excel","documento excel","archivo comprimido zip"];
		var nomsDocEn=["3gp video","3gpp video","3g2 video","3gpp2video","asf video","avi video","bmp image","csv file","word document","word document","epub file","flv video",
						"gif image","ico icon image ","jpeg image","jpeg image","javascript file","json file","mov quicktime video","mp3 audio","mp4 video","mpe video","mpeg video",
						"mpg video","mpga audio","pdf file","png image","power point file","power point file","rar compressed file","svg image","tiff image","tiff image",
						"txt plain text file","wav audio","wmv video","excel document","excel document","zip compressed file"];
						
		for(var de=0;de<extsDoc.length;de++){if(extsDoc[de]==ext){var docTxt=(idioma=="es")?nomsDocEs[de]:nomsDocEn[de];}}
		return docTxt;
	}//fin accesibilidad remediación
	 
	 for (var i = 0; i < data.length; i++) {		
		 li = document.createElement("div");//Modificado accesibilidad remediación, li por div
		 
		 if(i == 0 ){
			 li.className = 'first';
		 }
		 if(i == ((data.length) - 1) ){
			 li.className = 'last';
		 }				 
		 			 
		 article = document.createElement("article");
		 article.className = 'story';
		 thumb = document.createElement("div");
		 thumb.className = 'thumb';
		 
		 urlFinal = validateUrl(data[i], bmSanitizeURL);
		 
		 aref = document.createElement("a");	
		 aref.setAttribute('href', urlFinal);
		 aref.className = 'overlay-wrapper';
		 aref.style.display="block";//agregado accesibilidad remediación
		 
		 
		 
		 
		 if(data[i].type != 'page'){
			 aref.setAttribute('target','_blank');
			 aref.setAttribute('title',title_tblank) //agregado accesibilidad remediación
		 }
				 
		 //agregado accesibilidad remediación
		 var finUrl= urlFinal.split('.').pop();
		 //console.log("carrusel - "+ data[i].type);
		 if(data[i].type == 'document'){	
			title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;	
			title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
			aref.setAttribute('title',title_doc); 
			//console.log(title_doc);
		 }
		 
		 if(data[i].imageRelated != undefined){
			 imageUrl = data[i].imageRelated.imageUrl;
		 }				 
		 
		urlFinal = validateUrl(data[i], bmSanitizeURL);
		
		img = document.createElement("img");
		img.className = 'img-mini';
		img.setAttribute('src', bmSanitizeURL + imageUrl);
		img.setAttribute('alt', data[i].title); //agregado accesibilidad remediación
		img.setAttribute('tag', '{src}['+imageUrl+'].bm:linkurl');	 
		 
		 overlay = document.createElement("div");
		 overlay.className = 'overlay';
		 
		 iPlus = document.createElement("i");
		 iPlus.className = 'fas fa-plus-circle';	
		 
		 overlay.appendChild(iPlus);			 
		 
		 aref.appendChild(img);		
		 thumb.appendChild(aref);	
		 thumb.appendChild(overlay);		 
		 article.appendChild(thumb);		 
		 li.appendChild(article);	
		 if(data[i].imageRelated != undefined){
			ul2.appendChild(li);	
		 }
	 }

	 
	 tabPaneB.appendChild(ul2);	 
	
	 return tabPaneB;
}
	

/* ---------------------ENDS CUSTOM PUB-VIDEOS CODE----------------------------- */



/* --------------------- BEGINS TWITTER CODE ----------------------------- */
function generateTwitter(){
    var urlRet = "http://twitter.com/intent/retweet?tweet_id=";
    var urlFav = "http://twitter.com/intent/favorite?tweet_id=";
    //var serverCache = "http://webdesarrollo:8050"; 	     
    var urlResources = twitterCacheServer + "/canales/twitter_favorites_es.json";
    
    //var urlResources = "twitter_favorites_es.json";
    var row = document.createElement("div");
	 row.className = 'row';	
	
	$.ajax({
		type: 'GET',
		url: urlResources,		
		data: [
		],
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data);
			
			 var container = document.createElement("div");
			 container.className = 'container';
			
			 var colX12 = document.createElement("div");
			 colX12.className = 'col-xs-12';				 
			 var blockD = document.createElement("div");
			 blockD.className = 'block block-default';				 
			 var h2 = document.createElement("h2");
			 h2.className = 'block-heading';				 
			 h2.setAttribute('href', '#');				 
			 h2.innerHTML = 'Informaci\u00F3n oportuna <i class="fab fa-twitter fa-lg"></i>';				 
			 var blckContent = document.createElement("div");
			 blckContent.className = 'block-content';				 
			 var tabContent = document.createElement("div");
			 tabContent.className = 'tab-content';				 
			 var tabPanel = document.createElement("div");
			 tabPanel.className = 'tab-pane active';
			 tabPanel.setAttribute("role", "tabpanel"); 				 
			 var ul = document.createElement("ul");
			 ul.className = 'story-list story-list-horizontal story-summary owl-carousel';	
			 
			 var li;
			 var article;
			 var headline;
			 var time;
			 var timer;
			 var img;
			 var imageUrl;
			 var heading;
			 var h3;
			 var small;
			 var retweet;
			 var like;
			 var pipe;		 
			 
			 for (var i = 0; i < data.length; i++) {		
					
				 li = document.createElement("li");					 
				 if(i == 0 ){
					 li.className = 'first';
				 }
				 if(i == ((data.length) - 1) ){
					 li.className = 'last';
				 }
				 
				 article = document.createElement("article");
				 article.className = 'story';	
				 headline = document.createElement("div");
				 headline.className = 'headline';
				 time = document.createElement("div");
				 time.className = 'time';
				 timer = document.createElement("time");
				 timer.className = 'timestamp';
				 timer.innerHTML = data[i].item.pubDate; 
				 
				 if(data[i].item.enclosure != undefined){
					 imageUrl = data[i].item.enclosure.url;
				 }
				 
				 img = document.createElement("img");
				 img.setAttribute('src', imageUrl);
				 img.setAttribute('height', imgH);
				 img.setAttribute('width', imgW);
				 heading = document.createElement("div");
				 heading.className = 'heading';
				 h3 = document.createElement("h3");
				 if(data[i].item.url == undefined || data[i].item.url == ""){
					 ah3 = document.createElement("div");
				 }else{
					 ah3 = document.createElement("a");
					 ah3.setAttribute('href', data[i].item.url);
					 ah3.setAttribute('target','_blank');
				 }
				 ah3.innerHTML = data[i].item.description; 
				 small = document.createElement("div");
				 small.className = 'small';
				 retweet = document.createElement("a");
				 retweet.setAttribute('href', urlRet + data[i].item.id);
				 retweet.setAttribute('target','_blank');
				 retweet.innerHTML = 'retweet'; 
				 like = document.createElement("a");
				 like.setAttribute('href', urlFav + data[i].item.id);
				 like.setAttribute('target','_blank');
				 like.innerHTML = 'favorito'; 
				 pipe = document.createElement("span");
				 pipe.innerHTML = ' | '; 
				 small.appendChild(retweet);
				 small.appendChild(pipe);
				 small.appendChild(like);
				 time.appendChild(timer);	
				 headline.appendChild(time);
				 headline.appendChild(img);						
				 headline.appendChild(heading);	
				 headline.appendChild(small);					 
				 heading.appendChild(ah3);						
				 article.appendChild(headline);		
				 li.appendChild(article);					 
				 ul.appendChild(li);		
				 
			 } 
			 
			 tabPanel.appendChild(ul);	
			 tabContent.appendChild(tabPanel);	
			 blckContent.appendChild(tabContent);	
			 blockD.appendChild(h2);
			 blockD.appendChild(blckContent);				 	
			 colX12.appendChild(blockD);	
			 container.appendChild(colX12);	
			 row.appendChild(container);		
							
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {console.log(errorThrown) }
	});
	return row;			
}

/* --------------------- ENDS TWITTER CODE ----------------------------- */



/* ---------------------BEGIN CUSTOM CHANNEL TABLE  CODE (NEWS)------------------ */
function generateNewsTable(canal, idioma){		
	 var detail;
	 var blckD;
     var bmSanitizeURL;   
     
     /*var http = location.protocol;     
     var slashes = http.concat("//");
     var port = window.location.port || httpPort || httpsPort;
     var host = slashes.concat(window.location.hostname);
     var finalUrl =  host.concat(":").concat(port);*/ 
     var baseUrl= location.href;   
     var finalUrl = bmGenerateFinalUrl();     
     var urlResources;   
     
     
     //BEGIN revisando si se la liga de la imagen contiene dyn     
     var dynamicPrefix="/dyn";	 
	 var acwPrefix="/acw";    
	 var dynamicActPrefix="/actdyn";
	 var dynamicOtherPrefix="/odyn";
	 
     if( baseUrl.indexOf(dynamicPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page&idioma=' + idioma; 	 
	 }else if( baseUrl.indexOf(dynamicActPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicActPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page&idioma=' + idioma;    	 
	 }else if( baseUrl.indexOf(dynamicOtherPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicOtherPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page&idioma=' + idioma;   
     }else if(baseUrl.indexOf(acwPrefix) > -1){
    	 bmSanitizeURL= dynamicPrefix;
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }else{
    	 bmSanitizeURL= "";
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }
     
     //ENDS revisando si se la liga de la imagen contiene dyn

     var titulo; 
	 var title_tblank="";//agregado accesibilidad remediación
	 var title_download="";//agragado accesibilidad remediación
     if(idioma == 'es'){
     	titulo = "Noticias";
		title_tblank="se abrir\u00E1 en otra pesta\u00F1a";//agregado accesibilidad remediación
		title_download="descarga";//agregado accesibilidad remediación
     }else{
     	titulo = "News";
		title_tblank="opens in a new tab";//agregado accesibilidad remediación
		title_download="download";//agregado accesibilidad remediación
     }
	
	
	
	//agregado accesibilidad remediación---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function typeDoc(ext,idioma){

		var extsDoc  =["3gp","3gpp","3g2","3gpp2","asf","avi","bmp","csv","doc","docx","epub","flv","gif","ico","jpeg","jpg","js","json",
						"mov","mp3","mp4","mpe","mpeg","mpg","mpga","pdf","png","ppt","pptx","rar","svg","tif","tiff","txt","wav","wmv","xls","xlsx","zip"];
		var nomsDocEs=["video 3gp","video 3gpp","video 3g2","video 3gpp2","video asf","video avi","imagen bmp","archivo csv","documento word","documento word","archivo epub","video flv",
						"imagen gif","imagen icono ico","imagen jpeg","imagen jpeg","archivo javascript","archivo json","video quicktime mov","audio mp3","video mp4","video mpe","video mpeg",
						"video mpg","audio mpga","documento pdf","imagen png","documento power point","documento power point","archivo comprimido rar","imagen svg","imagen tiff","imagen tiff",
						"documento de texto plano txt","audio wav","video wmv","documento excel","documento excel","archivo comprimido zip"];
		var nomsDocEn=["3gp video","3gpp video","3g2 video","3gpp2video","asf video","avi video","bmp image","csv file","word document","word document","epub file","flv video",
						"gif image","ico icon image ","jpeg image","jpeg image","javascript file","json file","mov quicktime video","mp3 audio","mp4 video","mpe video","mpeg video",
						"mpg video","mpga audio","pdf file","png image","power point file","power point file","rar compressed file","svg image","tiff image","tiff image",
						"txt plain text file","wav audio","wmv video","excel document","excel document","zip compressed file"];
						
		for(var de=0;de<extsDoc.length;de++){if(extsDoc[de]==ext){var docTxt=(idioma=="es")?nomsDocEs[de]:nomsDocEn[de];}}
		return docTxt;
	}//fin accesibilidad remediación
	
	$.ajax({
		type: 'GET',
		url: urlResources,		
		data: [
		],
		dataType: 'json',
		async: false,
		success: function(data){ 			
			 var imageUrl = "/multimedia/logo-BM-xs.png";			 
			 blckD = document.createElement("div");
			 blckD.className = 'block block-default';
			 
			 var h2 = document.createElement("h2");
			 h2.innerHTML = titulo;	
			 h2.className = 'c14';
			 
			 var table = document.createElement("table");
			 table.className = 'table table-striped bmtableview';
			 
			 var tbody = document.createElement("tbody");			 
			 var tr;				
			 var td;	
			 
			 
			 var divider;
			 
			 var finalNewsSize;
			 var ah3;
			 var urlFinal;
			 
			 if(data.length < maxNumNewsOnTable){
				finalNewsSize =  data.length;
			 }else{
				finalNewsSize = maxNumNewsOnTable;
			 }
			 
			 for (var i = 0; i < finalNewsSize; i++) {		
				tr = document.createElement("tr");		
				td = document.createElement("td");
				td.className = 'bmdateview';
				td.innerHTML = data[i].referenceDate;
				tr.appendChild(td)
				
				td = document.createElement("td");
				td.className = 'bmtextview';
				urlFinal = validateUrl(data[i], bmSanitizeURL);
				ah3 = document.createElement("a");
				ah3.setAttribute('href', urlFinal);
				ah3.innerHTML = data[i].linkText; 
				  
				if(data[i].type != 'page'){
					ah3.setAttribute('target','_blank');
					 ah3.setAttribute('title',title_tblank) //agregado accesibilidad remediación
				 }
						 
				 //agregado accesibilidad remediación
				 var finUrl= urlFinal.split('.').pop();
				 //console.log("carrusel - "+ data[i].type);
				 if(data[i].type == 'document'){
					title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;		
					title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
					ah3.setAttribute('title',title_doc); 
					//console.log(title_doc);
				 }//fin accesibilidad remediación
						
				td.appendChild(ah3)
				tr.appendChild(td)				 
				tbody.appendChild(tr); 
			 }		 
			 
			 
			 table.appendChild(tbody);
			 //blckD.appendChild(h2);
			 blckD.appendChild(table);						
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {try {if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { console.log(errorThrown)} }
	});	
	return blckD;
}
/* ---------------------ENDS CUSTOM CHANNEL TABLE CODE (NEWS)------------------- */


/* ---------------------BEGIN CUSTOM CAROUSEL WITH TITLE CODE----------------------------- */
function generateCarouselTitle(canal, idioma){	
     var detail;
     var bmSanitizeURL;
  
     /*var http = location.protocol;
     var slashes = http.concat("//");
     var port = window.location.port || httpPort || httpsPort;
     var host = slashes.concat(window.location.hostname);
     var finalUrl =  host.concat(":").concat(port); */
     var baseUrl= location.href;   
     var finalUrl = bmGenerateFinalUrl();     
     var urlResources;  
     
     
     //BEGIN revisando si se la liga de la imagen contiene dyn	
     var dynamicPrefix="/dyn";	 
	 var acwPrefix="/acw";
	 var dynamicActPrefix="/actdyn";
	 var dynamicOtherPrefix="/odyn";

	 //agregado accesibilidad remediación
	 var title_tblank="";
	 var title_download="";
	 var titulo="";
	 if (idioma=="es"){
		title_tblank="se abrir\u00E1 en otra pesta\u00F1a";
		title_download="descarga";
		titulo="Comunicaci&oacute;n en breve";
	 }else{
		title_tblank="opens in a new tab";
		title_download="download";
		titulo="Recent publications";
	 }
     
     if( baseUrl.indexOf(dynamicPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';
	 }else if( baseUrl.indexOf(dynamicActPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicActPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';
	 }else if( baseUrl.indexOf(dynamicOtherPrefix) > -1 ){
    	 bmSanitizeURL= finalUrl + dynamicOtherPrefix;
    	 urlResources = finalUrl + '/viewers2/JSP/channels_www_json.jsp?opcion=' + canal + '&num=20&types=document,link,page';		 
     }else if(baseUrl.indexOf(acwPrefix) > -1){
    	 bmSanitizeURL= dynamicPrefix;
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }else{
    	 bmSanitizeURL= "";
    	 urlResources = serverCache + '/canales/canal_' + canal + '_'+ idioma +'.json';
     }
     
	 
     //ENDS revisando si se la liga de la imagen contiene dyn
	
	
	//agregado accesibilidad remediación---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function typeDoc(ext,idioma){

		var extsDoc  =["3gp","3gpp","3g2","3gpp2","asf","avi","bmp","csv","doc","docx","epub","flv","gif","ico","jpeg","jpg","js","json",
						"mov","mp3","mp4","mpe","mpeg","mpg","mpga","pdf","png","ppt","pptx","rar","svg","tif","tiff","txt","wav","wmv","xls","xlsx","zip"];
		var nomsDocEs=["video 3gp","video 3gpp","video 3g2","video 3gpp2","video asf","video avi","imagen bmp","archivo csv","documento word","documento word","archivo epub","video flv",
						"imagen gif","imagen icono ico","imagen jpeg","imagen jpeg","archivo javascript","archivo json","video quicktime mov","audio mp3","video mp4","video mpe","video mpeg",
						"video mpg","audio mpga","documento pdf","imagen png","documento power point","documento power point","archivo comprimido rar","imagen svg","imagen tiff","imagen tiff",
						"documento de texto plano txt","audio wav","video wmv","documento excel","documento excel","archivo comprimido zip"];
		var nomsDocEn=["3gp video","3gpp video","3g2 video","3gpp2video","asf video","avi video","bmp image","csv file","word document","word document","epub file","flv video",
						"gif image","ico icon image ","jpeg image","jpeg image","javascript file","json file","mov quicktime video","mp3 audio","mp4 video","mpe video","mpeg video",
						"mpg video","mpga audio","pdf file","png image","power point file","power point file","rar compressed file","svg image","tiff image","tiff image",
						"txt plain text file","wav audio","wmv video","excel document","excel document","zip compressed file"];
						
		for(var de=0;de<extsDoc.length;de++){if(extsDoc[de]==ext){var docTxt=(idioma=="es")?nomsDocEs[de]:nomsDocEn[de];}}
		return docTxt;
	}//fin accesibilidad remediación
	
	$.ajax({
		type: 'GET',
		url: urlResources,		
		data: [
		],
		dataType: 'json',
		async: false,
		success: function(data){			
			
			 var imageUrl = "/multimedia/logo-BM-xs.png";			 
			 detail = document.createElement("div");
			 detail.className = 'container';
			 
			 var row = document.createElement("div");
			 row.className = 'row';
			 var cx12 = document.createElement("div");
			 cx12.className = 'col-xs-12';
			 
			 
			 var blckContent = document.createElement("div");
			 blckContent.className = 'panel panel-default';
			 
			 var blckD = document.createElement("div");
			 blckD.className = 'panel-body';
			 
			 //agregado accesibilidad remediación
			 var encab = document.createElement("h2"); 
			 encab.setAttribute("class","header-panel");
			 encab.innerHTML = titulo;//fin accesibilidad remediación
			 
			 var owlContent = document.createElement("div");
			 owlContent.className = 'cl3 owl-carousel owl-theme';
			
			 
			 var item;
			 var aref;
			 var img;
			 var urlFinal;
			 
			 for (var i = 0; i < data.length; i++) {		
				
				 item = document.createElement("div");
				 item.className = 'item';
				 				 
				 aref = document.createElement("a");					 
				 
				 if(data[i].imageRelated != undefined){
					 imageUrl = data[i].imageRelated.imageUrl;
				 }
				 
				 urlFinal = validateUrl(data[i], bmSanitizeURL);			 
				 
				 aref.setAttribute('href', urlFinal);	
				 aref.style.display="block"; //agregado accesibilidad remediación
				 
				 
				 
				 if(data[i].type != 'page'){
					aref.setAttribute('target','_blank');
					aref.setAttribute('title',title_tblank); //agregado accesibilidad remediación
				 }
				 
				 //agregado ally
				 var finUrl= urlFinal.split('.').pop();
				 //console.log("carrusel - "+ data[i].type);
				 if(data[i].type == 'document'){
					title_typeDoc=(finUrl=="pdf")?title_tblank:title_download;
					title_doc=typeDoc(finUrl,idioma)+", "+title_typeDoc;
					aref.setAttribute('title',title_doc);
				 }
				 
				 img = document.createElement("img");
				 img.setAttribute('src', bmSanitizeURL + imageUrl);
				 img.setAttribute('alt', data[i].title);  //agregado accesibilidad remediación
				 img.setAttribute('tag', '{src}['+imageUrl+'].bm:linkurl');
				 
				 aref.appendChild(img);
				 item.appendChild(aref);
				 
				 owlContent.appendChild(item);
				 
			 }		

			 blckD.appendChild(encab);//agregado accesibilidad remediación
			 blckD.appendChild(owlContent);
			 blckContent.appendChild(blckD);	 
			 detail.appendChild(blckContent);	 
							
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {try {if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { console.log(errorThrown)} }
	});
	return detail;			
}
/* ---------------------ENDS CUSTOM CAROUSEL WITH TITLE CODE---------------------------------- */

function bmValidateIfDynUrl2(){
	var bmUrlHost=location.host;
	var sRelativeUrl= location.href.substring( location.href.indexOf(bmUrlHost) +bmUrlHost.length ) ;

	if( sRelativeUrl.indexOf("/dyn/") == 0 )
		globalDynPrefix="/dyn";
}

function bmGenerateFinalUrl(){
	var baseUrl= location.href;     
    var http = location.protocol;
    var slashes = http.concat("//");
    var port;
    if(startsWith(baseUrl, exclude)){
    	port = window.location.port || httpsPort;
    }else{
    	port = window.location.port || httpPort;
    }
    var host = slashes.concat(window.location.hostname);
    var finalUrl =  host.concat(":").concat(port); 
    return finalUrl;
}

$( document ).ready(function() {
    console.log( "Cargando N. portlets" );
	try{
		bmValidateIfDynUrl2();				
		loadBmNPortlet(selNPortletCarousel);
		loadBmNPortlet(selNPortletNews);		
		loadBmNPortlet(selNPortletPubsVideos);
		loadBmNPortlet(selNPortletDetailedCarousel);
		loadBmNPortlet(selTwitterPortlet);
		loadBmNPortlet(selNPortletTableNews);	
		loadBmNPortlet(selNPortletTitleCarousel);	
	}catch(err){
		console.log( "Error al cargar N. portlets: " + err );
	}
	console.log( "Termina carga N. portlets db01" );
});
