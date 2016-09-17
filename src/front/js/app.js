/*global console:false, jQuery:false, angular: false */
(function($) {
	'use strict';

	$(function() {
		var popup      		= new Popups();
	});

	/* Popup functionality ---------*/
	function Popups() {
		this.openPopup       		= $('[data-popup-open]');
		this.closePopup      		= $('[data-popup-close]');
		this.overlay         		= $('[data-overlay="popup"]');
		this.overlayVisibleCLass 	= 'visible';
		this.popupActiveClass    	= 'active';
		this.events();
	}

	Popups.prototype.events = function() {
		var _this = this;

		//you can exclude Browser and replace 'click with 'click' or 'tochstart'  ---*/
		$(document).on( 'click', this.openPopup.selector, function(e) {
			e.preventDefault();
			var elToOpen = $(this).attr('data-popup-open');

			_this.overlay.addClass( _this.overlayVisibleCLass );
			$('[data-popup="'+elToOpen+'"]').addClass(_this.popupActiveClass);
		});

		$(document).on( 'click', this.closePopup.selector, function(e) {
			var elToClose = $(this).attr('data-popup-close');

			$('[data-popup="'+elToClose+'"]').removeClass('active');
			_this.overlay.removeClass( _this.overlayVisibleCLass );
			//$('[data-popup="'+elToClose+'"]').find('input, textarea').val('');

		});

		$(document).on( 'click', this.overlay.selector, function() {
			$('[data-popup]').removeClass('active');
			_this.overlay.removeClass( _this.overlayVisibleCLass );
		});
	};


})(jQuery);
