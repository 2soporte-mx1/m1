var globalDynPrefix="";
var bmHeaderUrl="/header.html";
var bmFooterUrl= "/footer.html";
var bmHeaderEnUrl="/headeren.html";
var bmFooterEnUrl= "/footeren.html";
/* -------Vars para cambio de imgs en header---------- */
var BMPERIODO_MANIANA="pm";
var BMPERIODO_TARDE="pt";
var BMPERIODO_NOCHE="pn";

var bmContadorGlobalImgs= 0;	
var $oImg1, $oImg2, $oImg3;
var bgImageArray = ["/multimedia/Header_maniana.jpg", "/multimedia/Header_tarde.jpg", "/multimedia/Header_noche.jpg"],
bmImgBase = "",
bmSecsCargaDiferida = 3 * 60,
secsForImgRefresh= 30 * 60;	//prod: bmImageBase="" pruebas: bmImageBase="http://wwwdesarrollo"

//.yamm .container-image
var gBMTargetDeContenedorImgHeader="#bm-container-image";
var gBMTargetDeContenedorImgHeader2="#bm-container-image2";
var gBMTargetDeContenedorImgHeader3="#bm-container-image3";
var gHIMTime=new Date();
//var gbmDatePrefix="2019/01/01 ";
var sMonth="";
var iMonth=1;
	iMonth= iMonth + gHIMTime.getMonth();
	sMonth= iMonth;
	if(sMonth != 10 && sMonth != 11 && sMonth != 12)
		sMonth= "0" + sMonth;	

var gbmDatePrefix= gHIMTime.getFullYear() + "/" + sMonth + "/" + gHIMTime.getDate() + " ";
var gFechaFinHorarioManiana;
var gFechaFinHorarioTarde;
var gFechaFinHorarioNoche;


var gTriggersAplicadosManiana=false;
var gTriggersAplicadosTarde=false;
var gTriggersAplicadosNoche=false;

/* -------Vars para cambio de imgs en header---------- */

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

function insertBmTemplate(xmlhttp, portletSel){
	try{
		$( xmlhttp.responseText ).insertAfter( portletSel );
		
		if( portletSel == "#bmHeaderZone" ){
			/*  +++++COMIENZA INIT DE DISENIADOR DEL SITIO++++*/	
			
			/* Configurando horarios*/
			gFechaFinHorarioNoche=   new Date(gbmDatePrefix + "09:00");
			gFechaFinHorarioManiana= new Date(gbmDatePrefix + "14:00");
			gFechaFinHorarioTarde=   new Date(gbmDatePrefix + "19:00");
			/* PROD 
			gFechaFinHorarioNoche=   new Date(gbmDatePrefix + "09:00");
			gFechaFinHorarioManiana= new Date(gbmDatePrefix + "14:00");
			gFechaFinHorarioTarde=   new Date(gbmDatePrefix + "19:00");
			*/
			
			/* Obten imagen de para la hora actual*/
			aplicaImagenHeaderOnLoadPage();
			
			/* Obtiene img periodica */
			bmInitHeaderImgLoad();					
			

			
			/*  +++++TERMINA INIT DE DISENIADOR DEL SITIO++++*/
		}
	}catch(err){}
}

function loadBmTemplate(portletSel,lang){//accesibilidad remediacion, se incluye param lang
	if( $(portletSel) != null && $(portletSel) != undefined  ){
		loadTemplateInternalV2(portletSel,lang);	//accesibilidad remediacion, se incluye param lang
	}else{
		console.log( "No hay portlet '" + portletSel + "' definido" );
	}
}

