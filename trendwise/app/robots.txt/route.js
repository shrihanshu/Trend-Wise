export async function GET() {
    return new Response(
      `User-agent: *\nDisallow: /admin\nSitemap: https://trendwise.vercel.app/sitemap.xml`,
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }
  