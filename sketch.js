let reset;

on('load', () => {
  
  const eclick = $('#click');
  const eclicktext = $('#clicktext');
  const eclicks = $('#clicks');
  let clicks = 0;
  const eclicksPerTap = $('#clickspertap');
  const eclicksPerTapUpgrade = $('#clickspertapupgrade');
  let clicksPerTap = 1;
  let clicksPerTapCost = () => 10 * (clicksPerTap**2);
  const eautoclickers = $('#autoclickers');
  const eautoclickersUpgrade = $('#autoclickersupgrade');
  let autoclickers = 0;
  let autoclickersCost = () => 50 * ((autoclickers+1)**2);
  const emegaclickers = $('#megaclickers');
  const emegaclickersUpgrade = $('#megaclickersupgrade');
  let megaclickers = 0;
  let megaclickersCost = () => 1000 * ((megaclickers+1)**3);
  
  if (localStorage.getItem('clicks')) {
    clicks = +localStorage.getItem('clicks');
    clicksPerTap = +localStorage.getItem('clicksPerTap');
    autoclickers = +localStorage.getItem('autoclickers');
    megaclickers = +localStorage.getItem('megaclickers');
  }
  
  reset = () => {
    clicks = 0;
    clicksPerTap = 1;
    autoclickers = 0;
    megaclickers = 0;
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
    
    emegaclickers.innerHTML = `Megaclickers: ${megaclickers}`;
    localStorage.setItem('megaclickers', megaclickers);
    emegaclickersUpgrade.innerHTML = `Upgrade (${megaclickersCost()} Clicks)`;
    emegaclickersUpgrade.classList[check(clicks, megaclickersCost())]('unavailable');
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
  
  emegaclickersUpgrade.on('click', () => {
    if (clicks < megaclickersCost()) return;
    clicks -= megaclickersCost();
    megaclickers++;
    update();
  });
  
  setInterval(() => {
    clicks += autoclickers * clicksPerTap;
    update();
  }, 1000);
  
  setInterval(() => {
    clicks += megaclickers * clicksPerTap;
    update();
  }, 100);
  
  
})