function loadTemplateInternalV2(portletSel,lang){//accesibilidad remediacion, se incluye param lang
	try{
		var portletUrl="";
		var header=(lang=="es")?bmHeaderUrl:bmHeaderEnUrl;//agregado accesibilidad remediacion
		var footer=(lang=="es")?bmFooterUrl:bmFooterEnUrl;//agregado accesibilidad remediacion
		if(portletSel == "#bmHeaderZone"){	
			portletUrl= globalDynPrefix+header;//modificado accesibilidad remediacion, bmHeaderUrl por var header
		}else if( portletSel == "#bmFooterZone" ){		
			//portletUrl="/footer6.html";
			portletUrl= globalDynPrefix+footer;//modificado accesibilidad remediacion, bmFooterUrl por var footer
		}	
		var xmlhttp = getHttpRequestObject2();		
		var url = portletUrl;
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
		
		xmlhttp.onreadystatechange=function(){
		  if (xmlhttp.readyState==4 && xmlhttp.status==200){
			  insertBmTemplate(xmlhttp,portletSel);
		  }
		}
	}catch(err){
		console.log("loadPortletInternalV2: Error inesperado al cargar portlet "+portletSel+":: "+err);
	}
}
/* ---------------------------- ENDS WINTERNO FUNCTIONS ----------------------------------------- */

