var gBMIndLang=document.getElementsByTagName("html")[0].getAttribute("lang");//modificado accesibilidad remediación
var gBMInfQnalLink=   "https:\/\/www.banxico.org.mx\/SieInternet\/consultarDirectorioInternetAction.do?sector=8&idCuadro=CP195&accion=consultarCuadro&locale=es";
var gBMInfQnalLinkEN= "https:\/\/www.banxico.org.mx\/SieInternet\/consultarDirectorioInternetAction.do?sector=8&idCuadro=CP195&accion=consultarCuadro&locale=en";
var gBMFinalQnalLink= gBMInfQnalLink;
if(gBMIndLang=="en"){
	gBMFinalQnalLink= gBMInfQnalLinkEN;
	
}

var gBMInfQnalFinalOnclick=   "ga('send', 'event', 'Hit', 'Open', '" + gBMFinalQnalLink + "');";


function bmLatestDate(fecha1, fecha2){

	if(fecha1 > fecha2)
		return "1";
	else
		return "2";	
}

function muestraIndicadores(){
	//var lang=document.getElementsByTagName("html")[0].getAttribute("lang");//modificado accesibilidad remediación	
		
	Math.trunc = Math.trunc || function(x) {
		return x - x % 1;
	}
	
	var formatReservas=function(d){
		//return {valor:Math.trunc(parseFloat(d.valor.replace(",",""))/1000), fecha:d.fecha, fechaEn:d.fechaEn};
		
		//para liberar el 14 de diciembre
		return {valor:d.valor, fecha:d.fecha, fechaEn:d.fechaEn};
	}
	
	var formatInflacionesQnales=function(d){	
		var fecha= d.fecha.split("-");
		var sYear= fecha[2].trim();		
		var sMonth= fecha[1].trim();
		
		var oneYearBefore="";
		oneYearBefore+= parseInt(sYear) - 1;
		var displayDate= "1Q " + sMonth + " - " + oneYearBefore.substring(2) + " a <br/>" 
					   + "1Q " + sMonth + " - " + sYear.substring(2);
		switch(sMonth){
			case "ENE":iMonth="0";break;
			case "FEB":iMonth="1";break;
			case "MAR":iMonth="2";break;
			case "ABR":iMonth="3";break;
			case "MAY":iMonth="4";break;
			case "JUN":iMonth="5";break;
			case "JUL":iMonth="6";break;
			case "AGO":iMonth="7";break;
			case "SEP":iMonth="8";break;
			case "OCT":iMonth="9";break;
			case "NOV":iMonth="10";break;
			case "DIC":iMonth="11";break;
			default: iMonth="0";
		}
		var oFecha= new Date(fecha[2].trim(), iMonth, fecha[0].trim());
		
		//displayDate EN
		var displayDateEN= "";
		var sMonthEN="";
		if(gBMIndLang=="en"){
			switch(sMonth){
				case "ENE":sMonthEN="JAN";break;
				case "FEB":sMonthEN="FEB";break;
				case "MAR":sMonthEN="MAR";break;
				case "ABR":sMonthEN="APR";break;
				case "MAY":sMonthEN="MAY";break;
				case "JUN":sMonthEN="JUN";break;
				case "JUL":sMonthEN="JUL";break;
				case "AGO":sMonthEN="AUG";break;
				case "SEP":sMonthEN="SEP";break;
				case "OCT":sMonthEN="OCT";break;
				case "NOV":sMonthEN="NOV";break;
				case "DIC":sMonthEN="DEC";break;
				default: sMonthEN="";
			}
			displayDateEN= "1st hf " + sMonthEN + " - " + oneYearBefore.substring(2) + " to <br/>"
                	   + "1st hf " +sMonthEN + " - " + sYear.substring(2);
					   
		}
		
		var fechaEn= d.fechaEn.split("-");
		fechaEn=fechaEn[0].trim()+" - "+fechaEn[2].trim();
		
		return {valor:d.valor, displayDate:displayDate, displayDateEN:displayDateEN, oFecha:oFecha, fechaEn:fechaEn};
	}
	
	var formatInflacionesAcumuladaAnual=function(d){
		
		// --- Fecha español ---
		var fecha= d.fecha.split("-");
		var sYear= fecha[2].trim();		
		var sMonth= fecha[1].trim();
		
		var oneYearBefore= parseInt(sYear) - 1;
		
		//displayDate ES
		var displayDate= sMonth + " - " + oneYearBefore + " a <br/>"
                	   + sMonth + " - " + sYear;
		
		switch(sMonth){
			case "ENE":iMonth="0";break;
			case "FEB":iMonth="1";break;
			case "MAR":iMonth="2";break;
			case "ABR":iMonth="3";break;
			case "MAY":iMonth="4";break;
			case "JUN":iMonth="5";break;
			case "JUL":iMonth="6";break;
			case "AGO":iMonth="7";break;
			case "SEP":iMonth="8";break;
			case "OCT":iMonth="9";break;
			case "NOV":iMonth="10";break;
			case "DIC":iMonth="11";break;
			default: iMonth="0";
		}	
		
		var oFecha= new Date(fecha[2].trim(), iMonth, fecha[0].trim());
		
		//displayDate EN
		var displayDateEN= "";
		var sMonthEN="";
		if(gBMIndLang=="en"){
			switch(sMonth){
				case "ENE":sMonthEN="JAN";break;
				case "FEB":sMonthEN="FEB";break;
				case "MAR":sMonthEN="MAR";break;
				case "ABR":sMonthEN="APR";break;
				case "MAY":sMonthEN="MAY";break;
				case "JUN":sMonthEN="JUN";break;
				case "JUL":sMonthEN="JUL";break;
				case "AGO":sMonthEN="AUG";break;
				case "SEP":sMonthEN="SEP";break;
				case "OCT":sMonthEN="OCT";break;
				case "NOV":sMonthEN="NOV";break;
				case "DIC":sMonthEN="DEC";break;
				default: sMonthEN="";
			}
			displayDateEN= sMonthEN + " - " + oneYearBefore + " to <br/>"
                	   + sMonthEN + " - " + sYear;
		}
		
		var fechaEn= d.fechaEn.split("-");
		fechaEn=fechaEn[0].trim()+" - "+fechaEn[2].trim();
		
		return {valor:d.valor, displayDate:displayDate, displayDateEN:displayDateEN, oFecha:oFecha, fechaEn:fechaEn};
	}
	
	var formatInflaciones=function(d){
		var fecha= d.fecha.substring(d.fecha.indexOf("-")+2);
		var fechaEn= d.fechaEn.split("-");
		fechaEn=fechaEn[0].trim()+" - "+fechaEn[2].trim();
		return {valor:d.valor, fecha:fecha, fechaEn:fechaEn};
	}
	
	var formatTruncate=function(numDec){
		if(numDec==undefined)
			numDec=0;
		return function(d){
			var valor=d.valor;
			return {valor:valor.substring(0,valor.indexOf(".")+numDec+1), fecha:d.fecha, fechaEn:d.fechaEn};
		}
	}
		
	var normalInds=[	
		{name:"tiieFondeo",formatter:formatTruncate(2)},
		{name:"singleTIIE28",formatter:formatTruncate(4)},
		{name:"singleFix",formatter:formatTruncate(4)},
		{name:"singleUDIS",formatter:formatTruncate(6)},
		{name:"singleTasaObj",formatter:formatTruncate(2)},
		{name:"singleCetes28",formatter:formatTruncate(2)},
		{name:"singleReservas",formatter:formatReservas},		
		{name:"singleBono10",formatter:formatTruncate(2)}		
		];
		
		//{name:"singleInflacion",formatter:formatInflaciones}		
	var inflationInds=[		
		{name:"singleInfQnal",formatter:formatInflacionesQnales},
		{name:"singleInflacion",formatter:formatInflacionesAcumuladaAnual}		
		];
		
		//{name:"singleInflacionSub",formatter:formatInflaciones}		
	var underlyingInflationInds=[		
		{name:"singleInfSubQnal",formatter:formatInflacionesQnales},
		{name:"singleInflacionSub",formatter:formatInflacionesAcumuladaAnual}		
		];	
		
		//Iterado sobre arreglos normales		
		normalInds.forEach(muestraIndicador);
		
		
		

		getInflationObjects(inflationInds[0],inflationInds[1]);
		getInflationObjects(underlyingInflationInds[0],underlyingInflationInds[1]);
		
		

		
}

