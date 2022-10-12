import { GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

const Map = ({ coordinates }) => {
    // Map options and theme
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "14b7d8385338d844"
    }), []);

    return (
        <GoogleMap
            zoom={10}
            center={coordinates}
            options={options}
            mapContainerClassName="map">
        </GoogleMap>
    );
}

export default Map;