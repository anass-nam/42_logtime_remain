async function calc(m){
	const	response = await fetch("https://profile.intra.42.fr/users/<YOUR_INTRA_LOGIN>/locations_stats");
	const	json = await response.json();
	let		dates = Object.keys(json).filter(d => new Date(d).getMonth() == m);
	let		hours = dates.map(d => json[d]);
	let		total = 0;
	hours.forEach(e => {
		total += +e.split(':')[0] * 3600 + +e.split(':')[1] * 60 + +e.split(':')[2];
	});
	targ.innerHTML = (`${new Date((total) * 1000).toISOString().substring(11, 16)} hours`);
}

let		targ = document.querySelector('.user-poste-status');
targ.style.cursor = 'pointer';
targ.addEventListener('click', () => {
	if (targ.innerHTML == "Available")
		calc(new Date().getMonth());
	else
		targ.innerHTML = "Available";
})
