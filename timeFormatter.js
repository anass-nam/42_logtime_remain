
	function timeFormatter(sec) {
		let time = {
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
		while (sec >= 3600) {
			time.hours++;
			sec -= 3600;
		}
		while (sec >= 60) {
			time.minutes++;
			sec -= 60;
		}
		time.seconds = sec;
		Object.keys(time).forEach(keyElm => {
			time[keyElm] = (time[keyElm] > 9) ? `${time[keyElm]}` : `0${time[keyElm]}`
		});
		return Object.values(time).join(':');
	}

