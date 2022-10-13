import { GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

const Map = ({ coordinates, onCenterChanged, onBoundsChanged, setMapRef }) => {
    // Map options and theme
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "14b7d8385338d844"
    }), []);

    // Set map reference
    const handleOnLoad = (map) => {
        setMapRef(map);
    };

    return (
        <GoogleMap
            zoom={10}
            center={coordinates}
            options={options}
            mapContainerClassName="map"
            onLoad={(map) => {handleOnLoad(map)}}
            onDragEnd={() => {
                onCenterChanged();
                onBoundsChanged();
            }}
            onZoomChanged={onBoundsChanged}
        >

        </GoogleMap>
    );
}

export default Map;