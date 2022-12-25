(() => {
	let clone = document.querySelector('.pull-right.button-actions.margin-right-42').childNodes[1].cloneNode(true);
	document.querySelector('.pull-right.button-actions.margin-right-42').append(clone);
	let t = clone.firstChild.className.split(' ').map(e => e == 'iconf-globe' ? 'iconf-timer' : e).join(' ');
	document.querySelector('.pull-right.button-actions.margin-right-42').childNodes[1].firstChild.className = t;
	let newMain = document.createElement("main");
	let nav = document.createElement("nav");
	let div = document.createElement("div");
	div.id = 'time';
	nav.className = "floating-menu";
	newMain.append(nav);
	newMain.append(div);
	document.body.append(newMain);
})();;
		

const updateTime = async () => {
	try {
		const response = await fetch("https://profile.intra.42.fr/users/anammal/locations_stats");
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
		document.querySelector('#time').innerHTML = time+'</a>'
	} catch (error) {
		console.error(error);
	}
};
  
  setInterval(updateTime, 1000);
  
  class Time {
	constructor(sec) {
	  this.hours = String(Math.floor(sec / 3600)).padStart(2, "0");
	  this.minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
	  this.seconds = String(Math.floor(sec % 60)).padStart(2, "0");
	}
	format(d) {return Object.values(this).join(d)}
  }
  
  dragElement(document.getElementById("time"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
