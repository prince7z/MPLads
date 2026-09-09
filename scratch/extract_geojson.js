import fs from 'fs';

const sourceFile = `C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e9671202-ffba-4005-85dc-1d1d4c3fcc05\\.system_generated\\steps\\267\\content.md`;
const targetFile = `d:\\VS\\sih2026\\public\\india_states.geojson`;

const content = fs.readFileSync(sourceFile, 'utf8');
const lines = content.split('\n');
const jsonLine = lines.find(l => l.trim().startsWith('{"type":"FeatureCollection"'));

if (jsonLine) {
  fs.writeFileSync(targetFile, jsonLine.trim());
  console.log('GeoJSON extracted successfully! Size:', fs.statSync(targetFile).size);
} else {
  console.log('Could not find GeoJSON line');
}
