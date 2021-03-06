/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// VERSION 3.0.0

this.PPs = {
	command: function(e, button) {
		if(e.button != 0) { return; }
		bars.toggle(button._bar.id);
		dispatch(button, { type: 'ToggledPuzzleBarThroughButton', cancelable: false });
	},

	handleEvent: function(e) {
		toggleAttribute(e.target._pp, 'active', !e.target.collapsed);
	}
};

Modules.LOADMODULE = function() {
	Listeners.add(window, 'ToggledPuzzleBar', PPs);
	Listeners.add(window, 'LoadedPuzzleBar', PPs);
};

Modules.UNLOADMODULE = function() {
	Listeners.remove(window, 'ToggledPuzzleBar', PPs);
	Listeners.remove(window, 'LoadedPuzzleBar', PPs);
};
