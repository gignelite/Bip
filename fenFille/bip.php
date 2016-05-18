<!DOCTYPE HTML>
<html>
	<head>
		<script src="javascript/jquery-1.10.2.js"> </script>
		<link href="bip.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div id="logo"></div>
		<div id="borderMenu">
			<div id="menu">
				<img src="images/separatorLeft.png"></img><div>Options</div><img src="images/separatorRight.png"></img>
				<img src="images/separatorLeft.png"></img><div>Wiki</div><img src="images/separatorRight.png"></img>
			</div>
		</div>
		<div id="corps"></div>
		<input type="button" id="close" value="fermer" />

		<div id="btj_jaune"></div>


		<script>
			var parent = window.opener ;
			//parent.location.href = "http://localhost/bip/intervention.php" ;

			$('#close').on('click', function () {
				window.close() ;
			}) ;

			//resize() ;

			function parentRedirectionTo (target, url) {
				target.location.href = url ;
	 		}

			function resize() {
				window.resizeTo(520, 520) ;
				setTimeout("resize()", 5) ;
			}
		</script>

	</body>

</html>