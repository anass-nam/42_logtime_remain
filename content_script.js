(() => {
	const css = `
		main {
			margin-bottom: 200%;
		}
		#time{
			position: fixed;
			top: 93.5%;
			left: 49.9%;
			font-size: 2em;
			font-weight: bolder;
			color: #00babc;
			z-index: 201;
		}
		.floating-menu {
			
			z-index: 200;
			position: fixed;
			top: 91%;
			left: 50%;
			transform: translate(-50,50);
			border-radius: 50%;
			border-top: 5px solid #00babc;
			width: 120px;
			height: 120px;
			-webkit-animation: spin 1s linear infinite; /* Safari */
			animation: spin 1s linear infinite;
			}
		/* Safari */
		@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
		}

	
		@keyframes spinr {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
		}

		
		`;
	const styleElement = document.createElement('style');
	styleElement.innerHTML = css;
	document.head.appendChild(styleElement);
	let newMain = document.createElement("main")
	let nav = document.createElement("nav")
	let div = document.createElement("div")
	div.id = 'time'
	nav.className = "floating-menu"
	newMain.append(nav)
	newMain.append(div)
	document.body.append(newMain)
})();
		

const updateTime = async () => {
	try {
		const response = await fetch("https://profile.intra.42.fr/users/<YPUR_LOGIN>/locations_stats");
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
  
