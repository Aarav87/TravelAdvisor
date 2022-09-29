import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import { useMemo } from "react";

function Map() {
    // Load api key
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    // Center coordinates of the map
    const center = useMemo(() => ({ lat: 43, lng: -79 }), []);
    // Map options and theme
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "14b7d8385338d844"
    }), []);

    // Display loading screen if api key has not loaded
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-container">
            <GoogleMap
                zoom={10}
                center={center}
                options={options}
                mapContainerClassName="map">
            </GoogleMap>
        </div>
    );
}

export default Map;