const { chromium } = require("playwright");

async function captureMenu({ width, height, isMobile, output }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width, height },
    isMobile,
    hasTouch: isMobile,
    deviceScaleFactor: isMobile ? 3 : 1
  });

  await page.goto("https://www.buildunix.com", { waitUntil: "networkidle" });

  const button = page.locator('button[aria-label*="navigation"], button[aria-label*="menu"], button[aria-label*="Open"]');
  await button.first().click();
  await page.waitForTimeout(700);

  const panelStyles = await page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation");
    if (!panel) return null;
    const styles = window.getComputedStyle(panel);
    return {
      background: styles.backgroundColor,
      opacity: styles.opacity,
      visibility: styles.visibility,
      transform: styles.transform
    };
  });

  console.log(`${output}:`, panelStyles);
  await page.screenshot({ path: output, fullPage: false });
  await browser.close();
}

(async () => {
  await captureMenu({
    width: 1024,
    height: 1200,
    isMobile: false,
    output: "C:/Users/jatin/Projects/buildunix-website/tmp-laptop-menu-open.png"
  });

  await captureMenu({
    width: 390,
    height: 844,
    isMobile: true,
    output: "C:/Users/jatin/Projects/buildunix-website/tmp-mobile-menu-open.png"
  });
})();
