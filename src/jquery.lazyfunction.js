/* LazyFunction for jQuery
 * github.com/adevendorf/lazyfunction
 * Andy Devendorf @andydevendorf
 * Licensed under the MIT license.
 * 
 * Envokes a function when an element scrolls or appears on screen
 * ex: $("#box").lazyfunction(myFunction);
 */
(function($) {

	var $window = $(window);

	$.fn.lazyfunction = function(callbackFunc, opts) {

		var root = this;
		var called = false;
		var callback = callbackFunc;
		var screenPos = null;
		var windowHeight = $window.height();
		var scrollPos = $window.scrollTop();
		var timer = null;
		var settings = {
			scrollBuffer: 200
		}
		
		$.extend(settings, opts);

		this.checkToCall = function() {

			if (called) return;

			if (!root.is(":visible")) {

				timer = setTimeout(function() {  
					var _this = root;
					_this.checkToCall();
				}, 100);

				return;

			}

			screenPos = root.offset().top;
			
			if (scrollPos + windowHeight > screenPos - settings.scrollBuffer) {
				called = true;
				callback.call();
			}

		};

		$window.bind("resize", function() {

			windowHeight = $window.height();

			root.checkToCall();

		});

		$window.bind("deviceorientation", function() {

			windowHeight = $window.height();
			scrollPos = $window.scrollTop()

			root.checkToCall();

		});

		$window.bind("scroll", function() {

			scrollPos = $window.scrollTop();

			root.checkToCall();

		});

		root.checkToCall();

	}

})(jQuery);
