
(() => {
	let intId, el, clone, t, newMain, div;

	class Time {
		constructor(sec) {
			this.hours = String(Math.floor(sec / 3600)).padStart(2, "0");
			this.minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
			this.seconds = String(Math.floor(sec % 60)).padStart(2, "0");
		}
		format(d) {return Object.values(this).join(d)}
	}

	const dragElement = (elmnt) => {
		const dragMouseDown = (e) => {
			e = e || window.event;
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}
	
		const elementDrag = (e) => {
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
			elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		}
	
		const closeDragElement = () => {
			document.onmouseup = null;
			document.onmousemove = null;
		}

		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		if (document.getElementById(elmnt.id + "header")) {
			document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
		} else {
			elmnt.onmousedown = dragMouseDown;
		}
	}

	const updateTime = async () => {
		try {
			const login = document.querySelector('[data-login]').getAttribute('data-login');
			const response = await fetch(`https://profile.intra.42.fr/users/${login}/locations_stats`);
			const data = await response.json();
			const currentMonth = new Date().getMonth();
			const filteredHours = Object.keys(data)
				.filter(d => new Date(d).getMonth() === currentMonth)
					.map(d => data[d]);
			let sec = 0;
			filteredHours.forEach(e => {
				const [hours, minutes, seconds] = e.split(":").map(Number);
				sec += hours * 3600 + minutes * 60 + seconds;
			});
			const time = new Time(sec).format(":");
			const timeel = document.querySelector('#time')
			timeel.innerHTML = time
			dragElement(timeel);
		} catch (error) {
			return;
		}
	}

	newMain = document.createElement("main");
	div = document.createElement("div");
	div.id = 'time';
	div.style.display = 'none';
	newMain.append(div);
	document.body.append(newMain);
	el = document.querySelector('.pull-right.button-actions.margin-right-42');
	clone = el.childNodes[1].cloneNode(true);
	el.append(clone);
	t = clone.firstChild.className.split(' ').map(e => e == 'iconf-globe' ? 'iconf-timer' : e).join(' ');
	el.childNodes[3].firstChild.className = t;
	el.childNodes[3].removeAttribute("href");
	el.childNodes[3].addEventListener('click', () => {
		const tm = document.querySelector('#time');
		if (tm.style.display == 'none') {
			intId = setInterval(updateTime, 1000);
			tm.style.display = 'block';
		} else {
			clearInterval(intId);
			tm.style.display = 'none';
		}
	});
})();