function getInflationObjects(elInd1, elInd2){
		try{
			
			// ++++++++++++++++ Código para el 23 de diciembre, cuando ya existan ambos indicadores +++++++++++++++++++++++
			/* var ind1= elInd1.name;
			var fecha1;
			$.getJSON("/canales/"+ind1+".json")
				.done(function(valInd1){
						oInd1= elInd1.formatter(valInd1);
						console.log(ind1+":::, RAW date1: " + valInd1.fecha + ", valor: " + valInd1.valor);
						fecha1=oInd1.oFecha;
				
						var ind2= elInd2.name;	
						var fecha2;	
						$.getJSON("/canales/"+ind2+".json")
							.done(function(valInd2){								
									//fecha2= valInd2.fecha;
									oInd2= elInd2.formatter(valInd2);
									console.log(ind2+":::, RAW date2: " + valInd2.fecha + ", valor: " + valInd2.valor);
									fecha2=oInd2.oFecha;									
									
									//calculando qué fecha de publicación es más reciente 									
									if( bmLatestDate(fecha1,fecha2) == "1" ){
										console.log("DB2, fecha 1 más reciente");
										muestraIndicadorInflacion(elInd2.name, elInd1, oInd1.displayDate, oInd1.displayDateEN); //el primer parámetro siempre es el selector del div de la inflación mensual (elInd2)
									}else{
										console.log("DB3, fecha 2 más reciente");
										muestraIndicadorInflacion(elInd2.name, elInd2, oInd2.displayDate, oInd2.displayDateEN);
									}
									
						});					
				 	
			}); */
			// ++++++++++++++++ TERMINA código para el 23 de diciembre, cuando ya existan ambos indicadores +++++++++++++++++++++++
		 
		// ++++++++++++++++ Comienza código del 8 al 23 de diciembre, cuando no existen ambos indicadores +++++++++++++++++++++++
		 
		if(elInd1 != null){
			//existen nuevos indicadores
			var ind1= elInd1.name;
			var fecha1;
			$.getJSON("/canales/"+ind1+".json")
				.done(function(valInd1){
						oInd1= elInd1.formatter(valInd1);
						//console.log(ind1+":::, RAW date1: " + valInd1.fecha + ", valor: " + valInd1.valor);
						fecha1=oInd1.oFecha;
				
						var ind2= elInd2.name;	
						var fecha2;	
						$.getJSON("/canales/"+ind2+".json")
							.done(function(valInd2){									
									oInd2= elInd2.formatter(valInd2);

									fecha2=oInd2.oFecha;									
									
									//calculando qué fecha de publicación es más reciente 									
									if( bmLatestDate(fecha1,fecha2) == "1" ){
										//se muestra inflación quincenal
										muestraIndicadorInflacion(elInd2.name, elInd1, oInd1.displayDate, oInd1.displayDateEN); //el primer parámetro siempre es el selector del div de la inflación mensual (elInd2)
									}else{
										//se muestra inflación
										muestraIndicadorInflacion(elInd2.name, elInd2, oInd2.displayDate, oInd2.displayDateEN);
									}
									
						});					
				 	
			});
		}else{ //no existen nuevos indicadores
			console.log("no existen nuevos indicadores, se muestran indicadores de inflación acumulada");
			var ind2= elInd2.name;	
			var fecha2;	
			$.getJSON("/canales/"+ind2+".json")
				.done(function(valInd2){								
						//fecha2= valInd2.fecha;
						oInd2= elInd2.formatter(valInd2);
						console.log(ind2+":::, RAW date2: " + valInd2.fecha + ", valor: " + valInd2.valor);
						fecha2=oInd2.oFecha;									
						console.log("DB4, solo existe fecha ind mensual");
						muestraIndicadorInflacion(elInd2.name, elInd2, oInd2.displayDate, oInd2.displayDateEN);
						
			});	
		}
		// ++++++++++++++++ TERMINA código del 8 al 23 de diciembre, cuando no existen ambos indicadores +++++++++++++++++++++++


		
		}catch(err){}
	}

