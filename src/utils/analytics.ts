/**
 * Analytics Integration Architecture
 * Production-ready utilities for GA4, Search Console, and Clarity.
 *
 * SETUP:
 * 1. Replace MEASUREMENT_ID with your GA4 property ID.
 * 2. Replace CLARITY_ID with your Microsoft Clarity project ID.
 * 3. Verify your site in Google Search Console (no code needed here).
 * 4. Add the <script> tags from initAnalytics() to index.html <head>.
 */

// ── Configuration ──────────────────────────────────────────────
export const analyticsConfig = {
  ga4MeasurementId: 'G-XXXXXXXXXX',           // Replace with your GA4 ID
  clarityProjectId: 'xxxxxxxxxx',              // Replace with your Clarity ID
  searchConsoleVerification: 'xxxxxxxxxx',     // Replace with SC verification
  debug: false,
};

// ── Google Analytics 4 ─────────────────────────────────────────
export function trackPageView(path: string, title: string) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Record<string, unknown>;
  if (typeof w.gtag === 'function') {
    (w.gtag as Function)('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Record<string, unknown>;
  if (typeof w.gtag === 'function') {
    (w.gtag as Function)('event', eventName, params);
  }
}

// Pre-built events
export const events = {
  toolView:     (name: string) => trackEvent('tool_view',     { tool_name: name }),
  toolClick:    (name: string) => trackEvent('tool_click',     { tool_name: name }),
  searchQuery:  (q: string)    => trackEvent('search',         { search_term: q }),
  filterApply:  (f: string)    => trackEvent('filter_apply',   { filter: f }),
  newsletterSub:()             => trackEvent('newsletter_subscribe'),
  promptCopy:   (id: string)   => trackEvent('prompt_copy',    { prompt_id: id }),
  compareView:  (pair: string) => trackEvent('comparison_view',{ comparison: pair }),
  submitTool:   ()             => trackEvent('tool_submission'),
  ctaClick:     (loc: string)  => trackEvent('cta_click',      { location: loc }),
};

// ── Initialization snippet (add to index.html or via helmet) ──
export function getAnalyticsSnippets(): string {
  const { ga4MeasurementId, clarityProjectId } = analyticsConfig;
  return `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}"></script>
<script>
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag('js',new Date());
  gtag('config','${ga4MeasurementId}');
</script>

<!-- Microsoft Clarity -->
<script>
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script","${clarityProjectId}");
</script>
  `.trim();
}
