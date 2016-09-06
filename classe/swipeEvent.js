(function($) {
	
	SwipeEvent = (function() {
		
	})();
	
	$.fn.swipeEvent = function(options) {
		var obj = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			nbObj = obj.length,
			i,
			ret;
			
		for(i=0 ; i<nbObj ; i++) {
			if(typeof opt == 'object' || typeof opt == 'undefined')
				obj[i].swipeEvent = new SwipeEvent(obj[i], opt);
			else
				ret = obj[i].swipeEvent[opt].apply(obj[i].swipeEvent, args);
			if(typeof ret != 'undefined') return ret;
		}
		return obj;
	};
	
})(JQuery);