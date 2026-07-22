function calcpayments(){

//Las cinco variables utilizadas en la fórmula

var monto=document.forms[1].monreq.value*1;

var numeropagos=document.forms[1].numpag.value*1;
var freqpago;
var tipocredito;
var sisamorta;
//variables intereses
var nomrate=0;
var efectivorate=0;
var cstfinancing=0;
var cbemaxrate=0;

//Frecuencia de pago
for (i=0; i<document.forms[1].freqpag.options.length; i++){

if (document.forms[1].freqpag.options[i].selected)
freqpago = document.forms[1].freqpag.options[i].value*1;
}
//Tipo de pago
for (i=0; i<document.forms[1].tipocred.options.length; i++){

if (document.forms[1].tipocred.options[i].selected)
tipocredito = document.forms[1].tipocred.options[i].value;

}

//sistema de amoritzacion
for (i=0; i<document.forms[1].sisamort.options.length; i++){

if (document.forms[1].sisamort.options[i].selected)
sisamorta = document.forms[1].sisamort.options[i].value;
}

//TASAS DE INTERES SEGUN TIPODE CREDITO
if(tipocredito==1){

nomrate=15.2;
efectivorate=16.3;
cstfinancing=17.09;
cbemaxrate=17.3;

}else if(tipocredito==2){
nomrate=17.2;
efectivorate=15.77;
cstfinancing=18.45;
cbemaxrate=18.65;

}else if(tipocredito==3){
nomrate=10.5;
efectivorate=11.02;
cstfinancing=11.77;
cbemaxrate=11.33;

}
else if(tipocredito==4){
nomrate=20;
efectivorate=21.94;
cstfinancing=22.76;
cbemaxrate=25.35;

}

if (numeropagos>5 && tipocredito!=0) {
	//alert(cbemaxrate);
	 document.getElementById("calculos").style.display = "block";
		//Caluclos
		var montoliquido=(monto*8.42326)/100;
		montoliquido=Math.round(montoliquido*100) /100;
		//var securedeb=monto*((Math.pow((1+nomrate),(1/numeropagos-i))-1)/100)*(-1);
		var securedeb=(monto*0.37512)/100;
		securedeb=Math.round(securedeb*100) /100;
		var ressdml=montoliquido+securedeb;
		ressdml=Math.round(ressdml*100) /100;
		var resultadototal=ressdml+monto;
	
		
			//CALCULOS PARA LA TABLA PRINICPAL
		
			document.getElementById("montocon").innerHTML=monto;
		//document.getElementById("montoliq").innerHTML=monto;
		document.getElementById("interes").innerHTML=montoliquido;
		document.getElementById("segdeud").innerHTML=securedeb;
		//document.getElementById("totfincar").innerHTML=ressdml;
		//document.getElementById("tot").innerHTML=resultadototal;
			//CALCULOS PARA LA TABLA INTERESES
			
		document.getElementById("nomtar").innerHTML=nomrate;
		document.getElementById("tarefec").innerHTML=efectivorate;
		document.getElementById("cosfin").innerHTML=cstfinancing;
		document.getElementById("bcerate").innerHTML=cbemaxrate;
		
		
		///LLENA LA TABLA DE PAGOS
		var cuota=monto/numeropagos;
		var sumacuotas=0;
		var sumaseguros=0;
		var sumatotalcuotas=0;
		var sumainteres=0;
		var queda=monto;
		for (i=0; i<=numeropagos; i++) {
		var table = document.getElementById("tablapagos");
				if (i==0) {
				var row = table.insertRow(i);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				
				cell1.innerHTML = "N° Cuota";
				cell2.innerHTML = "Saldo";
				cell3.innerHTML = "Capital";
				cell4.innerHTML = "Interés";
				cell5.innerHTML = "Seguro Desgravamen";
				cell6.innerHTML = "Total cuota";
				
				}else {
		//var result=(nprice*(salestax/100 +1)-dpayment)*((interest/100)/12) / (1-Math.pow((1+(interest/100)/12),(-t)));
		var interes=monto*((Math.pow((1+nomrate),(1/numeropagos-i))-1)/100);
		interes=Math.round((-1)*interes*100) /100;
		var seguro=securedeb/numeropagos;
		seguro=Math.round(seguro*100) /100;
		
		cuotasum=cuota+interes+seguro;
		cuotasum=Math.round(cuotasum*100) /100;
		cuota=Math.round(cuota*100) /100;
		var queda=queda-cuota;
		queda=Math.round(queda*100) /100;
		
		//result=Math.round(result*100) /100;	
				var row = table.insertRow(i);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				
				cell1.innerHTML = i;
				cell2.innerHTML = queda;
				cell3.innerHTML = cuota;
				cell4.innerHTML = interes;
				cell5.innerHTML = seguro;
				cell6.innerHTML = cuotasum;
				
		sumacuotas=	sumacuotas+	cuotasum;
		sumacuotas=Math.round(sumacuotas*100) /100;
		sumaseguros=	sumaseguros+	seguro;
		sumaseguros=Math.round(sumaseguros*100) /100;
		sumainteres=	sumainteres+	interes;
		sumainteres=Math.round(sumainteres*100) /100;
		sumatotalcuotas=	sumatotalcuotas+	cuota;
		sumatotalcuotas=Math.round(sumatotalcuotas*100) /100;
				}
		}
		var table = document.getElementById("tablapagos");
		var row = table.insertRow(numeropagos+1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		
		cell1.innerHTML = "TOTAL";
		cell2.innerHTML = Math.round(queda);
		cell3.innerHTML = sumatotalcuotas;
		cell4.innerHTML = sumainteres;
		cell5.innerHTML = sumaseguros;	
		cell6.innerHTML = sumacuotas;	
	
	
		}
}
function limpia() {
document.getElementById("calculos").style.display = "none";

} 
function lineacredito(num) {
	
	var valor=num.value;
		
		for (var i=1; i<6;i++){

			if (valor==i) {
		
			divC = document.getElementById("sale-div"+i);
			divC.style.display = "block";
			}else {
			divC = document.getElementById("sale-div"+i);
			divC.style.display = "none";
			}
			
			}
     
}
function amortizacion(num) {
	
	var valor=num.value;
		
		for (var i=11; i<13;i++){

			if (valor==i) {
		
			divC = document.getElementById("sale-div"+i);
			divC.style.display = "block";
			}else {
			divC = document.getElementById("sale-div"+i);
			divC.style.display = "none";
			}
			
			}
     
}