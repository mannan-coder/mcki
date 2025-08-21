#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/market',
  '/arbitrage', 
  '/analytics',
  '/alerts',
  '/news',
  '/events',
  '/about',
  '/contact',
  '/tools',
  '/blog',
  '/privacy',
  '/terms',
  '/cookies',
  '/disclaimer',
  '/careers',
  '/market-cap-details',
  '/volume-details',
  '/chain-analytics'
];

async function generateStaticPages() {
  console.log('🚀 Starting static page generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });
  
  const distDir = path.join(process.cwd(), 'dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  console.log('📁 Starting local server...');
  
  // Start a simple local server to serve the built files
  const { spawn } = require('child_process');
  const server = spawn('npx', ['serve', '-s', 'dist', '-p', '3000'], {
    stdio: 'pipe'
  });
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  for (const route of routes) {
    try {
      console.log(`📄 Generating: ${route}`);
      
      const page = await browser.newPage();
      
      // Set viewport for consistent rendering
      await page.setViewport({ width: 1200, height: 800 });
      
      // Navigate to the route on local server
      const url = `http://localhost:3000${route}`;
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait for React to hydrate and render dynamic content
      await page.waitForSelector('body', { timeout: 10000 });
      await page.waitForTimeout(5000);
      
      // Wait for custom render event if it exists
      try {
        await page.evaluate(() => {
          return new Promise((resolve) => {
            if (document.readyState === 'complete') {
              resolve();
            } else {
              window.addEventListener('load', resolve);
            }
          });
        });
      } catch (e) {
        console.log('⚠️ Custom render event not found, continuing...');
      }
      
      // Get the rendered HTML
      const html = await page.content();
      
      // Create directory structure for the route
      const routePath = route === '/' ? '/index' : route;
      const filePath = path.join(distDir, `${routePath}.html`);
      const fileDir = path.dirname(filePath);
      
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }
      
      // Optimize the HTML
      const optimizedHtml = html
        .replace(/data-reactroot=""/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Write the static HTML file
      fs.writeFileSync(filePath, optimizedHtml);
      
      await page.close();
      console.log(`✅ Generated: ${filePath}`);
      
    } catch (error) {
      console.error(`❌ Failed to generate ${route}:`, error.message);
    }
  }
  
  await browser.close();
  
  // Kill the server
  server.kill();
  
  console.log('🎉 Static generation complete!');
  console.log('📋 Generated static HTML files for all routes');
  console.log('🔍 Check dist/ folder for prerendered content');
}

// Run if called directly
if (require.main === module) {
  generateStaticPages().catch(console.error);
}

module.exports = { generateStaticPages };