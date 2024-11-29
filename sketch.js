on('load', () => {
    const eclick = $('#click');
    const eclicks = $('#clicks');
    let clicks = 0;
    const eclicksPerTap = $('#clickspertap');
    const eclicksPerTapUpgrade = $('#clickspertapupgrade');
    let clicksPerTap = 1;
    let clicksPerTapCost = 50 * clicksPerTap;
    
    if (localStorage.getItem('clicks')) {
      clicks = +localStorage.getItem('clicks');
      clicksPerTap = +localStorage.getItem('clicksPerTap');
      clicksPerTapCost = 50 * clicksPerTap;
    }
    
    const check = (value, cost) => value < cost ? 'add' : 'remove';
    const update = () => {
      eclick.innerText = `+${clicksPerTap}`;
      eclicks.innerHTML = `Clicks: ${clicks}`;
      localStorage.setItem('clicks', clicks);
      
      eclicksPerTap.innerHTML = `Clicks Per Tap: ${clicksPerTap}`;
      localStorage.setItem('clicksPerTap', clicksPerTap);
      clicksPerTapCost = 50*clicksPerTap;
      eclicksPerTapUpgrade.innerHTML = `Upgrade (${50 * clicksPerTap} Clicks)`;
      eclicksPerTapUpgrade.classList[check(clicks, clicksPerTapCost)]('unavailable');
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
      if (clicks < clicksPerTapCost) return;
      clicksPerTap++;
      clicks -= clicksPerTapCost;
      update();
    });
    
  })