/* ---------------------------- BEGIN DESIGNERS  FUNCTIONS ----------------------------------------- */
	function designerInits(){
			  //HOTFIX corrección de triangulo ultra importante del menu d hamburguesa
			  $('.dropdown.yamm-fw').on('hidden.bs.dropdown', function(e) {
		          $(this).find('.caret').toggleClass('rotate-180');
			  });

			  $('.dropdown.yamm-fw').on('shown.bs.dropdown', function(e) {
			    $(this).find('.caret').toggleClass('rotate-180');
			  });

			  $(document).on("click", ".yamm.dropdown-menu", function(e) {
			    $(this).parent().is(".open") && e.stopPropagation();
			  }); 
	
			//menu
			$(document).click(function(){
				$('.megamenu-container .wrap > div').removeClass('in').slideUp();
			});
			$('#main-menu-nav a').click(function(){
				var all_links = $('#main-menu-nav a');
				target = $(this).attr('href');
				current_link = $(this);
				//desactiva todos los links
				all_links.removeClass("open");
				
				//el link se pone active
				current_link.addClass("open");

				//checa si el panel ya esta abierto
				if( $(target).hasClass("in")){
					$(this).removeClass("open");
					$(target).removeClass("in").slideUp();
				}else{
					//checa si hay algun otro panel abierto
					if( $('.megamenu-container .wrap > div').hasClass("in")){
						$('.megamenu-container .wrap > div').removeClass('in').hide();
					}
					$(target).slideDown().toggleClass('in');
				}
				return false;
			});

			//search toggle
			/*$('#toggle-search').click(function(){
				$(this).toggleClass('active');
				$('.mobile-search-container').slideToggle();
			});*/

			//tooltips
			/*$('.help').tooltip(); */

			//Calendar (datepicker)
			/*$('.datepicker-control').datepicker({
				language: "es",
				todayHighlight: true,
				orientation: "bottom left"
			});*/
			
			//Typeahead
			/*$('#search-term, #search-term-footer').typeahead({ 
				hint: true,    
				highlight: true,   
				local: ['Inflación baja','Inflación galopante','Inflación moderada','Tipo de cambio','Peso']
			}); */
			
			// Owl Carousel
			$('.owl-carousel').owlCarousel({
				items: 4
			});

			//funcionalidad para borrar el contenido del textfield
			/*$('.borrable .form-control').keyup(function(event) {
				contenedor = $(this).closest('.borrable');
				input_text = $(this);
				input_text_hint = $(this).next();
				btn_borrar = contenedor.find('.clear-input');

				//si presionan ESC o no hay nada
				if (event.keyCode == 27 || $(this).val() == '') {
					//console.log('no hay texto');
					input_text.val('');
					if( input_text.hasClass('tt-query') ){ // hay autocomplete
						input_text.typeahead('setQuery', '');
					}
					btn_borrar.hide();
					input_text.removeClass('indent');
					//input_text.empty(); // no funciona aun
				}
				//sí hay texto
				else {
					btn_borrar.show();
					input_text.addClass('indent');
					//console.log('SI hay texto');
				}
				btn_borrar.click(function(){
					input_text.val('');
					if( input_text.hasClass('tt-query') ){ // hay autocomplete
						input_text.typeahead('setQuery', '');
					}
					btn_borrar.hide();
					input_text.removeClass('indent').focus();
					//input_text.empty(); // no funciona aun
				});
			});*/

			/*$('.audio-container .audio-trigger').click(function(){
				var audio_player = $(this).next();
				var audio_container = $(this).parent();
				audio_container.addClass('fixed-width');
				audio_player.addClass('show-player');
				$(this).hide();
			});	*/


			//Range Slider
			/* $(".range-slider").slider({
				min: 1,
				max: 10,
				step: 1,
				range: true,
				values: [3, 7]
			})
			.slider("pips", {
				rest: "label"
			})
			.slider("float", {				
			}); */
			
			// Scroll Top
			$('#scroll-top-control').on('click', function(){
				$('html,body').animate({
					scrollTop: 0
			}, 1000);//no funciona, se incluye evento en elemento
			//return false;//eliminado accesibilidad remediacion
			});
			
			//agregado accesibilidad remediación
			$('a[href="#contenido"]').on('click', function(){
				$('html,body').animate({
					scrollTop: 0
			}, 100);
			});
			$('a[href="#menuEl1"]').on('click', function(){
				$('html,body').animate({
					scrollTop: 0
			}, 100);
			});//fin accesibilidad remediación

			// Share
			/*$('.share [data-toggle="popover"]').popover({
				placement: 'top',
				trigger: 'manual'
			}).popover('show');
			*/
			
				//botones para navegar entre tabs	
			$('.next-tab').click(function(){
				var next_tab = $('.nav-tabs > .active').next('li').find('a');
				var first_tab = $('.vertical-tabs-container .nav-tabs li:first');
				var last_tab = $('.vertical-tabs-container .nav-tabs li:last');

				if( last_tab.hasClass('active') ){ 
					first_tab.find('a').tab('show');
				}
					next_tab.trigger('click');
				return false;
			});

			$('.prev-tab').click(function(){
				var prev_tab = $('.nav-tabs > .active').prev('li').find('a');
				var first_tab = $('.vertical-tabs-container .nav-tabs li:first');
				var last_tab = $('.vertical-tabs-container .nav-tabs li:last');

				if( first_tab.hasClass('active') ){
					//console.log('hay que pasar al ultimo item' + last_tab);
					last_tab.find('a').tab('show');
				}
				prev_tab.trigger('click');
				return false;
			});
		  
		  // search advanced
		  $('.search-form .search-advanced').on('click', function() {
			if ($(this).hasClass('active')) {
			  $('.search-form .search-advanced-hide').removeClass('active');
			  $('.search-form .search-advanced-hide-xs').removeClass('active');
			  
			  $(this).removeClass('active');
			} else {
			  $('.search-form .search-advanced-hide').addClass('active');
			  $('.search-form .search-advanced-hide-xs').addClass('active');
			  
			  $(this).addClass('active');
			}

			return false;
		  });
		  
		  // block toggle
		  $('.block-toggle .block-heading').on('click', function() {
			$block = $(this).parent();
			
			if ($block.hasClass('open')) {
			  $block.removeClass('open');
			} else {
			  $block.addClass('open');
			}
			
			return false;
		  });
	}
/* ---------------------------- ENDS DESIGNERS FUNCTIONS ----------------------------------------- */


/* -------------------------- BEGIN CAMBIO IMAGENES EN HEADER DIFERIDAS FUNCTIONS ------------------------------------------------- */

