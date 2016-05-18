function Sapeur() {
	
	var self = this;
	
	this.infos = {
		id: null,
		pseudo: null,
		pass: null,
		etat: null,
		etatTexte: null,
		grade: null,
		gradeTexte: null,
		credits: null,
		pa: null
	};
	
	this.ctrl_event = new CTRL_event();
	
	// this.idIntervention = null;
	// this.playersOnline = null;
	
	// Créé un objet sapeur à partir d'un objet json si il est valide
	this.init_from_json = function(key, pompier) {
		try {
			self.infos.id = key;
			self.infos.pseudo = pompier.pseudo;
			self.infos.pass = pompier.pass;
			self.infos.etat = pompier.etat;
			self.infos.etatTexte = pompier.etatTexte;
			self.infos.grade = pompier.grade;
			self.infos.gradeTexte = pompier.gradeTexte;
			self.infos.credits = pompier.credits;
			self.infos.pa = pompier.pa;
		} catch (e) {
			console.error(e);
		}
	};
	
	
	/*this.init = function() {
		this.recup_infos(true);
	};
	
	this.recup_infos = function(affichage) {
		var self = this;
		
		$.ajax({
			//url: parametres.hote + parametres.scriptBip,
			url: parametres.scriptBip,
			method: "POST",
			data: "REQ=pompierInfos&PSEUDO="+parametres.pseudo+"&PASS="+parametres.pass,
			success: function(data, statut) {
				var result = $.parseJSON(data);
				if (parametres.pseudo != null && parametres.pseudo == result.pseudo) {
					self.pseudo = result.pseudo;
					self.pass = result.pass;
					self.etat = result.etat;
					self.etatTexte = result.etatTexte;
					self.grade = result.grade;
					self.gradeTexte = result.gradeTexte;
					self.credits = result.credits;
					self.pa = result.pa;
					// self.idIntervention = result.idIntervention;
					// self.playersOnline = result.playersOnline;

				}
				
				if (affichage==true) {
					self.afficherInfos();
				}

			},
			error: function(xhr, statut, error) {
				console.log(xhr.responseText+"\n"+statut+"\n"+error);
			}
		});
	};*/
	
	this.afficher_infos = function() {
		
		//console.log(self);
		
		$('#infos-sapeur .un-sapeur[data-id="'+self.infos.id+'"] .liste-infos-sapeur *').remove();
		
		var ulPompier 		= document.createElement("ul");
		// ulPompier.setAttribute("data-id", self.infos.id);
		
			var pseudoPompier 		= document.createElement("li");
			pseudoPompier.setAttribute("class", "sapeur-pseudo");
			var pseudo				= document.createTextNode(self.infos.pseudo);
			pseudoPompier.appendChild(pseudo);
			
			var etatTextePompier 	= document.createElement("li");
			etatTextePompier.setAttribute("class", "sapeur-etatTexte");
			var etatTexte 			= document.createTextNode("Etat : " + self.infos.etatTexte);
			etatTextePompier.appendChild(etatTexte);
			
			var gradeTextePompier 	= document.createElement("li");
			gradeTextePompier.setAttribute("class", "sapeur-gradeTexte");
			var gradeTexte 			= document.createTextNode(self.infos.gradeTexte);
			gradeTextePompier.appendChild(gradeTexte);
			
			var creditsPompier 		= document.createElement("li");
			creditsPompier.setAttribute("class", "sapeur-credits");
			var credits 			= document.createTextNode(self.infos.credits + " crédits");
			creditsPompier.appendChild(credits);
			
			var paPompier 			= document.createElement("li");
			paPompier.setAttribute("class", "sapeur-pa");
			var pa 					= document.createTextNode(self.infos.pa + " PA restants");
			paPompier.appendChild(pa);
		
		ulPompier.appendChild(pseudoPompier);
		ulPompier.appendChild(etatTextePompier);
		ulPompier.appendChild(gradeTextePompier);
		ulPompier.appendChild(creditsPompier);
		ulPompier.appendChild(paPompier);
		
		$('#infos-sapeur .un-sapeur[data-id="'+self.infos.id+'"] .liste-infos-sapeur').append(ulPompier);
	};
	
	/*this.maj_infos = function() {
		try {
			$('div[data-id="'+this.infos.id+'"] .sapeur-pseudo').text("Pseudo : " + this.infos.pseudo);
			$('div[data-id="'+this.infos.id+'"] .sapeur-etatTexte').text("Etat : " + this.infos.etat);
			$('div[data-id="'+this.infos.id+'"] .sapeur-gradeTexte').text(this.infos.grade);
			$('div[data-id="'+this.infos.id+'"] .sapeur-credits').text(this.infos.credits + " crédits");
			$('div[data-id="'+this.infos.id+'"] .sapeur-pa').text(this.infos.pa + " PA restants");
		} catch(e) {
			console.error(e);
		}
	};*/
		
	/*this.putAR = function() {
				
		if (this.etat == 0) {
			$.ajax({
				//url: parametres.hote + parametres.scriptBip,
				url: parametres.scriptBip,
				method: "POST",
				data: "REQ=astreinte&PSEUDO="+parametres.pseudo+"&PASS="+parametres.pass,
				success: function(data, statut) {
					var result = $.parseJSON(data);
					if (result.etat == 1) {
						self.etatTexte = result.etatTexte;
						self.etat = result.etat;
						
						alert("Vous êtes dans l'état " + self.etatTexte);

					}
				},
				error: function(xhr, statut, error) {
					console.log(xhr.responseText+"\n"+statut+"\n"+error);
				}
			});	
		} else {
			alert("Vous n'êtes pas dans l'état au repos");
		}
		
	};*/
	
};