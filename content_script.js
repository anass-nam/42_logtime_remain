const fetchData = async () => {
	try {
	  const response = await fetch("https://profile.intra.42.fr/users/anammal/locations_stats");
	  const data = await response.json();
	  const filtredKeys = Object.keys(data).filter(d => new Date(d).getMonth() === new Date().getMonth());
	  const filtredHrs = filtredKeys.map(d => data[d]);
	  let secs = 0;
	  filtredHrs.forEach(e => {
		secs += +e.split(':')[0] * 3600 + +e.split(':')[1] * 60 + +e.split(':')[2];
	  });
	  const output = timeFormatter(secs);
	  return output;
	} catch (error) {
	  console.error(error);
	}
  };
  
  const insertHTML = async () => {
	try {
	  const htmlResponse = await fetch(chrome.runtime.getURL('./toolbar.html'));
	  const html = await htmlResponse.text();
	  document.body.insertAdjacentHTML('beforestart', html);
	} catch (error) {
	  console.error(error);
	}
  };
  const updateTime = async () => {
	const output = await fetchData();
	// Do something with the output value here, such as updating an element on the page
	insertHTML();
  };
  
  // Update the time every second
  setInterval(updateTime, 1000);
  