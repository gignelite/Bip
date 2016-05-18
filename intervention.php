<?php 

	// Cette fonction retourne les infos relatives à un joueur
	if(isset($_POST['REQ']) && $_POST['REQ'] == "joueurInfos") {
		
		$pompier1 = array(
			"pseudo" => "gignelite",
			"pass" => "QSEz9I",
			"etat" => 0,
			"etatTexte" => "Au repos",
			"grade" => 11,
			"gradeTexte" => "Commandant",
			"credits" => 10000,
			"pa" => 5
			);
		
		$pompier2 = array(
			"pseudo" => "gg",
			"pass" => "test",
			"etat" => 1,
			"etatTexte" => "Astreinte",
			"grade" => 0,
			"gradeTexte" => "2è Classe",
			"credits" => 100,
			"pa" => 2
			);
		
		$tabJoueur = array(
			"infosValide" => true,
			"joueurEnLigne" => 50,
			"mail" => "unmailbeaucouppluslong@test.fr",
			"statut" => "Membre standard",
			"credits" => 0,
			"pompiers" => array(
				"pompier1" => $pompier1,
				"pompier2" => $pompier2
				)
			);
		
		echo json_encode($tabJoueur);
		
		/*$tabSapeur = array (
		                    "pseudo" => "gignelite",
		                    "pass" => "QSEz9I",
		                    "etat" => 0,
		                    "etatTexte" => "Au repos",
		                    "grade" => 11,
		                    "gradeTexte" => "Commandant",
		                    "credits" => 10000,
		                    "idIntervention" => -1,
		                    "playersOnline" => 50 
		                    );
		echo json_encode($tabSapeur);*/
	}

	// Cette fonction sert à se mettre d'astreinte
	if(isset($_POST['REQ']) && $_POST['REQ'] == "astreinte") {
		$etat = array(
		              "etat" => 1,
		              "etatTexte" => "AR");
		echo json_encode($etat);
	}

	// Cette fonction génère un event aléatoire entre les 3 catégories différentes
	if(isset($_POST['REQ']) && $_POST['REQ'] == "query") {
		
		
		$date = mktime(rand(1,24));
		$id = rand(1,10000);
		
		switch (rand(1, 3)) {
			case 1 :
				$tabMessage = array(
									"vide" => false,
				                    "pseudo" => $_POST['PSEUDO'],
				                    "id" => $id,
				                    "idJoueur" => 296,
				                    "date" => $date,
				                    "type" => "message",
				                    "message" => "Vous avez un nouveau message",
				                    "delai" => 10000
				                    );
				break;
			case 2 :
				$tabMessage = array(
									"vide" => false,
				                    "pseudo" => $_POST['PSEUDO'],
				                    "id" => $id,
				                    "idJoueur" => 296,
				                    "date" => $date,
				                    "type" => "intervention",
				                    "message" => "CA FPT - Feux de voiture",
				                    "delai" => 10000
				                    );
				break;
			case 3 :
				$tabMessage = array(
									"vide" => false,
				                    "pseudo" => $_POST['PSEUDO'],
				                    "id" => $id,
				                    "idJoueur" => 296,
				                    "date" => $date,
				                    "type" => "divers",
				                    "message" => "TEST",
				                    "delai" => 10000
				                    );
				break;
			case 4 :
				$tabMessage = array(
									"vide" => true,
									"delai" => 10000
									);
				break;
		}
		
		echo json_encode($tabMessage);
		
		
	}
	
	if(isset($_POST['REQ']) && $_POST['REQ'] == "listePersonnage" && $_POST['idJoueur']) {
		if($_POST['idJoueur'] == "pompier1") {
			$pompier = array(
				"pseudo" => "gignelite",
				"pass" => "QSEz9I",
				"etat" => 0,
				"etatTexte" => "Au repos",
				"grade" => 11,
				"gradeTexte" => "Commandant",
				"credits" => 10000,
				"pa" => 5
				);
		}
		
		if($_POST['idJoueur'] == "pompier2") {
			$pompier = array(
				"pseudo" => "gg",
				"pass" => "test",
				"etat" => -1,
				"etatTexte" => "MORT",
				"grade" => 0,
				"gradeTexte" => "2è Classe",
				"credits" => -100,
				"pa" => -5
				);
		}
		
		echo json_encode($pompier);
	}
	
	if(isset($_POST['REQ']) && $_POST['REQ'] == "clear") {
		echo "test";
	}
	
?>