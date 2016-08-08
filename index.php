<html>
	<head>
		<meta charset="UTF-8">
		<title> Regra de 3 fácil</title>

		<link rel="stylesheet" href="css/regra_tres.css" type="text/css">
		<link rel="stylesheet" href="css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="css/bootstrap-switch.min.css" type="text/css">
		
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.10.3.min.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/bootstrap-switch.min.js"></script>	
		<script type="text/javascript" src="js/plugins.js"></script>
		<script type="text/javascript" src="js/jquery.maskMoney.js"></script>


	</head>
	<body>

		<div class="container">
      		<div class="header clearfix">
      			<nav>
		          <ul class="nav nav-pills pull-right">
		            <li role="presentation" class="active"><a href="#">Home</a></li>
		            <li role="presentation"><a href="#">About</a></li>
		            <li role="presentation"><a href="#">Contact</a></li>
		          </ul>
		        </nav>
		        <h3 class="text-muted">Regra de 3 fácil</h3>
      		</div>

      		<div class="jumbotron">
		        <h1>Projeto regra de três</h1>
		        <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
		        <p></p>
		    </div>

		    
			<div class="row">
		        <div class="col-lg-12">
		          
		        	<form id="formRegraTres" method="post" action="#" class="form-inline">


		        		<div class="row">

		        			<div class="col-md-4">
			        			<label >Unidade primaria
	 							
	 								<select id="medidaPrimaria" name="medidaPrimaria" class="form-control ">
	 									<option value="" >Selecione...</option>
	 									<option value="1">Metros</option>
	 									<option value="2">Quilos</option>
	 									<option value="3">Litros</option>
	 								</select>

		 						<label>
		 					</div>

		 					<div class="col-md-4">

		 						<label >Unidade secundaria
	 							
	 								<select id="medidaSecundaria" name="medidaSecundaria" class="form-control">
	 									<option value="" >Selecione...</option>
	 									<option value="1">Metros</option>
	 									<option value="2">Quilos</option>
	 									<option value="3">Litros</option>
	 								</select>

		 						<label>

		 					</div>

		 					<div class="col-md-4">

		 						<label > Dobro / Metade

		 						</labeL>

		 					</div>
		        		</div>

		        		<div class="row">

		        			<div class="col-md-4">
			        			<label >Número A 
	 							
	 								<input id="numeroA" type="text" name="numeroA" class="form-control ">

		 						<label>
		 					</div>

		 					<div class="col-md-4">

		 						<label> Número B

		 							<input id="numeroB" type="text" name="numeroB" class="form-control ">

	 							</label>

		 					</div>

	 						<div class="col-md-4">

	 							<label > 
	 							
	 								<input type="checkbox" id="grandeza" name="grandeza" style="height:32px;" checked>

		 						<label>

	 						</div>					

		        		</div>

		        		<div class="row">


		        			<div class="col-md-4">
			        			<label >Número C
	 							
	 								<input id="numeroC" type="text" name="numeroC" class="form-control">

		 						<label>
		 					</div>

		 					<div class="col-md-4">

		 						<label> Número D

		 							<input id="numeroD" type="text" name="numeroD" class="form-control" disabled>

	 							</label>

		 					</div>

	 						<div class="col-md-4">

	 							<label >
	 								
	 								<button id="btnGerarResultados" class="btn btn-primary" type="submit">Calcular</button>

		 						<label>

	 						</div>	


		        		</div>
		        		

		        	</form>

		        </div>

		    </div>

      <footer class="footer">
        <p>&copy; Regra de três - 2016</p>
      </footer>




      	</div>
	</body>
</html>

<script type="text/javascript"> 
 
	$(function(){

		var options = {
		    onText: "Diminui",
		    onColor: 'primary',
		    offColor: 'danger',
		    offText: "Aumentar",
		    animate: true,
		};

		$("#grandeza").bootstrapSwitch(options);

		$('#numeroA').mask('?9999999999999999');
		$('#numeroB').mask('?9999999999999999');
		$('#numeroC').mask('?9999999999999999');

		$("#grandeza").on('change',function(){

			console.log("Ok amiguinho!")

		});


		$('#medidaPrimaria').on('change',function(){
			
			var medpri 	= $('#medidaPrimaria').val();

			switch(medpri){
				case '1' :
					$('#numeroA').mask('?999999999999999');
					$('#numeroC').mask('?999999999999999');
				break;
				case '2' :
					$('#numeroA').mask('?99999999999,999');
					$('#numeroC').mask('?99999999999,999');
				break;
				case '3' :
					$('#numeroA').mask('?99999999999,999');
					$('#numeroC').mask('?99999999999,999');
				break;
				case '4':
					$("#numeroA").maskMoney({decimal:",", thousands:""});
					$("#numeroC").maskMoney({decimal:",", thousands:""});
				break;

			}

		});

		$('#medidaSecundaria').on('change',function(){

			var medsec 	= $('#medidaSecundaria').val();

			switch(medpri){
				case '1' :
					$('#numeroB').mask('?999999999999999');		
				break;
				case '2' :
					$('#numeroB').mask('?99999999999,999');
					
				break;
				case '3' :
					$('#numeroB').mask('?99999999999,999');
					
				break;
				case '4':
					$("#numeroB").maskMoney({decimal:",", thousands:""});
				break;
			}


		});

		$('#btnGerarResultados').click(function(e){

 			e.preventDefault();

			// VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
			$('#formRegraTres').validate({
		        rules:{
					numeroA:{
						required: true
					},
					numeroB:{
						required: true
					},
					numeroC:{
						required: true
					},
					medidaPrimaria:{
						required: true
					},
					medidaSecundaria:{
						required: true
					}
		        },
		        messages:{
		        	numeroA:{
		        		required: "Campo obrigatório."
		        	},
		        	numeroB:{
		        		required: "Campo obrigatório."	
		        	},
		        	numeroC:{
		        		required: "Campo obrigatório."
		        	},
		        	medidaPrimaria:{
						required: "Campo obrigatório."
					},
					medidaSecundaria:{
						required: "Campo obrigatório."
					}
		        }
		    });

		    if($("#formRegraTres").valid()){

		    	console.log("Validado!");

		    	//Regra primaria A * D / C * D 

		    	var numA = $('#numeroA').val();
		    	var numB = $('#numeroB').val();
		    	var numC = $('#numeroC').val();
		    	var numD = 0;

		    	numD = (numB * numC)/numA;

		    	$('#numeroD').val(numD);

		  //   	 $('#listaModulosEscolhidos option').each(function(){
				// 	$(this).attr('selected', 'selected');
				// });

		  //   	$("#editarUsuario").submit();

			}

 		});

	});

</script>