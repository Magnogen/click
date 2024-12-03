const reset = () => {
  localStorage.setItem('clicks', 0);
  localStorage.setItem('clicksPerTap', 1);
}

on('load', () => {
  
  const eclick = $('#click');
  const eclicktext = $('#clicktext');
  const eclicks = $('#clicks');
  let clicks = 0;
  const eclicksPerTap = $('#clickspertap');
  const eclicksPerTapUpgrade = $('#clickspertapupgrade');
  let clicksPerTap = 1;
  let clicksPerTapCost = () => 10 * (2**(clicksPerTap-1));
  const eautoclickers = $('#autoclickers');
  const eautoclickersUpgrade = $('#autoclickersupgrade');
  let autoclickers = 0;
  let autoclickersCost = () => 100 * (2**autoclickers);
  
  if (localStorage.getItem('clicks')) {
    clicks = +localStorage.getItem('clicks');
    clicksPerTap = +localStorage.getItem('clicksPerTap');
    autoclickers = +localStorage.getItem('autoclickers');
  }
  
  const check = (value, cost) => value < cost ? 'add' : 'remove';
  const update = () => {
    eclicktext.innerText = `+${clicksPerTap}`;
    eclicks.innerHTML = `Clicks: ${clicks}`;
    localStorage.setItem('clicks', clicks);
    
    eclicksPerTap.innerHTML = `Clicks Per Tap: ${clicksPerTap}`;
    localStorage.setItem('clicksPerTap', clicksPerTap);
    eclicksPerTapUpgrade.innerHTML = `Upgrade (${clicksPerTapCost()} Clicks)`;
    eclicksPerTapUpgrade.classList[check(clicks, clicksPerTapCost())]('unavailable');
    
    eautoclickers.innerHTML = `Autoclickers: ${autoclickers}`;
    localStorage.setItem('autoclickers', autoclickers);
    eautoclickersUpgrade.innerHTML = `Upgrade (${autoclickersCost()} Clicks)`;
    eautoclickersUpgrade.classList[check(clicks, autoclickersCost())]('unavailable');
  }
  update();
  
  const afterFrame = (fn) => requestAnimationFrame(() => setTimeout(fn));
  
  eclick.on('click', () => {
    clicks += clicksPerTap;
    eclick.style.fontSize = '2.5rem';
    eclick.style.transition = 'none';
    afterFrame(() => {
      eclick.style.removeProperty('font-size');
      eclick.style.removeProperty('transition');
    });
    update();
  });
  
  eclicksPerTapUpgrade.on('click', () => {
    if (clicks < clicksPerTapCost()) return;
    clicks -= clicksPerTapCost();
    clicksPerTap++;
    update();
  });
  
  eautoclickersUpgrade.on('click', () => {
    if (clicks < autoclickersCost()) return;
    clicks -= autoclickersCost();
    autoclickers++;
    update();
  });
  
  setInterval(() => {
    clicks += autoclickers;
    update();
  }, 1000)
  
  
  
})