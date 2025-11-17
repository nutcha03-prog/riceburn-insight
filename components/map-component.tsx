'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet.heat'
import * as turf from '@turf/turf'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  selectedMonth: string
  showHotspots: boolean
  onStatsUpdate: (stats: { totalHotspots: number; topProvince: string }) => void
}

export default function MapComponent({ selectedMonth, showHotspots, onStatsUpdate }: MapProps) {

  useEffect(() => {

    // ⛔ Prevent SSR
    if (typeof window === "undefined") return

    // ⭐ FIX #1: Prevent multiple Leaflet initializations
    const mapContainer = L.DomUtil.get('map')
    if (mapContainer && (mapContainer as any)._leaflet_id) {
      ; (mapContainer as any)._leaflet_id = null
    }

    // ⭐ Create map safely
    const map = L.map('map', { center: [16.7, 100.5], zoom: 6 })

    // Basemap
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Esri, Maxar'
    }).addTo(map)

    let hotspotLayer: any = null
    let heatLayer: any = null
    let topProvinceLayer: any = null
    let boundaryLayer: any = null

    // Load boundary
    const loadBoundary = async () => {
      const boundary = await fetch('/geo/provinces.geojson').then(r => r.json())

      // ⭐ FIX #2: Ensure valid geometry
      boundaryLayer = L.geoJSON(boundary, {
        style: { color: '#555', weight: 1, fillOpacity: 0 }
      })

      boundaryLayer.addTo(map)

      return boundary
    }

    const loadHotspot = async (month: string) => {
      const file = `/geo/Hotspot_inrice_${month}.geojson`
      const geo = await fetch(file).then(r => r.json())

      if (hotspotLayer) map.removeLayer(hotspotLayer)
      if (heatLayer) map.removeLayer(heatLayer)
      if (topProvinceLayer) map.removeLayer(topProvinceLayer)

      hotspotLayer = L.geoJSON(geo, {
        pointToLayer: (_: any, latlng: any) =>
          L.circleMarker(latlng, {
            radius: 5,
            fillColor: '#ff3b3b',
            color: '#fff',
            weight: 1,
            fillOpacity: 0.9
          }),
        onEachFeature: (f: any, l: any) => {
          const p = f.properties
          l.bindPopup(`
            <b>🔥 Hotspot</b><br/>
            วันที่: ${p.DATE || '-'}<br/>
            จังหวัด: ${p.PROVINCE || '-'}
          `)
        }
      })

      if (showHotspots) hotspotLayer.addTo(map)

      // Heatmap
      const pts = geo.features.map((f: any) => [
        f.geometry.coordinates[1],
        f.geometry.coordinates[0]
      ])

      heatLayer = (L as any).heatLayer(pts, {
        radius: 25,
        blur: 20,
        maxZoom: 9
      })

      if (showHotspots) heatLayer.addTo(map)

      // Count per province
      const boundary = await fetch('/geo/provinces.geojson').then(r => r.json())
      const counts: any = {}

      geo.features.forEach((pt: any) => {
        const [lon, lat] = pt.geometry.coordinates
        const point = turf.point([lon, lat])

        boundary.features.forEach((f: any) => {
          let poly
          if (f.geometry.type === 'Polygon')
            poly = turf.polygon(f.geometry.coordinates)
          else if (f.geometry.type === 'MultiPolygon')
            poly = turf.multiPolygon(f.geometry.coordinates)

          if (turf.booleanPointInPolygon(point, poly)) {
            const prov = f.properties.pro_th
            counts[prov] = (counts[prov] || 0) + 1
          }
        })
      })

      const sorted = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1])

      let topProvince = "-"

      if (sorted.length > 0) {
        topProvince = `${sorted[0][0]} (${sorted[0][1]} จุด)`

        const topFeature = boundary.features.find(
          (f: any) => f.properties.pro_th === sorted[0][0]
        )

        if (topFeature) {
          topProvinceLayer = L.geoJSON(topFeature, {
            style: { color: 'black', weight: 3, fillOpacity: 0.25 }
          }).addTo(map)
        }
      }

      onStatsUpdate({
        totalHotspots: geo.features.length,
        topProvince
      })
    }

    loadBoundary().then(() => loadHotspot(selectedMonth))

    return () => {
      if (map) map.remove()
    }


  }, [selectedMonth, showHotspots])

  return <div id="map" className="h-[700px] w-full"></div>
}
