import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";

// Lightweight map using Leaflet (already commonly present). If missing, markers render as list fallback.
let L;
try {
  // Dynamically require to avoid SSR issues
  // eslint-disable-next-line no-undef
  L = require("leaflet");
} catch (e) {
  L = null;
}

export default function MapView({ t, lang, data, activeCategories }) {
  const mapRef = useRef(null);
  const mapEl = useRef(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return data.filter((d) => (activeCategories[d.category] ?? true) &&
      (d.name[lang]?.toLowerCase().includes(query.toLowerCase()) ||
        d.name.en.toLowerCase().includes(query.toLowerCase())));
  }, [data, activeCategories, query, lang]);

  useEffect(() => {
    if (!L || !mapEl.current) return;
    if (mapRef.current) return; // init once

    const map = L.map(mapEl.current, { zoomControl: true }).setView([-35.282, 149.128], 11);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
  }, []);

  useEffect(() => {
    if (!L || !mapRef.current) return;

    // Clear existing markers layer
    if (mapRef.current._markerLayer) {
      mapRef.current.removeLayer(mapRef.current._markerLayer);
    }
    const layer = L.layerGroup();

    filtered.forEach((d) => {
      const marker = L.marker([d.lat, d.lng]);
      const description = d.description?.[lang] || d.description?.en || "";
      const hours = d.hours ? `<div class="mt-1 text-xs">${d.hours}</div>` : "";
      const popup = `
        <div dir="${lang === "ar" ? "rtl" : "ltr"}" style="min-width:200px">
          <div class="font-semibold text-gray-900">${d.name[lang] || d.name.en}</div>
          <div class="text-xs text-gray-600">${d.address || ""}</div>
          <div class="text-sm mt-1">${description}</div>
          ${hours}
          <a href="https://www.google.com/maps?q=${d.lat},${d.lng}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-emerald-700 font-medium mt-2">
            ${t("map.getDirections")} ↗
          </a>
        </div>`;
      marker.bindPopup(popup);
      marker.addTo(layer);
    });

    layer.addTo(mapRef.current);
    mapRef.current._markerLayer = layer;
  }, [filtered, lang, t]);

  return (
    <div className="relative flex-1 min-h-[420px]">
      <div className="absolute top-3 left-3 right-3 z-10">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("map.searchPlaceholder")}
            className="w-full bg-transparent outline-none text-sm text-gray-800"
          />
        </div>
      </div>

      <div ref={mapEl} className="w-full h-[60vh] md:h-[calc(100vh-160px)] rounded-lg overflow-hidden border border-gray-200" />

      {!L && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="bg-white border rounded-lg p-4 text-center max-w-md">
            <MapPin className="mx-auto text-emerald-600" />
            <p className="mt-2 text-sm text-gray-600">{t("map.fallback")}</p>
            <ul className="mt-3 text-left text-sm list-disc list-inside">
              {filtered.map((d) => (
                <li key={`${d.lat}-${d.lng}`}>
                  {d.name[lang] || d.name.en} — {d.address}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
