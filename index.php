<html>
	<head>
		<meta charset="UTF-8">
		<title> Regra de 3 fácil</title>


		<link rel="stylesheet" href="css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="css/regra_tres.css" type="text/css">
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.10.3.min.js"></script>
		<script type="text/javascript" src="js/plugins.js"></script>
		<script type="text/javascript" src="js/jquery.maskMoney.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		
		
		<script type="text/javascript" src="js/sweetalert.min.js"></script>

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
		          
		        	<form id="formRegraTres" method="post" action="#">


		        		<div class="row">

		        			<div class="col-md-4">
			        			<label >Número A 
	 							
	 								<input id="numeroA" type="text" name="numeroA" >

		 						<label>
		 					</div>

		 					<div class="col-md-4">

		 						<label> Número B

		 							<input id="numeroB" type="text" name="numeroB" >

	 							</label>

		 					</div>

	 						<div class="col-md-4">

	 							<label > 
	 							

		 						<label>

	 						</div>					

		        		</div>

		        		<div class="row">


		        			<div class="col-md-4">
			        			<label >Número C
	 							
	 								<input id="numeroC" type="text" name="numeroC" >

		 						<label>
		 					</div>

		 					<div class="col-md-4">

		 						<label> Número D

		 							<input id="numeroD" type="text" name="numeroD" disabled>

	 							</label>

		 					</div>

	 						<div class="col-md-4">

	 							<label >
	 								
	 								<button id="btnGerarResultados" class="btn btn-default" type="submit">Calcular</button>

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
		$('#numeroA').mask('?99999');
		$('#numeroB').mask('?99999');
		$('#numeroC').mask('?99999');



	});

</script>