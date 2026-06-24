import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import styles from './OfficesMap.module.css'
import aboutContent from '../content/about.json'

/** OpenFreeMap tile style — Positron (see https://openfreemap.org/quick_start/) */
const OPENFREEMAP_STYLE = 'https://tiles.openfreemap.org/styles/positron'

const OFFICES = [
  {
    id: 'us',
    label: 'Westlake Village, USA',
    lng: -118.8019,
    lat: 34.1526,
  },
  {
    id: 'rs',
    label: 'Belgrade, Serbia',
    lng: 20.4595,
    lat: 44.8158,
  },
  {
    id: 'mx',
    label: 'Mexico City, Mexico',
    lng: -99.1947,
    lat: 19.4285,
  },
] as const

function createOfficeMarkerElement(label: string): HTMLDivElement {
  const root = document.createElement('div')
  root.className = styles.marker

  const caption = document.createElement('div')
  caption.className = styles.markerLabel
  caption.textContent = label

  const dot = document.createElement('div')
  dot.className = styles.markerDot
  dot.setAttribute('aria-hidden', 'true')

  root.appendChild(caption)
  root.appendChild(dot)
  return root
}

export function OfficesMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    const map = new maplibregl.Map({
      container: el,
      style: OPENFREEMAP_STYLE,
      renderWorldCopies: false,
    })

    /* Disable wheel / pinch / double-click zoom so page scroll is not "broken" by the map */
    map.scrollZoom.disable()
    map.boxZoom.disable()
    map.doubleClickZoom.disable()
    map.touchZoomRotate.disable()

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    const markers: maplibregl.Marker[] = []

    const onLoad = () => {
      if (cancelled) return
      const bounds = new maplibregl.LngLatBounds()
      for (const o of OFFICES) {
        bounds.extend([o.lng, o.lat])
      }
      map.fitBounds(bounds, {
        padding: { top: 96, bottom: 96, left: 104, right: 104 },
        maxZoom: 4,
        duration: 0,
      })

      for (const o of OFFICES) {
        const marker = new maplibregl.Marker({
          element: createOfficeMarkerElement(o.label),
          anchor: 'bottom',
        })
          .setLngLat([o.lng, o.lat])
          .addTo(map)
        markers.push(marker)
      }
    }

    map.once('load', onLoad)

    return () => {
      cancelled = true
      markers.forEach((m) => m.remove())
      map.remove()
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <div
        ref={containerRef}
        className={styles.map}
        role="application"
        aria-label={aboutContent.globalOffices.mapAriaLabel}
      />
    </div>
  )
}
