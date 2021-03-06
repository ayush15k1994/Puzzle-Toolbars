/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// VERSION 1.0.9

this.__defineGetter__('gBrowser', function() { return window.gBrowser; });

this.possibleBars = [
	objName+'-bottom-bar',
	objName+'-corner-bar',
	objName+'-lateral-bar',
	objName+'-top-bar',
	objName+'-urlbar-bar'
];

this.openOptions = function() {
	PrefPanes.open(window);
};

this.toggleBottom = function() {
	Modules.loadIf('bottom', Prefs.bottom_bar);
};

this.toggleCorner = function() {
	Modules.loadIf('corner', Prefs.corner_bar);
};

this.toggleUrlbar = function() {
	Modules.loadIf('urlbar', Prefs.urlbar_bar);
};

this.toggleLateral = function() {
	Modules.loadIf('lateral', Prefs.lateral_bar);
};

this.toggleTop = function() {
	Modules.loadIf('top', Prefs.top_bar);
};

Modules.LOADMODULE = function() {
	// this is to migrate to the new Keysets object, it can probably be removed once most users have updated to the latest version
	if(!Prefs.migratedKeysets) {
		Prefs.migratedKeysets = true;
		Prefs.bottom_keycode = Keysets.translateFromConstantCode(Prefs.bottom_keycode);
		Prefs.corner_keycode = Keysets.translateFromConstantCode(Prefs.corner_keycode);
		Prefs.urlbar_keycode = Keysets.translateFromConstantCode(Prefs.urlbar_keycode);
		Prefs.lateral_keycode = Keysets.translateFromConstantCode(Prefs.lateral_keycode);
		Prefs.top_keycode = Keysets.translateFromConstantCode(Prefs.top_keycode);
	}

	Modules.load('compatibilityFix/windowFixes');
	Modules.load('initAddonBar');
	Modules.load('placePP');
	Modules.load('autoHide');

	Prefs.listen('bottom_bar', toggleBottom);
	Prefs.listen('corner_bar', toggleCorner);
	Prefs.listen('urlbar_bar', toggleUrlbar);
	Prefs.listen('lateral_bar', toggleLateral);
	Prefs.listen('top_bar', toggleTop);

	toggleBottom();
	toggleCorner();
	toggleLateral();
	toggleTop();
	toggleUrlbar();
};

Modules.UNLOADMODULE = function() {
	Prefs.unlisten('bottom_bar', toggleBottom);
	Prefs.unlisten('corner_bar', toggleCorner);
	Prefs.unlisten('urlbar_bar', toggleUrlbar);
	Prefs.unlisten('lateral_bar', toggleLateral);
	Prefs.unlisten('top_bar', toggleTop);

	Modules.unload('urlbar');
	Modules.unload('top');
	Modules.unload('lateral');
	Modules.unload('corner');
	Modules.unload('bottom');
	Modules.unload('autoHide');
	Modules.unload('placePP');
	Modules.unload('initAddonBar');
	Modules.unload('compatibilityFix/windowFixes');
};
