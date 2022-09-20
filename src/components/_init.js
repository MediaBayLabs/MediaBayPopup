	Popup.prototype.init = function() {
		let _ = this,
			options = _.options,
			getElements = function($el, elements, toNodeList) {
				if (typeof elements === 'string') {
					$el = toNodeList ? document.querySelectorAll(elements) : document.querySelector(elements);
				} else {
					$el = elements;
				}
				return $el;
			};

		_.$popup = getElements(_.$popup, _.selector);
		_.$openButtons = getElements(_.$openButtons, options.openButtons, true);
		_.$closeButtons = getElements(_.$closeButtons, options.closeButtons, true);
		_.$fakeScrollbar = getElements(_.$fakeScrollbar, options.fakeScrollbar);

		_.$popup.ctx = _;

		// context events
		_.openPopupHandler = {
			handleEvent: _.openPopup,
			ctx: _
		};
		
		_.closePopupHandler = {
			handleEvent: _.closePopup,
			ctx: _
		};

		_.$popup.openPopup = _.openPopup;
		_.$popup.closePopup = _.closePopup;
		_.$popup.refreshPopup = _.refresh;
		_.$popup.destroyPopup = _.destroy;

		_.endEvent = options.transitions ? 'transitionend' : options.animations ? 'animationend' : false;

		_.$popup.classList.add(options.mainPopupClass);

		_.initEvents();

		if (_.$popup.style.display === 'none') {
			_.$popup.style.display = '';
			_.$popup.offsetWidth;
		}	

		_.dispatchEvent(_.$popup, 'popupinit');
		console.log('popupinit');

	};