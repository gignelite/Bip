/* ### Gestion sommaire fenetre ### */

// Mise en place des croix de suppression sur les inputs
(function() {
	var div_croix = document.createElement('div');
	div_croix.setAttribute('class', 'croix-supp');

	var i_croix = document.createElement('i');
	i_croix.setAttribute('class', 'fa fa-times');

	div_croix.appendChild(i_croix);
	$('.input input.supp-possible').after(div_croix);
	
	$('div.input').each(function() {
		var fils_input = $(this).children('input.supp-possible');
		
		if(fils_input.legth != 0) {
			var fils_croix = $(this).children('.croix-supp');
			
			var inner_height = fils_input.innerHeight();
			var padding_top = parseInt(fils_input.css('padding-top'));
			var padding_bottom = parseInt(fils_input.css('padding-bottom'));
			
			var font_size = inner_height - padding_top - padding_bottom;
			var right = 5;
			
			fils_croix.css({
				top: padding_top+'px',
				right: right+'px'
			});
			
			fils_croix.children('i.fa').css({
				fontSize: font_size+'px'
			})
			
			fils_croix.on('click', function() {
				fils_input.val('');
			});
		}
	});
})();

// $('input.can-delete');

var left_options = 0;

// Création de l'effet swipe sur le menu qui sera utilisé pour le fermer
$('#nav #back-options').swipe({
	swipeStatus: function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
		if(direction == "left") {
			var left = left_options - distance; // On calcule la position du translate effective pour déplacer le menu
			if(phase == "move") { // Si on est en mouvement on déplace
				$('#nav #back-options').css({
					transform: 'translate('+left+'px,0)',
					transitionDuration: '0s'
				});
			} else if(phase == "end" || phase == "cancel") { // Sinon on retourne sur un état fixe via les classes CSS
				$('#nav #back-options').attr('style', '');
			}
		}
	},
	swipeLeft: function(event, direction, distance, duration, fingerCount) {
		toggle_options();
	},
	triggerOnTouchLeave: true
});
$('#nav #back-options').swipe('disable');


$('#nav-bouton').on('click', toggle_options);

function toggle_options() {
	var etat = $('#nav-bouton').data('menu');
	if(etat == "fermer") {
		$('#nav-bouton').data('menu', 'ouvert').children('i').removeClass('fa-bars').addClass('fa-times');
		$('#nav #back-options').removeClass('fermer').addClass('ouvert').swipe('enable');
		$(document).on('click', click_document_options);
		return false; // Nécessaire pour empêcher la fin de propagation de l'event click actuel et de déclencher le listner au-dessus
	} else {
		$('#nav-bouton').data('menu', 'fermer').children('i').removeClass('fa-times').addClass('fa-bars');
		$('#nav #back-options').removeClass('ouvert').addClass('fermer').swipe('disable');
		$(document).off('click', click_document_options);
		return false;
	}
}

function click_document_options(e) {
	if(!e.target.closest('#back-options')) {
		toggle_options();
	}
}

/* ### Fin gestion sommaire fenetre ### */