function muestraIndicador(elInd){
		try{
			var ind= elInd.name;
			$.getJSON("/canales/"+ind+".json")
				.done(function(valInd){
					
					//agregado accesibilidad remediación 
					if(gBMIndLang=="en"){
						console.log("IndFileName: "+ind);
						iDate=valInd.fechaEn;
						iDm=iDate.slice(0,3);
						iDa=iDate.slice(-2);
						iDd=(iDate.length > 8)?iDate.slice(-7,-5):"";
						switch(iDm){
							case "JAN":idml="January";break;
							case "FEB":idml="February";break;
							case "MAR":idml="March";break;
							case "APR":idml="April";break;
							case "MAY":idml="May";break;
							case "JUN":idml="June";break;
							case "JUL":idml="July";break;
							case "AUG":idml="August";break;
							case "SEP":idml="September";break;
							case "OCT":idml="October";break;
							case "NOV":idml="November";break;
							case "DEC":idml="December";break;
							default: idml=iDm;
						}
						lblFecha="published "+idml+" "+iDd+" "+iDa;
					}else{
						iDate=valInd.fecha;
						iDm=iDate.slice(-10,-7);
						iDa=iDate.slice(-4);
						iDd=(iDate.length > 8)?iDate.slice(-15,-13):"";
						switch(iDm){
							case "ENE":idml="Enero";break;
							case "FEB":idml="Febrero";break;
							case "MAR":idml="Marzo";break;
							case "ABR":idml="Abril";break;
							case "MAY":idml="Mayo";break;
							case "JUN":idml="Junio";break;
							case "JUL":idml="Julio";break;
							case "AGO":idml="Agosto";break;
							case "SEP":idml="Septiembre";break;
							case "OCT":idml="Octubre";break;
							case "NOV":idml="Noviembre";break;
							case "DIC":idml="Diciembre";break;
							default: idml="sin mes";
						}
						lblFecha="con fecha de publicaci\u00F3n "+iDd+" "+idml+" "+iDa;
					}//termina agregado accesibilidad remediación					
					
					valInd=elInd.formatter(valInd);
					$("#dv_"+ind+" .card-text .valor").text(valInd.valor);//modificado accesibilidad remediación, se agrega clase .valor
					$("#dv_"+ind+" .date .fecha").text(iDate);//modificado accesibilidad remediación, se elimina etiqueta time, se agrega clase .fecha, se cambia variable de fecha
					$("#dv_"+ind+" .date .iFechaLbl").attr("aria-label",lblFecha);//agregado accesibilidad remediación
					
				});
		}catch(err){}
	}
	
	function muestraIndicadorInflacion(selector, elInd, displayDate, displayDateEN){
		try{
			var ind= selector;
			var bShowQnalLink= false;
			if(elInd.name == "singleInfQnal" || elInd.name == "singleInfSubQnal" )
				bShowQnalLink= true;
			
			var finalDisplayDate= displayDate;
			$.getJSON("/canales/" + elInd.name + ".json")
				.done(function(valInd){
					
					//agregado accesibilidad remediación 
					if(gBMIndLang=="en"){
						finalDisplayDate= displayDateEN;
						console.log("indName="  + elInd.name + ",  finalDisplayDate:: " + finalDisplayDate);
						iDate=valInd.fechaEn;
						console.log("iDate=" + iDate);
						iDm=iDate.slice(0,3);
						iDa=iDate.slice(-2);
						iDd=(iDate.length > 8)?iDate.slice(-7,-5):"";
						switch(iDm){
							case "JAN":idml="January";break;
							case "FEB":idml="February";break;
							case "MAR":idml="March";break;
							case "APR":idml="April";break;
							case "MAY":idml="May";break;
							case "JUN":idml="June";break;
							case "JUL":idml="July";break;
							case "AUG":idml="August";break;
							case "SEP":idml="September";break;
							case "OCT":idml="October";break;
							case "NOV":idml="November";break;
							case "DEC":idml="December";break;
							default: idml=iDm;
						}						
						lblFecha="published "+idml+" "+iDd+" "+iDa;
					}else{
						iDate=valInd.fecha;
						iDm=iDate.slice(-10,-7);
						iDa=iDate.slice(-4);
						iDd=(iDate.length > 8)?iDate.slice(-15,-13):"";
						switch(iDm){
							case "ENE":idml="Enero";break;
							case "FEB":idml="Febrero";break;
							case "MAR":idml="Marzo";break;
							case "ABR":idml="Abril";break;
							case "MAY":idml="Mayo";break;
							case "JUN":idml="Junio";break;
							case "JUL":idml="Julio";break;
							case "AGO":idml="Agosto";break;
							case "SEP":idml="Septiembre";break;
							case "OCT":idml="Octubre";break;
							case "NOV":idml="Noviembre";break;
							case "DIC":idml="Diciembre";break;
							default: idml="sin mes";
						}
						lblFecha="con fecha de publicaci\u00F3n "+iDd+" "+idml+" "+iDa;
					}//termina agregado accesibilidad remediación					
					
					//corrección, la siguiente línea no se utiliza
					//valInd=elInd.formatter(valInd);					
					$("#dv_"+ind+" .card-text .valor").text(valInd.valor);//modificado accesibilidad remediación, se agrega clase .valor
					//$("#dv_"+ind+" .date .fecha").text(finalDisplayDate);//modificado accesibilidad remediación, se elimina etiqueta time, se agrega clase .fecha, se cambia variable de fecha
					$("#dv_"+ind+" .date .fecha").html(finalDisplayDate);//modificado accesibilidad remediación, se elimina etiqueta time, se agrega clase .fecha, se cambia variable de fecha
					$("#dv_"+ind+" .date .iFechaLbl").attr("aria-label",lblFecha);//agregado accesibilidad remediación
					
					//fix para liga de inflaciones quincenales Diciembre 2022
					if(bShowQnalLink){
						
						console.log("Flag21");
						console.log("link before: "+  $("#dv_"+ind+" a").attr("href")  );						
						//seteando LIGA inflación quincenal
						$("#dv_"+ind+" a").attr("href", gBMFinalQnalLink);						
						console.log("link after: "+  $("#dv_"+ind+" a").attr("href")  );
						
						// onclick="ga('send', 'event', 'Hit', 'Open', 'https://www.inegi.org.mx/app/indicesdeprecios/Estructura.aspx?idEstructura=112001300030&amp;T=%C3%8Dndices%20de%20Precios%20al%20Consumidor&amp;ST=Inflaci%C3%B3n%20Mensual');"
						           
						console.log("onclick before: " + $("#dv_"+ind+" a").attr("onclick") );
						//seteando ONCLICK inflación quincenal
						$("#dv_"+ind+" a").attr("onclick", gBMInfQnalFinalOnclick);						
						
						console.log("onclick after: " + $("#dv_"+ind+" a").attr("onclick") );
						/*
						console.log("aria-label before: "+  $("#dv_"+ind+").attr("aria-label")   );
						console.log("aria-label after: " );
						*/
						
						
					}
						
					
					
				});
		}catch(err){}
	}

$( document ).ready(function() {
	muestraIndicadores();
});