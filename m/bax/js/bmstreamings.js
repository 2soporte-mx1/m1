/* GLOBAL VARS */
var streamingsDate = new Date();
var gJsonEvParticular="/recursos/js/bm/bmstreamings.json?date="+ streamingsDate.getTime();
var gStreamEnabled= "";
var gStreamTitle= "";
var gStreamDesc= "";
var gStreamChannelURL= "";
var gVideoTargetSpan= "#bmVideoTargetSpan";
/* * SRC de prueba http://www.ustream.tv/embed/recorded/107425118?html5ui=1  * */

/* bmLeeEstadoEventoParticular se utiliza para ITI, ECORE y POLMON */
function bmLeeEstadoEventoParticular(){
		$.ajax({
				type: 'GET',
				url: gJsonEvParticular,	
				data: [
				],
				dataType: 'json',
				async: false,
				success: function(data){						
						try{						
							gStreamEnabled= data.streamingEnabled.substr(0,4).toLowerCase();
							gStreamTitle= data.streamingTitle;
							gStreamDesc= data.streamingDesc;
							gStreamChannelURL= data.streamingURLCanal;							
							//console.log( "enabledStreaming: "+gStreamEnabled+", title: "+gStreamTitle + ", desc: "+gStreamDesc+ ", url canal: " + gStreamChannelURL);							
							
							
							if(gStreamEnabled=="true")
								bmInitStreaming();
						}catch(err){ console.log("e01:"+err.message)}						
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {try {if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { console.log(errorThrown		)} }
			});	
		
}

function bmPosicionaStreaming( $ustreamFeaturedVideo ){
  if( $ustreamFeaturedVideo.hasClass( "is-sticky" ) ){
				var stickyPosY=125; //pixeles que ocupa la barra de header cuando no se está hasta arriba de la page en la navegación
				var stickyPosX=0; 
				var videoMargin= 10;				
				if( window.innerWidth >= $ustreamFeaturedVideo.outerWidth()){
					var originalVideoPosOffset= $("#bmVideoReferenceDiv28").css("margin-left");
					var videoPosOffsetCleaned= parseInt(originalVideoPosOffset.replace(/px/gi,""));
					var scrollOffset= 43;					
					stickyPosX= (window.innerWidth - $ustreamFeaturedVideo.outerWidth()) - videoMargin - videoPosOffsetCleaned - scrollOffset;
				}								
				
				/* ajustando X */										
				if( window.innerHeight >= $ustreamFeaturedVideo.outerHeight())				
					stickyPosY= window.innerHeight - $ustreamFeaturedVideo.outerHeight() -  videoMargin;
								
				//$ustreamFeaturedVideo.css("transform","translateY("+stickyPosY+"px)");
				$ustreamFeaturedVideo.css("-ms-transform","translate("+stickyPosX+"px, "+stickyPosY+"px)");  
				$ustreamFeaturedVideo.css("-webkit-transform","translate("+stickyPosX+"px, "+stickyPosY+"px)"); 
				$ustreamFeaturedVideo.css("transform","translate("+stickyPosX+"px, "+stickyPosY+"px)");				
		   }else{
				$ustreamFeaturedVideo.css("-ms-transform","");
				$ustreamFeaturedVideo.css("-webkit-transform","");
				$ustreamFeaturedVideo.css("transform","");
		   }
}

function bmConfiguracionFinalVideo(){
			//IBM Cloud Video Embed API instance
			var embedApi = UstreamEmbed('featured-video');
			var $window = $( window ); // 1. Window Object.
			var $ustreamFeaturedVideo = $( "#featured-video" ); // 2. The Video.
			var $featuredMedia = $( "#featured-media" ); // 1. The Video Container.
			
			var top = $featuredMedia.offset().top; // 4. The video position from the top of the document;
			var offset = Math.floor( top + ( $featuredMedia.outerHeight() / 2 ) -180 ); //5. offset.
			
			//var posicionVideo = $window.width() - 435;
			
			embedApi.addListener('playing', function (){
				var evento = JSON.parse(event.data);
				
				//Seteando si el video está en reproducción (Playing)
				if(evento.event.playing){
					$ustreamFeaturedVideo.removeClass( "is-paused" );
					$ustreamFeaturedVideo.toggleClass( "is-playing" );
				}else{
					$ustreamFeaturedVideo.removeClass( "is-playing" );
					$ustreamFeaturedVideo.toggleClass( "is-paused" );
				}
			});
			
			// FIX			
			embedApi.addListener('offline', function (){
				$ustreamFeaturedVideo.removeClass( "is-playing" );
			});
			
			
			
			$window.on( "resize", function() {
			   // calculando offset del video
			   top = $featuredMedia.offset().top;
			   offset = Math.floor( top + ( $featuredMedia.outerHeight() / 2 ) -180 );
			   bmPosicionaStreaming( $ustreamFeaturedVideo );
			}).on( "scroll", function() {
			   //Switcheando clase is-sticky si se ha cruzado la barrera (offset)
			   $ustreamFeaturedVideo.toggleClass( "is-sticky", $window.scrollTop() > offset && $ustreamFeaturedVideo.hasClass( "is-playing" ));		 
				bmPosicionaStreaming( $ustreamFeaturedVideo );
			});	

			//pequeño ajuste
			//$("#content-media--video-metadata").height( $("#featured-media").outerHeight() );
}

function bmInitStreaming(){
var bmVideoStreamingHTML = '<!--INICIA SECCION PARA EVENTOS PARTICULARES-->'+
'						<div class="container" id="bmVideoReferenceDiv28" style="max-width: 1170px;">'+
'						<div class="row"><!-- Div para streaming -->'+
'						<div class="col-xs-12 col-sm-12 col-md-12">'+
'						<h2 class="sr-only">Video en vivo '+gStreamTitle+'</h2><!-- agregado accesibilidad remediación, h2 oculto -->'+
'						<div class="panel panel-default">'+
'						<div class="panel-body">'+
'						<div class="container">'+
'						<div class="row no-gutters" id="bmStreamingBSRowDiv" style="background-color: #eef3f3; border-radius: 0 10px 10px 0;">'+
'						<div class="col-xs-12 col-sm-12 col-md-7" style="padding: 0;"><!-- INICIA VIDEO  -->'+
'						<div class="embed-responsive embed-responsive-16by9 content-media--video" id="featured-media" style="height: 100%;"><iframe title="video de ustream: '+gStreamTitle+'" class="embed-responsive-item" id="featured-video" src="'+gStreamChannelURL+'?html5ui=1&allowfullscreen=true" allowfullscreen webkitallowfullscreen></iframe><!-- agregado accesibilidad remediación, se incluye title --></div>'+
'						<!--TERMINA VIDEO--></div>'+
'						<div class="col-xs-12 col-sm-12 col-md-5" style="padding: 0;"><!-- INICIAN METADATOS -->'+
'						<div style="text-align: center; margin: auto; width: 99%; padding: 5px; height: 100%;">'+
'						<p aria-hidden="true" class="hidden-xs hidden-sm">&nbsp; </p>'+
'						<p aria-hidden="true" class="hidden-xs hidden-sm">&nbsp; </p>'+
'						<p aria-hidden="true" class="hidden-xs hidden-sm">&nbsp; </p>'+
'						<p aria-hidden="true" class="a11yCencab a11yCencab3"><span>'+gStreamTitle+'</span></p>'+
'						<p aria-hidden="true"></p>'+
'						<p style="color: #007279;">'+gStreamDesc+'</p>'+
'						</div>'+
'						<!--TERMINAN METADATOS--></div>'+
'						</div>'+
'						</div>'+
'						</div>'+
'						</div>'+
'						</div>'+
'						</div>'+
'						<!--TERMINA ROW--></div>'+
'						<!--TERMINA SECCION PARA EVENTOS PARTICULARES-->';

	$(gVideoTargetSpan).append( bmVideoStreamingHTML );
	bmConfiguracionFinalVideo(); 	
}


$(document).ready(function(){
	try{
			bmLeeEstadoEventoParticular();		
	}catch(err){ console.log("E:" + err.message); }
});