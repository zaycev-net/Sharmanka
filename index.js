"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = void 0;

function _instanceof(left, right) {
	if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
		return right[Symbol.hasInstance](left);
	} else {
		return left instanceof right;
	}
}

var Sharmanka = {
	node: null,
	preloadNode: null,
	playPromise: null,
	onPlay: function onPlay(event) {
		try {
			if (_instanceof(event, Function)) this.node.addEventListener('playing', function removingListener() {
				return event(removingListener);
			});
		} catch (e) {
			console.error(e);
		}
	},
	onPause: function onPause(event) {
		try {
			if (_instanceof(event, Function)) this.node.addEventListener('pause', function removingListener() {
				return event(removingListener);
			});
		} catch (e) {
			console.error(e);
		}
	},
	onStart: function onStart(event) {
		try {
			if (_instanceof(event, Function)) this.node.addEventListener('playing', function removingListener() {
				if (this.node.currentTime === 0) event(removingListener);
			});
		} catch (e) {
			console.error(e);
		}
	},
	onEnd: function onEnd(event) {
		try {
			if (_instanceof(event, Function)) this.node.addEventListener('ended', function removingListener() {
				return event(removingListener);
			});
		} catch (e) {
			console.error(e);
		}
	},
	onLoad: function onLoad(event) {
		try {
			if (_instanceof(event, Function)) this.node.addEventListener('loadedmetadata', function removingListener() {
				return event(removingListener);
			});
		} catch (e) {
			console.error(e);
		}
	},
	onTick: function onTick(event) {
		try {
			if (_instanceof(event, Function)) this.node.addEventListener('timeupdate', function removingListener() {
				return event(removingListener);
			});
		} catch (e) {
			console.error(e);
		}
	},
	onBuffer: function onBuffer(event) {
		try {
			if (_instanceof(event, Function)) this.node.addEventListener('progress', function removingListener() {
				return event(removingListener);
			});
		} catch (e) {
			console.error(e);
		}
	},
	onLoadError: function onLoadError(event) {
		if (_instanceof(event, Function)) this.node.addEventListener('error', function removingListener() {
			return event(removingListener);
		});
	},
	onError: function onError(event) {
		if (_instanceof(event, Function)) this.node.addEventListener('abort', function removingListener() {
			return event(removingListener);
		});
	},
	removeEvent: function removeEvent(eventName, event) {
		if (_instanceof(event, Function)) return this.node.removeEventListener(eventName, event);
	},
	isPlay: function isPlay() {
		try {
			return !this.node.paused;
		} catch (e) {
			console.error(e);
		}
	},
	play: function play(event) {
		try {
			if (_instanceof(event, Function)) event();
			this.playPromise = this.node.play();
		} catch (e) {
			console.error(e);
		}
	},
	pause: function pause(event) {
		try {
			if (_instanceof(event, Function)) event();
			this.playPromise.then(_ => this.node.pause());
		} catch (e) {
			console.error(e);
		}
	},
	preload: function preload(event) {
		try {
			if (_instanceof(event, Function) && !!this.preloadAllow) event();
		} catch (e) {
			console.error(e);
		}
	},
	volume: function volume(value) {
		try {
			if (typeof value === 'number' && value >= 0 && value <= 1) return this.node.volume = value;
			if (typeof value !== 'number') console.error('Volume value should be a number');
			if (typeof value === 'number' && value < 0 && value > 1) return console.error('Volume value should be a positive number between 0 and 1');
		} catch (e) {
			console.error(e);
		}
	},
	mute: function mute() {
		try {
			this.node.muted = !this.node.muted;
		} catch (e) {
			console.error(e);
		}
	},
	seek: function seek(value) {
		try {
			this.node.currentTime = value;
			this.currentTime = value.toFixed();
		} catch (e) {
			console.error(e);
		}
	},
	setTrack: function setTrack(value) {
		try {
			Sharmanka.buffered = 0;
			Sharmanka.currentTime = 0;
			Sharmanka.duration = 0;
			if (typeof value === 'string' && value.length > 0) return this.node.src = value;
			if (typeof value !== "string" || value.length === 0) return console.error('URL for track should be string by 1 character');
		} catch (e) {
			console.error(e);
		}
	},
	togglePlay: function togglePlay() {
		try {
			return this.node.paused ? this.node.play() : this.node.pause();
		} catch (e) {
			console.error(e);
		}
	},
	duration: 0,
	currentTime: 0,
	buffered: 0,
	preloadAllow: false,
	isUnlockedAudio: false,
	listenerMoveMouse: function (node) {
		if (!this.isUnlockedAudio && node) {
			this.isUnlockedAudio = true;

			this.playPromise = this.node.play();

			window.removeEventListener('click', this.listenerMoveMouse.bind(this, node), false);
		}
	},
	getDuration: function () {
		Sharmanka.duration = parseInt(Sharmanka.node.duration.toFixed(0));
	},
	getCurrentTime: function () {
		Sharmanka.currentTime = parseInt(Sharmanka.node.currentTime.toFixed(0));
	},
	getProgress: function () {
		var duration = Sharmanka.duration;

		if (duration > 0) {
			for (var i = 0; i < Sharmanka.node.buffered.length; i++) {
				if (Sharmanka.node.buffered.start(Sharmanka.node.buffered.length - 1 - i) < duration) {
					Sharmanka.buffered = Sharmanka.node.buffered.end(Sharmanka.node.buffered.length - 1 - i);
					break;
				}
			}
		}
	},
	init: function () {
		this.node = document.createElement('audio');
		this.preloadNode = document.createElement('audio');

		if (this.node) {
			this.node.addEventListener('loadedmetadata', this.getDuration);
			this.node.addEventListener('timeupdate', this.getCurrentTime);
			this.node.addEventListener('progress', this.getProgress);
			window.addEventListener('click', this.listenerMoveMouse.bind(this, this.node), false);
		}
	},
	destroy: function () {
		if (this.node) {
			this.node.removeEventListener('loadedmetadata', this.getDuration);
			this.node.removeEventListener('timeupdate', this.getCurrentTime);
			this.node.removeEventListener('progress', this.getProgress);
			window.removeEventListener('click', this.listenerMoveMouse.bind(this, this.node), false);
		}

		this.node.src = '';
		this.node = null;
	}
};

var _default = Sharmanka;
exports.default = _default;
