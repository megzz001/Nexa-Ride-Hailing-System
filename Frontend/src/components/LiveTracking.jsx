import React, { useEffect, useRef, useState } from 'react'
import { LoadScript } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%'
}

const initialCenter = {
    lat: -3.745,
    lng: -38.523
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || ''
const hasValidGoogleMapsKey = googleMapsApiKey && googleMapsApiKey !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE'

function MapCanvas({ currentPosition }) {
    const mapRef = useRef(null)
    const markerRef = useRef(null)
    const [map, setMap] = useState(null)

    useEffect(() => {
        if (!window.google?.maps || !mapRef.current || map) {
            return
        }

        const nextMap = new window.google.maps.Map(mapRef.current, {
            center: currentPosition,
            zoom: 15,
            disableDefaultUI: true
        })

        setMap(nextMap)
    }, [currentPosition, map])

    useEffect(() => {
        if (!map) {
            return
        }

        map.setCenter(currentPosition)
    }, [map, currentPosition])

    useEffect(() => {
        if (!map || !window.google?.maps?.importLibrary) {
            return
        }

        let cancelled = false

        const syncMarker = async () => {
            const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker')

            if (cancelled) {
                return
            }

            if (!markerRef.current) {
                markerRef.current = new AdvancedMarkerElement({
                    map,
                    position: currentPosition
                })
                return
            }

            markerRef.current.position = currentPosition
        }

        syncMarker()

        return () => {
            cancelled = true
        }
    }, [map, currentPosition])

    return <div ref={mapRef} style={containerStyle} />
}

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(initialCenter)

    useEffect(() => {
        if (!navigator.geolocation) {
            return undefined
        }

        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                })
            })
        }

        updatePosition()

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            })
        })

        const intervalId = setInterval(updatePosition, 10000)

        return () => {
            navigator.geolocation.clearWatch(watchId)
            clearInterval(intervalId)
        }
    }, [])

    if (!hasValidGoogleMapsKey) {
        return (
            <div className='flex h-full items-center justify-center bg-[#f4f4f4] p-6 text-center'>
                <div>
                    <h3 className='mb-2 text-lg font-semibold text-gray-900'>Google Maps key is missing</h3>
                    <p className='text-sm text-gray-600'>
                        Set VITE_GOOGLE_MAPS_API_KEY in Frontend/.env with a real Google Maps JavaScript API key to load live tracking.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <MapCanvas currentPosition={currentPosition} />
        </LoadScript>
    )
}

export default LiveTracking