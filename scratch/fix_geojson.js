import fs from 'fs';

const mdPath = `C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e9671202-ffba-4005-85dc-1d1d4c3fcc05\\.system_generated\\steps\\267\\content.md`;
const content = fs.readFileSync(mdPath, 'utf8');

const jsonStart = content.indexOf('{"type":"FeatureCollection"');
console.log('jsonStart:', jsonStart);

let jsonStr = content.substring(jsonStart).trim();
console.log('jsonStr length:', jsonStr.length);
console.log('Last 50 chars:', jsonStr.substring(jsonStr.length - 50));

// If trailing markdown or newline exists, fix it
try {
  const geo = JSON.parse(jsonStr);
  console.log('Features count:', geo.features.length);
  const names = geo.features.map(f => f.properties.NAME_1 || f.properties.ST_NM || f.properties.name);
  console.log('State Names:', names);
  fs.writeFileSync('d:\\VS\\sih2026\\public\\india_states.geojson', JSON.stringify(geo));
  console.log('Saved valid GeoJSON to public!');
} catch (err) {
  console.error('Parse error:', err.message);
  // Try fixing unescaped/truncated end
  const lastClose = jsonStr.lastIndexOf('}]}');
  if (lastClose !== -1) {
    const fixedStr = jsonStr.substring(0, lastClose + 3);
    const geo = JSON.parse(fixedStr);
    console.log('Fixed! Features count:', geo.features.length);
    fs.writeFileSync('d:\\VS\\sih2026\\public\\india_states.geojson', JSON.stringify(geo));
  }
}
