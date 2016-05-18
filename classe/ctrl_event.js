/*var Ctrl_event =(function() {
	
	var instance = null;
	
	var construct = function() {
		
	}

	return new function() {
		this.getInstance = function() {
			if (instance == null) {
				instance = new construct();
				instance.construct = null;
			}
			
			return instance;
		}
	};
	
}) ();*/

/* Grande question de savoir si on reste sur un affichage inclut dans la fonction de récupération de l'event, ou en dissocier l'affichage
 * -> Conflit avec l'aspect asynchrone de la requête ajax
*/

function CTRL_event() {
	
	var arrayEvent = new Array();
	var arrayDateEvent = new Array();
	
	/*var messages = new Array();
	var dateMesages = new Array();
	
	var interventions = new Array();
	var dateInterventions = new Array();
	
	var divers = new Array();
	var dateDivers = new Array();*/
	
	// var event = null;
	//var eventAfficher = true;
	var idPrecedentEvent = null;
	
	var moteur = null;
	var delai = 2000;
	
	this.demarrer_moteur_event = function() {
		this.effacer_affichage();
		this.init_affichage();
		// Si cette fonction est appelée plusieurs fois de manière consécutives, on ne gardera qu'un moteur en route
		try {
			clearTimeout(moteur);
		} catch(e) {
			console.error(e)
			console.log("Aucun moteur en fonctionnement");
		}
		moteur = setTimeout(this.boucler_moteur_event, delai, this);
	};
	
	this.boucler_moteur_event = function(parent) {
		// On utilise parent car cette fonction sera principalement appelée via setTiemout
		// est la valeur de this s'en retrouve changée
		parent.recup_event();
		moteur = setTimeout(parent.boucler_moteur_event, delai, parent);
	};
		
	this.stopper_moteur_event = function() {
		clearTimeout(moteur);
		console.log(arrayEvent);
		console.log(arrayDateEvent);
		/*console.log(messages);
		console.log(dateMesages);
		console.log(interventions);
		console.log(dateInterventions);
		console.log(divers);
		console.log(dateDivers);*/
	};
	
	this.recup_event = function() {
		var self = this;
		
		$.ajax({
			//url: parametres.hote + parametres.scriptBip,
			url: parametres.scriptBip,
			method: "POST",
			async: false,
			data: "REQ=query&PSEUDO="+parametres.pseudo+"&PASS="+parametres.pass,
			success: function(data, statut) {
				var result = $.parseJSON(data);
				
				delai = result.delai;
				
				if(result.vide == true) {
					return;
				}
				
				//if (parametres.mail != null && parametres.mail == result.mail) {
					
					event = new Evenement();
					event.init_from_json(self, result);
					
					if(!result.vide) {
						// Je pars du principe qu'on ne reçoit qu'un seul event par appel
						/*switch (result.type) {
							case "message" :
								var arrayEvent = messages;
								var arrayDateEvent = dateMesages;
								break;
							case "intervention" :
								var arrayEvent = interventions;
								var arrayDateEvent = dateInterventions;
								break;
							case "divers" :
								var arrayEvent = divers;
								var arrayDateEvent = dateDivers;
								break;
						}*/
						
						// console.log(event);
						
						if(arrayEvent.length != arrayDateEvent.length) 
							console.log("Houston, on a un problème de sycnhro entre les tableaux !!");
						
						if(arrayEvent.length == 0) {
							arrayEvent.push(event);
							arrayDateEvent.push(event.date);
							event.afficher_event(null);

						} else {
							
							var cpt = arrayEvent.length;
							var trouve = false;
							
							/*console.log(cpt);
							
							console.log(arrayEvent);
							console.log(arrayDateEvent);*/
							
							while(!trouve) {
								if(cpt == 0) {
									event.afficher_event(0);
									arrayEvent.splice(cpt, 0, event);
									arrayDateEvent.splice(cpt, 0, event.date);
									trouve = true;
								} else if (event.date.getTime() > arrayDateEvent[cpt-1].getTime()) {
									event.afficher_event(arrayEvent[cpt-1].id);
									arrayEvent.splice(cpt, 0, event);
									arrayDateEvent.splice(cpt, 0, event.date);
									trouve = true;
								}
								
								/*if(trouve) {
									
								}*/
								
								cpt--;
							}
							
						}
					}
					
					//console.log(event);
										
				//}
			},
			error: function(xhr, statut, error) {
				console.log(xhr.responseText+"\n"+statut+"\n"+error);
			}
		})
	};
	
	this.init_affichage = function() {
				
		if(arrayEvent.length != 0) {
			arrayEvent.forEach( function(event, key) {
				event.afficher_event(null);
			}) 
		}
		
		/*if(messages.length != 0) {
			messages.forEach( function(message, key) {
				message.afficher_event(null);
			});
		}
		
		if(interventions.length != 0) {
			interventions.forEach( function(message, key) {
				message.afficher_event(null);
			});
		}
		
		if(divers.length != 0) {
			divers.forEach( function(message, key) {
				message.afficher_event(null);
			});
		}*/
	};
	
	this.effacer_affichage = function() {
		$(parametres.selecteurListe + " li").remove();
		
		/*$(parametres.selecteurListeMessages + " li").remove();
		$(parametres.selecteurListeInterventions + " li").remove();
		$(parametres.selecteurListeDivers + " li").remove();*/
	};
	
	this.clear_event = function() {
		
	};
	
 	this.get_array_event = function() {
 		return arrayEvent;
 	};
 	
 	this.get_array_date_event = function() {
 		return arrayDateEvent;
 	};
	
	
};