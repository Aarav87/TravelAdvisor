import { GoogleMap   } from "@react-google-maps/api";
import { useMemo } from "react";

function Map() {
    // Center coordinates of the map
    const center = useMemo(() => ({ lat: 43, lng: -79 }), []);
    // Map options and theme
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "14b7d8385338d844"
    }), []);

    return (
        <GoogleMap
            zoom={10}
            center={center}
            options={options}
            mapContainerClassName="map">
        </GoogleMap>
    );
}

export default Map;