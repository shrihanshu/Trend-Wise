import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getGoogleTrends() {
  const response = await axios.get('https://trends.google.com/trends/trendingsearches/daily/rss?geo=US');
  const xml = response.data;
  const items = [];

  const $ = cheerio.load(xml, { xmlMode: true });
  $('item').each((i, el) => {
    items.push({
      title: $(el).find('title').text(),
      link: $(el).find('link').text(),
    });
  });
  return items.slice(0, 5); // return top 5 trends
}