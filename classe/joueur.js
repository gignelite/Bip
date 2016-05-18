var Joueur = (function() {
	
	var instance = null;
	
	var construct = function() {
		
		var infos = {
			joueurEnLigne: null,
			mail: null,
			statut: null,
			pompiers: null
		};
		
		var afficher = false;
		var newInfos = false;
		
		var idPompierActif = null;
		
		this.test = function() {
			$.each(this, function(index, value) {
				console.log("Index : "+index+" - Value : "+ value);
			});
		};
		
		this.init = function() {
			// On lance la fonction de récupération des données, et le premier affichage est commandé à partir de la requete ajax
			this.recup_infos();
			//this.afficher_infos();
		};
		
		this.recup_infos = function() {
			var self = this;
			
			var data = {
				REQ: 'joueurInfos',
				PSEUDO: parametres.pseudo,
				PASS: parametres.pass
			};
			
			$.ajax({
				//url: parametres.hote + parametres.scriptBip,
				url: parametres.scriptBip,
				method: "POST",
				dataType: "json",
				// async: false,
				data: data,
				success: function(data, statut) {
					var result = data;
										
					// On vérifie juste que les logins sont les mêmes que ceux rentrés dans les input sur la page index
					if (parametres.mail != null && parametres.mail == result.mail && result.infosValide) {
						infos.joueurEnLigne = result.joueurEnLigne;
						infos.mail = result.mail;
						infos.credits = result.credits;
						infos.statut = result.statut;
						
						// On créé un objet map pour stocker l'ensemble des sapeurs du joueur
						var myMap = new Map();
											
						$.each(result.pompiers, function(key, jsonPompier) {
							var pompier = new Sapeur();
							pompier.init_from_json(key, jsonPompier);
							myMap.set(key, pompier);
							parametres.nbSapeur++;
						});
						
						infos.pompiers = myMap;
						
						//console.log(myMap);
						//console.log(self);
						
						//console.log(afficher);
						if(afficher)
							self.maj_infos();
						else {
							self.afficher_infos();
							afficher = true;
							//console.log(afficher);
						}
						
					} else {
						console.log(parametres.mail != null);
						console.log(parametres.mail == result.mail);
						console.log(result.infosValide);
					}
				},
				error: function(xhr, statut, error) {
					console.log(xhr.responseText+"\n"+statut+"\n"+error);
				}
			});
		};
		
		this.afficher_infos = function() {
			var self = this;
			
			if(this.afficher) {
				this.maj_infos();
				return false;
			}
			
			$('#infos-sapeur *').remove();
			
			var user = "user";
			if(infos.statut == "premium") {
				var user = "user-plus"
			}
			
			// On affiche les informations générales relatives au joueur
			$('#list-mail').html("<i class='fa-li fa fa-envelope-o' ></i> " + infos.mail);
			$('#list-statut').html("<i class='fa-li fa fa-" + user + "' ></i> " + infos.statut);
			$('#list-credits').html("<i class='fa-li fa fa-money' ></i> " + infos.credits + " crédits");
			$('#list-online').html("<i class='fa-li fa fa-users' ></i> " + infos.joueurEnLigne + " joueurs en ligne");
			
			//console.log(self.pompiers);
			
			// On créé les informations relatives à chaque sapeur
			infos.pompiers.forEach( function(sapeur, key) {
				
				var sapeur = sapeur;
				
				var divSapeur = document.createElement("div");
				divSapeur.setAttribute("class", "un-sapeur");
				divSapeur.setAttribute("data-id", key);
				
					var enteteSapeur = document.createElement("div");
					enteteSapeur.setAttribute("class", "entete-liste-infos-sapeur");
					
						var nomSapeur = document.createTextNode(sapeur.infos.pseudo);
						enteteSapeur.appendChild(nomSapeur);
									
					var listeInfosSapeur = document.createElement("div");
					listeInfosSapeur.setAttribute("class", "liste-infos-sapeur");
					
					divSapeur.appendChild(enteteSapeur);
					divSapeur.appendChild(listeInfosSapeur);
				
				$('#infos-sapeur').append(divSapeur);
								
				sapeur.afficher_infos();
				
				// console.log(pompier);
				
				$('#infos-sapeur').on('click', ".un-sapeur[data-id='"+key+"'] .entete-liste-infos-sapeur" , function() {
					
					var data = {
						REQ: 'listePersonnage',
						idJoueur: key,
					};
					
					$.ajax({
						url: parametres.scriptBip,
						method: "POST",
						dataType: "json",
						data: data,
						success: function(data, statut) {
							var result = data;
							
							console.log(result);
							
							sapeur.init_from_json(key, result);
							console.log(sapeur);
							sapeur.afficher_infos();
						},
						error: function(xhr, statut, error) {
							console.log(xhr.responseText+"\n"+statut+"\n"+error);
						}
					});
					
					var newIdSapeur = $(this).parents(".un-sapeur").data("id");
					
					if(typeof idPompierActif != typeof null) {
						console.log(idPompierActif);
						infos.pompiers.get(idPompierActif).ctrl_event.stopper_moteur_event();
					}
					
					if(newIdSapeur != idPompierActif) {
						
						$('.un-sapeur[data-id="'+idPompierActif+'"] .liste-infos-sapeur').hide(500, function() {
							$(this).parent().children('.entete-liste-infos-sapeur').css('border-bottom', 'none');
							$('.un-sapeur:last-child .entete-liste-infos-sapeur').css('border-bottom', '1px solid');
						});
						
						$(this).css('border-bottom', '1px solid')
						$(this).next().show(500);
					}
					
					sapeur.ctrl_event.demarrer_moteur_event();
					idPompierActif = key;
				});
			});
			
			this.afficher = true;
		};
		
		this.maj_infos = function() {
			
			var user = "user";
			if(infos.statut == "premium") {
				var user = "user-plus"
			}
			
			// On affiche les informations générales relatives au joueur
			$('#list-mail').html("<i class='fa-li fa fa-envelope-o' ></i> " + infos.mail);
			$('#list-statut').html("<i class='fa-li fa fa-" + user + "' ></i> " + infos.statut);
			$('#list-credits').html("<i class='fa-li fa fa-money' ></i> " + infos.credits + " crédits");
			$('#list-online').html("<i class='fa-li fa fa-users' ></i> " + infos.joueurEnLigne + " joueurs en ligne");
			
		};

	}
	
	return new function() {
		this.getInstance = function() {
			if (instance == null) {
				instance = new construct();
				instance.construct = null;
			}
			
			return instance;
		}
	}
	
}) ();