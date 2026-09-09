import https from 'https';
import fs from 'fs';

const urls = [
  'https://raw.githubusercontent.com/sabu-k/india-state-and-district-boundaries/main/india_states.geojson',
  'https://raw.githubusercontent.com/amcharts/amcharts5/main/geodata/json/indiaLow.json',
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json',
  'https://raw.githubusercontent.com/Hindustan-Times/india-states-geojson/master/india-states.json',
  'https://raw.githubusercontent.com/geohacker/india/master/state/india_telangana.geojson'
];

async function run() {
  for (const url of urls) {
    console.log('Fetching:', url);
    try {
      const data = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          if (res.statusCode !== 200) return resolve(null);
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve(body));
        }).on('error', reject);
      });

      if (data && data.length > 500) {
        console.log('SUCCESS for URL:', url, 'Length:', data.length);
        fs.writeFileSync('d:\\VS\\sih2026\\public\\india_states.json', data);
        return;
      }
    } catch (e) {
      console.log('Failed:', e.message);
    }
  }
}

run();
