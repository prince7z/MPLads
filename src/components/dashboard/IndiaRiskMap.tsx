import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { STATE_RISK_LIST } from '../../data/dashboardData';
import { Search, MapPin, Layers, RefreshCw } from 'lucide-react';

interface IndiaRiskMapProps {
  onSelectState?: (stateName: string) => void;
}

// Complete list of Indian States and UTs with accurate Lat/Lng coordinates
const INDIA_LOCATIONS = [
  { id: 'BR', name: 'Bihar', lat: 25.0961, lng: 85.3131, risk: 72, highRisk: 142, delayed: 89, sanctioned: '₹ 840 Cr', status: 'Critical' },
  { id: 'UP', name: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, risk: 68, highRisk: 198, delayed: 124, sanctioned: '₹ 1,420 Cr', status: 'High' },
  { id: 'WB', name: 'West Bengal', lat: 22.9868, lng: 87.8550, risk: 63, highRisk: 94, delayed: 61, sanctioned: '₹ 610 Cr', status: 'High' },
  { id: 'JH', name: 'Jharkhand', lat: 23.6102, lng: 85.2799, risk: 58, highRisk: 56, delayed: 38, sanctioned: '₹ 410 Cr', status: 'High' },
  { id: 'MP', name: 'Madhya Pradesh', lat: 22.9734, lng: 78.6569, risk: 54, highRisk: 82, delayed: 45, sanctioned: '₹ 730 Cr', status: 'High' },
  { id: 'RJ', name: 'Rajasthan', lat: 27.0238, lng: 74.2179, risk: 48, highRisk: 65, delayed: 39, sanctioned: '₹ 680 Cr', status: 'Medium' },
  { id: 'OD', name: 'Odisha', lat: 20.9517, lng: 85.0985, risk: 45, highRisk: 49, delayed: 27, sanctioned: '₹ 520 Cr', status: 'Medium' },
  { id: 'MH', name: 'Maharashtra', lat: 19.7515, lng: 75.7139, risk: 41, highRisk: 78, delayed: 34, sanctioned: '₹ 1,150 Cr', status: 'Medium' },
  { id: 'KA', name: 'Karnataka', lat: 15.3173, lng: 75.7139, risk: 35, highRisk: 38, delayed: 19, sanctioned: '₹ 590 Cr', status: 'Medium' },
  { id: 'TN', name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569, risk: 28, highRisk: 24, delayed: 11, sanctioned: '₹ 620 Cr', status: 'Low' },
  { id: 'GJ', name: 'Gujarat', lat: 22.2587, lng: 71.1924, risk: 24, highRisk: 18, delayed: 8, sanctioned: '₹ 710 Cr', status: 'Low' },
  { id: 'KL', name: 'Kerala', lat: 10.8505, lng: 76.2711, risk: 22, highRisk: 12, delayed: 5, sanctioned: '₹ 380 Cr', status: 'Low' },
  { id: 'JK', name: 'Jammu & Kashmir', lat: 33.7782, lng: 76.5762, risk: 38, highRisk: 29, delayed: 14, sanctioned: '₹ 320 Cr', status: 'Medium' },
  { id: 'LA', name: 'Ladakh', lat: 34.1526, lng: 77.5771, risk: 30, highRisk: 9, delayed: 4, sanctioned: '₹ 180 Cr', status: 'Low' },
  { id: 'HP', name: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734, risk: 29, highRisk: 14, delayed: 7, sanctioned: '₹ 290 Cr', status: 'Low' },
  { id: 'PB', name: 'Punjab', lat: 31.1471, lng: 75.3412, risk: 34, highRisk: 22, delayed: 10, sanctioned: '₹ 410 Cr', status: 'Medium' },
  { id: 'UT', name: 'Uttarakhand', lat: 30.0668, lng: 79.0193, risk: 42, highRisk: 31, delayed: 16, sanctioned: '₹ 340 Cr', status: 'Medium' },
  { id: 'HR', name: 'Haryana', lat: 29.0588, lng: 76.0856, risk: 45, highRisk: 37, delayed: 18, sanctioned: '₹ 450 Cr', status: 'Medium' },
  { id: 'DL', name: 'Delhi (NCT)', lat: 28.7041, lng: 77.1025, risk: 40, highRisk: 26, delayed: 12, sanctioned: '₹ 280 Cr', status: 'Medium' },
  { id: 'CT', name: 'Chhattisgarh', lat: 21.2787, lng: 81.8661, risk: 51, highRisk: 43, delayed: 22, sanctioned: '₹ 390 Cr', status: 'High' },
  { id: 'GA', name: 'Goa', lat: 15.2993, lng: 74.1240, risk: 18, highRisk: 4, delayed: 1, sanctioned: '₹ 120 Cr', status: 'Low' },
  { id: 'TS', name: 'Telangana', lat: 18.1124, lng: 79.0193, risk: 36, highRisk: 28, delayed: 13, sanctioned: '₹ 480 Cr', status: 'Medium' },
  { id: 'AP', name: 'Andhra Pradesh', lat: 15.9129, lng: 79.7400, risk: 39, highRisk: 33, delayed: 16, sanctioned: '₹ 560 Cr', status: 'Medium' },
  { id: 'AS', name: 'Assam', lat: 26.2006, lng: 92.9376, risk: 44, highRisk: 35, delayed: 19, sanctioned: '₹ 420 Cr', status: 'Medium' },
  { id: 'SK', name: 'Sikkim', lat: 27.5330, lng: 88.5122, risk: 25, highRisk: 6, delayed: 2, sanctioned: '₹ 95 Cr', status: 'Low' },
  { id: 'ML', name: 'Meghalaya', lat: 25.4670, lng: 91.3662, risk: 33, highRisk: 11, delayed: 5, sanctioned: '₹ 150 Cr', status: 'Medium' },
  { id: 'TR', name: 'Tripura', lat: 23.9408, lng: 91.9882, risk: 27, highRisk: 8, delayed: 3, sanctioned: '₹ 130 Cr', status: 'Low' },
  { id: 'MZ', name: 'Mizoram', lat: 23.1645, lng: 92.9376, risk: 31, highRisk: 7, delayed: 4, sanctioned: '₹ 110 Cr', status: 'Medium' },
  { id: 'MN', name: 'Manipur', lat: 24.6637, lng: 93.9063, risk: 46, highRisk: 21, delayed: 11, sanctioned: '₹ 160 Cr', status: 'Medium' },
  { id: 'NL', name: 'Nagaland', lat: 26.1584, lng: 94.5624, risk: 37, highRisk: 13, delayed: 6, sanctioned: '₹ 140 Cr', status: 'Medium' },
  { id: 'AR', name: 'Arunachal Pradesh', lat: 28.2180, lng: 94.7278, risk: 29, highRisk: 10, delayed: 4, sanctioned: '₹ 190 Cr', status: 'Low' }
];

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({ onSelectState }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tileStyle, setTileStyle] = useState<'voyager' | 'dark' | 'osm'>('voyager');

  const tileUrls = {
    voyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create Map Instance if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [22.5937, 78.9629],
        zoom: 4.6,
        minZoom: 4,
        maxZoom: 9,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing tile layers and set new tile layer
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(tileUrls[tileStyle], {
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Render Pin Markers for every location
    INDIA_LOCATIONS.forEach((loc) => {
      const getBadgeBg = (risk: number) => {
        if (risk >= 70) return '#D92D20'; // Critical Red
        if (risk >= 50) return '#F79009'; // High Orange
        if (risk >= 30) return '#EAAA08'; // Medium Yellow
        return '#12B76A';                // Low Green
      };

      const color = getBadgeBg(loc.risk);
      const isCritical = loc.risk >= 70;

      // Custom Leaflet DivIcon
      const iconHtml = `
        <div class="relative flex items-center justify-center group">
          ${isCritical ? `<div class="absolute w-8 h-8 rounded-full animate-ping opacity-40" style="background-color: ${color}"></div>` : ''}
          <div class="w-7 h-7 rounded-full shadow-lg flex items-center justify-center text-white text-[10px] font-black border-2 border-white cursor-pointer transition-transform hover:scale-125" style="background-color: ${color}">
            ${loc.risk}
          </div>
          <div class="absolute -bottom-4 whitespace-nowrap bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow-xs pointer-events-none">
            ${loc.id}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'leaflet-data-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      // Popup html
      const popupHtml = `
        <div class="p-1 max-w-[200px] text-slate-800 font-sans">
          <div class="flex items-center justify-between border-b pb-1 mb-1.5">
            <span class="font-extrabold text-xs text-navy-900">${loc.name}</span>
            <span class="text-[9px] font-black px-1.5 py-0.5 rounded text-white" style="background-color: ${color}">
              ${loc.status}
            </span>
          </div>
          <div class="text-[11px] space-y-1">
            <div class="flex justify-between"><span class="text-slate-500 font-medium">Risk Score:</span> <span class="font-bold">${loc.risk}/100</span></div>
            <div class="flex justify-between"><span class="text-slate-500 font-medium">High Risk Works:</span> <span class="font-bold text-amber-600">${loc.highRisk}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 font-medium">Delayed Works:</span> <span class="font-bold text-red-600">${loc.delayed}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 font-medium">Sanctioned:</span> <span class="font-bold text-slate-700">${loc.sanctioned}</span></div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { offset: [0, -10] });

      marker.on('click', () => {
        setSelectedState(loc.name);
        if (onSelectState) onSelectState(loc.name);
      });

      markersRef.current[loc.name] = marker;
    });

    // Invalidate map size after rendering
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      // Cleanup on unmount
    };
  }, [tileStyle]);

  // Handle Search state jump
  const handleSelectFromDropdown = (stateName: string) => {
    setSelectedState(stateName);
    const loc = INDIA_LOCATIONS.find((l) => l.name.toLowerCase() === stateName.toLowerCase());
    if (loc && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([loc.lat, loc.lng], 6.5, { duration: 1.2 });
      const marker = markersRef.current[loc.name];
      if (marker) marker.openPopup();
    }
    if (onSelectState) onSelectState(stateName);
  };

  const handleResetMap = () => {
    setSelectedState(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([22.5937, 78.9629], 4.6, { duration: 1 });
    }
  };

  const filteredLocations = INDIA_LOCATIONS.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Map Control Header */}
      <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-navy-900 text-amber-400 rounded">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-bold text-navy-900 leading-tight">Interactive Map of India</h3>
            <p className="text-[10px] text-slate-500">Live Spatial Risk & Project Analytics</p>
          </div>
        </div>

        {/* State Jump Search & Layer Controls */}
        <div className="flex items-center gap-2">
          {/* State Search Dropdown */}
          <div className="relative">
            <select
              value={selectedState || ''}
              onChange={(e) => handleSelectFromDropdown(e.target.value)}
              className="text-[11px] font-semibold border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-navy-900"
            >
              <option value="">Search & Select State...</option>
              {INDIA_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name} (Risk: {loc.risk})
                </option>
              ))}
            </select>
          </div>

          {/* Map Style Selector */}
          <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden p-0.5 text-[10px] font-bold">
            <button
              onClick={() => setTileStyle('voyager')}
              className={`px-2 py-0.5 rounded ${tileStyle === 'voyager' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Voyager
            </button>
            <button
              onClick={() => setTileStyle('dark')}
              className={`px-2 py-0.5 rounded ${tileStyle === 'dark' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Dark
            </button>
            <button
              onClick={() => setTileStyle('osm')}
              className={`px-2 py-0.5 rounded ${tileStyle === 'osm' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              OSM
            </button>
          </div>

          {/* Reset Map Center */}
          <button
            onClick={handleResetMap}
            title="Reset Map View"
            className="p-1 border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Leaflet Canvas Container */}
      <div className="relative flex-1 min-h-[300px] w-full bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full min-h-[300px] z-10" />

        {/* Legend Box */}
        <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-xs border border-slate-200 p-2 rounded-lg text-[10px] space-y-1 shadow-md">
          <div className="font-extrabold text-navy-900 border-b border-slate-100 pb-1 flex items-center justify-between gap-3">
            <span>Risk Score Legend</span>
            <span className="text-[9px] bg-slate-100 px-1 py-0.2 rounded text-slate-500">28 States / 8 UTs</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D92D20]" />
              <span>Critical (&ge;70)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79009]" />
              <span>High (50–69)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EAAA08]" />
              <span>Medium (30–49)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A]" />
              <span>Low (&lt;30)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
