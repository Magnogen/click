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
  const epolyclickers = $('#polyclickers');
  const epolyclickersUpgrade = $('#polyclickersupgrade');
  let polyclickers = 0;
  let polyclickersCost = () => 1000000 * ((polyclickers+1)**4);
  let present = 0;
  
  if (localStorage.getItem('clicks')) (() => {
    clicks = +localStorage.getItem('clicks');
    clicksPerTap = +localStorage.getItem('clicksPerTap');
    autoclickers = +localStorage.getItem('autoclickers');
    megaclickers = +localStorage.getItem('megaclickers');
    polyclickers = +localStorage.getItem('polyclickers');
    
    const then = +localStorage.getItem('then');
    if (!then) return;
    
    const now = Date.now();
    const secs = 0|(now - then) / 1000;
    present += autoclickers * clicksPerTap * secs;
    present += megaclickers * autoclickers * clicksPerTap * secs*10;
    present += polyclickers * megaclickers * autoclickers * clicksPerTap * secs*100;
    
    if (secs > 1) {
      eclicktext.innerText = `🎁`;
      return;
    }
    
    clicks += present;
    present = 0;
  })();
  
  reset = () => {
    clicks = 0;
    clicksPerTap = 1;
    autoclickers = 0;
    megaclickers = 0;
    polyclickers = 0;
    present = 0;
  }
  
  const check = (value, cost) => value < cost ? 'add' : 'remove';
  const fmt = (num) => num.toLocaleString();
  const update = () => {
    localStorage.setItem('then', Date.now());
    
    if (!present) {
      eclicktext.innerText = `+${clicksPerTap}`;
    }
    eclicks.innerHTML = `Clicks: ${fmt(clicks)}`;
    localStorage.setItem('clicks', clicks);
    
    eclicksPerTap.innerHTML = `Clicks Per Tap: ${fmt(clicksPerTap)}`;
    localStorage.setItem('clicksPerTap', clicksPerTap);
    eclicksPerTapUpgrade.innerHTML = `${fmt(clicksPerTapCost())} Clicks`;
    eclicksPerTapUpgrade.classList[check(clicks, clicksPerTapCost())]('unavailable');
    
    eautoclickers.innerHTML = `Autoclickers: ${fmt(autoclickers)}`;
    localStorage.setItem('autoclickers', autoclickers);
    eautoclickersUpgrade.innerHTML = `${fmt(autoclickersCost())} Clicks`;
    eautoclickersUpgrade.classList[check(clicks, autoclickersCost())]('unavailable');
    
    emegaclickers.innerHTML = `Megaclickers: ${fmt(megaclickers)}`;
    localStorage.setItem('megaclickers', megaclickers);
    emegaclickersUpgrade.innerHTML = `${fmt(megaclickersCost())} Clicks`;
    emegaclickersUpgrade.classList[check(clicks, megaclickersCost())]('unavailable');
    
    epolyclickers.innerHTML = `Polyclickers: ${fmt(polyclickers)}`;
    localStorage.setItem('polyclickers', polyclickers);
    epolyclickersUpgrade.innerHTML = `${fmt(polyclickersCost())} Clicks`;
    epolyclickersUpgrade.classList[check(clicks, polyclickersCost())]('unavailable');
  }
  update();
  
  const afterFrame = (fn) => requestAnimationFrame(() => setTimeout(fn));
  
  eclick.on('click', () => {
    clicks += clicksPerTap;
    if (present) {
      clicks += present;
      eclick.style.fontSize = '5rem';
      setTimeout(() => {
        present = 0;
        update();
      }, 200)
    } else {
      eclick.style.fontSize = '2.5rem';
    }
    eclick.style.transition = 'none';
    afterFrame(() => {
      eclick.style.removeProperty('font-size');
      eclick.style.removeProperty('transition');
    });
    update();
  });
  
  // clicks per tap
  eclicksPerTapUpgrade.on('click', () => {
    if (clicks < clicksPerTapCost()) return;
    clicks -= clicksPerTapCost();
    clicksPerTap++;
    update();
  });
  
  // autoclickers
  eautoclickersUpgrade.on('click', () => {
    if (clicks < autoclickersCost()) return;
    clicks -= autoclickersCost();
    autoclickers++;
    update();
  });
  setInterval(() => {
    clicks += autoclickers * clicksPerTap;
    update();
  }, 1000);
  
  // megaclickers
  emegaclickersUpgrade.on('click', () => {
    if (clicks < megaclickersCost()) return;
    clicks -= megaclickersCost();
    megaclickers++;
    update();
  });
  setInterval(() => {
    clicks += megaclickers * autoclickers * clicksPerTap;
    update();
  }, 100);
  
  // polyclickers
  epolyclickersUpgrade.on('click', () => {
    if (clicks < polyclickersCost()) return;
    clicks -= polyclickersCost();
    polyclickers++;
    update();
  });
  setInterval(() => {
    clicks += 10 * polyclickers * megaclickers * autoclickers * clicksPerTap;
    update();
  }, 100);
  
  
  
  
})