function aplicaImagenHeaderOnLoadPage(){
	var periodo= getPeriodoDelDia();
	//preseteo ruta a imagen para la NOCHE
	var ruta= bgImageArray[2];
	if( periodo == BMPERIODO_MANIANA){
		//Es de maniana
		ruta= bgImageArray[0];
	}else if( periodo == BMPERIODO_TARDE){
		//Es de tarde
		ruta= bgImageArray[1];
	}		
		
	var urlRecurso="url('" + bmImgBase +ruta + "')";
	//console.log("Seteando primera img: "+ urlRecurso);
	//HOTFIX se cambia seteo de img para después de setear las opacities
	//$(gBMTargetDeContenedorImgHeader).css("background-image",urlRecurso);

	//fix para mostrar div correcto al cargar la page
	bmAplicaImgPeriodicaHeader(periodo);
	
	if( periodo == BMPERIODO_MANIANA){		
		$(gBMTargetDeContenedorImgHeader).css("background-image",urlRecurso);		
	}else if( periodo == BMPERIODO_TARDE){		
		$(gBMTargetDeContenedorImgHeader2).css("background-image",urlRecurso);
	}else{		
		$(gBMTargetDeContenedorImgHeader3).css("background-image",urlRecurso);
	}

	
	
}

function getPeriodoDelDia(){
	gHIMTime= new Date();
	var resultado= BMPERIODO_NOCHE;		

	if( gFechaFinHorarioNoche.getTime() <= gHIMTime.getTime() && gHIMTime.getTime() < gFechaFinHorarioManiana.getTime() ){
		//Es de maniana
		resultado= BMPERIODO_MANIANA;
	}else if( gFechaFinHorarioManiana.getTime() <= gHIMTime.getTime() && gHIMTime.getTime() < gFechaFinHorarioTarde.getTime() ){
		//Es de tarde
		resultado= BMPERIODO_TARDE;
	}

	return resultado;
}


function bmAplicaImgPeriodicaHeader(periodo1){
	//alert("llegó img: " + oJQImagen);	
	//console.log("tipo: "+ typeof oJQImagen);
	//$(gBMTargetDeContenedorImgHeader).css("background-image", "url('" + oJQImagen.src + "')");

	
	
	if( periodo1 == BMPERIODO_MANIANA){
		//mostrando div de maniana
		$(gBMTargetDeContenedorImgHeader).css({"position":"relative","display":"block"});$(gBMTargetDeContenedorImgHeader).addClass("active");//cambio accesibilidad remediación, opacity por display y position*/ 		
		//ocultando los demas
		$(gBMTargetDeContenedorImgHeader2).css("display", "none");$(gBMTargetDeContenedorImgHeader2).removeClass("active");//cambio accesibilidad remediación, opacity por display
		$(gBMTargetDeContenedorImgHeader3).css("display", "none");$(gBMTargetDeContenedorImgHeader3).removeClass("active");//cambio accesibilidad remediación, opacity por display
		
		if(!gTriggersAplicadosManiana){		
			designerInits();
			gTriggersAplicadosManiana=true;
		}
	}else if( periodo1 == BMPERIODO_TARDE){
		//mostrando div de tarde
		$(gBMTargetDeContenedorImgHeader2).css({"position":"relative","display":"block"});$(gBMTargetDeContenedorImgHeader2).addClass("active");//cambio accesibilidad remediación, opacity por display y position
		//ocultando los demas
		$(gBMTargetDeContenedorImgHeader).css("display", "none");$(gBMTargetDeContenedorImgHeader).removeClass("active");//cambio accesibilidad remediación, opacity por display
		$(gBMTargetDeContenedorImgHeader3).css("display", "none");$(gBMTargetDeContenedorImgHeader3).removeClass("active");//cambio accesibilidad remediación, opacity por display
		if(!gTriggersAplicadosTarde){		
			designerInits();
			gTriggersAplicadosTarde=true;
		}
	}else{
		//mostrando div de noche
		$(gBMTargetDeContenedorImgHeader3).css({"position":"relative","display":"block"});$(gBMTargetDeContenedorImgHeader3).addClass("active");//cambio accesibilidad remediación, opacity por display y position
		//ocultando los demas
		$(gBMTargetDeContenedorImgHeader).css("display", "none");$(gBMTargetDeContenedorImgHeader).removeClass("active");//cambio accesibilidad remediación, opacity por display
		$(gBMTargetDeContenedorImgHeader2).css("display", "none");$(gBMTargetDeContenedorImgHeader2).removeClass("active");//cambio accesibilidad remediación, opacity por display
		if(!gTriggersAplicadosNoche){		
			designerInits();
			gTriggersAplicadosNoche=true;
		}
	}	
	//console.log("v2 seteando: "+ periodo1 );	
	navFreqPosInit();//agregado accesibilidad remediación
				
	
}

