import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { Search, MapPin, RefreshCw, ExternalLink } from 'lucide-react';
import { apiService } from '../../services/api';
import { StateSummaryDoc } from '../../types/api';
import { formatCurrencyRupees, formatPercentage, formatIndianNumber } from '../../utils/formatters';

interface IndiaRiskMapProps {
  house?: 'Both Houses' | 'Lok Sabha' | 'Rajya Sabha';
  onSelectState?: (stateName: string) => void;
}

// Coordinates map for Indian States and UTs
const STATE_COORDINATES: Record<string, { lat: number; lng: number; id: string }> = {
  'Andhra Pradesh': { lat: 15.9129, lng: 79.7400, id: 'AP' },
  'Arunachal Pradesh': { lat: 28.2180, lng: 94.7278, id: 'AR' },
  'Assam': { lat: 26.2006, lng: 92.9376, id: 'AS' },
  'Bihar': { lat: 25.0961, lng: 85.3131, id: 'BR' },
  'Chhattisgarh': { lat: 21.2787, lng: 81.8661, id: 'CT' },
  'Goa': { lat: 15.2993, lng: 74.1240, id: 'GA' },
  'Gujarat': { lat: 22.2587, lng: 71.1924, id: 'GJ' },
  'Haryana': { lat: 29.0588, lng: 76.0856, id: 'HR' },
  'Himachal Pradesh': { lat: 31.1048, lng: 77.1734, id: 'HP' },
  'Jharkhand': { lat: 23.6102, lng: 85.2799, id: 'JH' },
  'Karnataka': { lat: 15.3173, lng: 75.7139, id: 'KA' },
  'Kerala': { lat: 10.8505, lng: 76.2711, id: 'KL' },
  'Madhya Pradesh': { lat: 22.9734, lng: 78.6569, id: 'MP' },
  'Maharashtra': { lat: 19.7515, lng: 75.7139, id: 'MH' },
  'Manipur': { lat: 24.6637, lng: 93.9063, id: 'MN' },
  'Meghalaya': { lat: 25.4670, lng: 91.3662, id: 'ML' },
  'Mizoram': { lat: 23.1645, lng: 92.9376, id: 'MZ' },
  'Nagaland': { lat: 26.1584, lng: 94.5624, id: 'NL' },
  'Odisha': { lat: 20.9517, lng: 85.0985, id: 'OD' },
  'Punjab': { lat: 31.1471, lng: 75.3412, id: 'PB' },
  'Rajasthan': { lat: 27.0238, lng: 74.2179, id: 'RJ' },
  'Sikkim': { lat: 27.5330, lng: 88.5122, id: 'SK' },
  'Tamil Nadu': { lat: 11.1271, lng: 78.6569, id: 'TN' },
  'Telangana': { lat: 18.1124, lng: 79.0193, id: 'TS' },
  'Tripura': { lat: 23.9408, lng: 91.9882, id: 'TR' },
  'Uttar Pradesh': { lat: 26.8467, lng: 80.9462, id: 'UP' },
  'Uttarakhand': { lat: 30.0668, lng: 79.0193, id: 'UT' },
  'West Bengal': { lat: 22.9868, lng: 87.8550, id: 'WB' },
  'Delhi': { lat: 28.7041, lng: 77.1025, id: 'DL' },
  'Delhi (NCT)': { lat: 28.7041, lng: 77.1025, id: 'DL' },
  'Jammu and Kashmir': { lat: 33.7782, lng: 76.5762, id: 'JK' },
  'Jammu & Kashmir': { lat: 33.7782, lng: 76.5762, id: 'JK' },
  'Ladakh': { lat: 34.1526, lng: 77.5771, id: 'LA' },
  'Puducherry': { lat: 11.9416, lng: 79.8083, id: 'PY' },
  'Chandigarh': { lat: 30.7333, lng: 76.7794, id: 'CH' },
  'Andaman and Nicobar Islands': { lat: 11.7401, lng: 92.6586, id: 'AN' },
};

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({ house, onSelectState }) => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [stateDataList, setStateDataList] = useState<StateSummaryDoc[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tileStyle, setTileStyle] = useState<'voyager' | 'dark' | 'osm'>('osm');
  const [loading, setLoading] = useState(true);

  const tileUrls = {
    voyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  };

  // Fetch live state records
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    apiService
      .getStateSummaries({
        house: house && house !== 'Both Houses' ? house : undefined,
        limit: 50,
      })
      .then((data) => {
        if (isMounted) {
          setStateDataList(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [house]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [22.5937, 78.9629],
        zoom: 4.6,
        minZoom: 4,
        maxZoom: 9,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: 'topright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Reset tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(tileUrls[tileStyle], {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Render markers for each state that has coordinates
    stateDataList.forEach((stateDoc) => {
      const coords =
        STATE_COORDINATES[stateDoc.state] ||
        Object.entries(STATE_COORDINATES).find(
          ([name]) => name.toLowerCase() === stateDoc.state.toLowerCase()
        )?.[1];

      if (!coords) return;

      const util = stateDoc.utilizationPercentage || 0;
      // Derived risk indicator: low utilization = higher concern
      const getBadgeBg = (u: number) => {
        if (u >= 75) return '#12B76A'; // High utilization (Green)
        if (u >= 55) return '#EAAA08'; // Moderate utilization (Yellow)
        if (u >= 35) return '#F79009'; // Low utilization (Orange)
        return '#D92D20';             // Lagging utilization (Red)
      };

      const color = getBadgeBg(util);

      // Custom Leaflet DivIcon
      const iconHtml = `
        <div class="relative flex items-center justify-center group">
          <div class="w-7 h-7 rounded-full shadow-lg flex items-center justify-center text-white text-[10px] font-black border-2 border-white cursor-pointer transition-transform hover:scale-125" style="background-color: ${color}">
            ${Math.round(util)}%
          </div>
          <div class="absolute -bottom-4 whitespace-nowrap bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow-xs pointer-events-none">
            ${coords.id}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'leaflet-data-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);

      // Popup with real live values
      const popupHtml = `
        <div class="p-1 max-w-[210px] text-slate-800 font-sans">
          <div class="flex items-center justify-between border-b pb-1 mb-1.5">
            <span class="font-extrabold text-xs text-navy-900">${stateDoc.state}</span>
            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style="background-color: ${color}">
              ${formatPercentage(util)} Utilized
            </span>
          </div>
          <div class="text-[11px] space-y-1">
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">Allocated:</span>
              <span class="font-bold text-slate-900">${formatCurrencyRupees(stateDoc.totalAllocated)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">Expenditure:</span>
              <span class="font-bold text-slate-900">${formatCurrencyRupees(stateDoc.totalExpenditure)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">Completed Works:</span>
              <span class="font-bold text-emerald-700">${formatIndianNumber(stateDoc.totalWorksCompleted)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">Active MPs:</span>
              <span class="font-bold text-navy-900">${formatIndianNumber(stateDoc.totalMPs)}</span>
            </div>
          </div>
          <div class="mt-2 pt-1 border-t text-center">
            <a href="/mplads/states/${encodeURIComponent(stateDoc.state)}" 
               style="display:inline-block; font-size:10px; font-weight:bold; color:#0A2540; text-decoration:none; padding:2px 8px; border:1px solid #CBD5E1; border-radius:4px;">
              View State Dashboard &rarr;
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { offset: [0, -10] });

      marker.on('click', () => {
        setSelectedState(stateDoc.state);
        if (onSelectState) onSelectState(stateDoc.state);
      });

      markersRef.current[stateDoc.state] = marker;
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [stateDataList, tileStyle]);

  const handleSelectFromDropdown = (stateName: string) => {
    setSelectedState(stateName);
    const coords =
      STATE_COORDINATES[stateName] ||
      Object.entries(STATE_COORDINATES).find(
        ([name]) => name.toLowerCase() === stateName.toLowerCase()
      )?.[1];

    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6.5, { duration: 1.2 });
      const marker = markersRef.current[stateName];
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
            <p className="text-[10px] text-slate-500">Live Spatial Fund Utilization & Allocation</p>
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
              <option value="">Jump to State...</option>
              {stateDataList.map((st) => (
                <option key={st.state} value={st.state}>
                  {st.state} ({formatPercentage(st.utilizationPercentage)})
                </option>
              ))}
            </select>
          </div>

          {/* Map Style Selector */}
          <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden p-0.5 text-[10px] font-bold">
            <button
              onClick={() => setTileStyle('voyager')}
              className={`px-2 py-0.5 rounded ${
                tileStyle === 'voyager' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Voyager
            </button>
            <button
              onClick={() => setTileStyle('dark')}
              className={`px-2 py-0.5 rounded ${
                tileStyle === 'dark' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTileStyle('osm')}
              className={`px-2 py-0.5 rounded ${
                tileStyle === 'osm' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
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
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Leaflet Canvas Container */}
      <div className="relative flex-1 min-h-[300px] w-full bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full min-h-[300px] z-10" />

        {/* Legend Box */}
        <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-xs border border-slate-200 p-2 rounded-lg text-[10px] space-y-1 shadow-md">
          <div className="font-extrabold text-navy-900 border-b border-slate-100 pb-1 flex items-center justify-between gap-3">
            <span>Utilization Rate Legend</span>
            <span className="text-[9px] bg-slate-100 px-1 py-0.2 rounded text-slate-500">
              {stateDataList.length} States / UTs Live
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A]" />
              <span>High (&ge;75%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EAAA08]" />
              <span>Moderate (55–74%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79009]" />
              <span>Low (35–54%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D92D20]" />
              <span>Lagging (&lt;35%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
