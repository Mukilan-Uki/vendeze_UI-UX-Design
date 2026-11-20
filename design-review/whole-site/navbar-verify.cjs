const path = require('path');
const fs = require('fs');
const qa = path.join(require('os').tmpdir(), 'vendeze-ui-qa', 'node_modules');
const { chromium } = require(path.join(qa, 'playwright'));
const checks = [], errors = [], failedResponses = [], scans = [];
const check = (ok, label) => { if (!ok) throw new Error(label); checks.push(label); };
const rect = locator => locator.evaluate(el => { const r = el.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; });
async function main() {
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => {if(r.status()>=400 && r.url().startsWith('http://127.0.0.1:8003')) failedResponses.push(r.url());});
    const go = async hash => {
      await page.evaluate(hash => { location.hash = hash; }, hash);
      await page.waitForFunction(hash => location.hash === hash && !document.querySelector('.header-inner').classList.contains('is-mega-open'), hash);
      await page.waitForFunction(() => {
        const r=document.querySelector('.header-inner').getBoundingClientRect();
        return r.height<=80.1 && r.width<=Math.min(1080,innerWidth-(innerWidth>960?48:32))+.1;
      });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    };
    const scan = async label => {
      await page.waitForFunction(() => document.querySelector('.header-inner').getAnimations({subtree:true}).every(animation=>animation.playState!=='running'));
      if (!await page.evaluate(() => !!window.axe)) await page.addScriptTag({path:path.join(qa,'axe-core','axe.min.js')});
      const violations = await page.evaluate(async () => (await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
      scans.push({label,violations});
      check(!violations.length,`${label}: no accessibility violations`);
    };
    await page.goto('http://127.0.0.1:8003/?preview=1#/', {waitUntil:'networkidle'});
    const shell=page.locator('.header-inner'), panel=page.locator('#sharedNavPanel');
    const closed=await rect(shell);
    const labels=await page.locator('#headerNav [data-nav-menu]').allTextContents();
    const names=['explore','plan','plans','business','account'];
    for (const key of names) {
      const trigger=page.locator(key==='account'?'#sharedAccountButton':`#sharedNav-${key}`);
      await trigger.hover();
      await page.waitForTimeout(450);
      check(await trigger.getAttribute('aria-expanded')==='true',`${key}: hover opens the correct panel after animation`);
      const expanded=await rect(shell);
      check(expanded.width>closed.width && expanded.height>closed.height+200,`${key}: navbar expands in width and height`);
      check(await page.locator('.shared-nav-directory h2').isVisible(),`${key}: detailed navigation heading is visible`);
      check(await page.locator('.shared-nav-link').count()>=4,`${key}: useful navigation links are included`);
      check(await page.locator('.shared-nav-feature img').evaluate(el=>el.complete&&el.naturalWidth>0),`${key}: feature image loads`);
      check((await page.locator('.shared-nav-feature h3').innerText()).length>8 && (await page.locator('.shared-nav-feature p').last().innerText()).length>30,`${key}: feature has a title and description`);
      const left=await rect(page.locator('.shared-nav-directory')), right=await rect(page.locator('.shared-nav-feature'));
      check(right.x>left.x+left.width,`${key}: image and description appear on the right`);
      await scan(`desktop-${key}-expanded`);
      await page.screenshot({path:path.join(__dirname,`navbar-${key}-desktop.png`)});
      await page.mouse.move(10,800);
      await page.waitForTimeout(550);
      check(await panel.getAttribute('aria-hidden')==='true',`${key}: leaving the navbar closes it`);
    }
    await page.locator('#sharedNav-explore').focus();
    await page.keyboard.press('ArrowDown');
    check(await page.locator('#sharedNavDetails button').first().evaluate(el=>el===document.activeElement),'ArrowDown opens and enters the panel');
    await page.keyboard.press('Escape');
    check(await page.locator('#sharedNav-explore').evaluate(el=>el===document.activeElement),'Escape closes the panel and restores trigger focus');
    check(await panel.evaluate(el=>el.inert),'Closed panel is excluded from keyboard navigation');
    await page.keyboard.press('Enter');
    check(await panel.getAttribute('aria-hidden')==='false','Enter opens a navigation panel');
    await page.keyboard.press('ArrowRight');
    check(await page.locator('#sharedNav-plan').getAttribute('aria-expanded')==='true','ArrowRight switches to the next navigation section');
    await page.mouse.click(5,800);
    check(await panel.getAttribute('aria-hidden')==='true','Clicking outside closes the panel');
    await page.locator('#sharedNav-plan').hover();
    await page.locator('[data-nav-occasion="Birthday"]').click();
    await page.locator('#typeChips [data-type="Birthday"].active').waitFor();
    check(true,'Occasion menu opens the event form with the correct occasion');
    check(await panel.getAttribute('aria-hidden')==='true','Navigation closes when changing pages');
    for(const [name,hash] of [['home','#/'],['search','#/search'],['services','#/services'],['saved','#/saved'],['cart','#/cart'],['profile','#/profile'],['bookings','#/bookings'],['login','#/login'],['not-found','#/missing-page']]) {
      await go(hash);
      const r=await rect(shell);
      check(Math.abs(r.width-closed.width)<1 && Math.abs(r.height-closed.height)<1 && Math.abs(r.y-closed.y)<1,`${name}: navbar size and position match the homepage`);
      check(JSON.stringify(await page.locator('#headerNav [data-nav-menu]').allTextContents())===JSON.stringify(labels),`${name}: all main navigation sections are identical`);
    }
    await page.locator('#sharedAccountButton').hover();
    await page.locator('[data-nav-signup="VENDOR"]').first().click();
    await page.locator('#vendorExtraFields').waitFor({state:'visible'});
    check(await page.locator('#signupRoleChips [data-role="VENDOR"]').getAttribute('aria-checked')==='true','Account menu opens vendor registration');
    for (const [id,name,hash] of [['v1','vendor','#/dashboard'],['a1','admin','#/admin'],['d1','developer','#/developer']]) {
      await page.evaluate(async id=>{await loginAs(id);},id);
      await page.waitForTimeout(100);
      await go(hash);
      const r=await rect(shell);
      check(Math.abs(r.width-closed.width)<1 && Math.abs(r.height-closed.height)<1,`${name}: staff navbar uses the same dimensions`);
      check(JSON.stringify(await page.locator('#headerNav [data-nav-menu]').allTextContents())===JSON.stringify(labels),`${name}: staff navbar uses the same navigation sections`);
      await page.locator('#sharedNav-business').hover();
      check(await page.locator('#sharedNavDetails [data-action="'+({vendor:'vendor-dashboard',admin:'admin',developer:'developer'}[name])+'"]').count()>=1,`${name}: business menu provides the authorized workspace`);
      await scan(`${name}-menu`);
      await page.keyboard.press('Escape');
    }
    await page.evaluate(async()=>{await loginAsGuest();});
    await go('#/');
    // Exercise scroll animation with ordinary motion and no focused navigation control.
    await page.locator('#homeTitle').focus();
    await page.mouse.move(10,950);
    await page.evaluate(()=>scrollTo(0,700));
    await page.waitForTimeout(400);
    check(await page.locator('#mainHeader').evaluate(el=>el.classList.contains('is-home-nav-hidden')),'Navbar hides on downward scrolling');
    await page.evaluate(()=>scrollTo(0,550));
    await page.waitForTimeout(400);
    check(!await page.locator('#mainHeader').evaluate(el=>el.classList.contains('is-home-nav-hidden')),'Navbar returns on upward scrolling');
    await page.locator('#sharedNav-explore').hover();
    await page.evaluate(()=>scrollTo(0,850));
    await page.waitForTimeout(400);
    check(!await page.locator('#mainHeader').evaluate(el=>el.classList.contains('is-home-nav-hidden')),'Expanded navbar stays visible while scrolling');
    await page.keyboard.press('Escape');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.locator('#homeTitle').focus();
    await page.evaluate(()=>scrollTo(0,1100));
    await page.waitForTimeout(100);
    check(!await page.locator('#mainHeader').evaluate(el=>el.classList.contains('is-home-nav-hidden')),'Reduced motion keeps the navbar visible');
    for(const width of [320,360,390,600,768,960,961,1024,1280,1440]) {
      await page.setViewportSize({width,height:844});
      await page.evaluate(()=>scrollTo(0,0));
      await page.waitForTimeout(180);
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Closed navbar fits ${width}px`);
      const mobile=width<=960;
      await page.locator(mobile?'#sharedNavToggle':'#sharedNav-explore').click();
      check(await panel.getAttribute('aria-hidden')==='false',`Navbar opens at ${width}px`);
      check(await shell.evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}),`Expanded navbar fits the viewport at ${width}px`);
      await page.keyboard.press('Escape');
      check(await page.locator(mobile?'#sharedNavToggle':'#sharedNav-explore').evaluate(el=>el===document.activeElement),`Escape restores accessible focus at ${width}px`);
    }
    await page.setViewportSize({width:390,height:844});
    await page.locator('#sharedNavToggle').click();
    await scan('mobile-expanded');
    await page.screenshot({path:path.join(__dirname,'navbar-mobile.png')});
    await page.locator('.shared-nav-content').evaluate(el=>el.scrollTop=el.scrollHeight);
    check(await page.locator('.shared-nav-feature img').isVisible(),'Phone users can scroll to the feature image and description');
    await page.screenshot({path:path.join(__dirname,'navbar-mobile-feature.png')});
    await page.keyboard.press('Escape');
    const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
    const phone=await touch.newPage();
    phone.on('pageerror',e=>errors.push(e.message));
    await phone.goto('http://127.0.0.1:8003/?preview=1#/',{waitUntil:'networkidle'});
    await phone.locator('#sharedNavToggle').tap();
    for(const key of names) {
      if(key!=='explore') await phone.locator(`#sharedNav-${key}-mobile`).tap();
      check(await phone.locator(`#sharedNav-${key}-mobile`).getAttribute('aria-expanded')==='true',`Touch selects the ${key} section`);
    }
    await phone.locator('#sharedNavToggle').tap();
    check(await phone.locator('#sharedNavPanel').getAttribute('aria-hidden')==='true','Phone menu button closes the navbar');
    await phone.locator('#sharedNavToggle').tap();
    await phone.locator('[data-action="category"][data-id="photo"]').first().tap();
    await phone.locator('.category-heading').waitFor();
    check(await phone.locator('#sharedNavPanel').getAttribute('aria-hidden')==='true','Touch navigation opens the selected page and closes the panel');
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
    await context.setOffline(true);
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('#sharedNavToggle').waitFor();
    await page.locator('#sharedNavToggle').click();
    check(await panel.getAttribute('aria-hidden')==='false','Shared navigation also works after reloading offline');
    check(await page.locator('.shared-nav-feature img').evaluate(async el=>{try{await el.decode();return el.naturalWidth>0;}catch{return false;}}),'Navigation photographs are available offline');
    await context.setOffline(false);
    check(errors.length===0,'No browser runtime errors');
    check(failedResponses.length===0,'No failed local assets');
    fs.writeFileSync(path.join(__dirname,'navbar-verification.json'),JSON.stringify({passed:checks.length,checks,errors,failedResponses,accessibility:scans},null,2));
    console.log(JSON.stringify({passed:checks.length,accessibilityScans:scans.length,errors,failedResponses}));
  } finally { await browser.close(); }
}
main().catch(e=>{console.error(e);console.error(JSON.stringify({passed:checks.length,last:checks.slice(-4),scans}));process.exit(1);});