function bmCalculaImagenAAplicarEnHeaderPeriodicamente(){
		var periodo1;
		/*Revisando hora del día*/
		
		
		periodo1= getPeriodoDelDia();		
		
		bmAplicaImgPeriodicaHeader(periodo1);
		
}

function bmInitHeaderImgLoad(){
		try{			
			

			/* INICIA sólo para ambiente de PRUEBAS*/
			/* var valorHoraUsuario= $("#PARAM80").val(); //FORMATO yyyy/MM/dd HH:mm
			if(valorHoraUsuario != undefined && valorHoraUsuario != ""){
				valorHoraUsuario= gbmDatePrefix + valorHoraUsuario;	
				gHIMTime = new Date(valorHoraUsuario); 		  
				//cleaning
				$("#PARAM80").val("");								
			} */
			/* TERMINA sólo para ambiente de PRUEBAS*/
			

					
			/* Descarga diferida de imgs*/
			var intervaloObj= setInterval(function(){
				//recorriendo array
				if( bmContadorGlobalImgs < bgImageArray.length) {
					var imgName= bgImageArray[ bmContadorGlobalImgs ];					
					if(bmContadorGlobalImgs == 0){						
						$oImg1= new Image();
						$oImg1.src = bmImgBase + imgName;		
						$(gBMTargetDeContenedorImgHeader).css("background-image", "url('" + $oImg1.src + "')");
					}else if(bmContadorGlobalImgs == 1){
						$oImg2= new Image();
						$oImg2.src = bmImgBase + imgName;						
						$(gBMTargetDeContenedorImgHeader2).css("background-image", "url('" + $oImg2.src + "')");
					}else if(bmContadorGlobalImgs == 2){
						$oImg3= new Image();
						$oImg3.src = bmImgBase + imgName;		
						$(gBMTargetDeContenedorImgHeader3).css("background-image", "url('" + $oImg3.src + "')");
					}	
					if(window.console){
						console.log("descargando img: " + bmImgBase + imgName);
					}
					
					bmContadorGlobalImgs= bmContadorGlobalImgs + 1;
					
					if(bmContadorGlobalImgs === bgImageArray.length){
						clearInterval(intervaloObj);					
					} 
				}						
			}, bmSecsCargaDiferida * 1000);		
			
			/*revisión de imágen de fondo cada 30 min*/
			var intervaloRefreshObj= setInterval(function(){
				bmCalculaImagenAAplicarEnHeaderPeriodicamente();
			}, secsForImgRefresh * 1000);		
		
		}catch(err){
			try{
				if(window.console){
					console.log("E42733: " + err.message);
				}
			}catch(err2){}	
		}

}

	

/* -------------------------- ENDS CAMBIO IMAGENES EN HEADER DIFERIDAS FUNCTIONS ------------------------------------------------- */

function bmValidateIfDynUrl(){
	var bmUrlHost=location.host;
	var sRelativeUrl= location.href.substring( location.href.indexOf(bmUrlHost) +bmUrlHost.length ) ;
	//alert("sRelativeUrl: "+sRelativeUrl);

	if( sRelativeUrl.indexOf("/dyn/") == 0 )
		globalDynPrefix="/dyn";

}

