'use client'

import { useRef, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

// World map GeoJSON data
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Country code mapping for common countries
const countryMapping: Record<string, string[]> = {
    'United States': ['USA'],
    'Europe': ['FRA', 'DEU', 'GBR', 'ITA', 'ESP', 'NLD', 'CHE', 'SWE', 'BEL', 'AUT', 'PRT', 'GRC', 'IRL', 'DNK', 'FIN', 'NOR', 'POL', 'CZE', 'HUN', 'ROU', 'LUX', 'SVK', 'HRV', 'BGR', 'SVN', 'LTU', 'LVA', 'EST', 'CYP', 'MLT'],
    'China': ['CHN'],
    'Japan': ['JPN'],
    'India': ['IND'],
    'Brazil': ['BRA'],
    'Canada': ['CAN'],
    'Australia': ['AUS'],
    'Russia': ['RUS'],
    'South Korea': ['KOR'],
    'United Kingdom': ['GBR'],
    'Switzerland': ['CHE']
}

interface WorldMapProps {
    data: {
        country: string
        iso_a3: string
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
        const countryCode = geo.properties?.iso_a3

        // First check direct match with iso_a3
        const directMatch = data.find(item => item.iso_a3 === countryCode)
        if (directMatch) {
            return directMatch.color
        }

        // Then check if country is part of a region (like Europe)
        for (const [regionName, codes] of Object.entries(countryMapping)) {
            if (codes.includes(countryCode)) {
                const regionData = data.find(item => item.country === regionName)
                if (regionData) {
                    return regionData.color
                }
            }
        }

        // Default color for countries not in our data
        return '#e2e8f0'
    }

    // Check if a country is selected
    const isCountrySelected = (geo: any) => {
        if (!selectedCountry) return false

        const countryCode = geo.properties?.iso_a3 || geo.id

        // Find the country in our mapping that contains this code
        for (const [country, codes] of Object.entries(countryMapping)) {
            if (codes.includes(countryCode)) {
                const countryDetail = data.find((d) => d.iso_a3 === countryCode)
                if (countryDetail) {
                    return selectedCountry === countryDetail.iso_a3
                }
            }
        }

        return false
    }

    // Handle country click
    const handleCountryClick = (geo: any) => {
        const countryCode = geo.properties?.iso_a3 || geo.id

        // Find the country in our mapping that contains this code
        for (const [country, codes] of Object.entries(countryMapping)) {
            if (codes.includes(countryCode)) {
                const countryDetail = data.find((d) => d.iso_a3 === countryCode)
                if (countryDetail && onCountrySelect) {
                    onCountrySelect(countryDetail.iso_a3)
                    return
                }
            }
        }
    }

    useEffect(() => {
        console.log('Map data:', data)
    }, [data])

    return (
        <div
            ref={mapRef}
            className="h-[350px] w-full overflow-hidden rounded-lg border"
            style={{ minHeight: '350px' }}
        >
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 150,
                    center: [0, 30]
                }}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <ZoomableGroup
                    zoom={1}
                    maxZoom={5}
                    minZoom={1}
                    center={[0, 0]}
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
