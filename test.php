<?php
	
	$date = mktime(rand(1,24));
	$id = rand(1,100);
	
	switch (rand(1, 3)) {
		case 1 :
			$tabMessage = array(
								"vide" => "false",
			                    //"pseudo" => $_POST['PSEUDO'],
			                    "id" => $id,
			                    "idJoueur" => 296,
			                    "date" => $date,
			                    "type" => "message",
			                    "message" => "Vous avez un nouveau message",
			                    "delai" => 5000
			                    );
			break;
		case 2 :
			$tabMessage = array(
								"vide" => "false",
			                    //"pseudo" => $_POST['PSEUDO'],
			                    "id" => $id,
			                    "idJoueur" => 296,
			                    "date" => $date,
			                    "type" => "intervention",
			                    "message" => "CA FPT - Feux de voiture",
			                    "delai" => 5000
			                    );
			break;
		case 3 :
			$tabMessage = array(
								"vide" => "false",
			                    //"pseudo" => $_POST['PSEUDO'],
			                    "id" => $id,
			                    "idJoueur" => 296,
			                    "date" => $date,
			                    "type" => "divers",
			                    "message" => "TEST",
			                    "delai" => 5000
			                    );
			break;
		case 4 :
			$tabMessage = array(
								"vide" => "true",
								"delai" => 10000
								);
			break;
	}
	
	//echo json_encode($tabMessage);
	
	echo $date;
	echo "<br/>";
	echo date("d/m/Y H:i:s:u", $date);
	
?>