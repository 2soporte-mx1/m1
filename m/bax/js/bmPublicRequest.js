
function setPublicRequestStatus() {
	try{
		var glbDatetime = +new Date();
		$.get("recursos/consulta-publica/consulta-publica.txt?date=" + glbDatetime).done(function(data){
			if("y"==data.substr(0,1).toLowerCase()){
				$(".panel-consulta-publica").show();
			}else{
				$(".panel-consulta-publica").hide();
			}
		});
	}catch(err){}
}

$( document ).ready(function() {
  setPublicRequestStatus();
});