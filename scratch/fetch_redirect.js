import https from 'https';
import fs from 'fs';

function fetchRedirect(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchRedirect(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return resolve(null);
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

async function run() {
  const url = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json';
  console.log('Fetching:', url);
  const data = await fetchRedirect(url);
  if (data) {
    console.log('Success! Data size:', data.length);
    fs.writeFileSync('d:\\VS\\sih2026\\public\\india_states.json', data);
  } else {
    console.log('Failed to fetch');
  }
}

run();
