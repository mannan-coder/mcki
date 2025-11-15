# MCKI Deployment Guide

## Production Deployment Checklist

### 1. Pre-Deployment Optimization

✅ **Packages Updated** - All dependencies are up to date
✅ **Build Optimization** - Vite configured with:
- Code splitting and lazy loading
- Terser minification with console removal
- Gzip and Brotli compression
- CSS minification
- Optimized chunk sizes

✅ **Performance Enhancements**:
- Critical resource preloading
- Lazy image loading
- Core Web Vitals monitoring
- Memory cleanup utilities
- Intersection Observer for content

### 2. Google AdSense Compliance

✅ **Auto Ads Integration**:
- Publisher ID: `ca-pub-5532318785992990`
- Auto Ads enabled in `index.html`
- Safe initialization in `AutoAdsLoader.tsx`
- Excluded from login/404/loading pages

✅ **Required Pages**:
- About (`/about`)
- Privacy Policy (`/privacy`) - with AdSense disclosure
- Terms & Conditions (`/terms`)
- Disclaimer (`/disclaimer`)
- Contact (`/contact`)

✅ **Content Quality**:
- 300-500+ words on major pages
- Unique, keyword-rich content
- SEO-optimized headings and structure
- Internal linking between sections

✅ **Technical Compliance**:
- `ads.txt` file created with publisher verification
- No manual ad slots (Auto Ads only)
- No console errors or hydration warnings
- Ads load after meaningful content

### 3. SEO Optimization

✅ **Meta Tags**:
- Dynamic title and description on all pages
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD)

✅ **Technical SEO**:
- `sitemap.xml` generated
- `robots.txt` configured
- Semantic HTML structure
- Alt tags on all images
- Mobile-responsive design

✅ **Performance**:
- Target LCP < 2.5s
- Target FID < 100ms
- Target CLS < 0.1
- Lighthouse score optimization

### 4. Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

### 5. Server Configuration

The `.htaccess` file is included with:
- GZIP compression enabled
- Browser caching (1 year for assets)
- Security headers
- HTTPS redirect
- SPA routing support

### 6. Environment Variables

Required for production:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 7. Deployment Steps

1. **Update all packages**:
   ```bash
   npm install
   ```

2. **Run production build**:
   ```bash
   npm run build
   ```

3. **Test locally**:
   ```bash
   npm run preview
   ```

4. **Upload files**:
   - Upload `dist/` folder contents to your web server
   - Ensure `.htaccess` is in the root directory
   - Verify `ads.txt` is accessible at `https://mcki.site/ads.txt`
   - Verify `sitemap.xml` is accessible at `https://mcki.site/sitemap.xml`
   - Verify `robots.txt` is accessible at `https://mcki.site/robots.txt`

5. **Post-Deployment Verification**:
   - ✅ Check all pages load correctly
   - ✅ Verify HTTPS is working
   - ✅ Test mobile responsiveness
   - ✅ Check AdSense Auto Ads appear (may take 24-48 hours)
   - ✅ Verify no console errors
   - ✅ Test Core Web Vitals with Lighthouse
   - ✅ Submit sitemap to Google Search Console

### 8. Google AdSense Application

After deployment:
1. Go to [AdSense](https://www.google.com/adsense/)
2. Apply with `https://mcki.site`
3. Add the verification code if requested
4. Wait for approval (typically 1-2 weeks)

**Important Notes**:
- Keep content updated regularly
- Maintain original, high-quality content
- Avoid prohibited content (crypto ads restrictions may apply)
- Monitor Core Web Vitals in Google Search Console

### 9. Performance Monitoring

Post-deployment monitoring tools:
- Google Search Console (SEO)
- Google Analytics (traffic)
- PageSpeed Insights (performance)
- Lighthouse (audits)

### 10. Maintenance

Regular tasks:
- Update npm packages monthly
- Monitor performance metrics
- Check for broken links
- Update content regularly
- Review AdSense performance

---

## File Structure

```
dist/
├── assets/           # Minified JS, CSS, images
├── .htaccess         # Server configuration
├── ads.txt           # AdSense verification
├── sitemap.xml       # SEO sitemap
├── robots.txt        # Crawler instructions
├── manifest.json     # PWA manifest
└── index.html        # Entry point
```

## Server Requirements

- **Web Server**: Apache, Nginx, or any static hosting
- **HTTPS**: Required (SSL certificate)
- **PHP**: Not required
- **Node.js**: Not required for production (static site)

## Recommended Hosting

- Netlify (recommended, free tier available)
- Vercel
- Cloudflare Pages
- DigitalOcean
- AWS S3 + CloudFront
- Traditional cPanel hosting

## Support

For issues or questions:
- Check documentation at `/docs`
- Review console logs for errors
- Verify all environment variables are set
- Ensure AdSense code is correctly implemented

---

**Version**: 2.0.0 Production-Ready
**Last Updated**: 2025-11-15
**Domain**: https://mcki.site
