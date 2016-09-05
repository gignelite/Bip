/* ### Gestion sommaire fenetre ### */

var div_croix = document.createElement('div');
div_croix.setAttribute('class', 'croix-supp');

var i_croix = document.createElement('i');
i_croix.setAttribute('class', 'fa fa-times');

div_croix.appendChild(i_croix);
$('input.supp-possible').after(div_croix);

// $('input.can-delete');





$('#nav-bouton').on('click', toggle_options);

function toggle_options() {
	var etat = $('#nav-bouton').data('menu');
	if(etat == "fermer") {
		$('#nav-bouton').children('i').removeClass('fa-bars').addClass('fa-times');
		$('#nav-bouton').data('menu', 'ouvert');
		$('#nav #back-options').removeClass('fermer').addClass('ouvert');
		$('#nav-bouton').data('menu', 'ouvert');
		$(document).on('click', click_document_options);
		$('#back-options').on('mousedown', bouger_volet_options);
		return false; // Nécessaire pour empêcher la fin de propagation de l'event click actuel et de déclencher le listner au-dessus
	} else {
		$('#nav-bouton').children('i').removeClass('fa-times').addClass('fa-bars');
		$('#nav-bouton').data('menu', 'fermer');
		$('#nav #back-options').removeClass('ouvert').addClass('fermer');
		$('#nav-bouton').data('menu', 'fermer');
		$(document).off('click', click_document_options);
		$('#back-options').off('mousedown', bouger_volet_options);
		return false;
	}
}

function click_document_options(e) {
	// console.log(e);
	if(!e.target.closest('#back-options')) {
		toggle_options();
	}
}

/* ### Fin gestion sommaire fenetre ### */