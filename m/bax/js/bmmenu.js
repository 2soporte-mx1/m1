
initHeaderImageAndMenuPos();


function initHeaderImageAndMenuPos(){
		try{
			posicionarMenu();
		}catch(err){
			if(console!= undefined)
				console.log("Error al inicializar componente del sitio - XE11");
		}	
}


$(window).scroll(function() { 
    posicionarMenu();

});

function posicionarMenu() {
    var alturaHeader = $('.container-image').outerHeight()-$('.container-image.active .navbar-header').height();
    if ($(window).scrollTop() > alturaHeader){
	$('#sticky').addClass('sticky');
	$('.container-image.active .navbar-header').css({'background-color':'#121541','margin-top':'0'})
    } else {
        $('#sticky').removeClass('sticky');
	$('.container-image.active .navbar-header').css({'background-color':'transparent'})
    }
	//Agregado accesibilidad remediación
    if($('.container-image.active .saltoBloques').is(':visible')){
		$(".container-image.active .navbar-header").css({'margin-top':'2em'});
		if( $(window).scrollTop() > 5){
			$(".container-image.active .navbar-header").css({'margin-top':'0em'});
		}else{
			$(".container-image.active .navbar-header").css({'margin-top':'2em'});
		}
	}else{
		$(".container-image.active .navbar-header").css({'margin-top':'0em'});
	}//termina accesibilidad remediación
}

//Agregado accesibilidad remediación
$(window).resize(function() { 
    posicionarMenu();
});
function navFreqPosInit(){
	if($('.container-image.active .saltoBloques').is(':visible')){
		$(".container-image.active .navbar-header").css({'margin-top':'2em'});
	}else{
		$(".container-image.active .navbar-header").css({'margin-top':'0em'});
	}
	
	if( $(window).scrollTop() > 5){
			$(".container-image.active .navbar-header").css({'margin-top':'0em'});
		}
}
//termina accesibilidad remediación

/* init OWL carousel was here*/

$(function() {
	window.prettyPrint && prettyPrint()
	$(document).on('click', '.yamm .dropdown-menu', function(e) {
		e.stopPropagation()
	})
})

$(document).ready(function () {
    $( ".dropdown-toggle" ).click( function(){   
      $(this).children(".caret").toggleClass('rotate-180');     
    });  
});
$(document).on("click", function(event){
  var $trigger = $(".caret");
  if($trigger !== event.target && !$trigger.has(event.target).length){
     $(".caret").removeClass('rotate-180');  
  }            
});


/* $(document).ready(function (e) {
    $( ".dropdown" ).hover( function(e){   
       $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);   
    });  
	
    $('.dropdown').mouseleave(function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(300);
      });
}); */

$(document).ready(function () {
	try{
		//Nuevo tootip de la PP
		$('#bmTextoObjetivoLiga').tooltip();

		$( ".dropdown-toggle" ).click( function(){   
		  $(this).children(".caret").toggleClass('rotate-180');     
		});  
	}catch(err){  }
	
	
	//Agregado accesibilidad remediación	
	$(".nav-tabs a").on('click',function(){
		ctrlPan=$(this).attr("aria-controls");
		$("#"+ctrlPan).focus();
		$("#panelPubVid div[role='tabpanel']:not(.active)").attr("aria-hidden","true");
		$("#"+ctrlPan).attr("aria-hidden","false");
	});//fin accesibilidad remediación	


	//Agregado accesibilidad remediación, se oculta el menú desplegable con la tecla ESC
	$("#panelPubVid").keyup(function(e){
		if(e.which==27) {
			ctrlTab=$("#panelPubVid .tab-pane.active").attr("id");
			$("a[aria-controls='"+ctrlTab+"']").focus();
			console.log("escape panel - "+ctrlTab);
		}
	});//fin accesibilidad remediación	

});

//Agregado accesibilidad remediación	 a11y
$(document).keyup(function(e){
	if(e.which==27) {
		$(".navbar-nav .open a").attr('aria-expanded','false');
		$(".navbar-nav .open a .caret").removeClass('rotate-180');
		$(".navbar-nav .open > a").focus();
		$(".navbar-nav .open").removeClass('open');
		console.log("escape doc");
	}
});
//fin accesibilidad remediación	
