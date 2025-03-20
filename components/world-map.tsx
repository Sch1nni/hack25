'use client'

import { useRef } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

// World map GeoJSON data
const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

// Country code mapping for common countries
const countryMapping: Record<string, string[]> = {
    'United States': ['USA'],
    'Europe': ['FRA', 'DEU', 'GBR', 'ITA', 'ESP', 'NLD', 'CHE', 'SWE', 'BEL', 'AUT', 'PRT', 'GRC', 'IRL', 'DNK', 'FIN', 'NOR', 'POL', 'CZE', 'HUN', 'ROU'],
    'China': ['CHN'],
    'Japan': ['JPN'],
    'India': ['IND'],
    'Brazil': ['BRA'],
    'Canada': ['CAN'],
    'Australia': ['AUS'],
    'Russia': ['RUS'],
    'South Korea': ['KOR'],
}

interface WorldMapProps {
    data: {
        country: string
        value: number
        color: string
    }[]
    onCountrySelect?: (countryId: string) => void
    selectedCountry?: string | null
}

export function WorldMap({ data, onCountrySelect, selectedCountry }: WorldMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)

    // Create a color scale based on allocation values
    const colorScale = scaleLinear<string>()
        .domain([0, Math.max(...data.map((d) => d.value))])
        .range(['#f1f5f9', '#0ea5e9'])

    // Get color for a specific country
    const getCountryColor = (geo: any) => {
        const countryCode = geo.properties.id || geo.id

        // Check if this country is in our data
        for (const item of data) {
            if (countryMapping[item.country]?.includes(countryCode)) {
                return item.color
            }
        }

        // Default color for countries not in our data
        return '#e2e8f0'
    }

    // Check if a country is selected
    const isCountrySelected = (geo: any) => {
        if (!selectedCountry) return false

        const countryCode = geo.properties.id || geo.id

        // Find the country in our mapping that contains this code
        for (const [country, codes] of Object.entries(countryMapping)) {
            if (codes.includes(countryCode)) {
                const countryDetail = data.find((d) => d.country === country)
                if (countryDetail) {
                    return selectedCountry === countryCode
                }
            }
        }

        return false
    }

    // Handle country click
    const handleCountryClick = (geo: any) => {
        const countryCode = geo.properties.id || geo.id

        // Find the country in our mapping that contains this code
        for (const [country, codes] of Object.entries(countryMapping)) {
            if (codes.includes(countryCode)) {
                const countryDetail = data.find((d) => d.country === country)
                if (countryDetail && onCountrySelect) {
                    onCountrySelect(countryCode)
                    return
                }
            }
        }
    }

    return (
        <div
            ref={mapRef}
            className="h-full w-full"
        >
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 120 }}
            >
                <ZoomableGroup
                    center={[0, 20]}
                    zoom={1}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const isSelected = isCountrySelected(geo)
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => handleCountryClick(geo)}
                                        style={{
                                            default: {
                                                fill: getCountryColor(geo),
                                                stroke: '#FFF',
                                                strokeWidth: 0.5,
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: getCountryColor(geo),
                                                stroke: '#FFF',
                                                strokeWidth: 1,
                                                outline: 'none',
                                                opacity: 0.8,
                                                cursor: 'pointer',
                                            },
                                            pressed: {
                                                fill: getCountryColor(geo),
                                                stroke: '#FFF',
                                                strokeWidth: 1,
                                                outline: 'none',
                                            },
                                        }}
                                        className={isSelected ? 'stroke-primary stroke-2 opacity-70' : ''}
                                    />
                                )
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}
