import https from 'https';
import fs from 'fs';

const urls = [
  'https://raw.githubusercontent.com/geohacker/india/master/state/india_telangana.geojson',
  'https://raw.githubusercontent.com/Subhash2b/config-files/master/india_states.geojson',
  'https://raw.githubusercontent.com/subham-sahoo/india-maps/main/india_states.geojson',
  'https://raw.githubusercontent.com/anujdutt/India-State-and-District-GeoJSON/master/india_states.geojson',
  'https://raw.githubusercontent.com/numpyninja/DataSets/main/india_states.geojson'
];

async function downloadFirstValid() {
  for (const url of urls) {
    console.log('Testing URL:', url);
    try {
      const data = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          if (res.statusCode !== 200) return resolve(null);
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve(body));
        }).on('error', reject);
      });

      if (data) {
        const geo = JSON.parse(data);
        console.log('Successfully fetched valid GeoJSON! Features:', geo.features.length);
        fs.writeFileSync('d:\\VS\\sih2026\\public\\india_states.geojson', JSON.stringify(geo));
        return;
      }
    } catch (e) {
      console.log('Failed:', e.message);
    }
  }
}

downloadFirstValid();
