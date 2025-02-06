$(function(){
    //Header y footer
    $("header").load("header.html");
    $("footer").load("footer.html");

    //Infografias
    $(document).on('click','a.infografia',function(){
        var imagen = $(this).attr('title');
        $.iLightBox([
            {
                URL: imagen,
                type: 'image'
            }
        ]);
    });

    //Listener del menú
    $(document).on('click','section > div.menu-contenido > div > span',function(){
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        switch ($(this).attr('title')) {
			case 'videos':
				$('#infografias,#juegos,#calculadoras,#audios,#inicio').css('display', 'none');
				$('#videos').css('display', 'flex').addClass('selected');;
				console.log ('1');
				break;
			
			case 'infografias':
				 $('#videos,#juegos,#calculadoras,#audios,#inicio').css('display', 'none');
				 $('#infografias').css('display', 'flex').addClass('selected');
				 console.log("2");
				break;
			
			case 'calculadoras':
				$('#videos,#juegos,#infografias,#audios,#inicio').css('display', 'none');
				$('#calculadoras').css('display', 'flex').addClass('selected');
				console.log("3");
				break;
			case 'juegos':
				$('#videos,#calculadoras,#infografias,#audios,#inicio').css('display', 'none');
				$('#juegos').css('display', 'flex').addClass('selected');
				console.log("4");
				break;
			case 'audios':
				$('#videos,#calculadoras,#infografias,#juegos,#inicio').css('display', 'none');
				$('#audios').css('display', 'flex').addClass('selected');
				console.log("5");
				break;
			case 'inicio':
				$('#videos,#calculadoras,#infografias,#juegos,#audios').css('display', 'none');
				$('#inicio').css('display', 'flex').addClass('selected');
				console.log("6");
				break;				
		}
		/*
		if ($(this).attr('title') == "videos") {
            $('#infografias').css('display', 'none');
            $('#videos').css('display', 'flex');
        } else {
            $('#infografias').css('display', 'flex');
            $('#videos').css('display', 'none');
        }
		*/
    });
});