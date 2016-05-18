function Evenement() {
	
	var self = this;
	
	this.ctrl_event = null;
	
	this.id = null;
	this.idJoueur = null;
	this.date = null;
	this.type = null;
	this.message = null;
	
	
	this.init_from_json = function(ctrl_event, event) {
		try {
			this.ctrl_event = ctrl_event;
			this.id = event.id;
			this.idJoueur = event.idJoueur;
			this.date = new Date(event.date*1000);
			this.type = event.type;
			this.message = event.message;
		} catch (e) {
			console.error(e);
		}
		// console.log(event.date)
		// console.log(this.date.toLocaleString());
	};
	
	this.afficher_event = function(index) {
		
		//console.log(index);
		/* ################ Première partie ################ */
		var li = document.createElement("li");
		var spanDate = document.createElement("span");
		spanDate.setAttribute("class", "date");
		spanDate.setAttribute("title", this.date.toLocaleString());
		
		var i_font_date = document.createElement("i");
		i_font_date.setAttribute("class", "fa fa-clock-o");
		
		spanDate.appendChild(i_font_date);
		
		
		/* ################ Deuxième partie ################ */
		var spanText = document.createElement("span");
		spanText.setAttribute("class", "contenu");
		
		var text = document.createTextNode(this.message);
		spanText.appendChild(text);
		
		
		/* ################ Troisème partie ################ */
		var spanCross = document.createElement("span");
		spanCross.setAttribute("class", "suppr");
		
		var i_font_cross = document.createElement("i")
		i_font_cross.setAttribute("class", "fa fa-times");
		spanCross.appendChild(i_font_cross);
		
		li.setAttribute("id", "message-" + this.id);
		
		//li.appendChild(text);
		li.appendChild(spanDate);
		li.appendChild(spanText);
		// li.appendChild(spanCross);
	
		/*switch (this.type) {
			case "message" :
				var selecteurParent = parametres.selecteurListeMessages;
				break;
			case "intervention" :
				var selecteurParent = parametres.selecteurListeInterventions;
				break;
			case "divers" :
				var selecteurParent = parametres.selecteurListeDivers;
				break;
			default :
				alert("le type du message n'est pas reconnue");
				break;
 		}*/
 		
 		var selecteurParent = parametres.selecteurListe;
 		
 		var divParent = document.querySelector(selecteurParent);
 		
 		if(typeof index == typeof undefined || index == null) {
 			divParent.appendChild(li);
 		} else if(index == 0) {
 			var messagePrecedent = document.querySelector(selecteurParent + " li:first-child");
 			divParent.insertBefore(li, messagePrecedent);
 		} else {
 			var messagePrecedent = document.querySelector(selecteurParent + " #message-" + index);
 			divParent.insertBefore(li, messagePrecedent.nextSibling);
 		}
 		
 		$(selecteurParent + ' li').removeClass("nouveau");
 		
 		$(selecteurParent + ' #message-' + this.id).addClass("nouveau");
 		// Ne devrait pas fonctionner ainsi, notamment avec position()
 		$('#cadre-event').scrollTop( $(selecteurParent + ' #message-' + this.id).position().top - $(selecteurParent).offset().top );
 		
 		$(selecteurParent + ' #message-' + this.id + ' .suppr').on('click', {id: this.id}, self.supprimer_event);
		
	};
	
	this.supprimer_event = function(event) {
		console.log(parametres.selecteurListe + ' #message-' + event.data.id + ' .suppr');
		$(parametres.selecteurListe + ' #message-' + event.data.id + ' .suppr').parent('li').addClass("delete");
		// $(parametres.selecteurListe + ' #message-' + this.id + ' .suppr').off(self.supprimer_event);
		setTimeout();
		
	};
	
	this.supprimer_def_event = function(event) {
		$(parametres.selecteurListe + ' #message-' + event.data.id + ' .suppr').parent('li').remove();
	};
	
};