$( document ).ready(function() {	
	
	
	var lang=document.getElementsByTagName("html")[0].getAttribute("lang");//agregado accesibilidad remediación---------------------------------------

	try{	
		bmValidateIfDynUrl();
		
		var selHeader="#bmHeaderZone";
		var selFooter="#bmFooterZone";	
		
		/*importante, dejar al último la carga de selFooter, ahí se hace el initialize de los menus*/
		loadBmTemplate(selHeader,lang);//modificado accesibilidad, se incluye param lang
		loadBmTemplate(selFooter,lang);//modificado accesibilidad, se incluye param lang
	}catch(err){
		console.log( "Error al preparar sitio: " + err );
	}
	//console.log( "cargando portlets db02" );
	
	
	
	//agregado accesibilidad remediación---------------------------------------
	txtCont=(lang=="es")?"inicia contenido principal":"starts main content";
	divContenido = document.createElement("div");
	divContenido.setAttribute("id","contenido");
	divContenido.setAttribute("tabindex","0");
	spanCont=document.createElement("span");
	spanCont.setAttribute("class","sr-only");
	txtNodeCont=document.createTextNode(txtCont);
	spanCont.appendChild(txtNodeCont);
	divContenido.appendChild(spanCont);
	
	var txtMain=(lang=="es")?"Contenido principal":"Main content";
	var content=document.getElementById("content");
	content.setAttribute("role","main");
	content.setAttribute("aria-label",txtMain);
	var titlePage=document.getElementsByTagName("title")[0].textContent;
	var h1n=document.getElementsByTagName("h1");
	if(h1n.length > 0){
		if(h1n.length > 1){
			var h1=document.getElementsByClassName("header-lg")[0].getElementsByTagName("h1")[0];
			h1.parentNode.insertBefore(divContenido,h1);
		}
		if(h1n.length == 1){
			var contenido=document.getElementById("contenido").length;
			if(contenido == 0){h1n[0].parentNode.insertBefore(divContenido,h1n[0]);}
			var h1=h1n[0];
		}
	}else{
		var h1Oculto=document.createElement("h1");
		var txtTitlePage=document.createTextNode(titlePage);
		h1Oculto.setAttribute("class","sr-only");
		h1Oculto.appendChild(txtTitlePage);
		content.prepend(h1Oculto);
		content.insertBefore(divContenido,h1Oculto);
		var h1=h1Oculto;
	}
	
	var h1txt=h1.textContent;
	var visor=document.getElementsByClassName("bmtableview");
	var trh=[];
	var th=[];
	var thspan=[];	
	var thtxt=[];
	var tbody=[];
	var thead=[];
	var tcaption=[];
	var tctxt=[];
	
	var txtThR=(lang=="es")?"Recursos":"Resources";
	var txtThF=(lang=="es")?"Fecha":"Date";
	var txtTcC=(lang=="es")?h1txt+" por fecha de publicaci\u00F3n":h1txt+" by publication date";
	
	
	for (var i=0; i<visor.length; i++){
		tcaption[i] = document.createElement("caption");
		tcaption[i].setAttribute("class","sr-only");
		tctxt[i]=document.createTextNode(txtTcC);
		tcaption[i].appendChild(tctxt[i]);
		thead[i] = document.createElement("thead");
		trh[i] = document.createElement("tr");
		th[i+"f"] = document.createElement("th");
		th[i+"r"] = document.createElement("th");
		thspan[i+"f"] = document.createElement("span");
		thspan[i+"r"] = document.createElement("span");
		thspan[i+"r"].setAttribute("class","sr-only");
		thspan[i+"f"].setAttribute("class","sr-only");
		thtxt[i+"f"] = document.createTextNode(txtThR);
		thtxt[i+"r"] = document.createTextNode(txtThF);
		thspan[i+"f"].appendChild(thtxt[i+"f"]);
		thspan[i+"r"].appendChild(thtxt[i+"r"]);
		th[i+"f"].appendChild(thspan[i+"f"]);
		th[i+"r"].appendChild(thspan[i+"r"]);
		trh[i].appendChild(th[i+"r"]);
		trh[i].appendChild(th[i+"f"]);
		thead[i].appendChild(trh[i]);
		
		tbody[i]=visor[i].getElementsByTagName("tbody")[0];
		visor[i].insertBefore(tcaption[i],tbody[i]);
		visor[i].insertBefore(thead[i],tbody[i]);
	}
	//fin accesibilidad remediación
	
});