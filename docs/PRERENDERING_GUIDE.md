# Prerendering & Static Generation Guide

This guide explains how the prerendering system works in your MCKI crypto platform to improve SEO and Core Web Vitals.

## 🚀 What's Implemented

### 1. Build-Time Static Generation
- **Script**: `scripts/generate-static.js` - Generates static HTML for all routes at build time
- **Routes**: All major pages (home, market, arbitrage, news, etc.) get prerendered
- **Tool**: Uses Puppeteer to render pages and capture full HTML

### 2. Performance Optimizations
- **Code Splitting**: Vendor, router, UI, charts, and query chunks separated
- **Lazy Loading**: Images and non-critical components load on demand
- **Service Worker**: Caches resources for faster subsequent loads (`public/sw.js`)
- **Critical CSS**: Injected inline for above-the-fold content

### 3. SEO Enhancements
- **Meta Tags**: Dynamic title, description, OG tags per route
- **Structured Data**: JSON-LD schema for better search visibility
- **Sitemap**: Auto-generated `public/sitemap.xml`
- **Robots.txt**: Optimized for search crawlers

## 🛠 Build Commands

### Development
```bash
npm run dev
# Runs with hot reload, no prerendering
```

### Production Build
```bash
npm run build
# Builds optimized bundle with code splitting

npm run preview
# Preview production build locally
```

### Static Generation (Optional)
```bash
node scripts/generate-static.js
# Run after build to generate static HTML files
```

## 📁 Key Files

### Core Components
- `src/components/seo/StaticGenerator.tsx` - Signals when page is ready for static generation
- `src/utils/prerenderUtils.ts` - Utilities for prerendering and performance optimization
- `src/prerender.ts` - Route configuration and data fetching hooks

### Build Configuration
- `vite.config.ts` - Build optimization settings with code splitting
- `scripts/generate-static.js` - Static HTML generation script
- `public/sw.js` - Service worker for caching

## 🎯 SEO Benefits

### Before (SPA)
```html
<div id="root"></div>
<!-- Empty HTML, content loaded by JS -->
```

### After (Prerendered)
```html
<div id="root">
  <header>MCKI - Crypto Intelligence</header>
  <main>
    <section>Real content visible to crawlers</section>
    <!-- Full HTML with actual content -->
  </main>
</div>
```

## ⚡ Performance Improvements

### Core Web Vitals
- **LCP**: Faster with prerendered content and critical CSS
- **FID**: Improved with code splitting and lazy loading
- **CLS**: Better with proper image dimensions and layout stability

### Caching Strategy
- **Service Worker**: Caches static assets
- **Browser Cache**: Long-term caching for versioned assets
- **CDN Ready**: Optimized for CDN deployment

## 🔧 Configuration

### Adding New Routes
1. Add route to `src/prerender.ts`:
```typescript
export const prerenderRoutes: string[] = [
  '/',
  '/your-new-route', // Add here
];
```

2. Add route data in `prerenderHook`:
```typescript
case '/your-new-route':
  return {
    title: 'Your Page Title',
    description: 'Your page description',
    preloadData: await fetchYourData()
  };
```

### Customizing Static Generation
Modify `scripts/generate-static.js`:
- Adjust wait times for dynamic content
- Add custom data injection
- Configure HTML optimization

## 🚨 Important Notes

### Limitations
- **API Calls**: Some dynamic content still loads client-side
- **Real-time Data**: Live prices update after hydration
- **User-specific Content**: Requires client-side rendering

### Best Practices
- Keep critical content in prerendered HTML
- Use loading skeletons for dynamic sections
- Implement proper error boundaries
- Test with Google's URL Inspection tool

## 📊 Testing & Validation

### SEO Testing
```bash
# Test with Google's tools
https://search.google.com/test/rich-results
https://developers.google.com/speed/pagespeed/insights/
```

### Local Testing
```bash
# Build and test locally
npm run build
npm run preview

# Check generated HTML
view-source:http://localhost:4173/
```

### Lighthouse Audit
- Run Lighthouse in Chrome DevTools
- Check SEO, Performance, and Best Practices scores
- Aim for 90+ scores in all categories

## 🔄 Deployment

The prerendering system works automatically with your current hosting setup. Static files are generated during build and served normally.

### Vercel/Netlify Integration
The system is compatible with static hosting platforms:
- Build command: `npm run build`
- Output directory: `dist/`
- All routes have proper fallbacks

This implementation provides Next.js-like benefits while keeping your React/Vite setup intact!